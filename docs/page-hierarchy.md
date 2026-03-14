# V1 Page Hierarchy

## Route Model

Use three top-level route groups:

1. `/auth`
2. `/ops`
3. `/portal`

## Auth Pages

### Shared Auth

- `/auth/login`
- `/auth/forgot-password`
- `/auth/reset-password`
- `/auth/accept-invite`
- `/auth/access-denied`

### Staff Invite and Security

- `/ops/users/invites`
- `/ops/users/invites/:inviteId`
- `/ops/users/:userId/security`

### Customer Portal Activation

- `/ops/customers/:customerId/portal-access`
- `/portal/activate`
- `/portal/security/change-password`

## Operations Console Hierarchy

### Dashboard

- `/ops`
- `/ops/alerts`
- `/ops/activity`

### Subscribers

- `/ops/customers`
- `/ops/customers/new`
- `/ops/customers/:customerId`
- `/ops/customers/:customerId/edit`
- `/ops/customers/:customerId/locations/new`
- `/ops/locations/:locationId`
- `/ops/subscriptions`
- `/ops/subscriptions/:subscriptionId`
- `/ops/subscriptions/:subscriptionId/change-plan`
- `/ops/support-tickets`
- `/ops/support-tickets/:ticketId`

### Plans

- `/ops/plans`
- `/ops/plans/new`
- `/ops/plans/:planId`
- `/ops/plans/:planId/edit`
- `/ops/plans/:planId/provisioning-mapping`

### Devices

- `/ops/devices`
- `/ops/devices/new`
- `/ops/devices/:deviceId`
- `/ops/devices/:deviceId/commands`
- `/ops/devices/:deviceId/metrics`
- `/ops/config-templates`
- `/ops/config-templates/new`
- `/ops/config-templates/:templateId`

### Topology

- `/ops/topology`
- `/ops/topology/nodes/:nodeId`
- `/ops/topology/links/:linkId`
- `/ops/topology/customer-path/:subscriptionId`

### Provisioning

- `/ops/provisioning`
- `/ops/provisioning/jobs/:jobId`
- `/ops/provisioning/templates`
- `/ops/provisioning/templates/:templateId`

### Monitoring

- `/ops/monitoring`
- `/ops/monitoring/devices/:deviceId`
- `/ops/monitoring/subscriptions/:subscriptionId`
- `/ops/monitoring/metrics`
- `/ops/monitoring/alerts`
- `/ops/monitoring/alerts/:alertId`
- `/ops/monitoring/alert-rules`

### Faults

- `/ops/faults`
- `/ops/faults/:faultId`
- `/ops/faults/:faultId/assignment`
- `/ops/faults/:faultId/timeline`
- `/ops/technician/tasks`
- `/ops/technician/tasks/:taskId`

### Billing

- `/ops/billing`
- `/ops/billing/integrations`
- `/ops/billing/mappings/:subscriptionId`
- `/ops/billing/sync-events`
- `/ops/billing/errors`

### Analytics

- `/ops/analytics`
- `/ops/analytics/usage`
- `/ops/analytics/reliability`
- `/ops/analytics/incidents`
- `/ops/analytics/provisioning`

### Integrations

- `/ops/integrations/api-keys`
- `/ops/integrations/webhooks`
- `/ops/integrations/usage`

### Users and Roles

- `/ops/users`
- `/ops/users/new`
- `/ops/users/:userId`
- `/ops/roles`
- `/ops/roles/:roleId`
- `/ops/audit/access`

### Settings

- `/ops/settings/profile`
- `/ops/settings/security`
- `/ops/settings/platform`

## Customer Portal Hierarchy

### Dashboard

- `/portal`

### My Plan

- `/portal/plan`
- `/portal/plan/change-request`

### Usage

- `/portal/usage`

### Billing

- `/portal/billing`

### Support

- `/portal/support`
- `/portal/support/new`
- `/portal/support/:ticketId`

### Profile

- `/portal/profile`
- `/portal/security/change-password`

## Page Types

Each route should fit one of these page types:

- `List`
  - searchable, filterable, paginated
- `Detail`
  - summary + tabs + action bar
- `Create/Edit`
  - form-heavy workflow page
- `Workflow`
  - provisioning, assignment, retry, activation, plan change
- `Dashboard`
  - metrics, trends, operational summary

## Detail Page Standard

Entity detail pages should use a consistent structure:

1. Header
2. Status badge
3. Primary action bar
4. Summary cards
5. Tabs
6. Activity timeline

Recommended tab patterns:

- Customer
  - Profile
  - Subscription
  - Devices
  - Billing
  - Tickets
  - Activity

- Device
  - Overview
  - Configuration
  - Metrics
  - Commands
  - Faults

- Subscription
  - Summary
  - Provisioning
  - Usage
  - Billing
  - Activity

- Fault
  - Summary
  - Impact
  - Assignment
  - Updates
  - Timeline

## Page Build Priority

### Priority 1

- Auth
- `/ops`
- `/ops/customers`
- `/ops/customers/:customerId`
- `/ops/subscriptions/:subscriptionId`
- `/ops/plans`
- `/ops/users`

### Priority 2

- `/ops/devices`
- `/ops/devices/:deviceId`
- `/ops/topology`
- `/ops/provisioning`
- `/ops/provisioning/jobs/:jobId`

### Priority 3

- `/ops/monitoring`
- `/ops/faults`
- `/ops/faults/:faultId`
- `/ops/billing`
- `/portal`
- `/portal/support`

### Priority 4

- Analytics
- Integrations
- advanced admin views
