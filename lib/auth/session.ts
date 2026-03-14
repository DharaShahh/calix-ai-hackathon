import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { USER_ROLES, type UserRole } from "@/lib/constants/roles";

export type AppSession = {
  authUserId: string;
  email: string;
  fullName: string;
  role: UserRole;
  userType: "staff" | "customer";
};

function normalizeRole(role?: string | null): UserRole {
  const value = role?.trim().toLowerCase();

  switch (value) {
    case "admin":
      return USER_ROLES.admin;
    case "network engineer":
    case "engineer":
      return USER_ROLES.engineer;
    case "noc operator":
    case "noc":
      return USER_ROLES.noc;
    case "customer support":
    case "support":
      return USER_ROLES.support;
    case "technician":
    case "technician lite":
      return USER_ROLES.technician;
    case "customer":
      return USER_ROLES.customer;
    default:
      return USER_ROLES.support;
  }
}

function deriveFullName(user: {
  user_metadata?: { full_name?: string; name?: string };
  email?: string;
}) {
  return user.user_metadata?.full_name ?? user.user_metadata?.name ?? user.email ?? "Unknown user";
}

export const getAppSession = cache(async (): Promise<AppSession | null> => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return null;
  }

  const metadataRole = user.app_metadata?.role ?? user.user_metadata?.role;
  const metadataUserType = user.app_metadata?.user_type ?? user.user_metadata?.user_type;

  try {
    const { data: profile } = await supabase
      .from("users")
      .select("full_name, user_type, status, user_roles(role:roles(name))")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    const dbRoleName =
      Array.isArray(profile?.user_roles) && profile.user_roles.length > 0
        ? (profile.user_roles[0] as { role?: { name?: string | null } | null }).role?.name
        : null;

    return {
      authUserId: user.id,
      email: user.email,
      fullName: profile?.full_name ?? deriveFullName(user),
      role: normalizeRole(dbRoleName ?? metadataRole),
      userType: profile?.user_type === "customer" ? "customer" : metadataUserType === "customer" ? "customer" : "staff"
    };
  } catch {
    return {
      authUserId: user.id,
      email: user.email,
      fullName: deriveFullName(user),
      role: normalizeRole(metadataRole),
      userType: metadataUserType === "customer" ? "customer" : "staff"
    };
  }
});

export async function isAuthenticated() {
  const session = await getAppSession();
  return Boolean(session);
}
