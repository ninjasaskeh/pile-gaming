"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { CUSTOMERS_CONTENT } from "@/constants";
import type { CustomersContent } from "@/lib/content";
import { useSectionRevealPreset } from "@/lib/useGsapReveal";

export const CustomersSection = ({
  data,
}: {
  data?: CustomersContent | null;
}) => {
  useSectionRevealPreset("sponsors", "fadeUp");
  const content = data || {};
  const header = content.header || CUSTOMERS_CONTENT.header;
  const logos = content.logos || CUSTOMERS_CONTENT.logos;

  return (
    <section id="sponsors" className="max-w-[90%] mx-auto pb-24 sm:pb-32">
      <SectionHeader data={header} fallback={CUSTOMERS_CONTENT.header} />

      <Marquee
        className="gap-[4rem] gsap-reveal"
        fade
        innerClassName="gap-[4rem]"
        pauseOnHover
      >
        {logos?.map(({ src, alt }) => (
          <div
            key={src}
            className="flex items-center justify-center px-2 py-2 gsap-reveal"
          >
            <Image
              src={encodeURI(src || "/favicon.ico")}
              alt={alt || "logo"}
              width={240}
              height={120}
              className="w-auto h-12 sm:h-14 md:h-16 lg:h-20 grayscale hover:grayscale-0 transition duration-300 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};
