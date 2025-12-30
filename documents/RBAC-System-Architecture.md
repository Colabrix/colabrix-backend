# RBAC & Feature Gating System Architecture

## Table of Contents
1. [Overview](#overview)
2. [Multi-Level Access Control](#multi-level-access-control)
3. [Subscription & Feature Gating](#subscription--feature-gating)
4. [Performance Optimization Strategy](#performance-optimization-strategy)
5. [Organization Creation Flow](#organization-creation-flow)
6. [Real-World Use Cases](#real-world-use-cases)

---

## Overview

The system implements a production-grade Role-Based Access Control (RBAC) with subscription-based feature gating. The architecture is designed for high performance (~11ms average response time) while maintaining security and flexibility.

### Key Design Principles
- **Separation of Concerns**: System-level roles separate from organization-level permissions
- **Performance First**: Multi-layer caching strategy for sub-20ms response times
- **Scalability**: Redis-backed caching with PostgreSQL persistence
- **Flexibility**: Custom roles and permissions per organization
- **Monetization Ready**: Built-in subscription plans with feature limits

---

## Multi-Level Access Control

The access control system operates on three distinct levels, each serving a specific purpose.

### Level 1: System Role (Global)

This is the highest level of access control, applied globally across the entire platform.

**Purpose**: Platform-wide administrative access

**Roles**:
- **SUPER_ADMIN**: Full platform access, can manage all organizations, users, and system settings
- **USER**: Regular platform user with no special system privileges

**When Checked**: During system-level operations like viewing platform analytics, managing global settings, or accessing admin panels

**Example**: Only SUPER_ADMIN can view all organizations in the system or modify platform-wide configurations

### Level 2: Organization Role

Each user has a specific role within each organization they belong to. A user can be part of multiple organizations with different roles in each.

**Purpose**: Define user's access level within a specific organization

**Default Roles** (Auto-created):
- **Admin**: Full control over the organization
- **Member**: Standard access with limited administrative capabilities
- **Viewer**: Read-only access to organization resources

**Custom Roles**: Organizations can create additional roles with custom permission sets

**Key Concept**: User roles are organization-scoped. The same user can be:
- Admin in Organization A
- Member in Organization B
- Viewer in Organization C

### Level 3: Permissions (Granular)

Permissions are the most granular level of access control, defining specific actions on specific resources.

**Structure**: Each permission consists of two parts:
- **Resource**: The entity being accessed (organizations, members, roles, projects, etc.)
- **Action**: The operation being performed (create, read, update, delete, use)

**Examples**:
- `organizations:read` - View organization details
- `members:create` - Add new members to organization
- `roles:update` - Modify role definitions
- `ai_features:use` - Access AI-powered features

**Permission Assignment**: Permissions are assigned to roles, not directly to users. When a user is assigned a role, they inherit all permissions from that role.

### Access Check Flow

When a user attempts to perform an action:

1. **System Role Check**: Is this a system-level operation? Check if user has required SystemRole
2. **Organization Context**: Extract organizationId from request
3. **User Role**: Find user's role in that specific organization
4. **Permission Validation**: Check if the role has the required permission
5. **Feature Gate**: If accessing a premium feature, validate subscription plan
6. **Usage Limit**: If feature has limits, check if quota is available

**Multi-Layer Defense**: All three levels work together. A user must pass all applicable checks to perform an action.

---

## Subscription & Feature Gating

The subscription system controls access to premium features based on the organization's plan.

### Plan Hierarchy

**FREE Plan**:
- Basic collaboration features
- Limited usage quotas
- Entry-level access

**STANDARD Plan**:
- Increased quotas
- Additional productivity features
- Better support

**PREMIUM Plan**:
- High usage limits
- Advanced features (AI, analytics)
- Premium support

**ENTERPRISE Plan**:
- Unlimited or very high quotas
- All features unlocked
- White-label options
- Dedicated support

### Feature Types

**Category-Based Features**:
- **AI**: AI assistant, smart suggestions, auto-completion
- **Analytics**: Advanced reports, custom dashboards, data insights
- **Collaboration**: Team features, real-time collaboration, integrations
- **Customization**: Custom branding, white-label, custom domains
- **Storage**: File storage, media hosting, backups
- **Support**: Priority support, dedicated account manager

### Feature Access Control

Each feature has three properties:

**1. Availability**: Which plans can access this feature
- A feature is either available or unavailable on a plan
- Premium features are locked for lower-tier plans

**2. Usage Limit**: How many times the feature can be used
- **Null**: Unlimited usage (premium plans)
- **Numeric**: Hard limit per month (e.g., 100 AI requests)

**3. Period**: Time window for usage tracking
- Typically monthly
- Resets at the start of each period

### Usage Tracking

**Monthly Quotas**: Each feature tracks usage per organization per month

**Tracking Mechanism**:
- User initiates action requiring a feature
- System checks if feature is available on their plan
- System checks current usage vs limit
- If under limit, action proceeds and usage increments
- If over limit, request is rejected with 429 status

**Background Sync**: Usage increments happen in Redis immediately (fast), then sync to PostgreSQL asynchronously (reliable)

### Trial Period

New organizations get a 14-day trial period where:
- All features are unlocked (like ENTERPRISE plan)
- No payment required
- After trial ends, organization must choose a paid plan or downgrade to FREE
- Usage limits apply based on selected plan

### Plan Changes

**Upgrade**:
- Immediate access to new features
- Higher usage limits apply instantly
- Previous usage history maintained

**Downgrade**:
- Lost access to premium features
- Lower limits apply
- If current usage exceeds new limit, no new usage allowed until next period

### Feature Gate Flow

When a user attempts to use a premium feature:

1. **Plan Check**: Does organization's plan include this feature?
2. **Limit Validation**: Does the feature have a usage limit?
3. **Usage Check**: Has the organization exceeded their limit for this period?
4. **Access Decision**: Allow if all checks pass, deny otherwise
5. **Tracking**: If allowed, increment usage counter asynchronously

---

## Performance Optimization Strategy

The system is designed to handle permission and feature checks in under 20ms, even under high load.

### The Performance Challenge

Every API request requires multiple checks:
- User authentication
- Session validation
- Permission verification
- Feature access validation
- Usage limit checking

Without optimization, each check could require a database query, leading to:
- 200-300ms response times
- Database overload under traffic
- Poor user experience

### Multi-Layer Caching Strategy

The system uses a three-tier caching approach to minimize database queries.

**Layer 1: JWT Token (0ms - Instant)**

When a user logs in, their permissions are embedded directly in the JWT token.

**What's Cached**:
- User ID and email
- System role
- List of organizations with roles and permissions

**Performance**: Instant lookup, no external calls

**Trade-off**: Tokens can become stale if permissions change. This is acceptable because:
- Tokens expire every 15 minutes
- Critical permission changes can force re-login
- The convenience outweighs the slight staleness risk

**Layer 2: Redis Cache (5-10ms)**

If JWT doesn't contain needed data or is stale, check Redis.

**What's Cached**:
- User permissions per organization (TTL: 5 minutes)
- Organization feature access (TTL: 10 minutes)
- Monthly usage counters (TTL: 30 days)

**Performance**: Sub-10ms lookup over network

**Why Redis**:
- In-memory storage for fast access
- Distributed caching for horizontal scaling
- Built-in TTL for automatic cleanup
- Atomic operations for counters

**Layer 3: PostgreSQL (50ms - Cache Miss Only)**

Only accessed when Redis cache misses (~5% of requests).

**What's Stored**:
- Complete user and organization data
- Role and permission definitions
- Feature usage history
- Subscription details

**Performance**: ~50ms for complex joins

**Optimization**: Heavy use of database indexes on frequently queried columns

### Cache Invalidation Strategy

Caches must be invalidated when underlying data changes to prevent serving stale data.

**When Permissions Change**:
- User's role updated → Invalidate that user's permission cache for that organization
- Role's permissions modified → Invalidate cache for all users with that role
- User added to organization → No cache exists yet, no action needed
- User removed from organization → Invalidate that user's cache

**When Plan Changes**:
- Organization upgrades/downgrades → Invalidate organization's feature cache
- Feature added to plan → Invalidate all organizations on that plan
- Usage limit modified → Invalidate feature limit cache

**When System Role Changes**:
- User promoted to SUPER_ADMIN → Force logout and re-login to refresh JWT
- Critical security change → Invalidate all sessions globally

### Background Jobs

To avoid blocking user requests, some operations happen asynchronously:

**Usage Tracking**:
- Increment Redis counter immediately (non-blocking)
- Sync to PostgreSQL in background every minute
- On server restart, Redis rebuilds from PostgreSQL

**Analytics**:
- Permission check logs aggregated hourly
- Usage reports generated daily
- Billing calculations run nightly

### Performance Metrics

**Target Performance**:
- JWT-based permission check: < 1ms
- Redis-based check: < 10ms
- Database fallback: < 50ms
- Average across all requests: ~11ms (27x faster than uncached)

**Scalability**:
- Redis can handle 100,000+ reads/sec
- PostgreSQL connection pooling prevents bottlenecks
- Horizontal scaling via Redis cluster for unlimited growth

---

## Organization Creation Flow

When a user creates a new organization, multiple operations happen atomically to ensure proper RBAC structure.

### Step 1: Plan Selection

User chooses a subscription plan:
- FREE: Default option, limited features
- STANDARD/PREMIUM/ENTERPRISE: Paid plans with more features

If no plan selected, defaults to FREE with 14-day trial of ENTERPRISE features.

### Step 2: Organization Entity Creation

Core organization record is created with:
- Unique organization ID
- Organization name
- Owner (creator) ID
- Selected plan
- Trial end date (14 days from creation)
- Creation timestamp

### Step 3: Auto-Generated Roles

Three system roles are automatically created for the organization:

**Admin Role**:
- Full permissions granted
- Can manage members, roles, settings
- Can modify organization details
- Marked as system role (cannot be deleted)

**Member Role**:
- Standard permissions for regular team members
- Can view most resources
- Can create/update own content
- Cannot manage roles or members
- Marked as system role

**Viewer Role**:
- Read-only permissions
- Can view organization data
- Cannot create or modify anything
- Marked as system role

### Step 4: Permission Assignment

All available permissions are fetched from the database, then assigned to roles:

**Admin**: Gets ALL permissions
**Member**: Gets subset of permissions (read, create for most resources, but not manage)
**Viewer**: Gets only read permissions

This happens in a single database transaction to ensure consistency.

### Step 5: Creator Assignment

The user who created the organization is automatically:
- Added as the first organization member
- Assigned the Admin role
- Given immediate full access

### Step 6: Cache Preparation

After successful creation:
- Organization features are cached in Redis
- Creator's permissions are cached
- JWT is refreshed with new organization data on next login

### Atomic Transaction

All steps happen in a single database transaction:
- If any step fails, entire organization creation is rolled back
- Prevents orphaned data or incomplete RBAC structures
- Ensures every organization starts with proper access control

### Why This Matters

This flow ensures:
- **No Manual Setup**: Creators don't need to configure RBAC manually
- **Immediate Usability**: Organization is ready to use instantly
- **Security by Default**: Proper access controls from day one
- **Consistency**: Every organization has the same baseline structure
- **Scalability**: Same process works for 1 org or 1 million orgs

---

## Real-World Use Cases

### Use Case 1: Multi-Tenant SaaS Platform

**Scenario**: A project management SaaS where companies create accounts

**Implementation**:
- Each company creates an Organization
- Company admin invites team members with different roles
- Premium features like AI task suggestions locked behind PREMIUM plan
- FREE plan limited to 5 team members, PREMIUM unlimited

**Permission Flow**:
- Project Manager role can create/update projects
- Developer role can update task status but not delete projects
- Viewer role can only see projects and tasks

**Monetization**:
- FREE: 5 members, basic features, 100 AI suggestions/month
- PREMIUM: Unlimited members, all features, 1000 AI suggestions/month
- ENTERPRISE: Everything + white-label + dedicated support

### Use Case 2: Agency with Multiple Clients

**Scenario**: Marketing agency manages campaigns for multiple clients

**Implementation**:
- Agency creates one Organization per client
- Same agency employee is Admin in some clients, Member in others
- Clients can be Viewers in their own organization to review progress
- Advanced analytics feature requires STANDARD+ plan

**Permission Flow**:
- Agency Admin: Full access to client organization
- Agency Member: Can create campaigns, cannot change billing
- Client Viewer: Read-only access to their campaigns

**Feature Gating**:
- Report exports limited to 10/month on FREE
- Custom dashboards only on PREMIUM+
- API access only on ENTERPRISE

### Use Case 3: Freemium Mobile App

**Scenario**: Productivity app with free and paid tiers

**Implementation**:
- Each user gets a personal Organization on signup
- Can invite family members to collaborate
- AI writing assistant available on PREMIUM only
- Cloud storage: 100MB (FREE), 10GB (STANDARD), 100GB (PREMIUM)

**Permission Flow**:
- Organization owner: Full control
- Family members: Can use features but cannot change subscription
- Guests: View-only access to shared documents

**Usage Tracking**:
- FREE: 50 AI requests/month
- STANDARD: 500 AI requests/month
- PREMIUM: 5000 AI requests/month
- When limit hit, prompt to upgrade

### Use Case 4: Internal Company Tool

**Scenario**: Enterprise HR platform for large corporation

**Implementation**:
- Single Organization for entire company
- Departments as sub-groups with different access
- HR admins have elevated permissions
- Employees have self-service access

**Permission Flow**:
- HR Admin: Can view all employee data, modify records
- Manager: Can view team data, cannot modify salary info
- Employee: Can view own data, update personal details only

**System Role Usage**:
- Platform SUPER_ADMIN: IT team managing the platform
- All company users: Regular USER system role
- Within organization: Custom roles per department

### Use Case 5: Marketplace Platform

**Scenario**: E-commerce platform where sellers create shops

**Implementation**:
- Each shop is an Organization
- Shop owner is Admin, can add staff as Members
- Advanced seller tools (analytics, SEO) locked behind paid plans
- Product listing limits based on plan

**Permission Flow**:
- Shop Owner: Full access to shop settings, billing, staff
- Shop Manager: Can manage products, orders, not change plan
- Shop Staff: Can process orders, cannot change product prices

**Feature Limits**:
- FREE: 10 products, basic analytics
- STANDARD: 100 products, advanced analytics, SEO tools
- PREMIUM: Unlimited products, AI pricing suggestions, priority support
- ENTERPRISE: Everything + custom domain + API access

**Usage Tracking**:
- AI product descriptions: 20/month (STANDARD), 200/month (PREMIUM)
- Bulk import operations: Not available (FREE), 5/month (STANDARD), unlimited (PREMIUM)

---

## Key Takeaways

### For Developers

**Security**: Multiple layers of access control prevent unauthorized access at system, organization, and resource levels.

**Performance**: Caching strategy ensures sub-20ms permission checks even under heavy load.

**Maintainability**: Clear separation between system roles, organization roles, and permissions makes the codebase easier to understand and modify.

**Scalability**: Redis-backed caching and async background jobs allow horizontal scaling without performance degradation.

### For Product Managers

**Monetization**: Built-in subscription tiers with feature gating enable clear upgrade paths.

**Flexibility**: Custom roles allow each organization to tailor access control to their needs.

**User Experience**: Fast permission checks mean users never wait for authorization, creating seamless experience.

**Analytics**: Usage tracking provides data for pricing optimization and feature development prioritization.

### For Business

**Revenue Growth**: Clear feature differentiation between plans encourages upgrades.

**Customer Satisfaction**: Flexible RBAC lets organizations structure teams as they want.

**Competitive Advantage**: Enterprise-grade RBAC and sub-20ms performance rival best-in-class SaaS platforms.

**Scalability**: Architecture supports growth from 10 to 10 million users without major refactoring.
