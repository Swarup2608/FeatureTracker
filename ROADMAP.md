# FeatureTrack Roadmap (Verified 2026-09-22)

## Snapshot
- **Type:** full-stack (Next.js frontend + Express API), monorepo under `apps/`, no root workspace.
- **Stack:** TypeScript strict. Client: Next 16.3, React 19, Tailwind 4, npm. Server: Express 5, Mongoose 9 (MongoDB), Redis (node-redis), Zod 4, bcryptjs, jsonwebtoken (installed, unused).
- **Layout:** 17 server source files (about 350 lines, one module: `auth/register`), about 60 client source files (27 pages, `globals.css` is 2569 lines). 0 test files. CI: one GitHub Actions workflow.
- **Purpose:** FeatureTrack, a product feature-analytics dashboard (events, features, adoption, API keys, webhooks). Per README it is at "Sprint 1 - Foundation".

## Verdict
- **Solid:** strict TypeScript on both apps (0 `any`, `tsc --noEmit` clean, client ESLint clean), clear route/controller/service/model layering, Zod at the register boundary, bcrypt cost 12, no high/critical dependency vulnerabilities (both apps), secrets not tracked.
- **Broken:** the only API route (`POST /api/v1/auth/register`) is mounted after the 404 handler, so it is unreachable. Even if reached, the email regex on the Mongoose models rejects every real email address.
- **Risky:** anyone can register as `ADMIN`; no login, no auth middleware, wildcard CORS, no rate limiting, no tests, and CI never fails on lint or tests.
- **The client is a mock:** 0 network calls; 17 of 27 pages read `lib/data.ts` / `lib/samples.ts`.
- **Production ready: NO.** Foundation, Correctness, Security and Data-integrity phases all fail. The project is a good UI prototype with a small, sound backend skeleton.

## Decision
**Fix in place.** The foundation is right: strict TS, modular layout, Zod, Mongoose models with indexes, a working `tsc` build, and a complete UI shell. The defects are small and local (route order, one regex, error-status field name, role handling). No wrong data model or untestable structure was found. What is missing is the backend surface (auth, features, events) and the tests, not a different architecture.

## Rules of engagement
- Layering stays `routes -> controller -> service -> model`. Controllers do not catch errors; they call `next(err)` or rely on Express 5 async propagation, and the single central handler formats every error.
- One error shape: `{ success, message, status, details? }`. `AppError` exposes one status field, used by the handler.
- Every route validates body, query and params with Zod via middleware that replaces `req.body` with the parsed value. Services do not re-parse.
- The server never trusts client-supplied `role`, `organization` ownership or IDs for authorization. Derive them from the verified token.
- Shared contract: one Zod schema package (or `packages/contract`) consumed by server and client. No duplicate enums.
- Testing bar: every new endpoint ships with integration tests (happy path, validation failure, auth failure). CI fails on lint, test and typecheck failure (no `continue-on-error`).
- Client talks to the API only through one typed client. No `fetch` in components.

## Phase 0 - Foundation and guardrails
Goal: CI that actually gates merges, and a correct error path.
- [~] 1. CI runs on PRs. Evidence: `.github/workflows/pr-validation.yml`. Missing: triggers on `main`/`develop` but the default branch is `master`; lint, test and audit steps use `continue-on-error: true`; the summary job has two `run:` keys (duplicate key, likely invalid YAML). High.
- [ ] 2. Server lint. `npm run lint` fails: `eslint: command not found`, no eslint dep or config in `apps/server`. High.
- [ ] 3. Server format check. `prettier` script exists, not installed, no config. Medium.
- [x] 4. Server typecheck and build. Evidence: `npx tsc --noEmit` and `tsc --outDir <scratch>` produced no errors.
- UNVERIFIED 5. Compiled server starts under Node. `package.json` has `"type": "module"` and `tsconfig` uses `moduleResolution: node` with extensionless relative imports (`./config/env`). Node ESM normally requires extensions, so `node dist/server.js` is likely to fail. Not run (probe skipped at user request). High.
- [x] 6. Client typecheck and lint. Evidence: `npx tsc --noEmit` and `npx eslint` clean in `apps/client`.
- UNVERIFIED 7. Client production build (`next build`). Not run; CI runs it.
- [~] 8. Env validation at startup. Evidence: `config/env.ts` (Zod). Missing: `ACCESS_TOKEN_*`, `REFRESH_TOKEN_*` from `.env.example` are not in the schema; `JWT_SECRET` is optional; the two `dotenv.config()` calls only work because of import order. Medium.
- [~] 9. Central error handler. Evidence: `app.ts:36-48`. Missing: it reads `err.status` but `AppError` sets `statusCode` (`utils/AppError.ts`), so every `AppError` thrown by middleware becomes a 500. Critical.
- [ ] 10. Route order. `app.ts:26-31` registers the 404 handler before `app.use('/api/v1/auth', ...)` at line 34, so no `/api/v1` route can be reached. Critical.
- [x] 11. `.env` handling. Evidence: `git ls-files` shows only `.env.example` files; `.env` is ignored in both apps.
- UNVERIFIED 12. README accuracy. Only headings and the `/api/health` path were checked; claims about sprint progress, setup steps and features were not compared with the code.
- [ ] 13. LICENSE (README has a License section, no file), CONTRIBUTING, CLAUDE.md. Low.
- [ ] 14. Dockerfile/compose for MongoDB and Redis, pre-commit hooks. None present. Medium.
- [ ] 15. Repo hygiene. Tracked: `.DS_Store`, `FeatureTrack.html` (664 KB), `REGISTRATION_ACCEPTANCE_CRITERIA_ANALYSIS.md` at the root. Low.
- UNVERIFIED 70. CI matrix includes Node 18.x, but Next 16 requires Node 20 or newer. The 18.x client build will likely fail. Not run. (new)

**Acceptance:** a PR with a lint error, a failing test, or a type error turns CI red; `GET /api/v1/auth/register` (wrong method) returns 404/405 from the router and a valid POST reaches the controller; an `AppError(409)` returns 409.

## Phase 1 - Shared contract and tests
Goal: one source of truth for shapes, and tests that pin behavior.
- [ ] 16. Shared contract between client and server. No shared package; client has its own hand-written mock types. High.
- [~] 17. Boundary validation. Evidence: `Auth.validator.ts` (`.strict()`, length limits, password rules). Missing: middleware validates only `req.body`, discards the parsed value, and there is no query/params validation. Medium.
- [x] 18. Layering. Evidence: `Auth.routes.ts -> Auth.controller.ts -> Auth.service.ts -> User.model.ts`, no business logic in routes.
- [~] 19. Error handling consistency. Controller has its own try/catch and responds `{ error }` while the central handler responds `{ message }`; the validator's non-Zod branch has a third shape. Medium.
- [x] 20. Type safety. Evidence: `strict` and `noImplicitAny` on; grep for `: any` / `as any` returns 0 in server and client.
- [ ] 21. Email regex in `User.model.ts:24` and `Organization.model.ts:46` is `/^[^\s@]+\.[^\s@]+$/`. It forbids `@`, so it cannot match any real email and Mongoose validation will fail on every save. Verified by reading the regex; not exercised at runtime. Critical.
- [ ] 22. Tests. 0 test files; `npm test` in the server is `echo ... && exit 1`; client has no test script. High.
- [ ] 23. Coverage on critical paths (register, later login/token) and a CI threshold. High.
- [ ] 24. Organization endpoints. `register` accepts an `organization` ID, but no route creates organizations. Medium.
- [~] 25. Duplicate definitions. Role list is defined in `User.model.ts` (`USER_ROLES`) and again in `Auth.validator.ts` (`z.enum`). Low.
- [ ] 69. `validateRequest.ts:11` concatenates an object into a string (`"... " + fieldErrors`), yielding `[object Object]`; error detail is lost. (new) Medium.

**Acceptance:** `packages/contract` (or equivalent) imported by both apps; `npm test` runs integration tests for register (201, 400, 409, 404 org) against an in-memory or containerised MongoDB; coverage threshold enforced in CI.

## Phase 2 - Security and identity
Goal: nobody can act as someone they are not.
- [ ] 26. Role self-assignment. `Auth.validator.ts:7` accepts `role: ADMIN | ORGANIZATION_ADMIN` from an unauthenticated body; the service only blocks ADMIN when an organization is given. Anyone can register as a platform admin. Critical.
- [ ] 27. Login, refresh, logout, token rotation and revocation. Only `/register` exists. `jsonwebtoken` and `cookie-parser` are installed; grep for `jsonwebtoken` / `ACCESS_TOKEN` in `src` returns 0. Decide token storage (httpOnly, SameSite cookie) and add CSRF handling. High.
- [ ] 28. Email verification and password reset. `isVerified` is set false and never changed; client has `forgot-password` and `reset-password` pages with no backend. High.
- [ ] 29. Authorization middleware and ownership checks. grep for `authorization|requireAuth|verifyToken` returns 0. High.
- [ ] 30. CORS. `app.ts:19` is `cors()` (any origin). Use an env-driven allowlist. High.
- [ ] 31. Security headers (`helmet`), rate limiting (no `helmet`/`rate-limit` dependency), explicit body size limit. High.
- [x] 32. Password storage. bcrypt cost 12 (`Auth.service.ts:22`), `select: false` on the password field.
- [x] 33. Injection on the register path. Email and organization ID pass Zod (string, 24-hex regex) before `findOne`/`findById`; schema is `.strict()`.
- [x] 34. Dependency vulnerabilities. `npm audit --audit-level=high`: 0 vulnerabilities in server and client.
- [~] 35. Scanning in CI. `npm audit` runs but is non-blocking; no Dependabot, CodeQL or Semgrep. Medium.
- [~] 36. Secrets. No `.env` tracked. Missing: a key-pattern scan of history (gitleaks or similar) was not run. Medium.
- [ ] 37. Register returns 409 for an existing email, allowing account enumeration. Low.
- UNVERIFIED 38. Two `innerHTML`/`dangerouslySetInnerHTML` uses in `apps/client/src`. Not reviewed for what data reaches them.
- [ ] 39. Dashboard route protection. No `middleware.ts`/`proxy.ts` in `apps/client`; every `/dashboard/*` page is public. High.

**Acceptance:** role is never read from the body; login issues short-lived access and rotating refresh tokens; a protected route returns 401/403 without a valid token; CORS, helmet and rate limits are on and covered by tests; CI blocks on audit and CodeQL.

## Phase 3 - Data integrity and critical flows
Goal: no duplicate or inconsistent records. There is no money, payment or workflow status yet.
- N/A 40. Money handling. No money flows (`organizationRevenue` is descriptive profile data).
- N/A 41. State machines. No status workflows yet; revisit when events/webhooks land.
- [~] 42. Atomic uniqueness. `email` has `unique: true`, but the check-then-save in `Auth.service.ts:9-28` races; the resulting duplicate-key error (E11000) is not mapped to 409, so it returns 500. Medium.
- [x] 43. Indexes. `User.model.ts:33-35` (organization, role, createdAt) plus unique email.
- [ ] 44. Backup and restore story for MongoDB. Low.

**Acceptance:** concurrent registrations of the same email yield one 201 and one 409.

## Phase 4 - Client foundation
Goal: the UI runs on real data.
- [ ] 45. Typed API client. `fetch|axios` count in `apps/client/src` is 0. High.
- [ ] 46. Data fetching and caching approach (server components, or SWR/TanStack Query). High.
- [ ] 47. Auth forms wired to the API (`login`, `register`, `forgot-password`, `reset-password` pages exist as UI only). High.
- [ ] 48. Replace mock data. 17 of 27 pages import `lib/data.ts` or `lib/samples.ts`. Medium.
- [~] 49. Design system. `components/ui/*` and `components/charts/*` exist, but styling is one 2569-line `globals.css` plus a separate `marketing.css`. Low.
- [ ] 50. Env var name. `apps/client/.env.example` uses `PUBLIC_NEXT_SERVER_URL`; Next exposes only `NEXT_PUBLIC_*` to the browser, so the value will be undefined client-side. Medium.

**Acceptance:** zero mock imports in `app/dashboard`; one client module owns all HTTP; loading, empty and error states exist for each data view.

## Phase 5 - Client polish
Goal: accessible, resilient, fast.
- [ ] 51. Error, loading and not-found boundaries: 0 `error.tsx`, `loading.tsx` or `not-found.tsx` files. Medium.
- UNVERIFIED 52. Accessibility (labels, focus, contrast, keyboard). No audit run.
- UNVERIFIED 53. Performance (bundle size, code splitting, images). `next/image` and `<img>` are both unused; canvas hero and chart components not profiled.
- [~] 54. Theme support. `ThemeToggle.tsx` and `AccentPicker.tsx` exist. Missing: visual and responsive verification.
- [ ] 55. Split `globals.css` (2569 lines) into component-scoped styles. Low.
- UNVERIFIED 56. SEO metadata and social tags on marketing pages.

**Acceptance:** axe and Lighthouse pass thresholds you set (for example 90+ accessibility); a failed request shows an error state, not a blank page.

## Phase 6 - Operations and reliability
Goal: you can see it and it survives restarts.
- [~] 57. Health. `GET /api/health` exists (`app.ts:23`) but is static; no DB/Redis readiness. Medium.
- [ ] 58. Structured logging with request IDs. Only `console.*`. Medium.
- [ ] 59. Graceful shutdown (`SIGTERM`, close server, Mongo, Redis). None in `server.ts`. Medium.
- [ ] 60. Redis is connected at startup (`config/redis.ts`) but nothing reads or writes it. Use it for rate limiting and token revocation, or remove the requirement. Medium.
- [ ] 61. Error tracking and metrics. Low.
- [ ] 62. Deployment: no Dockerfile, no CD, no staging or rollback path. Medium.
- [ ] 63. Background jobs / email delivery for verification and reset. Medium.

**Acceptance:** one command starts app, Mongo and Redis locally; readiness fails when a dependency is down; SIGTERM drains cleanly.

## Phase 7 - Proof and presentation
Goal: evidence you can show.
- [ ] 64. End-to-end test for the golden path (register, login, view dashboard). High.
- [ ] 65. API docs (OpenAPI generated from the Zod schemas). Medium.
- [~] 66. Architecture doc. README has an Architecture section; missing: diagram in `docs/` (folder is empty), known limitations, ADRs. Low.
- [ ] 67. Load test, Lighthouse and axe results recorded. Low.
- [ ] 68. Demo link, changelog, and resume bullets with numbers. Low.

**Acceptance:** README links to a live demo, OpenAPI docs and a recorded e2e/Lighthouse run.

## Phase 8 - Differentiators (the 8/10 to 10/10 gap)
Goal: turn a well-built learning project into one that shows real scale, real usage and measured results. Do this after Phases 0 to 2 and 7 are done. Evidence for these items is a number or a link, not a checkbox.
- [ ] 71. Event ingestion endpoint. `POST /api/v1/events` (single and batch) authenticated by per-project API key, Zod-validated, with idempotency keys so retries never double-count. Not present: the server has only `/register`.
- [ ] 72. Redis-backed rate limits and quotas per API key, surviving restarts. Redis is connected in `config/redis.ts` but unused (item 60).
- [ ] 73. Asynchronous pipeline. Ingest writes to a queue or stream; a worker processes at-least-once with dedupe and dead-letter handling. Test out-of-order and duplicate events.
- [ ] 74. Aggregation and rollups. Pre-aggregated counts for features, adoption, funnels and retention, with indexes on hot fields. Record query p95 on a seeded dataset (for example 1M events).
- [ ] 75. Published load test. A k6 (or similar) script in the repo and a results table: events/sec, p95 and p99 latency, error rate, hardware used.
- [ ] 76. Live deployment. CD from the default branch, a staging environment, rollback steps, and a demo link in the README with a seeded dataset.
- [ ] 77. Dogfooding. Publish the SDK (npm package) and use it in at least one real app of yours, so the dashboard shows genuine data.
- [ ] 78. Webhooks done properly. HMAC-signed payloads, retries with backoff, replay protection, and a delivery log in the UI (the `webhooks` page is mock today).
- [ ] 79. Tenant isolation tests. Automated tests proving a user from org A cannot read or change org B's projects, events or keys.
- [ ] 80. Observability and SLOs. Metrics for p95 latency and error rate, one dashboard screenshot, and a stated SLO in the README.
- [ ] 81. Resume package. README "Results" section with the real numbers from items 74, 75 and 79, a 60-second demo GIF or video, and 3 to 4 resume bullets that each contain a number (for example "ingests N events/sec at p95 X ms", "N tests, X% coverage on auth and ingestion").

**Acceptance:** a stranger can open the live demo, see real data from your own app, and read measured throughput, latency and coverage in the README.

## New findings
Numbered continuing from 68 and placed in their phases: 69 (validateRequest message bug, Phase 1) and 70 (Node 18 in the CI matrix, Phase 0). Items 5, 9, 10, 21 and 26 were also found in this run and are the highest severity.

## Top 5 next actions
1. **Fix the request path** (items 9, 10, 69): move the 404 handler after the routers, make the error handler read `statusCode`, format validation details properly. One small PR.
2. **Fix the email regex** in `User.model.ts` and `Organization.model.ts` (item 21), and add a register integration test that proves a valid email saves.
3. **Lock down roles** (item 26): remove `role` from the public register schema (default `USER`), and create admin roles only through an authenticated path.
4. **Make CI real** (items 1, 2, 22, 70): default-branch trigger, remove `continue-on-error` from lint/test, fix the duplicate `run:` key, drop Node 18, install ESLint and Vitest+Supertest in the server.
5. **Login and auth middleware** (items 27, 29, 30, 31): login/refresh/logout with httpOnly cookies, `requireAuth`, CORS allowlist, helmet, rate limit.

## Progress summary
Percentage = (done + 0.5 x partial) / (all items except N/A and UNVERIFIED).

| Phase | Done | Partial | Open | N/A | Unverified |
|---|---|---|---|---|---|
| 0 Foundation | 3 | 3 | 6 | 0 | 4 |
| 1 Contract and tests | 2 | 3 | 6 | 0 | 0 |
| 2 Security | 3 | 2 | 8 | 0 | 1 |
| 3 Data integrity | 1 | 1 | 1 | 2 | 0 |
| 4 Client foundation | 0 | 1 | 5 | 0 | 0 |
| 5 Client polish | 0 | 1 | 2 | 0 | 3 |
| 6 Operations | 0 | 1 | 6 | 0 | 0 |
| 7 Proof | 0 | 1 | 4 | 0 | 0 |
| 8 Differentiators | 0 | 0 | 11 | 0 | 0 |
| **Total (81)** | **9** | **13** | **49** | **2** | **8** |

**Overall: about 22%** ((9 + 6.5) / 71). Items 71 to 81 are the 10/10 differentiators; excluding Phase 8 the figure is about 26%.

## Interview / review prep
- Why is the 404 handler position a bug in Express, and how would you have caught it? (A test that hits `/api/v1/auth/register`.)
- Registration accepts `role` from the body. What attack does that allow, and how do you assign roles safely?
- Access token in memory, localStorage or an httpOnly cookie: what are the XSS and CSRF trade-offs, and how do you rotate and revoke refresh tokens with Redis?
- Two people register the same email at the same instant. What happens today, and what should happen?
- How would you keep client and server types from drifting? (Zod contract package, generated OpenAPI client.)
- Why does `"type": "module"` with extensionless imports break at runtime, and what are your options (`.js` extensions, `NodeNext`, or a bundler)?
- How will the events ingestion path handle idempotency, out-of-order events and volume, and where does Redis fit?
- What is your test strategy for a Mongoose-backed API, and what does CI gate on?
