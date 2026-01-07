import type { Metadata } from "next";
// Local variable fonts
import { plusJakarta, fraunces } from "./fonts";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ClientOnly } from "@/components/ui/client-only";

import "./globals.css";

// Removed Navbar import because navbar is handled in route group layout
import { ThemeProvider } from "@/components/layout/theme-provider";

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  process.env.NEXTAUTH_URL ??
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(plusJakarta.variable, fraunces.variable)}
    >
      <body className={cn("min-h-screen bg-background font-sans")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ClientOnly>
            <Toaster />
          </ClientOnly>
        </ThemeProvider>
      </body>
    </html>
  );
}
