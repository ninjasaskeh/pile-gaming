import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "Factory",
    title: "266 Production Machines",
    description:
      "Large-scale, standardized production lines for stable quality and flexible volume.",
  },
  {
    icon: "Gauge",
    title: "500,000 Yards/Month",
    description:
      "High capacity to fulfill large or recurring orders with competitive lead times.",
  },
  {
    icon: "Users",
    title: "> 500 Employees",
    description:
      "Experienced teams across knitting, dyeing, finishing, and QA/QC stages.",
  },
  {
    icon: "ShieldCheck",
    title: "Strict Quality Control",
    description:
      "Batch-by-batch inspection to ensure uniform texture, color, and durability to spec.",
  },
  {
    icon: "Globe",
    title: "Wide Export Network",
    description:
      "Shipping across Asia, Europe, Africa, Australia, and North America (US, Japan, Germany, etc.).",
  },
  {
    icon: "Palette",
    title: "Color & Texture Customization",
    description:
      "R&D support for OEM/ODM needs: density, pile height, handfeel, and finishing.",
  },
];

export const CapabilitiesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Capabilities
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        What Sets Us Apart
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Consistent quality, high capacity, and on-time delivery—backed by robust
        facilities and experienced teams.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
