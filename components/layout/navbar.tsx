"use client";
import { ChevronsDown, Globe, Menu } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { ToggleTheme } from "./toggle-theme";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  { href: "#hero", label: "Home" },
  { href: "#services", label: "Products" },
  { href: "#contact", label: "Contact" },
  { href: "#faq", label: "FAQ" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header
      className="group w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky z-40
      overflow-hidden rounded-2xl flex justify-between items-center p-2
      border border-white/10 dark:border-white/10
      bg-background/40 supports-[backdrop-filter]:bg-background/30 backdrop-blur-xl backdrop-saturate-150
      shadow-lg shadow-black/5 hover:shadow-black/10 transition-shadow"
    >
      {/* liquid glass glow layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 md:opacity-70
        before:content-[''] before:absolute before:inset-0
        before:bg-[radial-gradient(1000px_320px_at_0%_-20%,hsl(var(--primary)/0.15),transparent),radial-gradient(800px_200px_at_120%_120%,hsl(var(--primary)/0.10),transparent)]
        before:animate-[pulse_8s_ease-in-out_infinite]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px -z-10 bg-white/30 dark:bg-white/20"
      />
      <Link href="/" className="font-bold text-lg flex items-center">
        <Globe className="w-8 h-8 mr-2 text-primary" />
        Putra Pile Indah
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <Globe className="w-8 h-8 mr-2 text-primary" />
                    Putra Pile Indah
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />

              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link href={href} className="text-base px-2">
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex">
        <ToggleTheme />
      </div>
    </header>
  );
};
