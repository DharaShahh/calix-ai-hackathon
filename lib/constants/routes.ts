import {
  Activity,
  BarChart3,
  Boxes,
  Cable,
  CreditCard,
  Gauge,
  LayoutDashboard,
  Link2,
  Network,
  Siren,
  ShieldCheck,
  UserCog,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { USER_ROLES, type UserRole } from "@/lib/constants/roles";

export type AppRouteItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
};

export const OPS_NAV_ITEMS: AppRouteItem[] = [
  {
    label: "Dashboard",
    href: "/ops",
    icon: LayoutDashboard,
    roles: [USER_ROLES.admin, USER_ROLES.engineer, USER_ROLES.noc, USER_ROLES.support]
  },
  {
    label: "Subscribers",
    href: "/ops/customers",
    icon: Users,
    roles: [USER_ROLES.admin, USER_ROLES.engineer, USER_ROLES.noc, USER_ROLES.support]
  },
  {
    label: "Plans",
    href: "/ops/plans",
    icon: Boxes,
    roles: [USER_ROLES.admin, USER_ROLES.engineer, USER_ROLES.noc, USER_ROLES.support]
  },
  {
    label: "Devices",
    href: "/ops/devices",
    icon: Cable,
    roles: [USER_ROLES.admin, USER_ROLES.engineer, USER_ROLES.noc, USER_ROLES.support]
  },
  {
    label: "Topology",
    href: "/ops/topology",
    icon: Network,
    roles: [USER_ROLES.admin, USER_ROLES.engineer, USER_ROLES.noc]
  },
  {
    label: "Provisioning",
    href: "/ops/provisioning",
    icon: Activity,
    roles: [USER_ROLES.admin, USER_ROLES.engineer, USER_ROLES.noc, USER_ROLES.support]
  },
  {
    label: "Monitoring",
    href: "/ops/monitoring",
    icon: Gauge,
    roles: [USER_ROLES.admin, USER_ROLES.engineer, USER_ROLES.noc, USER_ROLES.support]
  },
  {
    label: "Faults",
    href: "/ops/faults",
    icon: Siren,
    roles: [USER_ROLES.admin, USER_ROLES.engineer, USER_ROLES.noc, USER_ROLES.support]
  },
  {
    label: "Billing",
    href: "/ops/billing",
    icon: CreditCard,
    roles: [USER_ROLES.admin, USER_ROLES.support]
  },
  {
    label: "Analytics",
    href: "/ops/analytics",
    icon: BarChart3,
    roles: [USER_ROLES.admin, USER_ROLES.engineer, USER_ROLES.noc, USER_ROLES.support]
  },
  {
    label: "Integrations",
    href: "/ops/integrations/api-keys",
    icon: Link2,
    roles: [USER_ROLES.admin]
  },
  {
    label: "Users & Roles",
    href: "/ops/users",
    icon: UserCog,
    roles: [USER_ROLES.admin]
  },
  {
    label: "Settings",
    href: "/ops/settings/profile",
    icon: ShieldCheck,
    roles: [USER_ROLES.admin, USER_ROLES.engineer, USER_ROLES.noc, USER_ROLES.support]
  }
];

export const PORTAL_NAV_ITEMS = [
  { label: "Dashboard", href: "/portal" },
  { label: "My Plan", href: "/portal/plan" },
  { label: "Usage", href: "/portal/usage" },
  { label: "Billing", href: "/portal/billing" },
  { label: "Support", href: "/portal/support" },
  { label: "Profile", href: "/portal/profile" }
] as const;
