import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import type { Restaurant } from "@/types/restaurant";

type HeroProps = {
  restaurant: Restaurant;
};

export default function Hero({ restaurant }: HeroProps) {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-brand-bg">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[420px] -translate-x-1/2 rounded-full bg-brand-gold/10 blur-[120px]" />

      {/* Fine border frame */}
      <div className="pointer-events-none absolute inset-4 rounded-[28px] border border-brand-gold/10 sm:inset-6 lg:inset-8" />

      <Container className="flex min-h-[100svh] items-center justify-center py-28">
        <div className="relative max-w-4xl text-center">
          <div className="mb-7 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-brand-gold/50 sm:w-16" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-gold sm:text-xs">
              {restaurant.tagline}
            </span>

            <span className="h-px w-10 bg-brand-gold/50 sm:w-16" />
          </div>

          <p className="mb-3 font-display text-lg text-brand-gold sm:text-xl">
            Welcome to
          </p>

          <h1 className="font-display text-[4rem] font-medium leading-[0.8] tracking-[-0.04em] text-brand-ivory sm:text-[6.5rem] lg:text-[9rem]">
            MUSA
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-brand-muted sm:text-base sm:leading-8">
            {restaurant.description}
          </p>

          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button href="/menu">Explore Our Menu</Button>

            <Button
              href={
                restaurant.whatsapp
                  ? `https://wa.me/${restaurant.whatsapp}`
                  : "/contact"
              }
              variant="secondary"
            >
              Order on WhatsApp
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.25em] text-brand-muted">
            <span>Since</span>
            <span className="h-1 w-1 rounded-full bg-brand-gold" />
            <span>Layyah</span>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-brand-muted sm:flex">
        <span className="text-[9px] uppercase tracking-[0.3em]">
          Scroll to discover
        </span>

        <span className="h-10 w-px bg-gradient-to-b from-brand-gold to-transparent" />
      </div>
    </section>
  );
}
