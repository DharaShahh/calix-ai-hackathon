# V1 Navigation Map

## Overview

The platform has two application surfaces in v1:

1. Operations Console
2. Customer Portal

Single-tenant deployment is assumed, but navigation should be tenant-aware in code.

## Operations Console

### Primary Navigation

1. Dashboard
2. Subscribers
3. Plans
4. Devices
5. Topology
6. Provisioning
7. Monitoring
8. Faults
9. Billing
10. Analytics
11. Integrations
12. Users & Roles
13. Settings

### Secondary Navigation Rules

- `Dashboard`
  - Overview
  - Alerts
  - Provisioning Activity
  - Fault Summary

- `Subscribers`
  - Customers
  - Service Locations
  - Subscriptions
  - Support Tickets

- `Plans`
  - Service Plans
  - Plan Mapping

- `Devices`
  - Device Inventory
  - Configuration Templates
  - Command History

- `Topology`
  - Network Map
  - Nodes
  - Links

- `Provisioning`
  - Job Queue
  - Job History
  - Templates
  - Activation Timeline

- `Monitoring`
  - Health Overview
  - Metrics Explorer
  - Alerts
  - Alert Rules

- `Faults`
  - Fault Tickets
  - Assignments
  - Resolution Timeline

- `Billing`
  - Customer Billing Status
  - Sync Events
  - Mapping
  - Errors

- `Analytics`
  - Overview
  - Usage Trends
  - Reliability
  - Incidents
  - Provisioning Performance

- `Integrations`
  - API Keys
  - Billing Integration
  - Webhook Logs
  - API Usage

- `Users & Roles`
  - Staff Users
  - Invites
  - Roles
  - Access Audit

- `Settings`
  - Profile
  - Account Security
  - Platform Settings

## Role-Based Visibility

### Admin

- Full access to all sections

### Network Engineer

- Dashboard
- Subscribers (read-heavy)
- Plans (read-only)
- Devices
- Topology
- Provisioning
- Monitoring
- Faults
- Analytics

### NOC Operator

- Dashboard
- Subscribers (limited read)
- Devices (read)
- Topology
- Provisioning (read)
- Monitoring
- Faults
- Analytics

### Customer Support

- Dashboard
- Subscribers
- Plans (read)
- Devices (limited read)
- Provisioning (status and request flow)
- Monitoring (limited read)
- Faults (limited read)
- Billing

### Technician Lite

- Faults
- Assigned Tasks

Technician views can be embedded under `Faults` in v1 instead of a standalone top-level section.

## Customer Portal

### Primary Navigation

1. Dashboard
2. My Plan
3. Usage
4. Billing
5. Support
6. Profile

### Portal Navigation Rules

- `Dashboard`
  - Service Status
  - Current Plan
  - Usage Snapshot
  - Open Tickets

- `My Plan`
  - Current Plan
  - Plan Change Request

- `Usage`
  - Current Period Usage
  - Usage History

- `Billing`
  - Billing Status
  - Payment History

- `Support`
  - Ticket List
  - New Support Request
  - Ticket Detail

- `Profile`
  - Contact Details
  - Security

## Global Navigation Elements

Shared across staff and portal surfaces:

- Search
- Notification tray
- User profile menu
- Logout

## Navigation Principles

- Keep customer portal read-heavy and simple.
- Keep destructive and operational actions out of global navigation.
- Use entity detail pages as action hubs rather than overcrowding list pages.
- Separate staff and customer route groups to avoid permission leakage.

## Scalability Reminder

The customer portal navigation is intentionally designed to stay read-heavy in v1.

Current planning support targets:

- Operations Console: `50-150` concurrent internal users
- Customer Portal: `1,000-3,000` concurrent users

These numbers are provisional and should be revisited later through performance testing and infrastructure sizing.
