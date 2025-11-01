import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ClientOnly } from "@/components/ui/client-only";

import "./globals.css";

// Removed Navbar import because navbar is handled in route group layout
import { ThemeProvider } from "@/components/layout/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PT. Putra Pile Indah",
  description:
    "Manufacturer of acrylic imitation fur fabrics (Hi Pile, Boa, Polyester) since 1991 in South Cikarang.",
  metadataBase: new URL("https://putrapile.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background", inter.className)}>
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
