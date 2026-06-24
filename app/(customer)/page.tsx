export const dynamic = 'force-dynamic'

import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { FOOD_IMAGES } from "@/lib/images";

export default async function HomePage() {
  const [settings, popularProducts] = await Promise.all([
    getSettings(),
    prisma.product.findMany({
      where: { popular: true, available: true },
      include: { category: true },
      take: 4,
    }),
  ]);

  return (
    <>
      {/* Hero — editoriaal, serif, warm en rustig */}
      <section className="bg-background">
        <div className="container mx-auto px-4 py-16 text-center md:py-24">
          <p className="font-display text-base italic text-verdec-yellow">
            {settings.restaurantName}
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            {settings.tagline}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Elke ochtend met de hand gebakken brood, viennoiserie en gebak.
            Reserveer online en pik je verse selectie op.
          </p>
          <Link href="/menu" className="mt-9 inline-block">
            <Button size="lg" className="px-8 text-base">
              Reserveer je bestelling
            </Button>
          </Link>
        </div>
        <div className="relative mx-auto h-[42vh] max-h-[460px] w-full max-w-5xl overflow-hidden rounded-lg md:h-[52vh]">
          <Image
            src={FOOD_IMAGES.hero}
            alt="Vers gebakken brood"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      </section>

      {popularProducts.length > 0 && (
        <section className="container mx-auto px-4 py-20">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-px w-16 bg-verdec-yellow" />
            <h2 className="font-display text-4xl font-semibold">Vers uit de oven</h2>
            <p className="mt-2 text-muted-foreground">Onze klassiekers van het huis</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/menu">
              <Button variant="outline" size="lg">
                Bekijk het volledige assortiment
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Contact — elegant blok met dunne lijnen */}
      <section className="border-t border-border bg-secondary/40 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-display text-4xl font-semibold">Bezoek de bakkerij</h2>
          <div className="mx-auto grid max-w-3xl gap-10 text-center md:grid-cols-3">
            {[
              { icon: MapPin, title: "Adres", value: settings.address },
              { icon: Phone, title: "Telefoon", value: settings.phone },
              { icon: Clock, title: "Openingsuren", value: settings.openingHours },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <item.icon className="mb-3 h-7 w-7 text-verdec-yellow" />
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
