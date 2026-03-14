# V1 Execution Plan

## Purpose

This document converts the product scope into an execution plan for design, engineering, and delivery.

It is the working plan for building v1 of the Intelligent Broadband Service Orchestration Platform.

Related planning documents:

- `PRD.md`
- `docs/navigation-map.md`
- `docs/page-hierarchy.md`
- `docs/technical-architecture.md`

## V1 Goal

Deliver a broadband operations platform where internal ISP teams can:

- manage customers and subscriptions
- manage supported network devices
- provision service
- monitor service health
- detect and track faults
- view billing status through an adapter layer

And where customers can:

- log in to a portal
- view their plan
- view usage
- view billing status
- create and track support requests

## V1 Scope Boundaries

### Included

- Operations Console
- Customer Portal
- Invite-based staff and customer access
- Subscriber lifecycle management
- Service plans
- Device management
- Basic topology
- Provisioning workflows
- Monitoring and alerts
- Fault and support ticket management
- Billing adapter layer
- Analytics dashboards
- RBAC and audit logs

### Excluded or Deferred

- true multi-tenant product behavior
- public self-serve customer signup
- full billing engine
- full work order management
- full inventory management
- compliance reporting
- capacity planning
- multi-technology broadband support beyond GPON/XGS-PON
- broad vendor/device support

## Locked Decisions

### Tenancy

- single-tenant deployment in v1
- multi-tenant-ready schema and service boundaries

### Broadband Technology

- GPON/XGS-PON only in v1

### Users

- Admin
- Network Engineer
- NOC Operator
- Customer Support
- Customer
- Technician Lite optional, only if required operationally

### Device Scope

Support only a narrow device matrix:

- 1 OLT family
- 1 ONT family
- 1 CPE/router family

### Billing

- provider-agnostic billing adapter architecture
- no real provider dependency required to start
- use mock or manual adapter first

### Customer Plan Change

- request-only in v1
- no direct self-service reprovisioning

### Scalability Planning Targets

- Operations Console: `50-150` concurrent internal users
- Customer Portal: `1,000-3,000` concurrent users
- subscriber base planning range: `25,000-100,000`

These are planning targets, not validated production guarantees.

## Execution Principles

- build vertical slices, not disconnected layers
- ship core operator workflow before platform breadth
- keep customer portal read-heavy
- keep billing as an integration boundary, not a product domain
- keep all data and APIs tenant-aware even in single-tenant deployment
- use explicit status models for subscriptions, provisioning, alerts, faults, and tickets
- treat auditability and permissions as first-class concerns from the beginning

## Delivery Strategy

Build in this order:

1. foundation
2. subscriber and plan core
3. device and topology core
4. provisioning
5. monitoring and faults
6. billing visibility
7. customer portal
8. analytics and hardening

## Workstreams

### 1. Product and UX

Responsibilities:

- finalize route-by-route screen requirements
- define happy path and exception states
- align staff and customer UI behavior to permissions
- finalize key forms and dashboard layouts

Outputs:

- screen specs
- empty/loading/error states
- design-ready route inventory

### 2. Frontend Application

Responsibilities:

- app shell
- route groups
- shared component system
- data fetching patterns
- staff console screens
- customer portal screens

Outputs:

- `/auth`, `/ops`, `/portal` structure
- reusable page templates
- role-aware navigation

### 3. Backend and Data

Responsibilities:

- database schema
- API routes
- domain services
- authorization and record scoping
- audit logging

Outputs:

- schema migrations
- API surface aligned to module plan
- service-layer business rules

### 4. Async Processing and Integrations

Responsibilities:

- provisioning jobs
- device command jobs
- billing sync jobs
- event/status persistence

Outputs:

- BullMQ workers
- job status tracking
- retry/error handling

### 5. Observability and Reliability

Responsibilities:

- app monitoring
- worker monitoring
- error tracking
- operational logging
- performance baselines

Outputs:

- Sentry instrumentation
- actionable logs
- release health checklist

## Phase Plan

## Phase 0: Final Pre-Build Alignment

Objective:

Lock the missing implementation assumptions before writing production code.

Tasks:

- confirm exact supported device families
- decide whether Technician Lite is in v1 or deferred
- define source of monitoring telemetry
- define first provisioning execution path
- confirm whether billing starts with mock-only or mock + manual adapter
- confirm release environments and deployment ownership

Exit Criteria:

- open scope questions reduced to implementation-level details only

## Phase 1: Foundation

Objective:

Create the application skeleton and security model.

Build:

- Next.js project setup
- Supabase setup
- auth flows
- invite flows
- password reset flows
- RBAC foundation
- tenant-aware schema base
- audit logging base
- app shell and navigation

Dependencies:

- none

Exit Criteria:

- staff and customers can authenticate through the intended invite/account lifecycle
- route access is role-aware
- base project structure is stable

## Phase 2: Subscriber and Plan Core

Objective:

Support the primary account and subscription workflow.

Build:

- customer CRUD
- service location CRUD
- service plans CRUD
- subscriptions
- plan change request flow
- account timeline
- portal access enablement

Dependencies:

- Phase 1

Exit Criteria:

- support user can create a customer, location, plan assignment, and subscription

## Phase 3: Device and Topology Core

Objective:

Link service subscriptions to the supported device model and network view.

Build:

- device registry
- device detail
- configuration templates
- device command history
- basic topology graph
- node/link management
- customer-to-device/network linkage

Dependencies:

- Phase 2 for customer/subscription context

Exit Criteria:

- engineer can register a supported device and connect it to subscriber and topology data

## Phase 4: Provisioning

Objective:

Activate and modify services through tracked workflows.

Build:

- provisioning templates
- provisioning jobs
- validation pipeline
- activation flow
- retry/cancel flow
- provisioning event stream

Dependencies:

- Phase 2
- Phase 3

Exit Criteria:

- a subscription can move from pending to active through the system with status visibility

## Phase 5: Monitoring and Faults

Objective:

Provide operational visibility and incident management.

Build:

- metrics ingestion model
- service/device health dashboards
- alert rules
- alerts
- fault ticket creation
- assignment and investigation workflow
- support ticket linkage
- technician-lite if included

Dependencies:

- Phase 3 for device context
- Phase 4 for service activation context

Exit Criteria:

- degraded service or device health can be surfaced, tracked, and resolved through platform workflows

## Phase 6: Billing Visibility

Objective:

Expose billing state without blocking on a real provider.

Build:

- billing adapter contract
- mock or manual adapter
- account mappings
- billing sync events
- customer billing summary surfaces

Dependencies:

- Phase 2 for customer/subscription objects

Exit Criteria:

- staff can see billing-linked account state
- portal can display billing status using the adapter layer

## Phase 7: Customer Portal

Objective:

Deliver a thin but functional self-service experience.

Build:

- customer dashboard
- my plan
- usage
- billing
- support tickets
- profile management
- portal activation flow

Dependencies:

- Phase 1
- Phase 2
- Phase 5
- Phase 6

Exit Criteria:

- customer can log in and view service, billing, usage, and support information

## Phase 8: Analytics and Hardening

Objective:

Prepare the platform for controlled release.

Build:

- analytics overview
- usage and reliability trends
- provisioning success metrics
- admin polish
- API keys and integration logs
- permission tightening
- responsive polish
- performance pass
- operational readiness checks

Dependencies:

- all previous phases

Exit Criteria:

- v1 workflows are complete, permissioned, observable, and stable enough for pilot rollout

## Recommended Sequence of Vertical Slices

### Slice 1: Secure Entry

- auth
- invites
- password reset
- RBAC
- app shell

### Slice 2: Subscriber Activation Setup

- customers
- plans
- subscriptions
- portal access enablement

### Slice 3: Device Binding

- device registry
- templates
- topology linkage

### Slice 4: Service Activation

- provisioning request
- job execution
- activation status

### Slice 5: Service Assurance

- monitoring
- alerts
- faults
- support ticket linkage

### Slice 6: Customer Visibility

- billing adapter
- portal
- support request flow

### Slice 7: Operational Maturity

- analytics
- integrations
- audit views
- performance and release hardening

## Dependencies and Critical Path

Critical path:

1. auth and RBAC
2. customers and subscriptions
3. devices and templates
4. provisioning
5. monitoring and faults
6. portal and billing visibility

High-risk dependency areas:

- provisioning depends on exact device support choices
- monitoring depends on telemetry source definition
- billing visibility depends on adapter contract quality
- portal depends on clean subscriber and ticket scoping

## Acceptance Gates

## Gate 1: Foundation Ready

- authentication works
- invite flow works
- RBAC blocks and permits correctly
- audit events exist for core account actions

## Gate 2: Subscriber Operations Ready

- customer lifecycle and subscriptions are functional
- service plans are assignable
- customer portal access can be enabled

## Gate 3: Technical Operations Ready

- supported devices can be registered
- topology can represent service relationships
- provisioning workflow runs with tracked status

## Gate 4: Service Assurance Ready

- monitoring surfaces live health status
- alerts can trigger and be acknowledged
- faults can be assigned and resolved

## Gate 5: Customer Experience Ready

- customer portal login works
- customers can see plan, usage, billing status, and tickets
- support request creation works

## Gate 6: Release Ready

- analytics dashboards are usable
- critical permissions are verified
- key flows are tested end to end
- error handling and observability are in place

## Testing Strategy

### Unit Tests

- business rules
- status transitions
- permission checks
- adapter logic

### Integration Tests

- auth and invite flows
- customer creation to subscription flow
- provisioning job lifecycle
- alert to fault lifecycle
- portal support ticket flow

### End-to-End Tests

- staff onboarding
- subscriber activation
- fault handling
- customer portal login and support request

### Non-Functional Checks

- route authorization coverage
- audit log coverage on sensitive writes
- background job retry behavior
- basic performance checks on dashboard and portal routes

## Risks

### Scope Risk

Risk:

- adding adjacent telecom features before core workflows are stable

Mitigation:

- hold the line on v1 exclusions

### Device Risk

Risk:

- trying to support too many vendors too early

Mitigation:

- lock exact supported families before provisioning work starts

### Billing Risk

Risk:

- overdesigning for an unknown provider

Mitigation:

- use a narrow adapter interface and mock/manual adapter first

### Portal Risk

Risk:

- turning the customer portal into a second full product

Mitigation:

- keep it read-heavy and request-driven

### Scalability Risk

Risk:

- assuming portal or monitoring scale without load validation

Mitigation:

- revisit scalability later and test against the current planning targets

## Team Execution Recommendation

If multiple engineers are involved, split ownership like this:

- Engineer 1: auth, RBAC, staff console shell, shared platform services
- Engineer 2: customer, subscription, plans, portal
- Engineer 3: devices, topology, provisioning
- Engineer 4: monitoring, faults, analytics, async workers

If the team is smaller, still keep ownership domain-based rather than page-based.

## Immediate Next Steps

1. Start the actual app scaffold and repository structure.
2. Create the database schema from the architecture and entity plan.
3. Implement auth, invite flow, and RBAC first.
4. Build customers, plans, and subscriptions next.
5. Lock the supported device families before provisioning work begins.

## Working Rule

If a new request expands v1 scope, it should not be accepted silently.

It must be classified as one of:

- required for v1
- move to v1.1
- move to phase 2

This document should be updated whenever one of those decisions changes.
