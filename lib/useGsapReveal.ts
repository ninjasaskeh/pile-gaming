import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Options = {
  x?: number;
  y?: number;
  opacity?: number;
  scale?: number;
  rotate?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  ease?: string;
};

export const useGsapReveal = (
  selector: string,
  deps: unknown[] = [],
  opts: Options = {}
) => {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {
      const {
        x = 0,
        y = 24,
        opacity = 0,
        scale = 1,
        rotate = 0,
        duration = 0.6,
        stagger = 0.08,
        once = true,
        ease = "power2.out",
      } = opts;

      const items = gsap.utils.toArray<HTMLElement>(selector);
      if (!items.length) return;

      // Try to find the nearest section/container from the first item
      const first = items[0];
      const container =
        first.closest("section") || first.parentElement || undefined;

      gsap.set(items, { x, y, opacity, scale, rotate });

      ScrollTrigger.create({
        trigger: container ?? items,
        start: "top 85%",
        onEnter: () => {
          gsap.to(items, {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration,
            stagger,
            ease,
          });
        },
        onLeaveBack: () => {
          if (!once) gsap.set(items, { x, y, opacity, scale, rotate });
        },
        once,
      });
    });

    return () => ctx.current?.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export const useSectionFadeIn = (sectionId: string, deps: unknown[] = []) => {
  const sel = `#${sectionId} .gsap-reveal`;
  useGsapReveal(sel, deps, { y: 20, opacity: 0, duration: 0.6, stagger: 0.06 });
};

type Variant =
  | "fadeUp"
  | "fadeRight"
  | "fadeLeft"
  | "scaleIn"
  | "rotateIn"
  | "pop";

export const useSectionRevealPreset = (
  sectionId: string,
  variant: Variant,
  deps: unknown[] = [],
  override: Partial<Options> = {}
) => {
  const sel = `#${sectionId} .gsap-reveal`;
  const base: Record<Variant, Options> = {
    fadeUp: {
      y: 24,
      opacity: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: "power2.out",
    },
    fadeRight: {
      x: -28,
      opacity: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: "power2.out",
    },
    fadeLeft: {
      x: 28,
      opacity: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: "power2.out",
    },
    scaleIn: {
      scale: 0.96,
      opacity: 0,
      duration: 0.55,
      stagger: 0.05,
      ease: "power3.out",
    },
    rotateIn: {
      rotate: -2,
      y: 16,
      opacity: 0,
      duration: 0.65,
      stagger: 0.06,
      ease: "power2.out",
    },
    pop: {
      y: 10,
      scale: 0.98,
      opacity: 0,
      duration: 0.55,
      stagger: 0.05,
      ease: "back.out(1.4)",
    },
  };
  useGsapReveal(sel, deps, { ...base[variant], ...override });
};
