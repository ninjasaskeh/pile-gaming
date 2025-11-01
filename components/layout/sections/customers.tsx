"use client";

import Image from "next/image";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";

interface CustomerLogo {
  src: string;
  alt: string;
}

const customers: CustomerLogo[] = [
  { src: "/customer/Barbie_Logo.svg", alt: "Barbie" },
  { src: "/customer/Target-logo.svg", alt: "Target" },
  { src: "/customer/ikea.png", alt: "IKEA" },
  { src: "/customer/keycraft-logo.png", alt: "Keycraft" },
  { src: "/customer/DOUGLAS-LOGO.png", alt: "Douglas" },
  { src: "/customer/living_puppets_logo.webp", alt: "Living Puppets" },
  { src: "/customer/logo-living-nature.png", alt: "Living Nature" },
  { src: "/customer/parkstoy.png", alt: "Parks Toy" },
  { src: "/customer/squishable_logo.png", alt: "Squishable" },
  { src: "/customer/toy-sense.jpeg", alt: "Toy Sense" },
  { src: "/customer/Danu_FINALLOGO.webp", alt: "Danu" },
  { src: "/customer/nature-planet logo.webp", alt: "Nature Planet" },
  { src: "/customer/sekiguchi.jpg", alt: "Sekiguchi" },
];

export const CustomersSection = () => {
  return (
    <section id="sponsors" className="max-w-[90%] mx-auto pb-24 sm:pb-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Customer
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Our Customer
        </h2>
      </div>

      <Marquee
        className="gap-[4rem]"
        fade
        innerClassName="gap-[4rem]"
        pauseOnHover
      >
        {customers.map(({ src, alt }) => (
          <div key={src} className="flex items-center justify-center px-2 py-2">
            <Image
              src={encodeURI(src)}
              alt={alt}
              width={240}
              height={120}
              className="w-auto h-12 sm:h-14 md:h-16 lg:h-20 grayscale hover:grayscale-0 transition duration-300 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};
