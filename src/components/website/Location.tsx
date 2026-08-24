import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Restaurant } from "@/types/restaurant";

type LocationProps = {
  restaurant: Restaurant;
};

export default function Location({ restaurant }: LocationProps) {
  const mapsUrl =
    restaurant.latitude && restaurant.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          restaurant.address ?? restaurant.name,
        )}`;

  return (
    <section className="bg-brand-surface py-24 sm:py-32">
      <Container>
        <div className="grid overflow-hidden rounded-3xl border border-white/5 bg-brand-bg lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-14">
            <SectionHeading
              eyebrow="Find Us"
              title="Your table is waiting."
              description="Visit us in Layyah for food, conversation and a dining experience worth sharing."
            />

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                  Address
                </p>

                <p className="mt-2 text-sm leading-7 text-brand-muted">
                  {restaurant.address}
                </p>
              </div>

              {restaurant.phone && (
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                    Phone
                  </p>

                  <a
                    href={`tel:${restaurant.phone}`}
                    className="mt-2 block text-sm text-brand-ivory hover:text-brand-gold"
                  >
                    {restaurant.phone}
                  </a>
                </div>
              )}
            </div>

            <div className="mt-9">
              <Button href={mapsUrl}>Get Directions</Button>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden border-t border-white/5 lg:border-l lg:border-t-0">
            <iframe
              title={`${restaurant.name} location`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                restaurant.address ?? restaurant.name,
              )}&output=embed`}
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0 opacity-70 grayscale"
            />

            <div className="pointer-events-none absolute inset-0 bg-brand-gold/5 mix-blend-multiply" />
          </div>
        </div>
      </Container>
    </section>
  );
}
