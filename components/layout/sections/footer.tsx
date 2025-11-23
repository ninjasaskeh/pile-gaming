"use client";

import { LogoIcon } from "@/components/icons/Icons";
import { FOOTER_CONTENT } from "@/constants";
import type { FooterContent } from "@/lib/content";
import { useSectionRevealPreset } from "@/lib/useGsapReveal";

export const FooterSection = ({ data }: { data?: FooterContent | null }) => {
  const footer = data || FOOTER_CONTENT;
  const {
    brandName,
    address,
    email,
    phone,
    emailHref,
    phoneHref,
    mapEmbedUrl,
  } = footer;

  useSectionRevealPreset("footer", "fadeUp");

  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container grid items-start grid-cols-1 gap-8 py-16 md:grid-cols-3">
        <div className="space-y-3 md:col-span-1 gsap-reveal">
          <a
            rel="noreferrer noopener"
            href="/"
            className="flex items-center gap-2 text-xl font-bold"
          >
            <LogoIcon />
            {brandName}
          </a>
          <p className="text-sm text-muted-foreground">{address}</p>
          <div className="pt-2 space-y-1 text-sm">
            <a
              rel="noreferrer noopener"
              href={emailHref}
              className="block opacity-80 hover:opacity-100"
            >
              Email: {email}
            </a>
            <a
              rel="noreferrer noopener"
              href={phoneHref}
              className="block opacity-80 hover:opacity-100"
            >
              Phone: {phone}
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="overflow-hidden border rounded-md gsap-reveal">
            <iframe
              width="100%"
              height="300px"
              style={{ border: 0 }}
              src={mapEmbedUrl}
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="container text-center pb-14">
        <h3 className="gsap-reveal">
          &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
        </h3>
      </section>
    </footer>
  );
};
