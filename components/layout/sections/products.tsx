import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

enum ProService {
  YES = 1,
  NO = 0,
}
interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}
const serviceList: ServiceProps[] = [
  {
    title: "Hi Pile",
    description:
      "Long-pile, ultra-soft fabric for premium plush toys and fashion accessories.",
    pro: 0,
  },
  {
    title: "Boa",
    description:
      "Short, dense pile that's easy to maintain. Ideal for plush toys, jacket linings, and home textiles.",
    pro: 0,
  },
  {
    title: "Polyester",
    description:
      "Durable fiber for industrial applications including paint rollers with even paint distribution.",
    pro: 0,
  },
  {
    title: "Color & Texture Customization",
    description:
      "R&D support to match color, density, and finishing to your specifications.",
    pro: 1,
  },
];

export const ProductsSection = () => {
  return (
    <section id="services" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Product Lines
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Acrylic Imitation Fur Fabrics
      </h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Fur fabric solutions for plush toys, apparel, home textiles, and
        industrial applications.
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto">
        {serviceList.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="bg-muted/60 dark:bg-card h-full relative"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Badge
              data-pro={ProService.YES === pro}
              variant="secondary"
              className="absolute -top-2 -right-3 data-[pro=false]:hidden"
            >
              PRO
            </Badge>
          </Card>
        ))}
      </div>
    </section>
  );
};
