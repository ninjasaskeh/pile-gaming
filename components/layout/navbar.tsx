"use client";
import { ChevronsDown, Globe, Menu } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
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
import { useRouter } from "next/navigation";
import { ToggleTheme } from "./toggle-theme";
import { COMPANY_INFO, NAVIGATION_LINKS } from "@/constants";

export const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("#hero");
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const ids = NAVIGATION_LINKS.map((l) =>
      l.href.startsWith("#") ? l.href.slice(1) : ""
    ).filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            setActive(id);
          }
        });
      },
      { root: null, threshold: 0.5 }
    );

    sections.forEach((sec) => observer.observe(sec));

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 76; // fixed navbar height + margin
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top, behavior: "smooth" });
      setActive(href);
    }
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        className={cn(
          "pointer-events-auto group w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl mt-2",
          "overflow-hidden rounded-2xl flex justify-between items-center p-2",
          "border border-white/10 dark:border-white/10",
          "supports-[backdrop-filter]:bg-background/30 backdrop-blur-xl backdrop-saturate-150",
          "shadow-lg shadow-black/5 transition-all duration-300",
          scrolled ? "bg-background/70" : "bg-background/40"
        )}
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
          {COMPANY_INFO.displayName}
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
                  {NAVIGATION_LINKS.map(({ href, label }) => (
                    <Button
                      key={href}
                      onClick={(e) => {
                        if (href.startsWith("#")) {
                          scrollTo(href)(e);
                        } else {
                          e.preventDefault();
                          router.push(href);
                        }
                        setIsOpen(false);
                      }}
                      variant="ghost"
                      className="justify-start text-base"
                    >
                      {label}
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
              {NAVIGATION_LINKS.map(({ href, label }) => {
                const isActive = active === href;
                return (
                  <NavigationMenuLink key={href} asChild>
                    <a
                      href={href}
                      onClick={scrollTo(href)}
                      className={cn(
                        "relative text-base px-3 py-1 transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-foreground/80 hover:text-foreground"
                      )}
                    >
                      {label}
                      <span
                        className={cn(
                          "absolute left-2 right-2 -bottom-1 h-[2px] rounded bg-primary/80 transition-opacity",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </a>
                  </NavigationMenuLink>
                );
              })}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex">
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
};
