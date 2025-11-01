import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What is the MOQ (minimum order quantity)?",
    answer:
      "MOQ varies by specifications (pile height, density, color). Please contact us for an estimate that fits your needs.",
    value: "item-1",
  },
  {
    question: "What is the production lead time?",
    answer:
      "Typical lead time is 3–6 weeks after order confirmation and sample/color approval, depending on volume and complexity.",
    value: "item-2",
  },
  {
    question: "Do you support custom colors and textures?",
    answer:
      "Yes. Our R&D team supports color lab dips, handfeel, pile height, and density customization to spec.",
    value: "item-3",
  },
  {
    question: "Which countries do you export to?",
    answer:
      "We ship across Asia, Europe, Africa, Australia, and North America (US, Japan, Korea, Germany, etc.).",
    value: "item-4",
  },
  {
    question: "What about quality certifications?",
    answer:
      "We comply with international quality standards; certification documents are available (site placeholders) and updated regularly.",
    value: "item-5",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQ
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Common Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
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
