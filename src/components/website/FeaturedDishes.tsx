import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { FeaturedDish } from "@/types/content";

type FeaturedDishesProps = {
  dishes: FeaturedDish[];
};

export default function FeaturedDishes({ dishes }: FeaturedDishesProps) {
  return (
    <section className="bg-brand-bg py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="From Our Kitchen"
            title="Signature dishes worth coming back for."
            description="A selection of favorites inspired by the flavors and variety that make MUSA a destination for dining in Layyah."
          />

          <Link
            href="/menu"
            className="w-fit text-xs font-bold uppercase tracking-[0.2em] text-brand-gold transition hover:text-brand-gold-light"
          >
            View Full Menu
            <span className="ml-2">↗</span>
          </Link>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {dishes.map((dish, index) => (
            <article
              key={dish.id}
              className={`group overflow-hidden rounded-2xl border border-white/5 bg-brand-surface ${
                index === 0 ? "md:-translate-y-5" : ""
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-brand-surface-light via-brand-surface to-brand-bg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-display text-5xl text-brand-gold/30">
                      M
                    </span>

                    <p className="mt-3 text-[9px] uppercase tracking-[0.3em] text-brand-muted/50">
                      Photography Coming Soon
                    </p>
                  </div>
                </div>

                <div className="absolute left-5 top-5 rounded-full border border-brand-gold/30 bg-brand-bg/70 px-3 py-1.5 backdrop-blur-md">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                    {dish.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="font-display text-3xl text-brand-ivory">
                  {dish.name}
                </h3>

                <p className="mt-3 text-sm leading-7 text-brand-muted">
                  {dish.description}
                </p>

                <div className="mt-6 h-px w-8 bg-brand-gold/50 transition-all duration-500 group-hover:w-16" />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
