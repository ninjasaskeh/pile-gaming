"use client";
import { Badge } from "@/components/ui/badge";
import WorldMap from "@/components/ui/world-map";

export const MarketsSection = () => {
  const origin = { lat: -24.208763, lng: 109.845599, label: "Jakarta" };
  const markets = [
    { lat: 31.052235, lng: -100.243683, label: "USA" },
    { lat: 23.676393, lng: 139.650311, label: "Japan" },
    { lat: 22.566535, lng: 127.877969, label: "Korea" },
    { lat: 39.9042, lng: 116.407396, label: "China" },
    { lat: -7.599512, lng: 124.984222, label: "Filipina" },
    { lat: 4.027763, lng: 105.83416, label: "Vietnam" },
    { lat: 9.756331, lng: 95.501765, label: "Thailand" },
    { lat: -43.280937, lng: 135.130009, label: "Australia" },
    { lat: 18.684422, lng: 65.047882, label: "Pakistan" },
    { lat: 40.520008, lng: 9.404954, label: "Germany" },
    { lat: 30.376888, lng: 9.541694, label: "Switzerland" },
    { lat: 45.229676, lng: 17.012229, label: "Poland" },
    { lat: -35.87919, lng: 47.507905, label: "Madagascar" },
  ];

  const dots = markets.map((m) => ({ start: origin, end: m }));

  return (
    <section id="markets" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Current Export Markets
        </h2>
        <h3 className="text-3xl md:text-4xl text-center font-bold">
          Shipping From Indonesia To The World
        </h3>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Visualizing representative routes from our factory in Cikarang,
          Indonesia to key client destinations.
        </p>
      </div>

      <div className="rounded-xl overflow-hidden bg-muted/30 dark:bg-card/50">
        <WorldMap dots={dots} />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
        {markets.map((m) => (
          <Badge
            key={`${m.label}-${m.lat}-${m.lng}`}
            className="px-3 py-1 rounded-full border bg-primary"
          >
            {m.label}
          </Badge>
        ))}
      </div>
    </section>
  );
};
