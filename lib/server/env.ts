function readEnv(name: string) {
  return process.env[name]?.trim();
}

function required(name: string) {
  const value = readEnv(name);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getSupabaseUrl() {
  return required("NEXT_PUBLIC_SUPABASE_URL");
}

export function getSupabasePublishableKey() {
  return readEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ?? required("NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export function getSupabaseServiceRoleKey() {
  return readEnv("SUPABASE_SERVICE_ROLE_KEY") ?? "";
}

export function getAppUrl() {
  return readEnv("NEXT_PUBLIC_APP_URL") ?? "http://localhost:3000";
}
