import Link from "next/link";
import Container from "@/components/ui/Container";
import type { Restaurant } from "@/types/restaurant";

type FooterProps = {
  restaurant: Restaurant;
};

export default function Footer({ restaurant }: FooterProps) {
  return (
    <footer className="border-t border-white/5 bg-brand-bg pb-20 lg:pb-0">
      <Container>
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="inline-block">
              <p className="font-display text-4xl text-brand-ivory">MUSA</p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-brand-muted">
                Cafe & Restaurant
              </p>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-brand-muted">
              {restaurant.description}
            </p>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold">
              Explore
            </p>

            <div className="mt-5 flex flex-col gap-3 text-sm text-brand-muted">
              <Link href="/menu" className="hover:text-brand-ivory">
                Menu
              </Link>

              <Link href="/about" className="hover:text-brand-ivory">
                Our Story
              </Link>

              <Link href="/gallery" className="hover:text-brand-ivory">
                Gallery
              </Link>

              <Link href="/contact" className="hover:text-brand-ivory">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold">
              Contact
            </p>

            <div className="mt-5 space-y-3 text-sm text-brand-muted">
              <p>{restaurant.address}</p>

              {restaurant.phone && (
                <a
                  href={`tel:${restaurant.phone}`}
                  className="block hover:text-brand-ivory"
                >
                  {restaurant.phone}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/5 py-6 text-[10px] uppercase tracking-[0.15em] text-brand-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {restaurant.name}
          </p>

          <p>Crafted with care</p>
        </div>
      </Container>
    </footer>
  );
}
