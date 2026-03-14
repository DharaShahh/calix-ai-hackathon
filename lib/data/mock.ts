import {
  FAULT_STATUSES,
  PROVISIONING_STATUSES,
  SUBSCRIPTION_STATUSES
} from "@/lib/constants/statuses";

export const KPI_CARDS = [
  { label: "Active subscribers", value: "18,420", change: "+8.2%" },
  { label: "Provisioning success", value: "97.8%", change: "+1.4%" },
  { label: "Open faults", value: "23", change: "-11.0%" },
  { label: "Billing sync health", value: "99.2%", change: "+0.6%" }
] as const;

export const OPS_TIMELINE = [
  {
    time: "08:42",
    title: "North ridge activation bundle completed",
    detail: `${PROVISIONING_STATUSES[4]} for 24 queued subscriber migrations`
  },
  {
    time: "09:15",
    title: "Core uplink packet loss normalized",
    detail: `${FAULT_STATUSES[5]} on fault ticket FT-2031 after remote reset`
  },
  {
    time: "10:02",
    title: "Plan migration batch prepared",
    detail: `${SUBSCRIPTION_STATUSES[4]} for premium tier uplift request queue`
  }
] as const;

export const PORTAL_SUMMARY = {
  planName: "Fiber Max 300",
  billingStatus: "Current",
  usage: "248 GB used this cycle",
  serviceStatus: "Stable connection across the last 72 hours"
} as const;

