import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Restaurant } from "@/types/restaurant";

type StoryProps = {
  restaurant: Restaurant;
};

export default function Story({ restaurant }: StoryProps) {
  return (
    <section className="bg-brand-bg py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-white/5 bg-brand-surface">
              <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.12),transparent_50%)]">
                <div className="text-center">
                  <span className="font-display text-[9rem] leading-none text-brand-gold/20">
                    M
                  </span>

                  <p className="mt-3 text-[9px] uppercase tracking-[0.35em] text-brand-muted/50">
                    Restaurant Photography
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-4 hidden rounded-2xl border border-brand-gold/20 bg-brand-surface px-6 py-5 sm:block">
              <p className="font-display text-2xl text-brand-gold">Layyah</p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-brand-muted">
                Our home
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="A table made for good food and good company."
              description={
                restaurant.description ??
                "A place where food, atmosphere and people come together."
              }
            />

            <p className="mt-6 max-w-xl text-sm leading-8 text-brand-muted">
              MUSA is designed around the simple pleasure of gathering around a
              table. From traditional Pakistani favorites and BBQ to cafe and
              continental choices, there is something for every occasion.
            </p>

            <div className="mt-8">
              <Button href="/about" variant="secondary">
                Discover Our Story
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
