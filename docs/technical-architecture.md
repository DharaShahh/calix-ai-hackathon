# V1 Technical Architecture

## Objective

Build a cloud-native broadband operations platform for internal ISP teams, plus a thin customer portal.

V1 constraints:

- single-tenant deployment
- multi-tenant-ready schema
- GPON/XGS-PON-first scope
- provider-agnostic billing layer
- request-driven customer plan changes

## Architecture Summary

### Frontend

- Next.js 14+
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Flow
- Recharts

### Backend

- Supabase Auth
- PostgreSQL via Supabase
- Supabase Realtime
- Supabase Storage
- Supabase Edge Functions where needed

### Supporting Services

- Redis + BullMQ for background jobs
- Sentry for application monitoring
- Optional Prometheus/Grafana later

## Application Surfaces

### 1. Operations Console

For:

- Admin
- Network Engineer
- NOC Operator
- Customer Support
- Technician Lite if included

Responsibilities:

- subscriber operations
- device management
- topology
- provisioning
- monitoring
- faults
- billing visibility
- analytics
- user administration

### 2. Customer Portal

For:

- subscriber-facing self-service

Responsibilities:

- plan view
- usage view
- billing status
- support tickets
- profile management

### 3. Shared Platform Services

Responsibilities:

- auth
- RBAC
- invite lifecycle
- audit logging
- integrations
- notification hooks later

## Logical Module Architecture

### Identity and Access

Owns:

- users
- roles
- permissions
- invites
- account state

Responsibilities:

- login
- invite acceptance
- password reset
- route protection
- role-based action control

### Subscriber Domain

Owns:

- customers
- service locations
- subscriptions
- plan change requests

Responsibilities:

- customer lifecycle
- subscription lifecycle
- portal access enablement

### Plan Catalog

Owns:

- service plans
- billing code references
- provisioning mappings

### Device Domain

Owns:

- device inventory
- device models
- configuration templates
- command jobs

Responsibilities:

- remote operations
- device state
- config action history

### Topology Domain

Owns:

- network nodes
- network links
- device-to-node mapping
- customer path mapping

Responsibilities:

- operational visualization
- service dependency lookup

### Provisioning Domain

Owns:

- workflows
- templates
- provisioning jobs
- provisioning events

Responsibilities:

- activation
- reprovisioning
- plan change execution

### Monitoring Domain

Owns:

- metrics
- alert rules
- alerts

Responsibilities:

- live service health
- threshold evaluation
- alert generation

### Fault and Support Domain

Owns:

- fault tickets
- fault updates
- support tickets
- technician assignments

Responsibilities:

- incident tracking
- support workflow
- field escalation

### Billing Integration Domain

Owns:

- adapter configuration
- account mappings
- sync events
- billing snapshots

Responsibilities:

- provider abstraction
- sync logging
- billing status retrieval

### Analytics Domain

Owns:

- aggregated query models
- exports

Responsibilities:

- operational trends
- reliability insights
- provisioning success trends

## Request Flow

### Staff Request Flow

1. User authenticates with Supabase Auth.
2. Middleware resolves user, role, and tenant context.
3. Next.js route handler or server action validates permission.
4. Domain service executes business logic.
5. Database changes are committed.
6. Audit log is written.
7. If async work is required, a job is queued.
8. UI refreshes via TanStack Query invalidation or realtime updates.

### Customer Portal Flow

1. Customer authenticates.
2. Portal routes resolve the customer-owned account only.
3. Queries are self-scoped server-side.
4. Customer sees simplified DTOs, not internal operational objects.

## Data Architecture

## Core Principles

- all tenant-owned records include `tenant_id`
- all user-facing state transitions are explicit
- write actions create audit logs
- public and portal DTOs must be narrower than staff DTOs
- use soft status transitions before physical deletion

### Primary Relational Spine

- `tenant -> users`
- `tenant -> customers`
- `customer -> service_locations`
- `customer -> subscriptions`
- `subscription -> service_plan`
- `subscription -> network_device`
- `subscription -> provisioning_jobs`
- `device/subscription -> metrics`
- `alerts -> fault_tickets`
- `customer -> support_tickets`
- `customer/subscription -> billing mappings`

## Access Control Model

### V1 Roles

- Admin
- Network Engineer
- NOC Operator
- Customer Support
- Customer
- Technician Lite optional

### Enforcement Layers

1. Route-level access
2. API-level permission checks
3. Record scope checks
4. Database-level tenant isolation

### Database Strategy

Use tenant-aware table design now and prepare for PostgreSQL RLS:

- seed one tenant in v1
- filter all queries by tenant in the service layer
- keep policies simple until multi-tenant rollout

## Background Jobs

Use Redis + BullMQ for async workflows that should not block HTTP requests.

### Job Types

- provisioning jobs
- device command execution
- billing sync jobs
- metric ingestion normalization
- alert evaluation if handled asynchronously
- export/report generation

### Job Principles

- jobs must be idempotent
- each job must persist status
- retries should be explicit and bounded
- failures should surface in UI-facing logs where relevant

## Realtime Strategy

Use Supabase Realtime selectively for:

- provisioning job status updates
- alert/fault updates
- dashboard refresh events
- support ticket updates where useful

Do not depend on realtime for correctness. It should improve UX, not own business state.

## Billing Integration Strategy

### V1 Recommendation

Build a provider-agnostic adapter interface.

Suggested contract:

- `createAccount`
- `updateSubscription`
- `fetchStatus`
- `fetchHistory`

### V1 Implementation

- `MockBillingAdapter` for development and demos
- `ManualBillingAdapter` optional for operator-entered or imported status updates

Do not implement:

- invoices
- payments
- tax engine
- collections

## Monitoring Strategy

### Launch Metrics

- device reachability
- service uptime
- latency
- packet loss
- bandwidth utilization

### Alert Model

- `Warning`
- `Critical`

### V1 Monitoring Principle

Prefer a small reliable metric set over broad but shallow telemetry coverage.

## Device and Vendor Strategy

### V1 Constraint

Support a narrow device matrix only:

- 1 OLT family
- 1 ONT family
- 1 CPE/router family

All supported device types require:

- command mapping
- provisioning template
- health model
- config handling rules

## Security and Audit

### Required V1 Controls

- invite-based account creation
- password reset flow
- role-based access checks
- audit logging for sensitive writes
- credential/config secrets stored outside plain tables when possible
- no raw password history in app data

### Audit Log Targets

- user creation and status changes
- role changes
- customer lifecycle changes
- provisioning actions
- device commands
- billing sync retries and failures
- fault assignment and closure

## Deployment Architecture

### Web

- deploy Next.js app on Vercel

### Database/Auth

- Supabase-hosted Postgres and Auth

### Workers

- worker process for BullMQ-backed jobs

### Observability

- Sentry in web and worker runtimes

## Scalability Note

Scalability limits are not yet validated and must be revisited before launch readiness, commercial commitments, or multi-tenant rollout.

Current planning guidance for v1:

- Operations Console target: `50-150` concurrent internal users
- Customer Portal target: `1,000-3,000` concurrent users for mostly read-heavy usage
- Subscriber base target: `25,000-100,000` customer accounts in the system, assuming bursty portal access and optimized queries

These are planning targets, not guaranteed production limits.

Scalability must be re-evaluated later based on:

- selected Supabase and Vercel plans
- telemetry ingestion volume
- realtime subscription usage
- dashboard query complexity
- billing and provisioning job throughput
- database indexing and caching strategy

## Recommended Service Boundaries for Implementation

Keep code organized by domain instead of by UI page.

Suggested structure:

- `auth`
- `rbac`
- `customers`
- `plans`
- `subscriptions`
- `devices`
- `topology`
- `provisioning`
- `monitoring`
- `faults`
- `support`
- `billing`
- `analytics`
- `audit`

## Open Decisions Still Requiring Lock

- exact supported device vendors/models
- whether technician lite is in v1 or v1.1
- exact source of monitoring telemetry
- whether support ticket notifications are email-only or in-app too
- whether provisioning execution lives entirely in workers or partly in edge/server handlers

## Delivery Recommendation

Build vertical slices, not isolated backend-first modules.

Recommended slices:

1. auth + RBAC + app shell
2. customer + subscription flow
3. device + topology linkage
4. provisioning
5. monitoring + faults
6. billing visibility
7. customer portal

This reduces integration risk and proves the core operator workflow earlier.
