"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { LightBulbIcon, PlaneIcon } from "../icons/Icons";
import { Badge } from "../ui/badge";
import Image from "next/image";

export const HeroCards = () => {
  // Refs for cards
  const refTestimonial = useRef<HTMLDivElement | null>(null);
  const refCompany = useRef<HTMLDivElement | null>(null);
  const refCapacity = useRef<HTMLDivElement | null>(null);
  const refProducts = useRef<HTMLDivElement | null>(null);

  // Entry and interactive tilt animations
  useEffect(() => {
    const cards = [
      refTestimonial.current,
      refCompany.current,
      refCapacity.current,
      refProducts.current,
    ].filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      // Entry animation: each card with its own direction for variety
      gsap.set(cards, { opacity: 0, y: 24, rotate: -1, scale: 0.98 });
      const froms = [
        { x: -24, y: -10, rotate: -2 }, // testimonial
        { x: 18, y: -12, rotate: 1 }, // company
        { x: -12, y: 20, rotate: 0 }, // capacity
        { x: 20, y: 18, rotate: 2 }, // products
      ];
      cards.forEach((el, i) => gsap.set(el, froms[i] || {}));
      gsap.to(cards, {
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });

      // Tilt interactivity per card
      const maxTilt = 10;
      const addTilt = (el: HTMLDivElement) => {
        const move = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(el, {
            rotateY: px * maxTilt,
            rotateX: -py * maxTilt,
            y: -4,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 800,
            transformOrigin: "center",
          });
        };
        const leave = () =>
          gsap.to(el, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          });
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        return () => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
        };
      };
      const cleanups = cards.map(addTilt);
      return () => cleanups.forEach((c) => c());
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]"
      style={{ perspective: "1200px" }}
    >
      {/* Testimonial (Quality & Reliability) */}
      <Card
        ref={refTestimonial}
        className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10 will-change-transform"
      >
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="p-1 mt-1 rounded-full bg-primary/20">
            <PlaneIcon />
          </div>

          <div className="flex flex-col">
            <CardTitle className="text-lg">Quality & Reliability</CardTitle>
            <CardDescription>Manufacturing Partner</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          “Consistent acrylic imitation fur fabrics, batch after batch. Great
          communication and on-time delivery.”
        </CardContent>
      </Card>

      {/* Company overview with logo */}
      <Card
        ref={refCompany}
        className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10 will-change-transform"
      >
        <CardHeader className="flex items-center justify-center pb-2 mt-8">
          <div className="absolute flex items-center justify-center rounded-full -top-12 w-22 h-22 bg-secondary">
            <Image
              src="/pile-logo.png"
              alt="PT. Putra Pile Indah logo"
              width={80}
              height={80}
              className="object-contain h-20 w-20"
            />
          </div>
          <CardTitle className="text-center">PT. Putra Pile Indah</CardTitle>
          <CardDescription className="font-normal text-primary">
            Established 1991 · Cikarang, Indonesia
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-2 text-sm text-center">
          High-quality acrylic imitation fur fabrics for plush toys, garments,
          home textiles, and paint rollers.
        </CardContent>

        <CardFooter className="gap-2">
          <Button size="sm" asChild>
            <a href="#services">View Products</a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href="#contact">Contact</a>
          </Button>
        </CardFooter>
      </Card>

      {/* Production Capacity */}
      <Card
        ref={refCapacity}
        className="absolute top-[210px] left-[50px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10 will-change-transform"
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            Production Capacity
            <span className="relative flex size-3">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-primary"></span>
              <span className="relative inline-flex rounded-full size-3 bg-primary"></span>
            </span>
          </CardTitle>
          <CardDescription>
            Scalable output with quality-focused operations.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-3 text-sm">
            {[
              "500,000 yards/month",
              "266 machines in operation",
              "500+ skilled workers",
            ].map((benefit) => (
              <span key={benefit} className="flex items-start">
                <Check className="mt-0.5 text-green-500" size={18} />
                <span className="ml-2">{benefit}</span>
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Lines */}
      <Card
        ref={refProducts}
        className="absolute w-[350px] -right-[10px] bottom-[-20px] drop-shadow-xl shadow-black/10 dark:shadow-white/10 will-change-transform"
      >
        <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
          <div className="p-1 mt-1 bg-primary/20 rounded-2xl">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>Product Lines</CardTitle>
            <CardDescription className="mt-2 text-md">
              Acrylic imitation fur fabrics in multiple constructions.
            </CardDescription>
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                { name: "Hi Pile" },
                { name: "Boa" },
                { name: "Polyester" },
              ].map((i) => (
                <Badge key={i.name} variant="secondary" className="text-xs">
                  {i.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
