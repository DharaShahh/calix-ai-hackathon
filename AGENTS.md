# AGENTS.md

## Purpose

This file defines repo-specific instructions for AI coding agents working on this project.

Use it together with:

- `PRD.md`
- `plan.md`
- `docs/navigation-map.md`
- `docs/page-hierarchy.md`
- `docs/technical-architecture.md`

## Project Context

This repository is building `v1` of an Intelligent Broadband Service Orchestration Platform.

V1 constraints:

- single-tenant deployment
- multi-tenant-ready architecture
- GPON/XGS-PON-first scope
- thin customer portal
- provider-agnostic billing adapter
- request-only customer plan changes

Do not silently expand scope beyond the current planning docs. If a requested feature pushes beyond v1, classify it as:

- required for v1
- v1.1
- phase 2

## Planning Docs Are Source of Truth

Before making structural changes, check:

- `plan.md` for execution order and phase boundaries
- `docs/technical-architecture.md` for architecture decisions
- `docs/page-hierarchy.md` for routes and page inventory
- `docs/navigation-map.md` for role-aware navigation

Before implementing any meaningful feature, agents should read the relevant planning docs first and align the work to them.

Minimum expectation before execution:

1. read `plan.md`
2. read the relevant architecture and route docs
3. identify which phase and module the task belongs to
4. implement in a way that stays consistent with the documented scope and structure

If code conflicts with the planning docs, preserve correctness and update the docs if the direction has intentionally changed.

Agents should treat the docs and implementation as a synchronized system:

- do not implement features in isolation from the docs
- do not add routes, modules, statuses, or role behavior that contradict the planning docs
- if implementation introduces a real change in behavior or architecture, update the affected docs in the same work
- if a request goes beyond the documented phase or v1 scope, call that out clearly before broadening implementation

## Reusability Requirements

Prefer reusable code by default.

Expected approach:

- extract shared UI primitives when repeated patterns appear
- extract shared domain helpers instead of duplicating logic
- centralize validation and transformation logic where practical
- prefer composition over copy-paste
- keep reusable abstractions small and obvious

Do not create premature abstractions for one-off code, but do not repeat the same logic in multiple modules.

## Constants and Config Conventions

Use constants/config files for values that are likely to change or need consistency across the system.

Examples:

- date and time formats
- status labels
- route constants
- role names
- permission keys
- alert severities
- dashboard refresh intervals
- pagination defaults
- supported device types
- billing adapter identifiers

Preferred rule:

- if a value affects multiple files, workflows, or user-visible consistency, it should be centralized

Avoid scattering magic strings and magic numbers across the codebase.

## State and Status Rules

Statuses should be modeled explicitly and consistently across the app.

Do not hardcode ad hoc status values in components or handlers.

Centralize:

- subscription statuses
- provisioning statuses
- alert statuses
- fault statuses
- support ticket statuses
- user/invite/account statuses

## Architecture Rules

Keep code organized by domain, not by random utility growth.

Preferred domain groupings:

- auth
- rbac
- customers
- plans
- subscriptions
- devices
- topology
- provisioning
- monitoring
- faults
- support
- billing
- analytics
- audit

Keep staff and customer portal concerns separated in routing, DTOs, and permissions.

## Data and Access Rules

Even in single-tenant v1:

- design tenant-aware schemas
- include `tenant_id` on tenant-owned records
- enforce tenant scoping in backend logic
- keep portal APIs self-scoped to the authenticated customer

Do not expose internal operational fields directly to the customer portal unless explicitly intended.

## Billing Rules

Billing in v1 is an integration boundary, not a full internal billing product.

Agents should:

- preserve provider-agnostic adapter design
- avoid implementing invoice/payment engine logic unless explicitly requested
- keep billing behavior focused on mappings, sync events, status snapshots, and display

## Device and Provisioning Rules

Do not broaden device/vendor support casually.

Assume a narrow supported matrix in v1:

- 1 OLT family
- 1 ONT family
- 1 CPE/router family

Provisioning logic must be template-driven and traceable.

## Testing Expectations

When implementing features, prefer coverage for:

- permission checks
- status transitions
- core domain workflows
- API contracts
- provisioning and fault flows

If tests are not added, explicitly state why.

## Documentation Expectations

When adding major features or changing behavior:

- update the relevant planning or architecture docs
- keep docs aligned with implementation reality
- reference the docs being followed during execution when the task is substantial

If a new shared pattern is introduced, document it briefly in code or docs where future developers will find it.

## Practical Preference

Optimize for maintainability and clarity over cleverness.

Good outcomes for this repo:

- reusable modules
- centralized constants
- predictable routing
- explicit permissions
- explicit statuses
- clean separation between ops console and customer portal
