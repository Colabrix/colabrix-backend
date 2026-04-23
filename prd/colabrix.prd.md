# Colabrix — Product Requirements Document

**Version:** 2.0
**Date:** April 21, 2026
**Status:** Draft — Stakeholder Review
**Document Owner:** Product Team
**Confidentiality:** Internal / Stakeholder Distribution Only

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
   - 2.5 [Competitive Landscape](#25-competitive-landscape)
3. [Target Market & User Personas](#3-target-market--user-personas)
4. [Product Goals & Success Metrics](#4-product-goals--success-metrics)
5. [Full User Journey](#5-full-user-journey)
6. [Authentication & Onboarding](#6-authentication--onboarding)
7. [Roles & Permission Matrix](#7-roles--permission-matrix)
8. [Organisations & Projects](#8-organisations--projects)
9. [Subscription & Pricing](#9-subscription--pricing)
10. [Project Management Module](#10-project-management-module)
11. [GitHub Integration](#11-github-integration)
12. [Communication Module](#12-communication-module)
13. [AI Features](#13-ai-features)
14. [Notifications System](#14-notifications-system)
15. [Activity Feed](#15-activity-feed)
16. [Global Search](#16-global-search)
17. [User Profile & Account Settings](#17-user-profile--account-settings)
18. [Super Admin Panel](#18-super-admin-panel)
19. [Non-Functional Requirements](#19-non-functional-requirements)
20. [Tech & Integration Considerations](#20-tech--integration-considerations)
21. [Roadmap & Phasing](#21-roadmap--phasing)
22. [Edge Cases & Business Rules](#22-edge-cases--business-rules)
23. [Open Questions & Assumptions](#23-open-questions--assumptions)
- [Appendix A: Glossary](#appendix-a-glossary)
- [Appendix B: Issue ID Format](#appendix-b-issue-id-format)
- [Appendix C: Data Retention Policy Summary](#appendix-c-data-retention-policy-summary)

---

## 1. Executive Summary

**Colabrix is not another Jira alternative. It is India's first team operating system for engineering teams** — combining project management, real-time communication, GitHub DevOps intelligence, and AI in one platform, priced in INR.

Today's Indian engineering teams are stitching together four or five disconnected tools: Jira for tasks (USD-priced and over-complex), Slack for communication (more USD spend), GitHub for code (no intelligence layer), and something else for meetings. Plane.so is free but incomplete — no built-in communication, no GitHub automation, requires self-hosting for the free tier. Zoho Projects is Indian but dated — no AI, no GitHub automation, basic communication. Jira is powerful but USD-priced and increasingly fragmented as Atlassian bundles ever more tools.

Colabrix is the only platform that combines: **(1) India-first INR pricing**, **(2) built-in real-time communication**, **(3) GitHub automation with auto-bug creation from deployment failures**, and **(4) AI deeply embedded throughout** — in a single product. This is not a feature comparison win. It is a category creation play.

**Core promise: One platform. Plan, build, communicate, and ship — together.**

### Vision Statement

To become the default team operating system for India's 1.5 million+ software teams — from 5-person startups to 500-person enterprises — by delivering best-in-class tooling at India-first pricing with AI deeply embedded throughout the experience.

### Core Value Propositions

| Value | Description |
|---|---|
| Unified Workspace | Project management + communication + GitHub events in one tab |
| India-First Pricing | INR pricing, UPI/card payments, GST-compliant invoicing |
| AI-Powered Productivity | Task creation, bug summaries, meeting notes, sprint planning — all AI-assisted |
| GitHub-Native | Webhook integration that auto-creates bugs from deployment failures |
| Flexible Workflows | Kanban, Scrum, and Hybrid modes with customisable statuses and WIP limits |
| Free Trial | 14-day free trial, no credit card required — teams experience full value before committing |

---

## 2. Problem Statement

### The Problem

Indian development teams (2–200 people) are stitching together 4–6 tools to manage their daily work:

- **Jira / Linear** for project tracking — expensive, complex, USD-priced
- **Slack / Teams** for communication — more USD spend, context switching
- **GitHub** for code — but no intelligence layer connecting code events to project tasks
- **Google Meet + Calendar** for meetings — no meeting lifecycle management
- **Notion / Confluence** for documentation — yet another tab

This fragmentation causes:
1. Context loss when switching between tools
2. Missed bug reports when deployments fail silently
3. Meeting outcomes not captured and tracked as tasks
4. No single source of truth for project health
5. Dollar-denominated SaaS bills that hurt small Indian teams at current exchange rates

### The Opportunity

The Indian SaaS market is growing at 25%+ CAGR. Teams are actively looking for Jira alternatives that are:
- Affordable in INR
- Less complex for smaller teams
- AI-native from day one
- Inclusive of communication, not just task tracking

Colabrix is positioned to capture this market at the intersection of project management, communication, and developer tooling.

---

## 2.5 Competitive Landscape

Understanding the competitive terrain is essential. Colabrix does not compete on any single dimension — it wins by being the only product that combines all of the dimensions Indian teams care about.

### Direct Competitor Analysis

| Competitor | Strengths | Weaknesses vs. Colabrix |
|---|---|---|
| **Jira (Atlassian)** | Industry standard, powerful, mature ecosystem | USD pricing (expensive for small Indian teams), over-complex for teams under 50 people, no built-in communication, no GitHub auto-bug creation |
| **Linear** | Beautiful UI, extremely fast, loved by developers | USD pricing, no communication layer, no GitHub auto-bug creation, no AI task creation, not built for Indian market |
| **Plane.so** | Indian company, open-source, free self-hosted tier | No built-in communication, no GitHub automation, basic AI, free tier requires self-hosting (ops burden), cloud version is paid |
| **Zoho Projects** | Indian company, INR pricing, established brand, good support | Dated and complex UX, no AI, no GitHub automation, communication layer is basic and disjointed |
| **Monday.com** | Visual boards, flexible for non-tech workflows | USD pricing, not developer-focused, no GitHub integration, not suited to engineering workflows |
| **Trello** | Simple, generous free tier, easy to learn | Too simple for engineering teams, no AI, no GitHub integration, USD pricing, not built for sprint management |

### Colabrix's Unique Position

Colabrix occupies a position no other tool holds today:

```
                    INR Pricing
                         |
                    COLABRIX
                   /    |    \
     Built-in    /      |     \  GitHub
     Comms ----/        |      \--- Auto-Bug
                    AI-Native
```

The positioning statement: **"The team operating system for Indian engineering teams — not a feature, not a Jira clone, not a Slack replacement. All three, in one product, priced in rupees."**

---

## 3. Target Market & User Personas

### Primary Market

- Indian technology startups (seed to Series B): 5–100 employees
- Indian SMB software companies: 20–200 employees
- Product and engineering teams within larger Indian organisations
- Freelance development studios managing multiple client projects

### Secondary Market

- Remote-first Indian tech companies with global presence
- SaaS product teams in Tier 2/3 Indian cities where international tool pricing is prohibitive

---

### User Personas

#### Persona 1 — Arjun, CTO / Engineering Lead (Org Admin)
- **Role:** Creates the organisation, manages teams, sets up projects
- **Pain:** Paying $20/user/month for Jira + Slack + Confluence for a 15-person team; frustrated by complex admin overhead
- **Goal:** One affordable platform, fast onboarding, reliable uptime, strong GitHub integration
- **Behaviour:** Needs high-level project health visibility, GitHub integration, billing control, org switcher (manages two companies)

#### Persona 2 — Priya, Project Manager
- **Role:** Creates epics, stories, tasks; runs sprints; tracks progress; schedules meetings
- **Pain:** Manual status updates, lost meeting notes, no connection between dev deploys and bug creation
- **Goal:** Automated workflows, AI assistance for task creation and meeting summaries, issue templates
- **Behaviour:** Uses Summary, List, and Timeline views daily; schedules meetings; reviews GitHub events; relies heavily on @mentions and comments

#### Persona 3 — Rahul, Software Developer
- **Role:** Works on assigned tasks, closes bugs, pushes code
- **Pain:** Unclear task requirements, bug reports with no context, too many tools to check
- **Goal:** Clear task descriptions with AI summaries; Kanban board that reflects actual work; keyboard shortcuts for speed
- **Behaviour:** Uses Kanban board and bug detail pages primarily; needs GitHub sync to see deployment status; uses `Cmd+K` search constantly

#### Persona 4 — Sneha, QA Engineer
- **Role:** Creates and tracks bug reports; validates fixes; documents test environments
- **Pain:** Bugs logged without reproduction steps; no severity tracking; developers closing bugs without proper validation
- **Goal:** Structured bug creation with all required fields; environment-specific tracking; issue templates for bug reports
- **Behaviour:** Uses List view filtered by Bug issue type; monitors severity and status transitions; uses @mentions to flag developers

#### Persona 5 — Karan, Client / External Stakeholder (Guest)
- **Role:** External client reviewing project progress; not a full team member
- **Pain:** Needs visibility into project status without being overwhelmed by internal tooling; doesn't want to pay for a seat
- **Goal:** See what's being built, track milestones, raise concerns when needed
- **Behaviour:** Logs in occasionally via guest invite link; view-only access to specific projects

#### Persona 6 — Vikram, Colabrix Super Admin (Platform Owner)
- **Role:** Manages the entire Colabrix SaaS platform
- **Pain:** No visibility into org health, subscription lapses, or platform abuse
- **Goal:** Full platform observability; subscription and billing management; support escalation
- **Behaviour:** Uses Super Admin panel exclusively; never touches org-level project data

---

## 4. Product Goals & Success Metrics

### Product Goals (Year 1)

| # | Goal |
|---|---|
| G1 | Achieve product-market fit with 500 paying organisations within 12 months of launch |
| G2 | Achieve a monthly active user (MAU) to registered user ratio of 65%+ |
| G3 | Reduce average onboarding-to-first-project time to under 10 minutes |
| G4 | Reach NPS score of 45+ within 6 months of GA |
| G5 | Zero critical security incidents in Year 1 |
| G6 | Free trial to paid conversion rate of 25%+ |

### Key Performance Indicators (KPIs)

#### Acquisition
- Monthly new organisation signups
- Conversion rate: free trial → paid subscription
- Organic vs. paid acquisition split

#### Activation
- Time from signup to first project created
- Time from project creation to first task created
- % orgs with GitHub integration connected within 30 days
- Onboarding checklist completion rate

#### Retention
- 30/60/90-day org retention rates
- Monthly churn rate per subscription tier
- Feature adoption rate (AI features, GitHub integration, Communication)

#### Revenue
- Monthly Recurring Revenue (MRR)
- Average Revenue Per Organisation (ARPO)
- Tier distribution (Spark / Momentum / Enterprise)

#### Engagement
- Daily Active Users / Monthly Active Users (DAU/MAU ratio)
- Average tasks created per active user per week
- AI feature usage rate (% of orgs using at least one AI feature)
- Global search usage rate (proxy for navigation efficiency)

### OKRs (Quarter 1 Post-Launch)

**Objective:** Establish Colabrix as a credible alternative to Jira for Indian SMB teams

| Key Result | Target |
|---|---|
| Onboard 100 paying organisations | 100 orgs |
| Achieve 70% week-2 retention for activated users | 70% |
| Collect 50 NPS responses with score ≥ 40 | Score 40+ |
| GitHub integration adopted by 40% of paying orgs | 40% |
| Free trial onboarding checklist completed by 60% of trial orgs | 60% |

---

## 5. Full User Journey

### High-Level State Machine

```
[Landing Page]
      |
      v
[Sign Up / Sign In]
      |
      |-- Email/Password --> [Email Verification Pending]
      |                              |
      |                              v
      |                      [Email Verified]
      |                              |
      |-- Google OAuth ------------>|
                                     |
                                     v
                          [Post-Auth Decision Point]
                         /                          \
               [Create Organisation]          [Join via Invite Link]
                        |                                |
                        v                                v
              [Org Setup Wizard]              [Org Joined — Dashboard]
                        |                       (Onboarding Checklist shown)
                        v
              [Org Created — FREE_TRIAL state]
                        |
                        v
              [Create First Project (free, trial mode)]
                        |
                        v
              [Onboarding Checklist Widget appears]
                        |
                        v
              [Full product access for 14 days]
                        |
              __________|__________
             /                     \
    [14-day trial expires]    [User wants 2nd project]
             \                     /
              v                   v
         [Subscription Prompt — tier selection]
                        |
                        v
              [Active Subscription — ACTIVE_SUBSCRIBED]
                        |
                        v
              [Project Dashboard]
                    /   |   \
                   /    |    \
           [Tasks] [GitHub] [Communication]
```

### Org Lifecycle States

| State | Description |
|---|---|
| `FREE_TRIAL` | Org created; 14-day trial active; 1 project, up to 5 members, full features |
| `TRIAL_EXPIRED` | 14-day trial ended; subscription prompt shown; org is read-only |
| `ACTIVE_SUBSCRIBED` | Paid subscription active; all tier features available |
| `GRACE_PERIOD` | Subscription payment failed or trial expired; read-only access for 3 days |
| `SUSPENDED` | Grace period expired or subscription cancelled; login allowed, no functional access, data preserved |
| `OWNERSHIP_PENDING` | Org Owner account deleted; 30-day window to assign new owner |

### Detailed Journey Steps

#### Step 1: Landing & Sign Up
- User arrives at colabrix.in
- CTA: "Start Free — No credit card required" or "Sign In"
- Sign up options: Email/Password or Continue with Google
- On email/password signup: verification email sent immediately
- Account enters `UNVERIFIED` state — no features accessible until verified

#### Step 2: Email Verification
- Verification link valid for 24 hours
- Resend option available after 60 seconds
- On click: account moves to `VERIFIED` state
- User is redirected to Post-Auth Decision screen

#### Step 3: Post-Auth Decision
- Screen shows two options:
  - "Create a new organisation" — for founders/admins
  - "I have an invite link" — for employees joining an existing org
- If user arrived via an invite link (URL param present), this step is auto-bypassed

#### Step 4A: Create Organisation
1. Enter organisation name
2. Upload organisation logo/avatar (optional at this step; can be done later)
3. Define initial roles (system provides defaults: Admin, Developer, QA, Designer)
4. Invite employees via email (optional; can be skipped — invite up to 4 more members during trial)
5. Org is created in **`FREE_TRIAL`** state — **no payment required**

#### Step 4B: Join via Invite Link
- Invite link encodes: org ID + role assignment + expiry token
- User clicks link → if already logged in, joins instantly
- If not logged in → prompted to sign up/sign in first, then auto-joins
- Invite links expire after 7 days (configurable by Org Admin)

#### Step 5: Free Trial — Create First Project
- Org Admin is taken directly to project creation after org setup
- No paywall encountered — the first project is created immediately in trial mode
- Trial mode banner shown at the top of the app: "You're on a free trial. X days remaining. Upgrade anytime."
- Full product access: all features are available during the trial (so teams experience full value)

#### Step 6: Onboarding Checklist (see Section 6.6)
- Checklist widget appears on the project dashboard after first project creation
- Guides the user through key activation milestones

#### Step 7: Subscription Trigger
Subscription prompt is shown when ANY of the following occur:
- The 14-day trial period expires
- The Org Admin attempts to create a 2nd project during the trial
- The Org Admin attempts to invite a 6th member during the trial
- The Org Admin clicks "Upgrade" in the trial banner at any time

**Subscription Flow:**
- Tier comparison table shown
- Price Calculator available
- Payment via Razorpay (UPI, Net Banking, Credit/Debit Card)
- On successful payment: org state → `ACTIVE_SUBSCRIBED`
- GST invoice generated and emailed automatically

#### Step 8: Day-to-Day Work Loop
```
[Project Dashboard]
      |
      |-- Create Epic --> Create Story --> Create Task/Bug
      |-- AI Task Creation (natural language → structured issues)
      |-- Assign Tasks --> Developer notified via @mention or direct assignment
      |-- Developer works --> Updates task status; adds comments
      |-- GitHub push/deploy --> Events appear in project feed
      |-- Deploy fails --> Bug auto-created --> PM notified
      |-- Meeting scheduled --> Chat room created
      |-- Meeting ends --> Notes AI summarises --> Tasks created
      |-- Sprint ends (Scrum) --> Velocity tracked --> Next sprint planned
      |-- Weekly digest email every Monday to PMs and Org Admins
```

---

## 6. Authentication & Onboarding

### 6.1 Authentication Methods

| Method | Flow |
|---|---|
| Email / Password | Standard signup → email verification → dashboard |
| Google OAuth 2.0 | One-click → if new user, goes to Post-Auth Decision; if existing, goes to dashboard |

### 6.2 Password & Security Policies

- Minimum password: 8 characters, 1 uppercase, 1 number, 1 special character
- Passwords stored as bcrypt hashes (min cost factor 12)
- JWT-based sessions with refresh token rotation
- Access token expiry: 15 minutes
- Refresh token expiry: 30 days (sliding window)
- Rate limiting on login: 5 failed attempts → 15-minute lockout

### 6.3 Forgot Password Flow

1. User clicks "Forgot Password" on login screen
2. Enters registered email
3. System sends a password reset link (valid for 1 hour, single-use)
4. User clicks link → enters new password
5. All active sessions invalidated on password reset (security best practice)

### 6.4 Email Verification

- Verification email sent within 30 seconds of signup
- Link format: `https://app.colabrix.in/verify?token=<signed-jwt>`
- Token signed with server secret; includes user ID and expiry
- Resend limit: 3 times per hour
- If link expires: user can request a new one from the login screen

### 6.5 Invite Link Mechanics

- Generated by Org Admin from Settings → Team → Invite Members
- Link encodes: `org_id`, `role_id`, `inviter_id`, `expires_at`, `hmac_signature`
- Single-use links (for direct invites) and multi-use links (for general team links) both supported
- Org Admin can revoke all outstanding invite links at any time
- During free trial: invite links are limited to 4 additional members (5 total including the Org Admin)

### 6.6 Onboarding Experience

After an organisation is created and the first project is set up, a collapsible **Onboarding Checklist** widget appears on the project dashboard. This widget guides new users through the key activation milestones.

#### Checklist Items

| # | Step | Action on Click |
|---|---|---|
| 1 | Create your first project | Opens project creation form |
| 2 | Invite a team member | Opens Settings → Invite Members |
| 3 | Create your first task | Opens issue creation form |
| 4 | Connect a GitHub repository | Opens GitHub integration setup |
| 5 | Schedule a meeting | Opens meeting scheduling form |
| 6 | Try AI task creation | Opens AI task creation modal |

#### Checklist Behaviour
- Progress shown as "X / 6 steps complete" with a visual progress bar
- Each item is checked off automatically when the user completes the action in the app
- Each item is clickable and navigates the user directly to the relevant feature
- The widget is collapsible (minimise to a small corner widget)
- The widget can be dismissed permanently only after all 6 steps are completed
- On completion of all 6 steps: brief celebration animation ("You're all set! Colabrix is ready for your team.") followed by auto-dismiss
- **Scope:** The checklist is shown to the Org Admin who created the org AND to each new member who joins — scoped to their own individual actions (e.g., a developer joining sees "Create your first task" as unchecked, even if the PM already created one)
- Checklist state is stored per-user, per-org

#### Multi-Org Onboarding
- When a user joins a second organisation (via invite or creation), a fresh onboarding checklist is generated for that org context
- Checklist progress is tracked independently per org

---

## 7. Roles & Permission Matrix

### 7.1 Role Hierarchy

```
Super Admin (Colabrix Platform)
    |
    └── Org Owner / Org Admin (per Organisation)
            |
            ├── Project Manager (per Project)
            ├── Developer (per Project)
            ├── QA (per Project)
            ├── Viewer (per Project)
            ├── Guest (project-scoped external access)
            └── Custom Roles (defined by Org Admin)
```

### 7.2 Role Definitions

| Role | Scope | Description |
|---|---|---|
| **Super Admin** | Platform | Colabrix internal team only. Manages all organisations, subscriptions, support tickets, platform settings. Cannot access org data (project tasks, messages). |
| **Org Owner** | Organisation | The user who created the organisation. Has all permissions within their org. Cannot be removed; ownership can be transferred. |
| **Org Admin** | Organisation | Assigned by Org Owner. Same permissions as Org Owner except cannot transfer ownership or delete the org. |
| **Project Manager** | Project | Can create/edit/delete projects, epics, stories, tasks, bugs. Can manage sprints. Can invite members to projects. Can create issue templates. |
| **Developer** | Project | Can create tasks and bugs. Can update status of assigned items. Cannot create epics or manage sprints. |
| **QA** | Project | Can create and manage bugs. Can update bug status. View-only on tasks not assigned to them. |
| **Viewer** | Project | Read-only access to all project data. Cannot create or edit anything. |
| **Guest** | Project (external) | External users invited by Org Admin. View-only access to specific projects they're invited to. Cannot access org settings, other projects, DMs, or Town Hall. |
| **Custom Role** | Organisation | Org Admin can create roles with a custom combination of the permissions listed below. |

### 7.3 Permission Matrix

| Permission | Super Admin | Org Owner | Org Admin | Project Manager | Developer | QA | Viewer | Guest |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Manage Colabrix platform | ✓ | — | — | — | — | — | — | — |
| View all organisations | ✓ | — | — | — | — | — | — | — |
| Create/delete organisation | — | ✓ | — | — | — | — | — | — |
| Manage org subscription | — | ✓ | ✓ | — | — | — | — | — |
| Invite/remove org members | — | ✓ | ✓ | ✓* | — | — | — | — |
| Invite Guest users | — | ✓ | ✓ | — | — | — | — | — |
| Create/manage roles | — | ✓ | ✓ | — | — | — | — | — |
| Create projects | — | ✓ | ✓ | ✓ | — | — | — | — |
| Archive/delete projects | — | ✓ | ✓ | ✓** | — | — | — | — |
| Manage project settings | — | ✓ | ✓ | ✓ | — | — | — | — |
| Create/manage issue templates | — | ✓ | ✓ | ✓ | — | — | — | — |
| Create Epics | — | ✓ | ✓ | ✓ | — | — | — | — |
| Create Stories/Tasks | — | ✓ | ✓ | ✓ | ✓ | — | — | — |
| Create Bugs | — | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| Assign tasks to others | — | ✓ | ✓ | ✓ | — | — | — | — |
| Update own task status | — | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| Add comments on issues | — | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| Manage sprints | — | ✓ | ✓ | ✓ | — | — | — | — |
| View all project data | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓*** |
| Connect GitHub repo | — | ✓ | ✓ | ✓ | — | — | — | — |
| Schedule meetings | — | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| Send direct messages | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — |
| Post in Town Hall | — | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| Post in Project Channels | — | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| Use AI features | — | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| View billing & invoices | — | ✓ | ✓ | — | — | — | — | — |

*Project Manager can invite to their specific project only, not to the entire organisation.
**Project Manager can archive their own project; only Org Admin/Owner can delete.
***Guest can only view projects they've been explicitly invited to.

### 7.4 Custom Role Builder

Org Admins can create custom roles by:
1. Navigating to Settings → Roles → Create Role
2. Entering a role name and description
3. Selecting a permission set from the available permissions list
4. Assigning the role to one or more members

Custom roles are scoped to the organisation. A user can hold multiple roles across different projects within the same org.

### 7.5 Guest Access

Org Admins can invite external users — clients, contractors, or external stakeholders — as **Guests**. This allows project visibility without the overhead of a full org membership.

#### Guest Invitation Flow
1. Org Admin navigates to Project Settings → Guests → Invite Guest
2. Enters the guest's email address
3. A project-scoped invite link is generated and emailed to the guest
4. Guest creates a Colabrix account (or signs in) and is given view-only access to that specific project

#### Guest Permissions & Constraints
- View-only access to the specific project(s) they've been invited to
- Cannot access org settings, other projects, DMs, or Town Hall
- Cannot create, edit, or delete issues
- Can view issue comments but cannot post comments
- Cannot use AI features
- Guests are **not counted toward the org's member limit**
- Guest limits by tier: Spark: up to 5 guests; Momentum: up to 20 guests; Enterprise: unlimited

#### Guest Use Cases
- Showing a client the progress of their contracted project
- External auditors reviewing a compliance-related project
- Contractors who need read access while onboarding

---

## 8. Organisations & Projects

### 8.1 Organisation Structure

```
Organisation
├── Settings (name, logo, billing, roles, integrations, storage)
├── Members (list of all org members with roles)
├── Guests (external view-only users per project)
├── Projects (1 to N based on subscription tier)
│   ├── Project A (Kanban)
│   │   ├── Epics → Stories → Tasks → Sub-tasks
│   │   ├── Bugs
│   │   ├── Comments & Attachments (per issue)
│   │   ├── GitHub Repo (linked)
│   │   └── Project Channels (#project-name, #backend, etc.) [Phase 2]
│   ├── Project B (Scrum)
│   └── [Archived Projects] (read-only, not counted toward limit)
├── Communication
│   ├── Town Hall (org-wide)
│   ├── Direct Messages (peer-to-peer)
│   └── Meeting Chat Rooms (time-bounded)
└── Integrations (GitHub, Google OAuth)
```

### 8.2 Multi-Organisation Support

A single Colabrix account (email address) can be a member of multiple organisations. This supports common real-world use cases:
- A freelancer working with 3 different client organisations
- An employee who consults part-time for a second company
- An Org Admin who manages a parent company and a subsidiary

**Org Switcher:**
- Located in the top-left corner of the application (similar to Slack's workspace switcher)
- Displays org name, logo, and unread notification count per org
- Switching orgs is instant; no re-authentication required
- Each org has a completely separate subscription, project set, and data silo

**Cross-Org Notifications:**
- A single notification centre consolidates notifications from all orgs the user belongs to
- Notifications are clearly labelled with the source org name
- Do Not Disturb settings can be configured per org

### 8.3 Organisation Settings

| Setting | Description |
|---|---|
| Name & Logo | Editable by Org Admin/Owner at any time |
| Timezone | Default timezone for meetings and date displays |
| Default Language | English (v1); regional languages roadmap item |
| Data Retention Policy | Determined by subscription tier |
| Invite Link Settings | Enable/disable, set expiry, revoke all |
| Webhook Endpoints | Managed through GitHub Integration section |
| Storage Usage | View current storage consumption vs. tier limit |
| Archived Projects | View and manage archived projects |
| Guest Management | View all guests, manage access, revoke invites |

### 8.4 Project Creation

**Required Fields:**
- Project Name (unique within the organisation)
- Project Type: Kanban, Scrum, or Hybrid
- Start Date
- Target End Date (optional but recommended)
- Project Description (optional)

**Optional at Creation:**
- GitHub Repository Link
- Default Assignee / Project Manager
- Project Avatar/Color

**Constraints:**
- During free trial: only 1 project can be created. Attempting to create a 2nd triggers the subscription prompt.
- After subscription: project creation is blocked only if the org has reached the project limit for their tier.
- Archived projects do NOT count toward the project limit.

### 8.5 Project Types

| Type | Description | Board Behaviour |
|---|---|---|
| **Kanban** (Flow) | Continuous flow workflow, no sprints | Kanban board with customisable columns, WIP limits |
| **Scrum** | Sprint-based; 1–4 week sprints | Scrum board, sprint backlog, burndown chart, velocity tracking |
| **Hybrid** | Kanban board with optional sprint planning cycles | Both board types available; sprints optional |

### 8.6 Project Archiving

When a project is completed, Org Admins and Project Managers can archive it rather than delete it.

#### Archiving Behaviour
- **Trigger:** Project Settings → Archive Project (requires confirmation dialog)
- **Notification:** All project members receive an in-app + email notification when a project is archived
- **Archived project state:**
  - Fully read-only — no new issues, comments, or status changes
  - Searchable via Global Search (user must explicitly include archived content in search scope)
  - Accessible at Org Settings → Archived Projects
  - Not counted toward the subscription's project limit
- **Unarchiving:** Org Admin can unarchive at any time from Org Settings → Archived Projects; upon unarchiving the project counts toward the project limit again; if the limit would be exceeded, the unarchive is blocked until within limits
- **Deletion:** Archived projects can be permanently deleted by Org Admin (requires separate confirmation; this action is irreversible)

---

## 9. Subscription & Pricing

### 9.1 Tier Overview

> Note on naming: The tiers are named to reflect the stage of the organisation using them.

| Feature | **Free Trial** | **Spark** (Starter) | **Momentum** (Growth) | **Enterprise** |
|---|:---:|:---:|:---:|:---:|
| **Duration** | 14 days | — | — | — |
| **Price (INR/month)** | Free | ₹2,499 | ₹5,999 | Custom |
| **Price (INR/year)** | — | ₹24,990 *(save 17%)* | ₹59,990 *(save 17%)* | Custom |
| **Projects** | 1 | 3 | 5 | Unlimited |
| **Team Members** | 5 | 30 | 50 | Unlimited |
| **Guest Users** | — | 5 | 20 | Unlimited |
| **Historical Data Retention** | Full (trial period) | 30 days | 90 days | Custom (1–5 years) |
| **AI Features** | Full (trial) | Basic | Full | Full + Custom Models |
| **GitHub Integrations** | 1 repo | 3 repos | 10 repos | Unlimited |
| **Custom Roles** | — | Up to 5 | Up to 20 | Unlimited |
| **Storage** | — | 5GB | 25GB | Custom (100GB+) |
| **Priority Support** | — | Email | Email + Chat | Dedicated CSM |
| **SLA Uptime Guarantee** | — | 99% | 99.5% | 99.9% |
| **GST Invoice** | — | ✓ | ✓ | ✓ |
| **SSO (SAML/OIDC)** | — | — | — | ✓ |
| **Custom Webhooks** | — | — | ✓ | ✓ |
| **Audit Logs** | — | 30 days | 90 days | Unlimited |
| **Weekly Email Digest** | — | ✓ | ✓ | ✓ |
| **Live Chat Support** | — | — | ✓ (Phase 2) | ✓ |

### 9.2 Free Trial Details

| Aspect | Detail |
|---|---|
| Duration | 14 calendar days from org creation |
| Credit Card Required | No — no payment information required to start |
| Projects Allowed | 1 |
| Members Allowed | Up to 5 (including the Org Admin) |
| Features Available | All features accessible (full value experience) |
| After Trial Ends | Subscription prompt; org enters `TRIAL_EXPIRED` state (read-only) |
| Grace Period | 3 days after trial expiry before org enters `SUSPENDED` |
| Trial Extension | Super Admin can extend on a case-by-case basis (for enterprise prospects) |

**Trial Notifications:**

| Trigger | Notification |
|---|---|
| Trial starts | Welcome email: "Your 14-day trial has started. Here's how to get the most out of it." |
| 7 days remaining | In-app banner + email: "7 days left in your free trial" |
| 3 days remaining | In-app banner (more prominent) + email: "3 days left — don't lose your work" |
| 1 day remaining | In-app banner (urgent) + email: "Your trial ends tomorrow" |
| Trial ended | In-app modal (blocking) + email: "Your trial has ended. Subscribe to continue." |
| Trial ended (grace day 3) | Email: "Your Colabrix trial ended 3 days ago — subscribe today or your data will be locked" |

### 9.3 Pricing Rationale (India Market Context)

- All prices are **GST-inclusive** (18% GST applied; GST-registered businesses receive compliant invoices for input tax credit)
- Pricing is benchmarked against ₹800–₹1,200/user/month for Jira; Colabrix offers significant savings for small teams
- Annual billing offers ~17% savings (equivalent to 2 free months)
- UPI, Net Banking, and Credit/Debit Cards accepted via Razorpay
- Spark tier data retention set at 30 days (not 15) — 30 days is the minimum for the data to feel genuinely useful; 15-day retention would cause early churn

### 9.4 Price Calculator Engine

The Price Calculator is a dynamic, interactive tool available on the Pricing page and within the app (for orgs considering upgrades).

**Inputs:**
- Number of team members (slider: 5–500)
- Number of projects (slider: 1–50)
- Data retention requirement (dropdown: 30 days / 90 days / 1 year / 2 years / 5 years)
- Billing cycle (monthly / annual)

**Outputs:**
- Recommended tier highlighted
- Price estimate shown
- Savings comparison vs. monthly billing
- "For your scale, Enterprise is recommended — contact us" message if inputs exceed Momentum tier

**Behaviour:**
- Calculator is purely front-end; no user data is captured unless the user explicitly proceeds to checkout
- For Enterprise estimates, a "Request a Quote" form appears pre-filled with calculator inputs
- The calculator updates in real-time as sliders/dropdowns change

### 9.5 Subscription Lifecycle & Edge Cases

| Scenario | Behaviour |
|---|---|
| Free trial active | Org in `FREE_TRIAL` state; 14-day countdown; trial banner shown |
| Trial ends, no payment | Org enters `TRIAL_EXPIRED`; then `GRACE_PERIOD` (3 days): read-only access |
| Grace period expires | Org enters `SUSPENDED`: login allowed, data preserved, no functional access |
| Subscription cancelled | Org enters `SUSPENDED` at end of billing period |
| Downgrade (Momentum → Spark) | Effective at next billing cycle; if current usage exceeds new limits, no new items can be created until within limits; existing data is not deleted |
| Upgrade | Effective immediately; prorated charge applied |
| Subscription lapses mid-sprint | Active sprints remain visible in read-only state; no new task creation until re-subscribed |
| Org Owner leaves | If no other Admin exists, Org enters a 30-day `OWNERSHIP_PENDING` state; Super Admin can intervene; otherwise org is suspended |
| Data retention limit reached | Data older than the tier's retention window is archived (not deleted) for 30 days then permanently deleted; email warning sent 7 days before deletion |

### 9.6 Payment & Billing

- **Payment Gateway:** Razorpay (supports UPI, NEFT, IMPS, all major credit/debit cards, EMI for eligible cards)
- **Invoicing:** Auto-generated PDF invoices with GST breakdown, GSTIN field for business customers
- **Failed Payment Handling:** Retry logic — 3 retries over 5 days; email notifications at each failure; org enters grace period after final failure
- **Refund Policy:** 7-day money-back guarantee for new subscriptions; pro-rated refunds at discretion for annual plans

---

## 10. Project Management Module

### 10.1 Issue Hierarchy

```
Epic
└── Story
    └── Task
        └── Sub-task

Bug (standalone, not nested under Epic by default; can be linked to a Story/Epic)
```

| Level | Purpose | Example |
|---|---|---|
| Epic | Large feature or initiative | "User Authentication System" |
| Story | A user-facing piece of an epic | "As a user, I can log in with Google" |
| Task | Concrete unit of work | "Implement Google OAuth callback endpoint" |
| Sub-task | Granular work item under a task | "Write unit tests for OAuth handler" |
| Bug | Defect report | "Login button unresponsive on Safari iOS" |

### 10.2 Issue Creation

#### Creating an Epic

| Field | Type | Required |
|---|---|---|
| Name | Text | Yes |
| Summary / Description | Rich text | No |
| Color | Color picker | No (default: system color) |
| Start Date | Date | No |
| Due Date | Date | No |
| Priority | Enum: Critical / High / Medium / Low | No (default: Medium) |
| Status | Enum: custom or default | No (default: To Do) |
| Labels | Multi-select tags | No |

#### Creating a Story / Task

| Field | Type | Required |
|---|---|---|
| Name | Text | Yes |
| Parent Epic | Select / Create new | No |
| Description | Rich text | No |
| Start Date | Date | No |
| End Date / Due Date | Date | No |
| Priority | Enum: Critical / High / Medium / Low | No |
| Status | Enum: custom statuses | No |
| Assignee | User select | No |
| Assigned By | Auto-filled (logged-in user) | Auto |
| Story Points | Number | No |
| Labels | Multi-select | No |
| Attachments | Files (images, docs, videos up to 50MB per file) | No |
| Dependencies | Link to blocking/blocked issues | No |

#### Creating a Bug

| Field | Type | Required |
|---|---|---|
| Title | Text | Yes |
| Description | Rich text | No |
| Severity | Enum: Critical / High / Medium / Low | Yes |
| Environment | Enum: Production / Staging / QA / Development | Yes |
| Steps to Reproduce | Structured list | Recommended |
| Expected Behaviour | Text | Recommended |
| Actual Behaviour | Text | Recommended |
| Assigned To | User select | No |
| Assigned By | Auto-filled | Auto |
| Linked Story/Epic | Reference | No |
| Labels | Multi-select | No |
| Attachments | Files (screenshots, logs, screen recordings) | No |
| Priority | Enum | No (default: High for bugs) |
| Status | Enum | No (default: Open) |

#### Creating a Sub-task

Sub-tasks share the same fields as Tasks but are nested under a parent Task. Sub-tasks cannot have their own sub-tasks (maximum nesting depth: 2 levels below Story).

### 10.3 Project Views

All views are accessible from the left-side navigation panel within a project. Views respect the active filter and sort state.

---

#### 10.3.1 Summary View

The Summary view is the default landing page when a user opens a project. It provides a bird's-eye view of project health.

**Panels displayed:**

| Panel | Description |
|---|---|
| My Open Tasks | Tasks assigned to the current user, ordered by due date |
| Near Deadline | Tasks/Bugs due within the next 5 days |
| Priority Breakdown | Donut chart: issues by priority (Critical / High / Medium / Low) |
| Status Breakdown | Bar chart: issues by status |
| Story Points Earned | Current user's completed story points this sprint/week |
| Upcoming Meetings | Next 3 scheduled meetings in this project's context |
| GitHub Events Feed | Last 5 GitHub events for linked repositories |
| Sprint Progress (Scrum/Hybrid only) | Burndown progress and sprint completion % |
| AI Project Health Score | AI-generated health indicator with brief explanation (see AI Features) |

---

#### 10.3.2 List View

A flat, tabular view of all issues in the project. Supports inline editing of key fields.

**Columns displayed:**

| Column | Notes |
|---|---|
| Issue Type icon | Epic / Story / Task / Bug / Sub-task |
| Issue ID | Auto-generated (e.g., PROJ-123) |
| Title | Clickable; opens issue detail drawer |
| Assignee | Avatar + name |
| Assigned By | Avatar + name |
| Due Date | Highlighted red if overdue |
| Status | Editable inline via dropdown |
| Priority | Colour-coded pill |
| Severity | Visible only for Bug type |
| Story Points | Editable inline |
| Labels | Tag chips |

**Grouping Options:** Group by Epic, Assignee, Status, Priority, Label
**Bulk Actions:** Bulk status change, bulk assign, bulk label, bulk delete (with confirmation)
**Keyboard Navigation:** Arrow keys navigate between issues in List view; Enter opens the selected issue detail.

---

#### 10.3.3 Kanban Board

Available when project type is **Kanban** or **Hybrid**.

**Board structure:**
- Columns represent statuses (e.g., To Do → In Progress → In Review → Done)
- Org/Project Admin can add, rename, reorder, and remove columns
- Drag-and-drop cards between columns
- Card displays: Issue ID, title, assignee avatar, priority chip, due date, story points
- WIP Limits: Each column can have an optional WIP limit; column header turns amber/red when limit is approached/exceeded
- Swimlanes: Board can be grouped by Assignee, Priority, or Label

**Card Quick Actions (right-click or hover):**
- Change assignee
- Change priority
- Set due date
- Open full detail
- Add to backlog

---

#### 10.3.4 Scrum Board

Available when project type is **Scrum** or **Hybrid**.

Same card behaviour as Kanban but scoped to the **active sprint**. Non-active sprint issues are in the Sprint Backlog.

**Sprint Management:**
- Create Sprint: enter sprint name, goal, start date, end date
- Start Sprint: moves items from sprint backlog to the active board
- Complete Sprint: marks sprint as done; incomplete items presented for move to backlog or next sprint
- Sprint history maintained for velocity tracking

**Sprint Metrics:**
| Metric | Description |
|---|---|
| Velocity | Story points completed per sprint (rolling average of last 3 sprints) |
| Burndown Chart | Ideal vs. actual remaining work over sprint duration |
| Sprint Capacity | Total story points planned vs. team's historical velocity |
| Completion Rate | % of sprint items completed by end date |

---

#### 10.3.5 Timeline View (Gantt)

A Gantt-style horizontal timeline showing issues plotted against time.

- X-axis: calendar dates (zoom: day / week / month / quarter)
- Y-axis: grouped by Epic → Story → Task
- Each bar represents an issue's start date to due date
- Bars are colour-coded by priority or status (user toggle)
- Drag bar edges to adjust dates inline
- Dependencies shown as connecting arrows between dependent issues
- Critical path highlighted optionally

---

#### 10.3.6 Calendar View

Month/week/day calendar showing all tasks and meetings in date context.

- Tasks appear on their due date
- Meetings appear as events with time and attendees
- Click a date cell to create a new task or schedule a meeting
- Colour coding: tasks by priority, meetings in a distinct colour
- Filter: show tasks only / meetings only / both

---

#### 10.3.7 Backlog View

A dedicated area for issues that have been created but not assigned a sprint (Scrum) or not placed on the active board (Kanban).

**Layout:**
- Left panel: Backlog list (all unplaced issues)
- Right panel: Active board / Sprint (drag target)
- Drag-and-drop from backlog to board/sprint

**Backlog columns:** same as List view
**Ordering:** Drag-to-reorder for prioritisation
**Quick-create:** Inline issue creation from backlog without opening a full form

---

### 10.4 Workflow Engine (Status Customisation)

Each project has a configurable workflow:

```json
{
  "project_id": "...",
  "type": "kanban",
  "statuses": [
    { "id": "todo", "label": "To Do", "color": "#94a3b8", "position": 1 },
    { "id": "in_progress", "label": "In Progress", "color": "#3b82f6", "position": 2 },
    { "id": "in_review", "label": "In Review", "color": "#f59e0b", "position": 3 },
    { "id": "done", "label": "Done", "color": "#22c55e", "position": 4 }
  ],
  "sprint_enabled": false,
  "wip_limits": { "in_progress": 5 }
}
```

Project Managers and Org Admins can add/remove/rename statuses and set WIP limits per column.

### 10.5 Filters & Sorting

Filters and sort can be applied simultaneously and saved as named **Views** (saved filter sets that persist per-user).

#### Filters

| Filter | Behaviour |
|---|---|
| Status | Multi-select; filters all issues by selected statuses |
| Assignee | Multi-select; filters by one or more assigned users |
| Priority | Multi-select: Critical / High / Medium / Low |
| Issue Type | Multi-select: Epic / Story / Task / Bug / Sub-task |
| Due Date Range | Date range picker; shows issues with due date within range |
| Labels | Multi-select; issues matching any selected label |
| Story Points | Greater than / Less than a specified value |
| Sprint | Filter to a specific sprint (Scrum projects only) |
| Epic | Filter to issues under a specific epic |

#### Sorting

| Sort Field | Order |
|---|---|
| Priority | Ascending / Descending |
| Due Date | Ascending / Descending |
| Created Date | Ascending / Descending |
| Story Points | Ascending / Descending |
| Status | Ascending / Descending (by workflow position) |

#### Saved Views
Users can save their current filter + sort combination as a named View (e.g., "My Critical Bugs", "Sprint 4 Tasks"). Views are per-user and per-project.

### 10.6 Dependencies

Issues can be linked to show dependency relationships:
- **Blocks / Is Blocked By**: Task A blocks Task B means A must be completed before B starts
- **Relates To**: Non-blocking reference link
- Dependencies are visualised on the Timeline view as connecting arrows
- Blocked issues display a visual indicator on all board views

### 10.7 Labels & Tags

- Labels are defined at the organisation level and available across all projects
- Default label suggestions: `frontend`, `backend`, `design`, `infra`, `v1.0`, `blocking`, `needs-review`
- Org Admins can create, rename, and delete labels
- Labels support colour assignment

### 10.8 Comments & Collaboration

Every issue — Epic, Story, Task, Bug, and Sub-task — has a persistent comments thread. Comments are a first-class feature that enables async collaboration directly within the context of the work item.

#### Comment Features

| Feature | Detail |
|---|---|
| Rich text | Full rich text editor: bold, italic, code blocks, bullet lists, numbered lists, inline code |
| File attachments | Attach images, documents, and videos up to 50MB per file (see Section 19.9 for supported formats) |
| Emoji reactions | React to any comment with any emoji; reactions aggregated and shown on the comment |
| @mentions | Type `@` followed by a name → dropdown of matching org members appears; selecting a user tags them and triggers a notification |
| Threaded replies | Reply directly to a specific comment (1 level deep — replies cannot be replied to); thread is collapsible |
| Comment editing | Authors can edit their own comment within 15 minutes of posting; edit history is preserved and accessible via "Edited" label |
| Comment deletion | Authors can delete their own comment at any time; PMs and Org Admins can also delete any comment; deleted comments show `[Comment deleted]` placeholder (the placeholder remains so thread context is not broken) |
| Timestamps | Posted time shown; hovering shows full datetime |

#### @Mentions System

@mentions are a formal feature across the entire platform, not just comments.

**Behaviour across surfaces:**

| Surface | @mention behaviour |
|---|---|
| Issue comments | Tag any org member; they receive in-app + email notification with deep link to the comment |
| Direct Messages | Tag any org member in the same DM conversation |
| Town Hall | Tag any org member; `@here` mentions all active members of the Town Hall; configurable by Admin |
| Project Channels (Phase 2) | Tag any project member; `@here` and `@channel` notify all channel members |
| Meeting agendas | Tag org members in meeting agenda text (generates notification) |

**@mention technical behaviour:**
- Trigger: type `@` → real-time dropdown search of org members by name or display name
- Dropdown shows: avatar, display name, job title
- Selecting a user inserts a mention token `@DisplayName` styled as a clickable mention chip
- Clicking a mention chip opens that user's profile card
- @here / @channel: restricted to Town Hall and Project Channels; configurable by Org Admin (can be disabled)

**Notifications from @mentions:**
- In-app notification: immediate, with context excerpt and deep link
- Email notification: sent within 5 minutes (configurable; can be disabled)
- If a user is mentioned multiple times in a short window, notifications are batched

#### Comment Activity Feed Integration

Every comment added to an issue appears in the Project Activity Feed as an event. The activity event includes:
- Who commented
- The beginning of the comment text (truncated to 100 chars)
- A deep link that opens the issue with the comment highlighted

### 10.9 Issue History & Audit Trail

Every issue maintains a complete, immutable change history. This provides accountability and context for anyone joining a project mid-stream or debugging a problem.

#### Events Logged

| Event Type | Details Captured |
|---|---|
| Created | Created by, timestamp, initial field values |
| Status change | From → To, changed by, timestamp |
| Assignee change | Previous assignee → new assignee, changed by, timestamp |
| Priority change | Previous priority → new priority, changed by, timestamp |
| Due date change | Previous date → new date, changed by, timestamp |
| Title change | Previous title → new title, changed by, timestamp |
| Labels added/removed | Which labels, changed by, timestamp |
| Attachment added | File name, added by, timestamp |
| Comment added | Comment ID reference, author, timestamp |
| Comment deleted | Deletion record (content redacted), deleted by, timestamp |
| Sprint assigned/removed | Sprint name, changed by, timestamp |
| Linked to another issue | Link type, target issue ID, changed by, timestamp |

#### Change History Display
- Accessible on every issue detail page as a collapsible **History** tab or sidebar section
- Displayed in reverse chronological order (most recent at top)
- Events are grouped by date
- Change history is **immutable** — no one (including Super Admins) can alter or delete history records
- Change history is subject to the org's data retention policy (same as issue data)

### 10.10 Issue Templates

Org Admins and Project Managers can create templates for common issue types. Templates reduce friction for recurring patterns and ensure consistency.

#### Creating a Template

Navigate to Org Settings → Issue Templates → Create Template.

**Template fields:**

| Field | Description |
|---|---|
| Template Name | Internal name (e.g., "Bug Report — Mobile") |
| Issue Type | The type this template applies to (Bug, Task, Story, etc.) |
| Title Prefix | Pre-fills the beginning of the issue title (e.g., "[BUG] ") |
| Description Structure | Pre-populated description with section headers and guidance text |
| Default Labels | Labels to apply automatically |
| Default Priority | Pre-set priority value |
| Default Assignee Role | Role (not specific user) to auto-assign; system picks the available member with that role |
| Default Severity | For Bug templates only |

#### Out-of-Box Default Templates

Colabrix ships with the following default templates, available immediately in every new org:

**Bug Report Template:**
```
Title prefix: [BUG]
Description:
## Severity
[Critical / High / Medium / Low]

## Environment
[Production / Staging / QA / Development]

## Steps to Reproduce
1.
2.
3.

## Expected Behaviour
[What should happen]

## Actual Behaviour
[What actually happened]

## Screenshots / Logs
[Attach here]
```
Default labels: `bug`
Default priority: High

---

**Feature Request Template:**
```
Title prefix: [FEATURE]
Description:
## User Story
As a [type of user], I want [goal] so that [reason].

## Acceptance Criteria
- [ ]
- [ ]
- [ ]

## Additional Context
[Any designs, references, or context]
```
Default labels: `feature-request`
Default priority: Medium

---

**Deployment Failure Template (auto-used by GitHub Auto-Bug Creation):**
```
Title prefix: [AUTO] Deployment Failed:
Description:
## Repository
{repo_name}

## Branch
{branch}

## Environment
{environment}

## Failure Details
Commit: {commit_sha}
Workflow: {workflow_name}
Error: {error_message}
GitHub Actions Run: {run_url}

## Timestamp
{timestamp}
```
Default labels: `auto-created`, `github`, `deployment-failure`
Default severity: Critical
Default priority: Critical

---

#### Template Usage Flow
1. User clicks "Create Issue"
2. Template selector appears at the top of the creation form (optional step)
3. "Blank" is always the default option; no template is required
4. Selecting a template pre-fills the form; user can edit any field before submitting
5. Templates are org-scoped (available in all projects within the org)

#### Template Management
- Templates available to Org Admins and PMs to create, edit, or delete
- Default templates (shipped by Colabrix) can be edited but not permanently deleted (they can be hidden per org)
- Template changes do not affect existing issues created from that template

### 10.11 Bulk Import

Project Managers and Org Admins can bulk-import issues via CSV to quickly populate a project.

#### CSV Import Flow
1. Navigate to Project → Settings → Import Issues
2. Download the template CSV (pre-headers, with field descriptions in a comment row)
3. Fill in the CSV with issue data
4. Upload the CSV
5. Field mapping screen: map CSV columns to Colabrix issue fields (auto-mapped for standard column names)
6. Import preview: first 10 rows shown for validation before confirming import
7. Confirm → issues are created in bulk
8. Import result summary: "X issues imported successfully; Y rows skipped (with reasons)"

#### CSV Fields Supported
- Title (required)
- Issue Type (Epic, Story, Task, Bug, Sub-task)
- Description (plain text or markdown)
- Priority
- Status
- Assignee (by email address)
- Labels (comma-separated)
- Due Date
- Story Points
- Parent Issue ID (for nesting Sub-tasks/Tasks)

#### Limits
- Max 500 rows per CSV import
- CSV file size: max 5MB

#### Jira XML/CSV Import (Phase 2)
- Support for importing a Jira XML export or Jira CSV export
- Colabrix maps Jira's issue types, statuses, and fields to Colabrix equivalents
- Attachment migration is not supported in initial import (attachments are too large for automated import)
- Epic links and parent/child relationships are preserved where mappable
- Available to Org Admins and PMs

### 10.12 Automation Rules (Phase 2 Scope, Design Now)

Simple if-this-then-that rules per project:

| Trigger | Condition | Action |
|---|---|---|
| Status changed | To "Done" | Auto-close subtasks |
| Status changed | To "Done", all subtasks done | Close parent task |
| Bug created | Severity = Critical | Notify Project Manager immediately |
| Sprint ended | Incomplete items exist | Move to next sprint or backlog (choice prompt) |
| Due date reached | Issue still "To Do" | Send overdue notification to assignee |
| GitHub deploy failed | Linked repo | Auto-create Bug (see GitHub Integration) |

---

## 11. GitHub Integration

### 11.1 Overview

Colabrix provides a GitHub integration that connects a GitHub repository to an organisation (and optionally to a specific project). Once connected, Colabrix receives real-time GitHub events via webhooks and surfaces them in the project dashboard.

**VCS Roadmap:** The webhook-based architecture is VCS-agnostic. GitLab and Bitbucket are planned for Phase 2 — adding them is a configuration change, not a re-architecture. The core event processing pipeline handles any webhook-based VCS system.

### 11.2 Setup Flow

```
[Org Settings → Integrations → GitHub]
         |
         v
[User enters GitHub repo URL]
         |
         v
[Colabrix generates unique Webhook URL + Secret]
         |
         v
[User copies URL + Secret → adds to GitHub repo → Settings → Webhooks → Add Webhook]
         |
         v
[GitHub sends test ping → Colabrix validates → Integration status: Active]
         |
         v
[User optionally links repo to a specific Project]
```

### 11.3 Webhook Configuration Details

Colabrix webhook endpoint: `https://hooks.colabrix.in/github/{org_id}/{integration_id}`

**Events subscribed to (recommended to select in GitHub):**
- `push` — Code pushes to branches
- `pull_request` — PR opened, closed, merged, review requested
- `deployment` — Deployment created
- `deployment_status` — Deployment status: success / failure / error / in_progress
- `create` / `delete` — Branch/tag creation and deletion
- `workflow_run` — GitHub Actions workflow status
- `issues` — GitHub Issues (if teams use both GitHub Issues and Colabrix)

**Security:** All incoming webhooks are validated using HMAC-SHA256 signature verification against the shared secret. Requests with invalid or missing signatures are rejected with HTTP 401.

### 11.4 Event Display

GitHub events are displayed in:
1. **Project Summary View** — GitHub Events panel showing last 10 events
2. **Project Activity Feed** — Full chronological event log
3. **Dedicated GitHub Tab** within the project — full filterable event history

**Event card shows:**
- Event type (icon)
- Repository name + branch
- Actor (GitHub username)
- Commit message or PR title
- Timestamp
- Status badge (success / failure / pending)
- Link to GitHub (opens in new tab)

### 11.5 Smart Automation: Auto-Bug Creation

This is a key differentiating feature of Colabrix.

**Trigger:** GitHub sends a `deployment_status` event with `state = failure` or `state = error`

**Colabrix Action:**
1. Identifies the project linked to the repository
2. Automatically creates a Bug using the **Deployment Failure Template** (see Section 10.10) with:
   - **Title:** `[Auto] Deployment Failed: {branch_name} on {environment}`
   - **Description:** Deployment failure details including commit SHA, workflow name, error message (from GitHub payload), timestamp
   - **Severity:** Critical (default; configurable per integration)
   - **Environment:** Mapped from GitHub deployment environment (`production` / `staging` / etc.)
   - **Steps to Reproduce:** Deployment logs URL (link to GitHub Actions run)
   - **Assigned To:** Project Manager (configurable — can be set to any org member)
   - **Assigned By:** `Colabrix Bot`
   - **Labels:** `auto-created`, `github`, `deployment-failure`
3. Sends a push notification and email to the assigned person
4. Posts a message in the project's linked Town Hall or designated Project Channel (if configured) [Phase 2 for Project Channels]

**Configuration options (per integration):**
- Enable/disable auto-bug creation
- Default assignee for auto-created bugs
- Default severity
- Filter: only trigger on specific environments (e.g., only `production` failures)

### 11.6 GitLab & Bitbucket (Phase 2)

- **GitLab:** The webhook URL and HMAC validation pattern is identical to GitHub. GitLab support requires mapping GitLab's event payload format to Colabrix's internal event schema. Estimated Phase 2 effort: 2–3 sprints.
- **Bitbucket:** Similar approach via Bitbucket webhooks. Bitbucket uses a different payload structure for deployment events; requires a dedicated parser.
- Both integrations will appear in Settings → Integrations → [GitHub / GitLab / Bitbucket]

### 11.7 GitHub Integration Limits by Tier

| Tier | GitHub Repos per Org |
|---|---|
| Free Trial | 1 |
| Spark | 3 |
| Momentum | 10 |
| Enterprise | Unlimited |

---

## 12. Communication Module

### 12.1 Overview

Colabrix includes a built-in communication layer with the following communication modes:
1. **Direct Messages (DM)** — 1-to-1 peer-to-peer chat (MVP)
2. **Town Hall** — Org-wide broadcast channel (MVP)
3. **Meeting Chat Rooms** — Time-bounded chat rooms tied to scheduled meetings (MVP)
4. **Project Channels** — Per-project topic channels like #backend, #frontend, #design (Phase 2)

### 12.2 Direct Messages (DM)

- Any two members within the same organisation can initiate a DM
- DM history is persistent (subject to data retention policy of the org's subscription tier)
- Supports: text messages, file attachments (images, PDFs, docs), emoji reactions, @mentions, message threading (reply in thread)
- Message status: Sent / Delivered / Read (read receipts)
- Typing indicators
- Search within DM conversations
- DMs are private — no admin can read them (privacy by design, except for legally mandated compliance scenarios)

### 12.3 Town Hall

- A single org-wide channel available to all members
- Purpose: company announcements, celebrations, broad updates
- Posting permissions: configurable by Org Admin (everyone / admins only / specific roles)
- Read access: all members
- Supports: text, images, file attachments, emoji reactions, @mentions, `@here` (notifies all active members; configurable by Admin), pinned messages
- Messages are searchable across the org (via Global Search)
- Org Admin can pin up to 10 messages permanently

### 12.4 Meeting Scheduling & Chat Rooms

#### Meeting Creation

Project Managers and above can schedule meetings within Colabrix:

| Field | Description |
|---|---|
| Meeting Title | Required |
| Date & Time | Required |
| Duration | Required (e.g., 30 min, 1 hour) |
| Attendees | Select from org members; @mention supported in agenda |
| Google Meet Link | Required — PM creates in Google Meet and pastes the URL |
| Agenda | Optional rich text field; supports @mentions |
| Project Link | Optionally associate meeting with a specific project |
| Recurrence | One-time / Daily / Weekly / Biweekly / Monthly |

#### Meeting Chat Room Lifecycle

Every scheduled meeting automatically gets a **dedicated chat room**:

```
Meeting scheduled
    |
    v
Chat room created (status: UPCOMING)
    |
    v
Meeting start time reached
    |
    v
Chat room becomes ACTIVE — all attendees can post
    |
    v
Meeting end time reached
    |
    v
Chat room remains ACTIVE for 24 hours post-meeting end
(Allows follow-up, action items, sharing notes)
    |
    v
24 hours after meeting end → Chat room ARCHIVED
(Read-only; no new messages; accessible in meeting history)
    |
    v
After data retention window → Chat room and messages DELETED
```

**Chat room features:**
- Participants: all meeting attendees (+ any additions by meeting organiser)
- Google Meet link pinned at the top of the chat room
- AI Meeting Notes appear as a system message when generated
- Action items created from meeting notes appear as linked tasks
- @mentions supported in all chat room messages

#### Meeting Notifications

| Trigger | Notification Type |
|---|---|
| Meeting created | Email + in-app push to all attendees |
| 24 hours before meeting | Email reminder to all attendees |
| 30 minutes before meeting | In-app push notification |
| Meeting chat room going live | In-app notification |
| Chat room archival warning (2 hours before) | In-app notification to attendees |

### 12.5 Project Channels (Phase 2)

Project Channels bring Slack-like topic channels into each project's communication context. This is explicitly **Phase 2** — DMs and Town Hall cover MVP communication needs adequately.

#### Default Channel
- Every project automatically receives a default channel named `#project-name` upon creation
- This channel is visible to all project members

#### Creating Additional Channels
- Org Admins and Project Managers can create additional channels within a project
- Example channels: `#backend`, `#frontend`, `#design`, `#general`, `#bugs`, `#releases`
- Channel name: lowercase, no spaces (use hyphens), max 80 characters

#### Channel Permissions & Configuration
- **Visibility:** All project members by default; can be restricted to specific roles
- **Posting:** All project members by default; Org Admin can restrict to specific roles
- **@mentions:** Full @mention support including `@here` and `@channel` (notify all channel members)

#### Channel Features
- Text messages, file attachments, emoji reactions, @mentions, pinned messages
- Message search within a channel
- Read receipts (optional; configurable per org)
- Typing indicators

#### Channel Archive
- Org Admins and PMs can archive inactive channels
- Archived channels: read-only; accessible in Project Settings → Archived Channels
- Archived channels can be unarchived
- Archived channels are searchable via Global Search

---

## 13. AI Features

### 13.1 AI Philosophy

AI in Colabrix is designed to be **assistive, not autonomous**. AI features are:
- Always invoked by the user (no silent background AI actions except the auto-bug creation which is a rule-based automation, not an AI feature)
- Transparent about what they are doing
- Dismissible — every AI-generated output can be discarded or edited before use
- Tier-gated — full AI access on Momentum and Enterprise; limited on Spark

### 13.2 Task / Bug Summary (Explain to Me)

**Where:** Issue detail page → "Explain This" button (visible to the assigned user and PM)

**What it does:**
- Takes the issue's title, description, steps to reproduce, expected/actual behaviour, linked epic/story, comments, and any attached GitHub event data
- Calls the AI API and generates a plain-language explanation of:
  - What the task/bug is about
  - Why it matters (business context from epic/story)
  - What the assigned person needs to do
  - Any relevant context (linked PR, failing deployment details)

**Output format:**
- A structured summary card displayed within the issue (collapsible)
- Option to dismiss / regenerate

**Access:** Available to all users assigned to or viewing the issue

---

### 13.3 AI Meeting Notes

**Where:** Meeting detail page → "Generate Notes" button (post-meeting)

**What it does:**
- Accepts: uploaded audio recording (MP4/M4A/WAV), or manually pasted transcript text
- AI processes the input and generates:
  - Meeting summary (3–5 bullet points)
  - Key decisions made
  - Action items (each with a suggested assignee if mentioned by name in the recording)
  - Open questions / parking lot items

**Output:**
- Displayed in the meeting's chat room as a system message
- PM can review and edit the generated notes
- Action items can be converted to Colabrix tasks with one click (pre-fills task creation form)

**Limitations:**
- Max audio file size: 250MB
- Supported formats: MP3, M4A, WAV, MP4
- Processing time: ~2–5 minutes for a 1-hour meeting
- Recording is processed and then discarded — not stored on Colabrix servers (privacy-first)

---

### 13.4 AI Task Creation (Natural Language to Tasks)

**Where:** Project → Any view → "Create with AI" button (visible to PM and above)

**How it works:**

1. PM types a natural language description:
   > "Build a user authentication system with email/password login, Google OAuth, and forgot password flow. Include email verification."

2. AI generates a structured breakdown:
   - 1 Epic
   - 3–5 Stories
   - 10–15 Tasks / Sub-tasks (with estimated story points)
   - Bug template for common failure scenarios

3. PM reviews the generated structure in a preview modal:
   - Can edit titles, remove items, change story points
   - Can accept the entire structure or cherry-pick

4. On confirm: all items are created in the project with appropriate hierarchy

**Access:** Project Manager and above

---

### 13.5 AI Sprint Planning Suggestions

**Where:** Sprint Planning screen (Scrum/Hybrid projects) → "AI Suggestions" button

**What it does:**
- Analyses: team's historical velocity, current backlog priorities, assignee workload, upcoming deadlines
- Suggests an optimal set of backlog items to include in the next sprint
- Provides:
  - Recommended sprint items with justification
  - Capacity warnings (e.g., "Rahul has 3 critical bugs already — consider reassigning")
  - Sprint goal suggestion based on selected items

---

### 13.6 AI Risk Detection

**Where:** Summary view → Risk Indicator panel

**What it does:**
- Continuously (daily refresh) analyses the project for risk signals:
  - Tasks overdue by > 2 days
  - Critical bugs unassigned > 24 hours
  - Sprint velocity declining trend
  - High number of blocked issues
  - Deployment failures in last 7 days
- Generates a **Risk Score** (Low / Medium / High / Critical) with explanation
- Surfaced as a non-intrusive badge on the Summary view

---

### 13.7 AI Smart Assignment

**Where:** Issue creation and edit form → Assignee field → "Suggest Assignee" button

**What it does:**
- Analyses: current assignee workload, historical task completion times per user, skill tags on user profile, task type, and labels
- Suggests the most appropriate assignee with a brief reason
- User can accept or override the suggestion

---

### 13.8 AI Activity Feed Summary

**Where:** Project Activity Feed → "Summarise" button

**What it does:**
- Takes the last 7/14/30 days of activity events in the project
- Generates a natural language summary: "This week, the team completed 12 tasks, 3 bugs were filed (2 resolved), and Sprint 4 is 60% complete. 2 critical items are overdue."
- Useful for PMs preparing status updates or stakeholder reports

---

### 13.9 AI Feature Access by Tier

| AI Feature | Free Trial | Spark | Momentum | Enterprise |
|---|:---:|:---:|:---:|:---:|
| Explain This (Task/Bug Summary) | ✓ | ✓ (10/month) | ✓ (Unlimited) | ✓ + Custom |
| AI Meeting Notes | ✓ | ✓ (5/month) | ✓ (Unlimited) | ✓ + Custom |
| AI Task Creation | ✓ | ✓ (5/month) | ✓ (Unlimited) | ✓ + Custom |
| Sprint Planning Suggestions | ✓ | — | ✓ | ✓ |
| Risk Detection | ✓ | — | ✓ | ✓ |
| Smart Assignment | ✓ | — | ✓ | ✓ |
| Activity Feed Summary | ✓ | ✓ (Monthly) | ✓ (Weekly) | ✓ (Daily) |

---

## 14. Notifications System

### 14.1 Notification Channels

| Channel | Description |
|---|---|
| In-App (Push) | Real-time bell icon notifications within the app |
| Email | Async notifications for important events |
| Browser Push | Optional browser-level push (requires permission grant) |

### 14.2 Notification Events

| Event | In-App | Email | Notes |
|---|:---:|:---:|---|
| Task assigned to you | ✓ | ✓ | Immediate |
| Task updated (you're assignee) | ✓ | ✗ | In-app only to reduce noise |
| Bug assigned to you | ✓ | ✓ | Immediate |
| Bug severity escalated | ✓ | ✓ | Immediate |
| @mention in comment | ✓ | ✓ | Immediate; batched if multiple within 5 min |
| @mention in DM or Town Hall | ✓ | ✓ (digest) | Digested if multiple in 1 hour |
| Comment on your issue | ✓ | ✓ (digest) | Digested if multiple in 1 hour |
| Issue due in 24 hours | ✓ | ✓ | Daily |
| Issue overdue | ✓ | ✓ | Daily until resolved |
| Sprint starting | ✓ | ✓ | 24 hours before |
| Sprint ending in 24 hours | ✓ | ✓ | 24 hours before |
| Sprint completed | ✓ | ✓ | |
| GitHub deploy failed (auto-bug) | ✓ | ✓ | Immediate to PM/assignee |
| Meeting created (you're attendee) | ✓ | ✓ | Immediate |
| Meeting reminder | ✓ | ✓ | 30 min before |
| DM received | ✓ | ✗ | In-app only |
| Subscription payment failed | ✓ | ✓ | Immediate to Org Admin |
| Subscription expiring in 7 days | ✓ | ✓ | To Org Admin |
| Trial ending (7 days, 3 days, 1 day) | ✓ | ✓ | To Org Admin |
| Trial ended | ✓ | ✓ | Immediate; blocking modal |
| New member joined org | ✓ | ✓ | To Org Admin |
| Invite link used | ✓ | ✓ | To Org Admin |
| Project archived | ✓ | ✓ | To all project members |
| Weekly project digest | — | ✓ | Every Monday; to PMs and Org Admins |

### 14.3 Weekly Project Digest

Every Monday morning, PMs and Org Admins receive a **Weekly Project Digest** email for each active project they manage or are members of.

**Digest contents:**
- Tasks completed last week (count + list of top 5)
- Bugs filed and resolved last week
- Sprint progress (% complete for active sprints)
- Upcoming deadlines this week (top 5 by urgency)
- GitHub deployment events summary (deployments succeeded / failed last week)
- A single "At Risk" item if the AI risk detector flagged anything (Momentum+ only)

**Format:** Beautifully formatted HTML email with project-coloured header, summary stats, and deep links back to the relevant sections in Colabrix.

**Configuration:**
- Users can opt out of the weekly digest per-project or globally from Settings → Notifications
- Org Admins can disable the weekly digest org-wide from Org Settings

### 14.4 Notification Preferences

Users can configure per-channel notification preferences from Settings → Notifications:
- Toggle any event type on/off per channel (in-app / email / browser push)
- Set a "Do Not Disturb" window (e.g., 10 PM – 8 AM IST)
- Choose between real-time and digest (hourly/daily) for email notifications
- Per-org notification settings (for users who belong to multiple orgs)

---

## 15. Activity Feed

### 15.1 Overview

Every project has a chronological Activity Feed showing all events that have occurred. The feed serves as an audit trail and context layer for the project.

### 15.2 Events Captured

- Issue created / updated / deleted
- Status changes
- Assignee changes
- Priority changes
- Comments added (with excerpt and deep link)
- Attachments added
- Sprint created / started / completed
- GitHub events (pushes, PRs, deployments)
- Auto-created bugs from GitHub
- Members added/removed from project
- Meeting scheduled / updated / completed
- Issue templates created/modified

### 15.3 Feed Features

- Filterable by event type, date range, and actor
- Searchable
- AI summary available (see AI Section 13.8)
- Each event deep-links to the relevant issue/meeting

---

## 16. Global Search

### 16.1 Overview

Global Search is a first-class, MVP-scope feature that allows users to find anything across their organisation instantly. It is designed as a **command palette**-style interaction — fast, keyboard-driven, and contextually aware.

### 16.2 Trigger Methods

| Method | Description |
|---|---|
| Keyboard shortcut | `Cmd+K` (macOS) or `Ctrl+K` (Windows/Linux) — opens from anywhere in the app |
| Search icon | Clicking the search icon in the top navigation bar opens the same search experience |

### 16.3 Search Scope & Content Types

Search is scoped to the user's organisation. Users only see results they have permission to view.

| Content Type | Fields Searched |
|---|---|
| Issues | Title, description, issue ID (e.g., CBX-123), comments |
| Projects | Project name, description |
| People / Members | Display name, email, job title |
| Meetings | Meeting title, agenda |
| Messages | DM content, Town Hall messages, Project Channel messages (Phase 2) |

### 16.4 Results Display

Results are grouped by content type and displayed in a clean, keyboard-navigable overlay:

```
Search results for "authentication"
────────────────────────────────────
Issues (3)
  CBX-045  [BUG] Authentication fails on Safari iOS        #auth-bug
  CBX-023  Implement Google OAuth callback                 Sprint 4
  CBX-011  User Authentication System [Epic]               In Progress

Projects (1)
  Auth Service Revamp                                      Active

People (1)
  Arjun Sharma (arjun@company.com) — Backend Developer

Meetings (1)
  Auth System Design Review — Apr 23, 2026 at 3:00 PM

Messages (2)
  [DM from Priya] "...the authentication service is..."
  [Town Hall] "Important: authentication downtime on..."
────────────────────────────────────
```

### 16.5 Filters Within Search

Users can narrow search results using inline filters:

| Filter | Options |
|---|---|
| Type | Issues / Projects / People / Meetings / Messages |
| Project | Filter results to a specific project |
| Date Range | Results created/updated within a date range |
| Assignee | Filter issues by assignee |
| Status | Filter issues by status |

### 16.6 Recent Searches

- The last 10 search queries are saved per user (stored in the user's browser session + synced to backend)
- Recent searches appear below the search input when the palette is opened with an empty query
- A user can clear their recent search history from their profile settings

### 16.7 Technical Implementation

| Aspect | Approach |
|---|---|
| MVP search engine | PostgreSQL full-text search (`tsvector` / `tsquery`); search vectors maintained with triggers on insert/update |
| Scale-out search | Elasticsearch (or OpenSearch) when org count exceeds 1,000 or search latency degrades |
| Indexing | Issues, projects, members indexed in real-time on create/update; messages indexed with a short delay (< 10 seconds) |
| Security | Search queries are scoped by the user's permission set at query time; row-level security in PostgreSQL ensures no data leakage |
| Performance | Search results returned in < 200ms (p95) for orgs with up to 10,000 issues; < 500ms for larger orgs |

---

## 17. User Profile & Account Settings

### 17.1 Overview

Every Colabrix user has a personal profile and a settings panel accessible from the top-right avatar menu. Settings are divided into clear categories.

### 17.2 Profile

| Setting | Description |
|---|---|
| Display Name | Name shown throughout the app; editable at any time |
| Avatar | Profile picture; upload image (PNG/JPG, max 2MB); or auto-generated initials avatar |
| Job Title | Optional; shown in member lists, @mention dropdown, and guest profile cards |
| Timezone | User's local timezone; used for meeting time display and DND windows |
| Bio | Optional short text (max 160 chars) |

### 17.3 Security

| Setting | Description |
|---|---|
| Change Password | Current password → new password (applies only if using email/password auth) |
| Linked Google Account | Shows connected Google account; option to unlink (only if a password is set) |
| Active Sessions | List of all active sessions: device type, browser, last seen, IP; option to revoke individual sessions or all sessions |
| Two-Factor Authentication | (Phase 2) TOTP-based 2FA via authenticator app |

### 17.4 Notification Preferences

Per-event, per-channel notification preferences:
- Toggle in-app / email / browser push for each event type
- Do Not Disturb window (time range + days of week)
- Per-org notification settings (for multi-org users)
- Weekly digest opt-out (global or per-project)

### 17.5 Appearance

| Setting | Description |
|---|---|
| Theme | Light / Dark / System (follows OS preference); applied immediately |
| Density | Comfortable (default) / Compact (denser information layout) |
| Language | English (v1); more languages in roadmap |

### 17.6 Integrations

- Shows connected third-party accounts (Google OAuth)
- Option to connect/disconnect accounts
- Connected account status and last-used date

### 17.7 Danger Zone

| Action | Behaviour |
|---|---|
| Deactivate Account | Account becomes inactive; user cannot log in; all assigned tasks become unassigned; messages remain with "[Deactivated User]" label; account can be reactivated by Org Admin or Super Admin |
| Delete Account | Permanent deletion; requires confirmation (type email address); all personal data deleted per DPDPA; messages replaced with "[Deleted User]"; tasks become unassigned; cannot be undone |

---

## 18. Super Admin Panel

### 18.1 Overview

The Super Admin Panel is a separate administrative interface accessible only to Colabrix team members with Super Admin role. It operates at the **platform level** — Super Admins can see and manage organisations, subscriptions, and platform health, but **cannot read or access org-level content** (tasks, messages, project data) unless explicitly requested for support purposes with audit logging.

### 18.2 Super Admin Capabilities

#### Organisation Management
- View all organisations: name, owner, creation date, status, subscription tier, trial status
- Search and filter orgs by status, tier, creation date, trial state, country
- View org member counts, project counts, storage usage
- Suspend, unsuspend, or delete an organisation (with confirmation + reason logging)
- Transfer org ownership (for edge cases: owner account deleted/compromised)
- Force-reset ownership to avoid `OWNERSHIP_PENDING` state
- Extend free trial period for specific orgs (for enterprise prospects or support gestures)

#### Subscription & Billing Management
- View all active, trial, lapsed, and cancelled subscriptions
- Manually extend subscription (for trial extensions, support gestures)
- Process refunds (initiates refund via Razorpay)
- View payment history and failed payment logs
- Apply discount codes / coupons
- Upgrade/downgrade org tier on behalf of org (requires Super Admin approval log)

#### User Management
- View all platform users
- Search users by email, name, org
- Suspend a specific user account (platform-wide)
- Force password reset for a user
- View login history and device sessions

#### Platform Health & Analytics
- Real-time dashboard: active users, new signups today, new orgs today, active subscriptions, active trials
- Trial conversion funnel: trial started → trial active → trial converted / trial expired
- Revenue metrics: MRR, ARR, growth rate, churn rate
- Feature adoption rates: which features are being used
- Error rate and system health status
- GitHub integration health: webhook success/failure rates
- Search performance metrics: query latency, index coverage

#### Support Tools
- View support ticket queue (via in-app bug reporting)
- Annotate user accounts with internal notes
- Access anonymised usage logs for debugging
- View and respond to support tickets submitted from the in-app Help Panel

#### Platform Configuration
- Manage feature flags (enable/disable features per tier or globally)
- Configure AI API usage limits and cost controls
- Manage email templates (verification, notifications, invoices, weekly digest)
- Manage announcement banners (e.g., "Scheduled maintenance on Sunday 2 AM–4 AM IST")
- Configure status page content (`status.colabrix.in`)

### 18.3 Super Admin Audit Log

Every action taken by a Super Admin is logged with:
- Timestamp
- Admin user ID
- Action type
- Target (org ID / user ID)
- Reason (required for sensitive actions)
- IP address

Audit logs are immutable and retained for minimum 2 years.

### 18.4 Support & Help Center Infrastructure

#### User-Facing Help (accessible to all users)
- **Help panel:** Triggered by clicking `?` icon in the bottom-left corner
- Help panel contains:
  - Searchable documentation
  - Getting started guides
  - Video tutorials (Phase 2)
  - Keyboard shortcuts reference
- **In-app bug reporting:** "Report a Bug" button within the help panel
  - Pre-fills: user email, current page URL, browser and OS info
  - User describes the issue; optional screenshot attachment
  - Submitted ticket goes to the Super Admin support queue
- **Support ticket submission:** Submit a support request directly from the help panel

#### Platform Status
- `status.colabrix.in` — public status page
- Shows: real-time platform uptime, active incidents, resolved incidents, scheduled maintenance windows
- Managed from Super Admin Panel → Status Page

#### Live Chat Support (Phase 2, Momentum+ tier)
- Implemented via Intercom or similar
- Available to Momentum and Enterprise subscribers
- Integrated within the in-app help panel

---

## 19. Non-Functional Requirements

### 19.1 Performance

| Metric | Target |
|---|---|
| Page load time (initial) | < 2 seconds on 4G |
| API response time (p95) | < 300ms for read operations |
| API response time (p95) | < 500ms for write operations |
| Kanban board render (100 cards) | < 1 second |
| Real-time message delivery | < 200ms (WebSocket) |
| GitHub webhook processing | < 5 seconds end-to-end |
| AI feature response time | < 10 seconds (task summary); < 5 minutes (meeting notes) |
| Global search response time | < 200ms (p95) for standard org sizes |

### 19.2 Scalability

- Backend: horizontally scalable microservices (or well-structured monolith for MVP) deployed on Kubernetes / managed container service
- Database: PostgreSQL with read replicas for heavy read workloads; Redis for caching and pub/sub (real-time messaging)
- Message queue: Kafka or RabbitMQ for async event processing (GitHub webhooks, AI jobs, notification dispatch)
- CDN: Static assets and file uploads served via CDN (CloudFront / Cloudflare)
- Search: PostgreSQL tsvector for MVP; migrate to Elasticsearch at scale
- Target scale: 10,000 concurrent users per region at launch; designed for 100,000+ concurrent

### 19.3 Availability & Reliability

| Tier | SLA Commitment |
|---|---|
| Spark | 99% uptime (~7.3 hours downtime/month) |
| Momentum | 99.5% uptime (~3.6 hours downtime/month) |
| Enterprise | 99.9% uptime (~43 minutes downtime/month) |

- Multi-availability-zone deployment
- Automated health checks and restart policies
- Graceful degradation: if AI service is down, AI buttons show "Service temporarily unavailable" — core PM features unaffected
- Automated daily database backups with 30-day retention of backups (independent of data retention policy)
- RTO (Recovery Time Objective): < 1 hour for major incidents
- RPO (Recovery Point Objective): < 15 minutes

### 19.4 Security

#### Authentication & Session Security
- All traffic over HTTPS/TLS 1.3
- HSTS headers enforced
- CSRF protection on all state-changing endpoints
- Content Security Policy (CSP) headers
- JWT tokens signed with RS256 (asymmetric)
- Session tokens stored in HttpOnly, Secure cookies (not localStorage)

#### Data Security
- Data at rest: AES-256 encryption for sensitive data fields
- Database encryption at rest
- File uploads scanned for malware before storage
- Secrets (API keys, webhook secrets) stored in a secrets manager (AWS Secrets Manager / HashiCorp Vault), never in code or environment variables in production

#### Application Security
- OWASP Top 10 mitigations implemented
- SQL injection prevention via parameterised queries / ORM
- Rate limiting on all public APIs
- Input validation and sanitisation on all user inputs
- Dependency vulnerability scanning in CI/CD pipeline (e.g., Snyk)
- Quarterly penetration testing by external firm

#### Infrastructure Security
- VPC isolation for database and internal services
- Principle of least privilege for all service IAM roles
- Web Application Firewall (WAF) in front of public endpoints
- DDoS protection (Cloudflare)

### 19.5 Privacy & Data Compliance

#### India-Specific Compliance
- **Digital Personal Data Protection Act, 2023 (DPDPA):** Colabrix will be compliant with India's DPDPA requirements:
  - Clear, specific consent obtained at signup
  - Privacy Notice in plain language at signup
  - Data Principal rights: right to access, correct, and erase personal data
  - Grievance Officer designated and contact information published
  - Data Fiduciary registration as required by DPDPA
- **Information Technology Act, 2000 & IT (Amendment) Act, 2008:** Compliance with Section 43A (reasonable security practices)
- **GST:** GST-compliant invoicing, GSTIN collection from business customers, GST TDS compliance where applicable

#### International (for future global expansion)
- Architecture designed to be GDPR-compatible (data residency, right to erasure, DPA agreement)

#### Data Handling Principles
- Data minimisation: only collect what is needed
- Purpose limitation: data used only for stated purposes
- Direct messages are encrypted in transit; Colabrix employees do not read DM content
- AI processing: uploaded audio/text for meeting notes is processed and immediately discarded — not stored
- Data deletion: on subscription cancellation and data retention window expiry, data is permanently deleted with a deletion certificate available on request

### 19.6 Accessibility

- WCAG 2.1 Level AA compliance target
- Keyboard navigable interface throughout (see Section 19.8 for keyboard shortcuts)
- Screen reader compatibility (ARIA labels on all interactive elements)
- Sufficient colour contrast ratios
- Support for browser text scaling up to 200%

### 19.7 Browser & Device Support

| Platform | Support |
|---|---|
| Chrome (latest 2 versions) | Full |
| Firefox (latest 2 versions) | Full |
| Safari (latest 2 versions) | Full |
| Edge (latest 2 versions) | Full |
| Mobile web (Chrome/Safari on iOS/Android) | Responsive; functional |
| Native mobile app | Phase 3 roadmap |

### 19.8 Keyboard Shortcuts

Keyboard shortcuts are a core part of the Colabrix developer experience. Power users and developers expect to navigate without reaching for the mouse.

#### Global Shortcuts (available from anywhere in the app)

| Shortcut | Action |
|---|---|
| `Cmd/Ctrl + K` | Open Global Search / Command Palette |
| `?` | Open Keyboard Shortcuts help overlay |
| `Escape` | Close active modal, drawer, or overlay |

#### Navigation Shortcuts (available when no input is focused)

| Shortcut | Action |
|---|---|
| `G then P` | Go to Projects list |
| `G then B` | Go to Backlog |
| `G then K` | Go to Kanban board |
| `G then L` | Go to List view |
| `G then T` | Go to Timeline view |
| `G then C` | Go to Calendar view |
| `G then S` | Go to Summary view |

#### Issue Actions (available when in project views, no input focused)

| Shortcut | Action |
|---|---|
| `C` | Create new issue (opens issue creation form) |
| `F` | Open filter panel |
| `↑ / ↓` Arrow keys | Navigate between issues in List view |
| `Enter` | Open selected issue in detail drawer |
| `Backspace` / `Delete` | Delete selected issue (with confirmation) |

#### Help Overlay
- Press `?` from anywhere to open a contextual keyboard shortcuts overlay
- The overlay shows all relevant shortcuts for the current view
- The overlay is dismissible with `Escape`

**Implementation Notes:**
- All shortcuts are disabled when the user's cursor is inside any text input or rich text editor (to avoid conflicts)
- Shortcuts that navigate (`G then P`, etc.) use a 1-second timeout for the second key; if the second key is not pressed, the `G` is discarded
- All shortcuts are documented in the Help Panel as well

### 19.9 File Storage & Attachments

#### Attachment Limits

| Aspect | Limit |
|---|---|
| Max file size per attachment | 50MB |
| Supported image formats | PNG, JPG, JPEG, GIF, WebP, SVG |
| Supported document formats | PDF, DOCX, XLSX, PPTX, TXT, CSV, Markdown |
| Supported code file formats | Any plain-text file (JS, TS, PY, GO, JAVA, etc.) |
| Supported video formats | MP4, MOV, WebM (up to 50MB) |
| Supported archive formats | ZIP, TAR.GZ |
| Max attachments per issue | 20 files |

#### Storage Quotas per Org

| Tier | Org Storage Quota |
|---|---|
| Free Trial | 500MB |
| Spark | 5GB total |
| Momentum | 25GB total |
| Enterprise | Custom (100GB+, negotiated) |

#### Storage Management
- Storage usage displayed in Org Settings → Storage (used / total with a visual bar)
- Org Admin receives email notification when storage is at 80% and 95% capacity
- Files attached to archived or deleted issues remain in storage until:
  - The Org Admin manually deletes them from the storage manager, OR
  - The data retention window expires (issues older than retention window are deleted along with their attachments)
- Storage overage: if org exceeds storage quota, file uploads are blocked until storage is freed; Org Admin is notified

### 19.10 Dark Mode

Dark mode is table stakes for developer tools in 2026. Colabrix provides:

| Aspect | Behaviour |
|---|---|
| System-aware | Automatically detects OS-level dark/light preference on first load |
| Manual toggle | User can override system preference from Settings → Appearance → Theme |
| Persistence | Theme preference stored per user account (syncs across devices) |
| Coverage | 100% of UI components — no "half-dark" states; all surfaces, modals, charts, and syntax highlighting designed for both themes from day one |
| Transition | Smooth transition animation when switching themes |

---

## 20. Tech & Integration Considerations

### 20.1 Recommended Tech Stack

This is a recommendation for the engineering team; final decisions are the CTO's prerogative.

| Layer | Recommended | Rationale |
|---|---|---|
| Frontend | React + TypeScript + Tailwind CSS | Industry standard; great ecosystem; Tailwind for fast UI iteration |
| State Management | Zustand or TanStack Query | Lightweight; TanStack Query excellent for server-state |
| Real-time | Socket.IO or native WebSockets | Chat and live board updates |
| Backend | Node.js (Express/Fastify) or Go | Node for speed of development; Go for performance at scale |
| Database | PostgreSQL (primary) + Redis | PostgreSQL for relational data; Redis for cache + pub/sub |
| Full-text Search | PostgreSQL tsvector (MVP) → Elasticsearch (scale) | tsvector adequate for <1,000 orgs; Elasticsearch for global search at scale |
| File Storage | AWS S3 / Cloudflare R2 | Cost-effective; global CDN |
| Job Queue | BullMQ (Node) / Temporal | For AI jobs, notification dispatch, webhook processing |
| AI | OpenAI GPT-4o API (primary) + Whisper (audio transcription) | Best-in-class; can swap models by feature |
| Deployment | AWS / Google Cloud (India region: Mumbai) | Data residency in India; low latency |
| CI/CD | GitHub Actions | Natural fit given GitHub integration |
| Monitoring | Datadog / Grafana + Prometheus | Observability |
| Error Tracking | Sentry | Standard |

### 20.2 External Integrations

#### Razorpay (Payment Gateway)

- Payment links for subscription purchase
- Recurring subscription via Razorpay Subscriptions API
- Webhook for payment success/failure events
- Razorpay Dashboard for refund processing
- GST-compliant invoice generation via Razorpay or custom invoice service

#### Google OAuth 2.0

- OAuth flow: `accounts.google.com/o/oauth2/auth`
- Scopes: `email`, `profile`
- User's Google identity linked to their Colabrix account
- Google Account can be unlinked from Settings → Security (password must be set first)

#### GitHub Webhooks

- Webhook endpoint secured with HMAC-SHA256
- Retry mechanism: if Colabrix returns non-200, GitHub retries up to 3 times
- Colabrix stores event processing idempotency keys to prevent duplicate bug creation on retries
- Webhook secret rotated every 90 days (with 7-day overlap for zero-downtime rotation)

#### Google Meet

- No API integration required — PM pastes a Google Meet URL into the meeting form
- Colabrix displays the URL in the meeting detail and meeting chat room
- Future (Phase 3): Google Calendar API integration to auto-create calendar events with Meet links

#### AI APIs (OpenAI / Anthropic)

- Primary: OpenAI API (`gpt-4o` for text tasks, `whisper-1` for audio transcription)
- Fallback: Anthropic Claude API (for resilience)
- API key stored in secrets manager; never exposed to client
- Rate limiting and cost controls per org per tier
- AI request/response logging for debugging and quality improvement (content anonymised after 30 days)

### 20.3 Infrastructure Architecture Overview

```
[Users] → [Cloudflare WAF + CDN]
              |
              v
[Load Balancer]
       |               |
       v               v
[API Servers]    [WebSocket Servers]
(Stateless,      (Real-time chat,
 horizontally     board updates,
 scalable)        search results)
       |
       v
[Message Queue (BullMQ/Kafka)]
       |         |         |
       v         v         v
[AI Workers] [Notif.   [Webhook
             Workers]   Processors]
       |
       v
[PostgreSQL (Primary + Replicas)]
[Redis (Cache + Pub/Sub)]
[S3/R2 (File Storage)]
[Elasticsearch (Search — Phase 2)]
```

---

## 21. Roadmap & Phasing

### Phase 1 — MVP (Months 1–4)

**Goal:** Core project management + authentication + free trial onboarding + subscription working end-to-end

- [ ] Authentication: Email/Password, Google OAuth, email verification, forgot password
- [ ] Org creation, invite flow, basic role management
- [ ] **Free trial flow: 14 days, no credit card, 1 project, 5 members, full features**
- [ ] Trial notifications: 7 days, 3 days, 1 day, expired
- [ ] Subscription: Spark + Momentum tiers, Razorpay integration, GST invoicing
- [ ] Project creation (Kanban and Scrum types)
- [ ] Issue creation: Epic, Story, Task, Bug (full fields)
- [ ] **Onboarding checklist widget (6-step guided tour)**
- [ ] **Issue comments: rich text, file attachments, emoji reactions, @mentions, threaded replies**
- [ ] **Issue history / audit trail (per-issue change log)**
- [ ] **@mentions in comments, DMs, Town Hall**
- [ ] Kanban board view
- [ ] List view (with keyboard navigation)
- [ ] Backlog view
- [ ] Basic Filters & Sort
- [ ] **Global Search (Cmd+K) — powered by PostgreSQL tsvector**
- [ ] In-app notifications (bell icon)
- [ ] Email notifications (critical events + trial lifecycle)
- [ ] GitHub integration (webhook setup + event display)
- [ ] Auto-bug creation on deployment failure (with Deployment Failure Template)
- [ ] Direct Messages (1-to-1 chat)
- [ ] Town Hall channel
- [ ] Meeting scheduling with Google Meet link
- [ ] Meeting chat rooms with lifecycle management
- [ ] **Dark mode (light/dark/system toggle)**
- [ ] **Keyboard shortcuts (Cmd+K, C, G+P, G+B, G+K, ?, Escape, arrow keys)**
- [ ] **User Profile & Settings (profile, appearance, security, notifications)**
- [ ] **Multi-org support (org switcher, consolidated notifications)**
- [ ] Super Admin panel (basic: org list, user list, subscription management, trial management)

### Phase 2 — Growth (Months 5–8)

**Goal:** AI features, advanced PM views, collaboration polish, and secondary integrations

- [ ] AI: Explain This (Task/Bug Summary)
- [ ] AI: Meeting Notes Generator
- [ ] AI: Natural Language Task Creation
- [ ] Scrum board + sprint management
- [ ] Timeline / Gantt view
- [ ] Calendar view
- [ ] Summary view with full panels
- [ ] Labels, Dependencies, Custom statuses
- [ ] Saved Views (filter presets)
- [ ] Swimlanes on Kanban board
- [ ] Price Calculator Engine on pricing page
- [ ] Browser push notifications
- [ ] Notification preferences settings
- [ ] Activity Feed with AI summary
- [ ] Mobile-responsive design polish
- [ ] Hybrid project type
- [ ] **Weekly email digest (HTML formatted)**
- [ ] **Issue templates (Bug Report, Feature Request, Deployment Failure — out-of-box)**
- [ ] **Bulk import (CSV import for issues)**
- [ ] **Jira XML/CSV import tool**
- [ ] **Guest access (project-scoped external users)**
- [ ] **Project archiving**
- [ ] **Project Channels (#project-name, custom topic channels)**
- [ ] **GitLab webhook integration**
- [ ] **Bitbucket webhook integration**
- [ ] **In-app Help Panel with bug reporting**
- [ ] **Status page (status.colabrix.in)**
- [ ] **Live chat support for Momentum+ (Intercom integration)**
- [ ] Org-level storage management UI

### Phase 3 — Scale (Months 9–14)

**Goal:** Enterprise readiness, advanced AI, native mobile

- [ ] Enterprise tier: SSO (SAML/OIDC), advanced audit logs, custom data retention
- [ ] AI: Sprint Planning Suggestions
- [ ] AI: Risk Detection
- [ ] AI: Smart Assignment
- [ ] Automation Rules Engine
- [ ] WIP limits enforcement on Kanban
- [ ] Velocity charts and burndown charts
- [ ] Custom issue types and custom fields
- [ ] Org-level analytics dashboard
- [ ] Google Calendar API integration (auto-create calendar events from meetings)
- [ ] Mobile app (React Native: iOS + Android)
- [ ] Public API + API documentation (for custom integrations)
- [ ] Webhooks for outbound events (custom integrations)
- [ ] Slack integration (notifications to Slack channels)
- [ ] Two-factor authentication (TOTP)
- [ ] Elasticsearch migration for Global Search at scale

### Phase 4 — Expansion (Month 15+)

**Goal:** Market expansion, community, ecosystem

- [ ] Public project boards (client view enhancement)
- [ ] Marketplace for integrations
- [ ] Multi-language support (Hindi, Telugu, Tamil, Kannada)
- [ ] Time tracking
- [ ] Resource scheduling / capacity planning
- [ ] Built-in documentation (wiki per project, Notion-like)
- [ ] Video calls (evaluate building vs. deeper Google Meet integration)
- [ ] Global expansion (Singapore, US)

---

## 22. Edge Cases & Business Rules

### Subscription & Org Edge Cases

| Scenario | Rule |
|---|---|
| Free trial: user tries to create 2nd project | Subscription prompt shown; trial continues with 1 project if user dismisses |
| Free trial: user tries to invite 6th member | Subscription prompt shown; trial continues with 5 members if user dismisses |
| Trial expires, no subscription | Org enters `TRIAL_EXPIRED`; then `GRACE_PERIOD` (3 days); then `SUSPENDED` |
| Org owner's account is deleted | Org enters OWNERSHIP_PENDING for 30 days; oldest Org Admin is auto-promoted; if no Admin exists, Super Admin is notified |
| Subscription lapses mid-sprint | Sprint becomes read-only; no new issues can be created; no status changes; re-subscribing restores full access immediately |
| Downgrade causes project count to exceed new limit | Existing projects are preserved but no new projects can be created until org is within new limits |
| Downgrade causes member count to exceed new limit | Existing members retain access; no new members can be added until within limits; Org Admin is notified |
| Data retention window reached | 7-day warning email → archive → 30-day archived (read-only) → permanent deletion; no partial deletions mid-sprint |
| Org deleted by Org Owner | 7-day cooling-off period; data preserved; cancellation can be reversed during cooling-off; after 7 days: permanent deletion |
| User leaves org (self-remove or removed by admin) | All tasks assigned to the user are marked "Unassigned"; their messages remain visible with a "[Deactivated User]" label; their account on Colabrix platform is preserved |
| Two users simultaneously edit the same issue | Optimistic UI; last-write-wins with a conflict warning shown to the user whose save failed |
| Invite link used by someone already in the org | System shows "You are already a member" message; no duplicate member record created |
| Storage quota reached | File uploads blocked; Org Admin notified; existing files unaffected |
| User is member of multiple orgs and one is suspended | Other org memberships and access are completely unaffected |

### GitHub Integration Edge Cases

| Scenario | Rule |
|---|---|
| Multiple deployment failures in quick succession (same repo) | Deduplication: if a bug was already auto-created for the same repo+branch+environment in the last 30 minutes, no duplicate is created; instead, the existing bug is updated with the latest event details |
| GitHub sends duplicate webhook event (retry) | Idempotency check via GitHub `X-GitHub-Delivery` header; duplicate events are silently discarded |
| GitHub integration disconnected while events are in flight | Events after disconnection are discarded; no partial processing |
| Webhook URL exposed/compromised | Org Admin can rotate the webhook secret from Settings → Integrations; 7-day overlap period before old secret expires |
| Linked project is deleted or archived | Auto-bug creation paused; Org Admin notified to re-link integration to another project |

### AI Edge Cases

| Scenario | Rule |
|---|---|
| AI API is unavailable | Graceful degradation: AI buttons disabled with "Service temporarily unavailable" message; all other features unaffected |
| AI generates harmful or inappropriate content | Content filtering applied on AI outputs; if filtered content is detected, a generic error is shown and the event is logged for review |
| Meeting audio is too long (>4 hours) | Warning shown; user can trim or split the recording before upload |
| AI task creation generates too many issues | Preview modal shown before any issues are created; user must confirm; max 50 issues per AI task creation session |

### Comment Edge Cases

| Scenario | Rule |
|---|---|
| User edits a comment after 15 minutes | Edit option is no longer available after the 15-minute edit window; the comment is locked |
| Deleted user's comments | Comments remain with "[Deleted User]" label; content preserved unless the user explicitly requested data deletion under DPDPA |
| @mention of a deactivated user | Mention is still rendered; notification is not sent (deactivated users don't receive notifications) |
| Issue is archived/deleted with comments | Comments are archived/deleted with the issue per the data retention policy |

### Search Edge Cases

| Scenario | Rule |
|---|---|
| User searches for content in a project they're no longer a member of | Results from that project are excluded in real-time; search respects current permission state |
| Guest user uses Global Search | Results limited to the specific project(s) the guest has been invited to |
| Search query returns >100 results | Results paginated; first 20 shown with "Load more" option |
| Search index is stale (async indexing lag) | Very recent items (< 30 seconds) may not appear; a "Results may not include very recent changes" notice shown when index freshness is > 15 seconds |

---

## 23. Open Questions & Assumptions

### Open Questions

| # | Question | Priority | Owner |
|---|---|---|---|
| OQ-1 | What is the exact GST treatment for B2C vs B2B subscriptions? Should the platform auto-detect and apply GST accordingly? | High | Legal / Finance |
| OQ-2 | Should Direct Messages be accessible to Org Admins for compliance/moderation purposes, or remain completely private? Privacy-by-design favours private DMs, but enterprise compliance teams may require moderation capability. | High | Legal / Product |
| OQ-3 | What is the exact price for Spark and Momentum tiers? The figures in this PRD (₹2,499 / ₹5,999) are estimates and need market validation. | High | Founder / Finance |
| OQ-5 | What AI model provider should be the primary (OpenAI, Anthropic, Google Gemini)? Are there data residency concerns with sending data to US-based AI APIs? India's DPDPA may require data localisation for certain data types. | High | Engineering / Legal |
| OQ-6 | For the Meeting Notes feature, should audio files be processed locally (on-premise AI) or sent to an external API? India's DPDPA has strict data transfer rules for sensitive personal data. | High | Legal / Engineering |
| OQ-7 | What is the planned data residency strategy — India-only hosting (AWS ap-south-1 Mumbai) or multi-region from day 1? | High | Engineering / Legal |
| OQ-8 | Should the GitHub webhook URL be per-organisation or per-project? Current design is per-organisation (repo can then be linked to a project). This is the recommended approach but needs engineering sign-off. | Medium | Engineering |
| OQ-9 | Should Town Hall support threaded replies (like Slack), or remain a flat broadcast channel? Flat is simpler for MVP; threads add significant UX complexity but match user expectations. | Medium | Product |
| OQ-10 | For Enterprise tier pricing, is there a minimum annual contract value or minimum team size? | Medium | Sales / Finance |
| OQ-11 | Should the mobile app be in Phase 3, or is mobile web responsive enough for Year 1? Data from comparable Indian SaaS products suggests mobile web covers 80% of mobile use cases for B2B tools. | Medium | Product / Engineering |
| OQ-13 | What is the rollout strategy for Project Channels (Phase 2)? Should they be opt-in per org or automatically created for all projects? | Low | Product |
| OQ-14 | Should Guest users be able to post comments on issues (currently view-only)? Some client workflows benefit from clients being able to request changes via comments. If enabled, this changes the Guest permission model. | Low | Product |
| OQ-15 | For the Weekly Email Digest, what days/times are most effective for Indian tech teams? Monday morning is the default assumption. | Low | Growth |

> **Resolved Open Questions (moved from OQ list):**
> - **OQ-4 (Free trial):** DECIDED — 14-day free trial, no credit card required. Trial includes 1 project, up to 5 members, all features. After trial: subscription prompt; org enters GRACE_PERIOD if no subscription. See Section 9.2.
> - **OQ-12 (Multi-org):** DECIDED — Yes, multi-org is supported. A single Colabrix account can be a member of multiple organisations. App shows org switcher in top-left. See Section 8.2.

### Assumptions

| # | Assumption |
|---|---|
| A-1 | Primary target users are technical teams (developers, PMs, QA) — non-technical team workflows (e.g., HR, Sales) are a future consideration |
| A-2 | Google Meet is the video conferencing tool of choice; no plan to build native video in the foreseeable future |
| A-3 | Razorpay is the payment gateway; PayU is the backup option |
| A-4 | English is the only supported language for MVP and Phase 2 |
| A-5 | Users will create their organisation before inviting team members; solo-user orgs (1 person) are a valid use case |
| A-6 | GitHub is the only VCS/CI-CD integration for MVP; GitLab and Bitbucket are Phase 2 roadmap items (webhook architecture is VCS-agnostic) |
| A-7 | All AI processing uses third-party APIs (OpenAI/Anthropic); no self-hosted AI models in Year 1 |
| A-8 | The data centre is in India (AWS ap-south-1 Mumbai) for data residency compliance |
| A-9 | The free trial does not require a credit card; conversion is driven by value, not credit card-on-file psychology |
| A-10 | The auto-bug creation from GitHub failures is considered a "rule-based automation", not "AI" — it does not require an AI API call |
| A-11 | Search indexing lag of < 30 seconds is acceptable for MVP; near-real-time indexing is a Phase 2 optimisation |
| A-12 | Guests are read-only in Phase 1; comment capability for guests is a future product decision (see OQ-14) |

---

## Appendix A: Glossary

| Term | Definition |
|---|---|
| Epic | A large body of work that can be broken down into stories and tasks |
| Story | A user-facing requirement or feature; child of an Epic |
| Task | A concrete unit of work; child of a Story |
| Sub-task | A granular work item; child of a Task |
| Bug | A defect report; can be standalone or linked to a Story |
| Sprint | A time-boxed period (1–4 weeks) in Scrum methodology |
| Backlog | Collection of issues not yet assigned to a sprint or board column |
| WIP Limit | Work-In-Progress limit on a Kanban column |
| Velocity | Team's average story points completed per sprint |
| Burndown Chart | Graph showing remaining work vs. time in a sprint |
| Story Points | Relative effort estimation units for issues |
| Org | Short for Organisation — the top-level entity in Colabrix |
| Org Switcher | UI element (top-left) allowing users to switch between multiple org memberships |
| Guest | An external user with view-only, project-scoped access; not counted in member limits |
| PRD | Product Requirements Document — this document |
| RBAC | Role-Based Access Control |
| DPDPA | Digital Personal Data Protection Act, 2023 (India) |
| SLA | Service Level Agreement |
| MRR | Monthly Recurring Revenue |
| ARPO | Average Revenue Per Organisation |
| GST | Goods and Services Tax (India) |
| GSTIN | GST Identification Number |
| UPI | Unified Payments Interface (India's real-time payment system) |
| HMAC | Hash-based Message Authentication Code |
| CSP | Content Security Policy |
| HSTS | HTTP Strict Transport Security |
| RTO | Recovery Time Objective |
| RPO | Recovery Point Objective |
| tsvector | PostgreSQL data type for full-text search indexing |
| Command Palette | A keyboard-triggered search/navigation overlay (Cmd+K) |
| @mention | Tagging an org member in a comment, message, or agenda by typing `@name` |
| Issue Template | A pre-configured issue form structure for recurring issue types |
| FREE_TRIAL | Org lifecycle state: 14-day trial, no payment required, 1 project, 5 members |
| GRACE_PERIOD | Org lifecycle state: subscription payment failed or trial expired; 3-day read-only window |
| SUSPENDED | Org lifecycle state: data preserved but no functional access |

---

## Appendix B: Issue ID Format

Issues are identified by: `{PROJECT_KEY}-{SEQUENTIAL_NUMBER}`

Example: `CBX-001`, `CBX-002`, `AUTH-045`

Project key is auto-generated from the first 2–4 letters of the project name (editable by PM during project creation).

---

## Appendix C: Data Retention Policy Summary

| Tier | Active Data | Warning Period | Grace Archive | Permanent Deletion |
|---|---|---|---|---|
| Free Trial | Full access (trial period only) | N/A | Enters GRACE_PERIOD after trial expiry | Data locked after 90 days of suspension |
| Spark | 30 days of historical activity | 7 days warning before deletion | 30-day read-only archive | Permanent delete after archive window |
| Momentum | 90 days of historical activity | 7 days warning before deletion | 30-day read-only archive | Permanent delete after archive window |
| Enterprise | Custom (1–5 years) | 7 days warning | Custom retention | Custom policy |
| Suspended Org | All data frozen (read-only) | — | — | Permanent delete after 90 days of suspension |

Note: "Historical data" refers to activity feed events, audit logs, and archived issues. Active project data (tasks, sprints, messages) is preserved as long as the subscription is active. File attachments associated with deleted or archived issues are subject to the same retention timeline.

---

## Appendix D: Org Lifecycle State Diagram

```
                    [User Signs Up]
                          |
                          v
                  [Org Created: FREE_TRIAL]
                     (14-day clock)
                    /              \
           [Upgrades]          [Trial Expires]
               |                     |
               v                     v
      [ACTIVE_SUBSCRIBED]    [TRIAL_EXPIRED / GRACE_PERIOD]
               |                     |
               |              (3 days read-only)
               |                     |
               |              [No subscription]
               |                     |
               v                     v
         [Payment fails] -----> [SUSPENDED]
                                     |
                               (90 days frozen)
                                     |
                                     v
                           [DATA PERMANENTLY DELETED]
```

---

*End of Document*

---

**Document Control**

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | April 2026 | Product Team | Initial draft |
| 1.0 | April 21, 2026 | Product Team | Stakeholder review version |
| 2.0 | April 21, 2026 | Product Team | Comprehensive rewrite: free trial flow, competitive landscape, global search, issue comments & @mentions, issue templates, issue history, onboarding checklist, project archiving, project channels (Phase 2), guest access, multi-org support, bulk import, weekly digest, user profile & settings, keyboard shortcuts, dark mode, file storage limits, GitLab/Bitbucket Phase 2, help center, executive summary rewrite, pricing updates (Spark 30-day retention), OQ-4 and OQ-12 resolved |

*This document is confidential and intended for internal use and authorised stakeholder distribution only. All product names, pricing, and feature specifications are subject to change prior to launch.*
