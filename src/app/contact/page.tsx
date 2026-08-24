import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { musaRestaurant } from "@/data/restaurant";

export const metadata = {
  title: "Contact | MUSA Cafe & Restaurant",
  description:
    "Contact MUSA Cafe & Restaurant in Layyah, get directions or place an order through WhatsApp.",
};

export default function ContactPage() {
  const whatsappUrl = musaRestaurant.whatsapp
    ? `https://wa.me/${musaRestaurant.whatsapp}`
    : "#";

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    musaRestaurant.address ?? musaRestaurant.name,
  )}`;

  return (
    <>
      <Navbar restaurant={musaRestaurant} />

      <main className="bg-brand-bg pt-[76px]">
        <section className="py-24 sm:py-32">
          <Container>
            <SectionHeading
              eyebrow="Get In Touch"
              title="Come visit us."
              description="Find MUSA, get directions, call us or start an order through WhatsApp."
              align="center"
            />

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-white/5 bg-brand-surface p-7">
                <span className="text-xs uppercase tracking-[0.2em] text-brand-gold">
                  Visit
                </span>

                <h2 className="mt-6 font-display text-2xl text-brand-ivory">
                  Location
                </h2>

                <p className="mt-3 text-sm leading-7 text-brand-muted">
                  {musaRestaurant.address}
                </p>

                <div className="mt-6">
                  <Button href={mapsUrl} variant="secondary">
                    Get Directions
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-white/5 bg-brand-surface p-7">
                <span className="text-xs uppercase tracking-[0.2em] text-brand-gold">
                  Call
                </span>

                <h2 className="mt-6 font-display text-2xl text-brand-ivory">
                  Talk to us
                </h2>

                <p className="mt-3 text-sm leading-7 text-brand-muted">
                  Have a question? Give us a call.
                </p>

                {musaRestaurant.phone && (
                  <div className="mt-6">
                    <Button
                      href={`tel:${musaRestaurant.phone}`}
                      variant="secondary"
                    >
                      Call Restaurant
                    </Button>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-brand-gold/20 bg-brand-surface p-7">
                <span className="text-xs uppercase tracking-[0.2em] text-brand-gold">
                  Order
                </span>

                <h2 className="mt-6 font-display text-2xl text-brand-ivory">
                  WhatsApp
                </h2>

                <p className="mt-3 text-sm leading-7 text-brand-muted">
                  Browse the menu and send your order directly through WhatsApp.
                </p>

                <div className="mt-6">
                  <Button href={whatsappUrl}>Order on WhatsApp</Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-white/5 bg-brand-surface py-16">
          <Container>
            <div className="overflow-hidden rounded-3xl border border-white/5">
              <iframe
                title={`${musaRestaurant.name} map`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  musaRestaurant.address ?? musaRestaurant.name,
                )}&output=embed`}
                loading="lazy"
                className="h-[420px] w-full border-0 grayscale"
              />
            </div>
          </Container>
        </section>
      </main>

      <Footer restaurant={musaRestaurant} />

      <MobileActionBar restaurant={musaRestaurant} />
    </>
  );
}
