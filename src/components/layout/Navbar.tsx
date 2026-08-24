import Link from "next/link";
import Container from "@/components/ui/Container";
import MobileMenu from "@/components/layout/MobileMenu";
import type { Restaurant } from "@/types/restaurant";

type NavbarProps = {
  restaurant: Restaurant;
};

export default function Navbar({ restaurant }: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/5 bg-brand-bg/80 backdrop-blur-xl">
        <Container>
          <nav className="flex h-[76px] items-center justify-between">
            <Link
              href="/"
              className="group flex items-center gap-3"
              aria-label={`${restaurant.name} home`}
            >
              <div className="flex size-10 items-center justify-center rounded-full border border-brand-gold/40">
                <span className="font-display text-xl text-brand-gold">M</span>
              </div>

              <div className="hidden sm:block">
                <p className="font-display text-xl leading-none text-brand-ivory">
                  MUSA
                </p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.3em] text-brand-muted">
                  Cafe & Restaurant
                </p>
              </div>
            </Link>

            <div className="hidden items-center gap-8 lg:flex">
              <Link
                href="/"
                className="text-sm text-brand-ivory transition hover:text-brand-gold"
              >
                Home
              </Link>

              <Link
                href="/menu"
                className="text-sm text-brand-muted transition hover:text-brand-gold"
              >
                Menu
              </Link>

              <Link
                href="/about"
                className="text-sm text-brand-muted transition hover:text-brand-gold"
              >
                Our Story
              </Link>

              <Link
                href="/gallery"
                className="text-sm text-brand-muted transition hover:text-brand-gold"
              >
                Gallery
              </Link>

              <Link
                href="/contact"
                className="text-sm text-brand-muted transition hover:text-brand-gold"
              >
                Contact
              </Link>

              <Link
                href="/menu"
                className="rounded-full bg-brand-gold px-5 py-3 text-xs font-bold uppercase tracking-wider text-brand-bg transition hover:bg-brand-gold-light"
              >
                Order Now
              </Link>
            </div>

            <MobileMenu
              restaurantName={restaurant.name}
              whatsapp={restaurant.whatsapp}
            />
          </nav>
        </Container>
      </div>
    </header>
  );
}
