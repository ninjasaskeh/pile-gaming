"use client";
import { Building2, Clock, Mail, Phone } from "lucide-react";
import type { ContactContent } from "@/lib/content";
import { useSectionRevealPreset } from "@/lib/useGsapReveal";

export const ContactSection = ({ data }: { data?: ContactContent | null }) => {
  useSectionRevealPreset("contact", "fadeUp");

  return (
    <section id="contact" className="container py-24 sm:py-32">
      <section className="grid grid-cols-1 gap-8">
        <div className="gsap-reveal">
          <div className="mb-4">
            <h2 className="text-lg text-primary mb-2 tracking-wider">
              {data?.kicker || ""}
            </h2>

            <h2 className="text-3xl md:text-4xl font-bold">
              {data?.title || ""}
            </h2>
          </div>
          <p className="mb-8 text-muted-foreground lg:w-5/6">
            {data?.description || ""}
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex gap-2 mb-1">
                <Building2 />
                <div className="font-bold">Address</div>
              </div>
              <div>{data?.address || ""}</div>
            </div>

            <div>
              <div className="flex gap-2 mb-1">
                <Phone />
                <div className="font-bold">Phone</div>
              </div>
              <a href={data?.phoneHref || "tel:"} className="hover:underline">
                {data?.phone || ""}
              </a>
            </div>

            <div>
              <div className="flex gap-2 mb-1">
                <Mail />
                <div className="font-bold">Email</div>
              </div>
              <a
                href={data?.emailHref || "mailto:"}
                className="hover:underline"
              >
                {data?.email || ""}
              </a>
            </div>

            <div>
              <div className="flex gap-2">
                <Clock />
                <div className="font-bold">Business Hours</div>
              </div>

              <div>
                <div>{data?.businessHours?.days || ""}</div>
                <div>{data?.businessHours?.hours || ""}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
