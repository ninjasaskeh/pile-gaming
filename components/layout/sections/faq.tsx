"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqContent } from "@/lib/content";
import { useSectionRevealPreset } from "@/lib/useGsapReveal";

export const FAQSection = ({ data }: { data?: FaqContent | null }) => {
  useSectionRevealPreset("faq", "fadeUp");
  const content = data || {};
  const kicker = content.kicker || "";
  const title = content.title || "";
  const items = content.items || [];

  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider gsap-reveal">
          {kicker}
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold gsap-reveal">
          {title}
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {items?.map(({ question, answer, value }, index) => (
          <AccordionItem
            key={value || `faq-${index}`}
            value={value || `faq-${index}`}
            className="gsap-reveal"
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
