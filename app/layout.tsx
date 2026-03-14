import type { Metadata } from "next";
import type { ReactNode } from "react";
import { APP_CONFIG } from "@/lib/constants/app-config";
import { THEME_STORAGE_KEY } from "@/lib/constants/theme";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: APP_CONFIG.name,
  description:
    "Cloud-native broadband orchestration platform for ISP operations, service activation, monitoring, and customer self-service."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const stored = window.localStorage.getItem('${THEME_STORAGE_KEY}');
                const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.dataset.theme = stored || system;
              })();
            `
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
