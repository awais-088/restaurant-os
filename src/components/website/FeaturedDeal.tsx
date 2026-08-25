import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import type { RestaurantDeal } from "@/types/content";

type FeaturedDealProps = {
  deal: RestaurantDeal;
  whatsapp?: string;
};

export default function FeaturedDeal({ deal, whatsapp }: FeaturedDealProps) {
  const orderLink = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        `Assalam-o-Alaikum, I would like to know more about the ${deal.title} at MUSA Cafe.`,
      )}`
    : "/contact";

  return (
    <section className="relative overflow-hidden bg-brand-surface py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(201,164,92,0.12),transparent_35%)]" />

      <Container className="relative">
        <div className="overflow-hidden rounded-3xl border border-brand-gold/20 bg-brand-bg">
          <div className="grid lg:grid-cols-2">
            <div className="flex min-h-[420px] items-center p-8 sm:p-12 lg:p-16">
              <div className="max-w-xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-brand-gold">
                  {deal.badge ?? "Featured"}
                </span>

                <h2 className="mt-5 font-display text-5xl leading-[0.95] text-brand-ivory sm:text-6xl">
                  {deal.title}
                </h2>

                <p className="mt-6 max-w-lg text-sm leading-7 text-brand-muted sm:text-base">
                  {deal.description}
                </p>
                {deal.price !== undefined && (
                  <p className="mt-5 font-display text-2xl text-brand-gold">
                    Rs. {deal.price.toLocaleString()}
                  </p>
                )}

                <div className="mt-8">
                  <Button href={orderLink}>Ask About This Deal</Button>
                </div>
              </div>
            </div>

            <div className="relative min-h-[320px] bg-gradient-to-br from-brand-gold/20 via-brand-surface to-brand-bg lg:min-h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="font-display text-[8rem] leading-none text-brand-gold/20">
                    M
                  </span>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.35em] text-brand-muted/50">
                    Featured Experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
