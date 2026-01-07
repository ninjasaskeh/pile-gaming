"use client";

import * as React from "react";
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  FileCodeIcon,
  FileIcon,
  HelpCircleIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

const data = {
  navMain: [
    {
      title: "Product Overview",
      url: "/dashboard/product-overview",
      icon: FileCodeIcon,
    },
    {
      title: "Markets",
      url: "/dashboard/markets",
      icon: BarChartIcon,
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: UsersIcon,
    },
    {
      title: "FAQ",
      url: "/dashboard/faq",
      icon: HelpCircleIcon,
    },
    {
      title: "Footer",
      url: "/dashboard/footer",
      icon: FileIcon,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const user = {
    name: session?.user?.name ?? "Admin",
    email: session?.user?.email ?? "",
    avatar: session?.user?.image ?? null,
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Putra Pile Indah</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
