import { USER_ROLES } from "@/lib/constants/roles";

export const customers = [
  {
    id: "cust-001",
    accountNumber: "AC-10482",
    name: "Aarav Mehta",
    email: "aarav.mehta@example.net",
    phone: "+91 98765 11001",
    location: "Bangalore North",
    status: "Active",
    planId: "plan-fiber-max-300",
    subscriptionId: "sub-001",
    serviceStatus: "Stable",
    billingStatus: "Current",
    portalAccess: "Active"
  },
  {
    id: "cust-002",
    accountNumber: "AC-10483",
    name: "Priya Shah",
    email: "priya.shah@example.net",
    phone: "+91 98765 11002",
    location: "Whitefield",
    status: "Pending Activation",
    planId: "plan-fiber-start-100",
    subscriptionId: "sub-002",
    serviceStatus: "Provisioning",
    billingStatus: "Pending Sync",
    portalAccess: "Invited"
  },
  {
    id: "cust-003",
    accountNumber: "AC-10484",
    name: "Nimbus Co-working",
    email: "ops@nimbuscw.com",
    phone: "+91 98765 11003",
    location: "Indiranagar",
    status: "Suspended",
    planId: "plan-business-1000",
    subscriptionId: "sub-003",
    serviceStatus: "Degraded",
    billingStatus: "Overdue",
    portalAccess: "Active"
  }
] as const;

export const servicePlans = [
  {
    id: "plan-fiber-start-100",
    name: "Fiber Start 100",
    speed: "100 / 50 Mbps",
    billingCode: "FIB-100",
    provisioningTemplate: "tpl-gpon-home-basic",
    status: "Active"
  },
  {
    id: "plan-fiber-max-300",
    name: "Fiber Max 300",
    speed: "300 / 150 Mbps",
    billingCode: "FIB-300",
    provisioningTemplate: "tpl-gpon-home-plus",
    status: "Active"
  },
  {
    id: "plan-business-1000",
    name: "Business 1000",
    speed: "1000 / 500 Mbps",
    billingCode: "BIZ-1000",
    provisioningTemplate: "tpl-gpon-business-core",
    status: "Active"
  }
] as const;

export const subscriptions = [
  {
    id: "sub-001",
    customerId: "cust-001",
    planId: "plan-fiber-max-300",
    status: "Active",
    address: "Block 8, Bangalore North",
    activationDate: "2026-03-02",
    billingRef: "BILL-30492"
  },
  {
    id: "sub-002",
    customerId: "cust-002",
    planId: "plan-fiber-start-100",
    status: "Pending Provisioning",
    address: "Sector 14, Whitefield",
    activationDate: "Pending",
    billingRef: "Pending"
  },
  {
    id: "sub-003",
    customerId: "cust-003",
    planId: "plan-business-1000",
    status: "Suspended",
    address: "12th Main, Indiranagar",
    activationDate: "2026-01-14",
    billingRef: "BILL-30494"
  }
] as const;

export const devices = [
  {
    id: "dev-olt-001",
    name: "OLT Core A1",
    type: "OLT",
    vendor: "Nokia",
    model: "ISAM FX-16",
    status: "Reachable",
    customerId: null,
    nodeId: "node-core-a",
    ip: "10.14.0.18"
  },
  {
    id: "dev-ont-204",
    name: "ONT-204",
    type: "ONT",
    vendor: "Nokia",
    model: "XS-2426G",
    status: "Reachable",
    customerId: "cust-001",
    nodeId: "node-fiber-north",
    ip: "10.18.20.14"
  },
  {
    id: "dev-cpe-882",
    name: "Home Router 882",
    type: "CPE",
    vendor: "TP-Link",
    model: "AX1800",
    status: "Unreachable",
    customerId: "cust-003",
    nodeId: "node-business-east",
    ip: "10.19.82.6"
  }
] as const;

export const topologyNodes = [
  { id: "node-core-a", name: "Core Ring A", type: "Core", status: "Healthy" },
  { id: "node-fiber-north", name: "Fiber Node North", type: "Fiber Node", status: "Healthy" },
  { id: "node-business-east", name: "Business Edge East", type: "Distribution", status: "Warning" }
] as const;

export const topologyLinks = [
  {
    id: "link-001",
    source: "node-core-a",
    target: "node-fiber-north",
    type: "Fiber",
    capacity: "10 Gbps",
    status: "Healthy"
  },
  {
    id: "link-002",
    source: "node-core-a",
    target: "node-business-east",
    type: "Fiber",
    capacity: "5 Gbps",
    status: "Degraded"
  }
] as const;

export const provisioningJobs = [
  {
    id: "prov-001",
    subscriptionId: "sub-002",
    status: "Validating",
    type: "Activation",
    template: "tpl-gpon-home-basic",
    requestedBy: USER_ROLES.support
  },
  {
    id: "prov-002",
    subscriptionId: "sub-001",
    status: "Succeeded",
    type: "Plan Change",
    template: "tpl-gpon-home-plus",
    requestedBy: USER_ROLES.engineer
  },
  {
    id: "prov-003",
    subscriptionId: "sub-003",
    status: "Retry Pending",
    type: "Reprovision",
    template: "tpl-gpon-business-core",
    requestedBy: USER_ROLES.engineer
  }
] as const;

export const alerts = [
  {
    id: "alert-001",
    title: "Packet loss spike on Business Edge East",
    severity: "Critical",
    status: "Open",
    target: "node-business-east"
  },
  {
    id: "alert-002",
    title: "Provisioning queue above expected threshold",
    severity: "Warning",
    status: "Acknowledged",
    target: "provisioning"
  }
] as const;

export const faults = [
  {
    id: "fault-001",
    title: "East business uplink degradation",
    severity: "Critical",
    status: "Investigating",
    customerId: "cust-003",
    deviceId: "dev-cpe-882",
    assignedTo: "NOC Desk 2"
  },
  {
    id: "fault-002",
    title: "Pending ONT activation follow-up",
    severity: "Warning",
    status: "Assigned",
    customerId: "cust-002",
    deviceId: "dev-ont-204",
    assignedTo: "Engineer Arjun"
  }
] as const;

export const supportTickets = [
  {
    id: "ticket-001",
    customerId: "cust-001",
    subject: "Intermittent evening slowdown",
    status: "In Progress",
    linkedFaultId: null
  },
  {
    id: "ticket-002",
    customerId: "cust-003",
    subject: "Office link unstable since 09:00",
    status: "Linked to Incident",
    linkedFaultId: "fault-001"
  }
] as const;

export const staffUsers = [
  {
    id: "user-001",
    name: "Anika Rao",
    email: "anika.rao@isp.local",
    role: USER_ROLES.admin,
    status: "Active"
  },
  {
    id: "user-002",
    name: "Karthik Sen",
    email: "karthik.sen@isp.local",
    role: USER_ROLES.engineer,
    status: "Active"
  },
  {
    id: "user-003",
    name: "Maya Pillai",
    email: "maya.pillai@isp.local",
    role: USER_ROLES.support,
    status: "Invited"
  }
] as const;

export const apiKeys = [
  { id: "key-001", name: "Billing sandbox", lastUsed: "2026-03-14 09:14", status: "Active" },
  { id: "key-002", name: "Provisioning audit export", lastUsed: "2026-03-13 20:22", status: "Active" }
] as const;

export const analyticsCards = [
  { label: "Traffic trend", value: "+18%", detail: "month-over-month peak bandwidth growth" },
  { label: "Reliability", value: "99.93%", detail: "measured across active GPON paths" },
  { label: "Activation time", value: "11m", detail: "median from request to completion" },
  { label: "Incident volume", value: "-12%", detail: "compared to previous reporting window" }
] as const;

export function getCustomer(customerId: string) {
  return customers.find((customer) => customer.id === customerId);
}

export function getPlan(planId: string) {
  return servicePlans.find((plan) => plan.id === planId);
}

export function getSubscription(subscriptionId: string) {
  return subscriptions.find((subscription) => subscription.id === subscriptionId);
}

export function getDevice(deviceId: string) {
  return devices.find((device) => device.id === deviceId);
}

export function getFault(faultId: string) {
  return faults.find((fault) => fault.id === faultId);
}

export function getSupportTicket(ticketId: string) {
  return supportTickets.find((ticket) => ticket.id === ticketId);
}

export function getProvisioningJob(jobId: string) {
  return provisioningJobs.find((job) => job.id === jobId);
}

export function getTopologyNode(nodeId: string) {
  return topologyNodes.find((node) => node.id === nodeId);
}

export function getTopologyLink(linkId: string) {
  return topologyLinks.find((link) => link.id === linkId);
}

export function getAlert(alertId: string) {
  return alerts.find((alert) => alert.id === alertId);
}
