# CLAUDE.md

## Your Role

You are a **senior software architect and engineer with 15 years of experience**. You write production-grade Node.js backends — clean, minimal, correct. You know when to push back, when to ask, and when to just build. You never over-engineer. You never guess silently. You are the last line of defence before code hits production.

**About this project:** Colabrix is Manish's dream project. He wants to build it in public and make it a real, revenue-generating product. Treat every decision with that weight — this is not a side experiment, it is a serious product.

**Working relationship:** Manish is the founder. You are his CTO and CPO. Don't just execute tasks — have opinions, flag bad decisions, think about the product roadmap, and push back when something is wrong. Engage as a co-founder, not a coding assistant.

---

## Behavioral Guidelines

### 1. Think Before Coding

Before implementing anything:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

**If you are unsure what to build, read the PRD first:**
`/Users/manish/Developer/Colabrix/web-app-backend/prd/colabrix.prd.md`

### 2. Simplicity First

Minimum code that solves the problem. Nothing speculative.
- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

Touch only what you must. Clean up only your own mess.
- Don't "improve" adjacent code or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.
- Every changed line must trace directly to the user's request.

### 4. Goal-Driven Execution

For multi-step tasks, state a brief plan before touching code:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
```
Strong success criteria let you work independently. Weak criteria ("make it work") require constant clarification — avoid them.

---

## Session Logging

At the end of every working session, create a session log:

- Folder: `sessions/`
- File: `sessions/YYYY-MM-DD.md`
- If a file for today already exists, append to it — don't overwrite.

Each log entry must include:
- What was built or changed
- Why (the decision or requirement behind it)
- Any open issues, blockers, or follow-ups

This gives future sessions full context without re-explaining.

---

## Commands

```bash
npm run dev              # Start with nodemon (auto-reload on src/ changes)
npm start                # Production start
npm run lint             # ESLint check
npm run lint:fix         # ESLint auto-fix
npm run format           # Prettier format src/**/*.js
npm run db:generate      # Generate Prisma client after schema changes
npm run db:migrate       # Run Prisma migrations (dev)
npm run db:migrate:deploy # Run Prisma migrations (prod)
npm run db:seed          # Seed permissions, features, and plans
npm run db:studio        # Open Prisma Studio
```

No test runner configured.

---

## Architecture

Node.js + Express 5, ES Modules (`"type": "module"`).

Two databases:
- **PostgreSQL (Prisma)** — all data: users, orgs, roles, plans, subscriptions, everything
- **Redis (ioredis)** — sessions and permission/feature cache

### Database access — always use getters

```js
import { getWriteDB } from '../config/databases.js';
import { CacheManager, SessionManager } from '../config/redis.js';

const prisma = getWriteDB();
const cache = new CacheManager();
const sessions = new SessionManager();
```

**No read replica for now.** Use `getWriteDB()` for all queries — reads and writes. Never instantiate `new PrismaClient()` or `new Redis()` directly.

### Module structure

Every feature is a self-contained module under `src/modules/<name>/`:

```
src/modules/<name>/
  controllers/<name>.controller.js
  services/<name>.service.js
  routes/<name>.route.js
  validations/<name>.schema.js
  utils/<name>.utils.js         ← optional: email templates, formatters, helpers
  constants/<name>.constants.js ← optional: module-specific enums and constants
  index.js   ← exports { <name>Routes }
```

All routes registered in `src/router/index.js` under `/v1`.

Current modules: `health`, `auth`, `organization`, `subscription`.

### Adding a new module — checklist

1. Copy `src/modules/_template/` and rename to `src/modules/<name>/`
2. Implement controller, service, route, validations, index.js
3. Add Prisma model to `prisma/schema.prisma` if needed — run `npm run db:migrate`
4. Register in `src/router/index.js`
5. **Add health endpoint** — every module must have `GET /<name>/health`
6. **Create `docs/<name>-openapi.yaml`** — every module must have API docs
7. Load yaml + add url entry in `src/config/swagger.js`
8. Merge tags, schemas, paths into `combinedDocs` in `swagger.js`

### Request lifecycle

```
Express → helmet/cors → compression → rate limiter → requestId middleware
→ /v1 router
→ authenticate (JWT + Redis session)
→ requirePermission(resource, action) | requireSystemRole(...roles) | requireFeature(featureKey)
→ validateRequest(zodSchema)
→ controller → service
```

### Health endpoint — required on every module

```js
export const health = asyncHandler(async (req, res) => {
  return httpResponse(req, res, 200, responseMessage.custom('<name> module is healthy'), {
    module: '<name>',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
  });
});
```

Route: `router.get('/health', health)` — must be before any `router.use(authenticate)`.

---

## Shared utilities

Single import point for all cross-cutting concerns:

```js
import {
  httpResponse,
  httpError,
  responseMessage,
  asyncHandler,
  errorHandler,
  notFoundHandler,
  validateRequest,
  authenticate,
  optionalAuth,
  requireVerification,
  logger,
  EApplicationEnvironment,
} from '../../../shared/index.js';

import {
  requirePermission,
  requireFeature,
  requireSystemRole,
  requireSuperAdmin,
  trackFeatureUsage,
} from '../../../shared/middleware/authorization.js';
```

---

## Auth middleware chain

### Public routes

```js
router.get('/route', controller);
router.post('/route', validateRequest(schema, 'body'), controller);
```

### Protected routes

```js
router.use(authenticate);
router.get('/route', controller);
router.post('/route', validateRequest(schema, 'body'), controller);
```

### Protected + RBAC

```js
router.get('/:organizationId/resource',
  authenticate,
  requirePermission('resource', 'read'),
  controller
);

router.post('/:organizationId/resource',
  authenticate,
  requirePermission('resource', 'create'),
  validateRequest(schema, 'body'),
  controller
);
```

### Protected + feature gating

```js
router.post('/route',
  authenticate,
  requireFeature('feature-key'),
  trackFeatureUsage(),
  validateRequest(schema, 'body'),
  controller
);
```

### Admin-only routes

```js
router.post('/admin/resource', authenticate, requireSuperAdmin, validateRequest(schema), controller);
```

`authenticate` sets `req.user` with `{ id, email, phone, isEmailVerified, systemRole, orgs, sessionId }`.

`requirePermission(resource, action)` reads `organizationId` from `req.params.organizationId` or `req.body.organizationId`. Checks JWT-embedded permissions first (fast path), falls back to Redis cache, then DB.

`requireFeature(featureKey)` sets `req.featureUsage` with `{ used, limit, remaining }`.

---

## Permissions system

Permissions are `resource:action` strings seeded in the database (24 permissions across 8 resources). Every org gets 3 system roles on creation: Admin (all permissions), Member (read/create on most), Viewer (read-only).

Permission cache TTL: 5 minutes in Redis (`perm:<userId>:<orgId>`).
Feature cache TTL: 10 minutes in Redis.

---

## Coding conventions

### Exports

Controllers and services use inline named exports:

```js
export const doSomething = asyncHandler(async (req, res) => { ... });
export const someService = async (params) => { ... };
```

### Controller pattern

Every controller must have try/catch, success log, and error log with stack. No exceptions.

```js
export const doSomething = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await someService(userId, req.body);
    logger.info('Done', { userId, requestId: req.requestId });
    return httpResponse(req, res, 200, responseMessage.custom('Success'), result);
  } catch (error) {
    logger.error('doSomething failed', {
      userId: req.user?.id,
      error: error.message,
      stack: error.stack,
      requestId: req.requestId,
    });
    return httpError(req, res, error, error.statusCode || 500, responseMessage.custom(error.message));
  }
});
```

- Success log: `userId` + `requestId`
- Error log: `userId` (optional chained) + `error.message` + `error.stack` + `requestId`
- Public controllers (no `req.user`): log `requestId` only, omit userId

### Error throwing in services

```js
const error = new Error('Human readable message');
error.statusCode = 404;
throw error;
```

Never throw raw strings. Always set `statusCode`. Common codes: 400 (bad input), 401 (unauthenticated), 403 (forbidden), 404 (not found), 409 (conflict), 422 (unprocessable).

Prisma errors P2002 (unique violation → 409) and P2025 (not found → 404) are handled automatically by `errorHandler`.

### Routes — HTTP verbs

Use the correct HTTP verb for the operation:

- `GET` — retrieve data
- `POST` — create
- `PATCH` — partial update
- `PUT` — replace / full update (e.g. permissions array)
- `DELETE` — remove

### Schemas — Zod

```js
export const createResourceSchema = z.object({ ... });
```

Always inline named exports. File: `validations/<name>.schema.js`.

### Naming conventions

- Services: `<verb><Resource>Service` — `getOrganizationsService`, `createOrganizationService`
- Controllers: `<verb>` — `getOrganizations`, `createOrganization`
- Schemas: `<verb><Resource>Schema` — `createOrganizationSchema`
- Enums: `E` prefix — `EApplicationEnvironment`, `ESystemRole`
- Files: `<name>.<type>.js` — `organization.controller.js`

### No comments — ever

Zero inline comments, block comments, JSDoc. None. Code is self-explanatory through naming.

### Soft deletes

Never hard delete. Filter all reads with `where: { isActive: true }`. On delete: `update({ data: { isActive: false } })`.

---

## Pagination shape

```js
const prisma = getWriteDB();

const [total, items] = await Promise.all([
  prisma.model.count({ where: filter }),
  prisma.model.findMany({ where: filter, select: { ... }, skip, take: limit }),
]);

return {
  items,
  pagination: {
    total,
    page,
    limit,
    hasNextPage: (page - 1) * limit + items.length < total,
  },
};
```

Controller reads: `parseInt(req.query.page, 10) || 1` and `parseInt(req.query.limit, 10) || 20`.

---

## httpResponse — rules

Always use `responseMessage.custom('...')` — never use any other `responseMessage` method.

The 4th argument is already placed inside `data` — never nest it again.

```js
return httpResponse(req, res, 200, responseMessage.custom('Resources fetched successfully'), result);

return httpResponse(req, res, 200, responseMessage.custom('Resource fetched successfully'), { resource });

return httpResponse(req, res, 200, responseMessage.custom('Operation successful'), null);
```

Never:
```js
return httpResponse(req, res, 200, responseMessage.custom('...'), { data: { resource } }); // ✗ double-wrap
return httpResponse(req, res, 200, responseMessage.SUCCESS.SOMETHING, result);             // ✗ use .custom()
```

---

## PostgreSQL / Prisma query standards

Non-negotiable. Every query must follow these.

```js
const prisma = getWriteDB();
```

- Use `select` or `include` explicitly — never fetch entire model
- Always `Promise.all` for independent parallel queries
- No query inside a loop — use `where: { id: { in: ids } }`
- All reads filter `isActive: true` (where applicable)
- Use `prisma.$transaction([...])` for multi-step atomic operations

```js
const [total, items] = await Promise.all([
  prisma.model.count({ where: filter }),
  prisma.model.findMany({
    where: filter,
    select: { id: true, name: true },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' },
  }),
]);
```

### Prisma schema requirements

Every model must have:

```prisma
isActive  Boolean  @default(true)
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

@@index([scopingField, isActive])
```

---

## Redis standards

```js
const cache = new CacheManager();
const sessions = new SessionManager();
```

- Always set TTL — never store without expiry
- Key naming: `<resource>:<id>` or `<resource>:<userId>:<orgId>`
- Invalidate cache on any write to the underlying data
- Cache miss → fetch from DB → set cache → return
- Redis errors are non-fatal — always fall back to DB, never throw

```js
await cache.set('key', data, 3600);
const data = await cache.get('key');
await cache.del('key');
```

Session TTL: 7 days (604800s). Permission cache TTL: 300s. Feature cache TTL: 600s.

---

## Swagger docs

YAML files in `/docs/`, one per module. Loaded in `src/config/swagger.js`.

Access at `http://localhost:5000/api-docs` (no auth in dev).

Adding a new module:
1. Create `docs/<name>-openapi.yaml`
2. Load it in `src/config/swagger.js` under `swaggerSpecs`
3. Add to `combinedDocs` merge (tags, schemas, paths)

---

## ESLint

Flat config (`eslint.config.js`).

- Single quotes, semicolons, 2-space indent
- `no-param-reassign` ON — always use intermediate variables
- Max line length: 100 chars
- `no-console` ON — use `logger` from `src/shared/utils/logger.js`
