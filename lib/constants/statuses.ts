export const SUBSCRIPTION_STATUSES = [
  "Draft",
  "Pending Provisioning",
  "Provisioning In Progress",
  "Active",
  "Change Pending",
  "Suspended",
  "Cancelled",
  "Failed Activation"
] as const;

export const PROVISIONING_STATUSES = [
  "Queued",
  "Validating",
  "Running",
  "Partially Applied",
  "Succeeded",
  "Failed",
  "Retry Pending",
  "Cancelled"
] as const;

export const FAULT_STATUSES = [
  "Open",
  "Acknowledged",
  "Investigating",
  "Assigned",
  "Pending Field Action",
  "Monitoring Recovery",
  "Resolved",
  "Closed"
] as const;

export const SUPPORT_TICKET_STATUSES = [
  "Open",
  "In Review",
  "Waiting on Customer",
  "Linked to Incident",
  "In Progress",
  "Resolved",
  "Closed"
] as const;

export const USER_ACCOUNT_STATUSES = [
  "Invited",
  "Active",
  "Suspended",
  "Disabled"
] as const;

