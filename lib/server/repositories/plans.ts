import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { servicePlans as mockPlans } from "@/lib/data/platform";

export type PlanView = {
  id: string;
  name: string;
  speed: string;
  billingCode: string;
  provisioningTemplate: string;
  status: string;
};

export const listPlans = cache(async (): Promise<PlanView[]> => {
  const supabase = await createSupabaseServerClient();

  try {
    const { data, error } = await supabase
      .from("service_plans")
      .select("id, name, download_speed_mbps, upload_speed_mbps, billing_code, status")
      .order("name");

    if (error || !data || data.length === 0) {
      return [...mockPlans];
    }

    return data.map((plan) => ({
      id: plan.id,
      name: plan.name,
      speed: `${plan.download_speed_mbps} / ${plan.upload_speed_mbps} Mbps`,
      billingCode: plan.billing_code ?? "Pending",
      provisioningTemplate: "Mapped via provisioning template table",
      status: plan.status
    }));
  } catch {
    return [...mockPlans];
  }
});

export const getPlanById = cache(async (planId: string): Promise<PlanView | null> => {
  const plans = await listPlans();
  return plans.find((plan) => plan.id === planId) ?? null;
});

