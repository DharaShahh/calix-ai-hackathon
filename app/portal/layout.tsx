import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { getAppSession } from "@/lib/auth/session";
import { PORTAL_NAV_ITEMS } from "@/lib/constants/routes";

export default async function PortalLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getAppSession();

  if (!session) {
    redirect("/auth/login?message=Please%20sign%20in%20to%20access%20the%20portal.&type=error");
  }

  if (session.userType !== "customer") {
    redirect("/ops");
  }

  return (
    <AppShell
      title="Customer Portal"
      eyebrow="Read-heavy self-service"
      navItems={PORTAL_NAV_ITEMS}
      accent="portal"
      currentUser={{ name: session.fullName, role: session.role }}
    >
      {children}
    </AppShell>
  );
}
