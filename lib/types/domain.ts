import type {
  FAULT_STATUSES,
  PROVISIONING_STATUSES,
  SUBSCRIPTION_STATUSES,
  SUPPORT_TICKET_STATUSES,
  USER_ACCOUNT_STATUSES
} from "@/lib/constants/statuses";

export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];
export type ProvisioningStatus = (typeof PROVISIONING_STATUSES)[number];
export type FaultStatus = (typeof FAULT_STATUSES)[number];
export type SupportTicketStatus = (typeof SUPPORT_TICKET_STATUSES)[number];
export type UserAccountStatus = (typeof USER_ACCOUNT_STATUSES)[number];

