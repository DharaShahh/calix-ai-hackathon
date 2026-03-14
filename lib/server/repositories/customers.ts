import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { customers as mockCustomers } from "@/lib/data/platform";

type CustomerRecord = {
  id: string;
  account_number: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  status: string;
  portal_user_id: string | null;
};

type SubscriptionRecord = {
  id: string;
  status: string;
  billing_account_ref: string | null;
  service_plan_id: string | null;
  service_location_id: string | null;
};

type ServicePlanRecord = {
  id: string;
  name: string;
};

type ServiceLocationRecord = {
  id: string;
  city: string;
  address_line_1: string;
};

export type CustomerView = {
  id: string;
  accountNumber: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  planId: string;
  subscriptionId: string;
  serviceStatus: string;
  billingStatus: string;
  portalAccess: string;
};

export const listCustomers = cache(async (): Promise<CustomerView[]> => {
  const supabase = await createSupabaseServerClient();

  try {
    const { data, error } = await supabase
      .from("customers")
      .select(
        `
          id,
          account_number,
          full_name,
          email,
          phone,
          status,
          portal_user_id,
          subscriptions (
            id,
            status,
            billing_account_ref,
            service_plan_id,
            service_location_id
          )
        `
      )
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return [...mockCustomers];
    }

    const locationIds = data
      .flatMap((row) =>
        ((row.subscriptions as SubscriptionRecord[] | null) ?? [])
          .map((subscription) => subscription.service_location_id)
          .filter(Boolean)
      )
      .filter((id, index, array) => array.indexOf(id) === index) as string[];

    const planIds = data
      .flatMap((row) =>
        ((row.subscriptions as SubscriptionRecord[] | null) ?? [])
          .map((subscription) => subscription.service_plan_id)
          .filter(Boolean)
      )
      .filter((id, index, array) => array.indexOf(id) === index) as string[];

    const [{ data: locations }, { data: plans }] = await Promise.all([
      locationIds.length
        ? supabase.from("service_locations").select("id, city, address_line_1").in("id", locationIds)
        : Promise.resolve({ data: [] as ServiceLocationRecord[] }),
      planIds.length
        ? supabase.from("service_plans").select("id, name").in("id", planIds)
        : Promise.resolve({ data: [] as ServicePlanRecord[] })
    ]);

    return (data as (CustomerRecord & { subscriptions?: SubscriptionRecord[] | null })[]).map((customer) => {
      const subscription = customer.subscriptions?.[0];
      const location = locations?.find((item) => item.id === subscription?.service_location_id);
      const plan = plans?.find((item) => item.id === subscription?.service_plan_id);

      return {
        id: customer.id,
        accountNumber: customer.account_number,
        name: customer.full_name,
        email: customer.email ?? "Unavailable",
        phone: customer.phone ?? "Unavailable",
        location: location?.city ?? location?.address_line_1 ?? "Unassigned",
        status: customer.status,
        planId: subscription?.service_plan_id ?? "",
        subscriptionId: subscription?.id ?? "",
        serviceStatus: subscription?.status ?? "Pending",
        billingStatus: subscription?.billing_account_ref ? "Mapped" : "Pending Sync",
        portalAccess: customer.portal_user_id ? "Active" : "Not Enabled"
      };
    });
  } catch {
    return [...mockCustomers];
  }
});

export const getCustomerById = cache(async (customerId: string): Promise<CustomerView | null> => {
  const customers = await listCustomers();
  return customers.find((customer) => customer.id === customerId) ?? null;
});

