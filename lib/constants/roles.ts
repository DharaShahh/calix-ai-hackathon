export const USER_ROLES = {
  admin: "Admin",
  engineer: "Network Engineer",
  noc: "NOC Operator",
  support: "Customer Support",
  customer: "Customer",
  technician: "Technician Lite"
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

