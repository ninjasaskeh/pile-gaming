"use client";

import { useSectionRevealPreset } from "@/lib/useGsapReveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";
import { BENEFITS_CONTENT } from "@/constants";
import type { BenefitsContent } from "@/lib/content";

export const BenefitsSection = ({
  data,
}: {
  data?: BenefitsContent | null;
}) => {
  useSectionRevealPreset("benefits", "fadeUp");
  const content = data || {};
  const kicker = content.kicker ?? BENEFITS_CONTENT.kicker;
  const title = content.title ?? BENEFITS_CONTENT.title;
  const description = content.description ?? BENEFITS_CONTENT.description;
  const items = content.items ?? BENEFITS_CONTENT.items;

  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div className="gsap-reveal space-y-4">
          <h2 className="text-lg text-primary mb-2 tracking-wider">{kicker}</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground mb-8">{description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {items?.map(
            ({ icon, title: itemTitle, description: itemDesc }, index) => (
              <Card
                key={itemTitle || index}
                className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number gsap-reveal"
              >
                <CardHeader>
                  <div className="flex justify-between">
                    <Icon
                      name={(icon || "") as keyof typeof icons}
                      size={32}
                      color="hsl(var(--primary))"
                      className="mb-6 text-primary"
                    />
                    <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                      0{index + 1}
                    </span>
                  </div>

                  <CardTitle>{itemTitle}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {itemDesc}
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
};
