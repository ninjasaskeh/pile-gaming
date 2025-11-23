import type { Metadata } from "next";
// Local variable fonts
import { plusJakarta, fraunces } from "./fonts";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ClientOnly } from "@/components/ui/client-only";

import "./globals.css";

// Removed Navbar import because navbar is handled in route group layout
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SITE_METADATA_CONTENT } from "@/constants";

export const metadata: Metadata = {
  title: SITE_METADATA_CONTENT.title,
  description: SITE_METADATA_CONTENT.description,
  metadataBase: new URL(SITE_METADATA_CONTENT.url),
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
