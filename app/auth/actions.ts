"use server";

import { redirect } from "next/navigation";
import { getAppUrl } from "@/lib/server/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function toSearchMessage(basePath: string, type: "error" | "success", message: string) {
  const search = new URLSearchParams({ type, message });
  return `${basePath}?${search.toString()}`;
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect(toSearchMessage("/auth/login", "error", "Email and password are required."));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(toSearchMessage("/auth/login", "error", error.message));
  }

  redirect("/ops");
}

export async function forgotPasswordAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    redirect(toSearchMessage("/auth/forgot-password", "error", "Email is required."));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getAppUrl()}/auth/callback?next=/auth/reset-password`
  });

  if (error) {
    redirect(toSearchMessage("/auth/forgot-password", "error", error.message));
  }

  redirect(
    toSearchMessage(
      "/auth/forgot-password",
      "success",
      "Reset instructions sent. Check your inbox or local Mailpit if using Supabase locally."
    )
  );
}

export async function updatePasswordAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!password || !confirmPassword) {
    redirect(toSearchMessage("/auth/reset-password", "error", "Both password fields are required."));
  }

  if (password !== confirmPassword) {
    redirect(toSearchMessage("/auth/reset-password", "error", "Passwords do not match."));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect(toSearchMessage("/auth/reset-password", "error", error.message));
  }

  redirect(toSearchMessage("/auth/login", "success", "Password updated. You can now sign in."));
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}
