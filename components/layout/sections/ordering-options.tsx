import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const plans: PlanProps[] = [
  {
    title: "Samples & Validation",
    popular: 0,
    description:
      "Lab dips, swatches/handfeel, and spec validation prior to production.",
    buttonText: "Request Samples",
    benefitList: [
      "Lab dip (color) by request",
      "Material swatch",
      "Custom pile height & density",
      "Lead time estimate",
    ],
  },
  {
    title: "Regular Orders",
    popular: 1,
    description:
      "Routine production for recurring needs with clear delivery SLAs.",
    buttonText: "Request a Quote",
    benefitList: [
      "MOQ tailored to specs",
      "Lead time 3–6 weeks",
      "Batch-by-batch QC",
      "Export documents",
    ],
  },
  {
    title: "Projects & OEM/ODM",
    popular: 0,
    description:
      "Large-scale solutions and deep customization for brands and manufacturers.",
    buttonText: "Discuss Requirements",
    benefitList: [
      "Custom technical specs",
      "Staged production schedule",
      "R&D support",
      "Long-term contracts",
    ],
  },
];

export const OrderingOptionsSection = () => {
  return (
    <section className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Ordering
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Ordering Options
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
        Choose the path that fits your needs best—from samples to large-scale
        OEM/ODM projects.
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {plans.map(
          ({ title, popular, description, buttonText, benefitList }) => (
            <Card
              key={title}
              className={
                popular === PopularPlan?.YES
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="pb-2">{title}</CardTitle>

                <CardDescription className="pb-4">
                  {description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check className="text-primary mr-2" />
                      <h3>{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant={
                    popular === PopularPlan?.YES ? "default" : "secondary"
                  }
                  className="w-full"
                >
                  {buttonText}
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
