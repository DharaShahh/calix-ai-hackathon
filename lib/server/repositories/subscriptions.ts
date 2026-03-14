import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { subscriptions as mockSubscriptions } from "@/lib/data/platform";

export type SubscriptionView = {
  id: string;
  customerId: string;
  planId: string;
  status: string;
  address: string;
  activationDate: string;
  billingRef: string;
};

export const listSubscriptions = cache(async (): Promise<SubscriptionView[]> => {
  const supabase = await createSupabaseServerClient();

  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select(
        `
          id,
          customer_id,
          service_plan_id,
          status,
          activation_date,
          billing_account_ref,
          service_locations (
            address_line_1,
            city
          )
        `
      )
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return [...mockSubscriptions];
    }

    return data.map((subscription) => {
      const location = Array.isArray(subscription.service_locations)
        ? subscription.service_locations[0]
        : subscription.service_locations;

      return {
        id: subscription.id,
        customerId: subscription.customer_id,
        planId: subscription.service_plan_id,
        status: subscription.status,
        address: location ? `${location.address_line_1}, ${location.city}` : "Unassigned",
        activationDate: subscription.activation_date ?? "Pending",
        billingRef: subscription.billing_account_ref ?? "Pending"
      };
    });
  } catch {
    return [...mockSubscriptions];
  }
});

export const getSubscriptionById = cache(async (subscriptionId: string): Promise<SubscriptionView | null> => {
  const subscriptions = await listSubscriptions();
  return subscriptions.find((subscription) => subscription.id === subscriptionId) ?? null;
});
