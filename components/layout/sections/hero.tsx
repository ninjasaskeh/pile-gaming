"use client";
import { buttonVariants } from "@/components/ui/button";
import { HeroCards } from "../HeroCards";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  useEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>("#hero .gsap-reveal");
    if (!items.length) return;
    gsap.set(items, { x: -28, opacity: 0 });
    ScrollTrigger.create({
      trigger: document.querySelector("#hero") || items,
      start: "top 85%",
      onEnter: () => {
        gsap.to(items, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
        });
      },
      once: true,
    });
  }, []);

  return (
    <section
      id="hero"
      className="container grid gap-10 py-20 lg:grid-cols-2 place-items-center md:py-32"
    >
      <div className="space-y-6 text-center lg:text-start">
        <main className="text-5xl font-bold md:text-6xl gsap-reveal">
          <h1 className="inline">
            <span className="inline text-transparent bg-clip-text bg-gradient-to-b from-primary/60 to-primary">
              PT. Putra Pile Indah
            </span>
          </h1>
          <h2 className="block mt-2">
            Acrylic Imitation Fur Fabrics Manufacturer
          </h2>
        </main>

        <p className="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0 gsap-reveal">
          The leading manufacturer since 1991. Products: Hi Pile, Boa &
          Polyester. Located in Cikarang Selatan, Bekasi, Indonesia.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4 gsap-reveal">
          <a
            href="#contact"
            className={`w-full md:w-1/3 ${buttonVariants({})}`}
          >
            Contact Us
          </a>

          <a
            rel="noreferrer noopener"
            href="#services"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            View Products
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10 gsap-reveal">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow" />
    </section>
  );
};
