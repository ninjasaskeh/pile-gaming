import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "@/components/auth/session-provider";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <SessionProvider>
      <SidebarProvider className="relative flex min-h-screen bg-background">
        <AppSidebar className="border-r bg-card" />
        <SidebarInset className="flex flex-1 flex-col">
          <SiteHeader className="sticky top-0 z-10 border-b bg-background/90 backdrop-blur" />
          <div className="flex flex-1 flex-col overflow-auto px-4 py-6 lg:px-8">
            <div className="mx-auto w-full max-w-5xl space-y-6">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default AdminLayout;
