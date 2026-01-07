"use client";

import { useSectionRevealPreset } from "@/lib/useGsapReveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";
import type { CapabilitiesContent } from "@/lib/content";

export const CapabilitiesSection = ({
  data,
}: {
  data?: CapabilitiesContent | null;
}) => {
  useSectionRevealPreset("features", "fadeUp");
  const content = data || {};
  const kicker = content.kicker ?? "";
  const title = content.title ?? "";
  const description = content.description ?? "";
  const items = content.items ?? [];

  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider gsap-reveal">
        {kicker}
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4 gsap-reveal">
        {title}
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8 gsap-reveal">
        {description}
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items?.map(({ icon, title: itemTitle, description: itemDesc }) => (
          <div key={title} className="gsap-reveal">
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={(icon || "") as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>
                <CardTitle>{itemTitle}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-center">
                {itemDesc}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
