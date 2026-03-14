import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { getAppSession } from "@/lib/auth/session";
import { OPS_NAV_ITEMS } from "@/lib/constants/routes";

export default async function OpsLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getAppSession();

  if (!session) {
    redirect("/auth/login?message=Please%20sign%20in%20to%20continue.&type=error");
  }

  if (session.userType === "customer") {
    redirect("/portal");
  }

  return (
    <AppShell
      title="Operations Console"
      eyebrow="Internal ISP workflows"
      navItems={OPS_NAV_ITEMS.filter((item) => item.roles.includes(session.role))}
      currentUser={{ name: session.fullName, role: session.role }}
    >
      {children}
    </AppShell>
  );
}
