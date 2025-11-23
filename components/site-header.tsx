"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  className?: string;
};

export function SiteHeader({ className }: SiteHeaderProps) {
  const { data } = useSession();
  const email = data?.user?.email ?? "";
  const name = data?.user?.name ?? "";
  const initials = (name || email || "U")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header
      className={cn(
        "group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear",
        className
      )}
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Dashboard</h1>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden text-sm leading-tight sm:flex sm:flex-col sm:items-end">
            {name && <span className="font-medium">{name}</span>}
            {email && <span className="text-muted-foreground">{email}</span>}
          </div>
          <Avatar className="size-7">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
