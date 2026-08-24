import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { musaRestaurant } from "@/data/restaurant";

export const metadata = {
  title: "Our Story | MUSA Cafe & Restaurant",
  description:
    "Discover the story, dining experience and philosophy behind MUSA Cafe & Restaurant in Layyah.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar restaurant={musaRestaurant} />

      <main className="bg-brand-bg pt-[76px]">
        <section className="border-b border-white/5 py-24 sm:py-32 lg:py-40">
          <Container>
            <SectionHeading
              eyebrow="Our Story"
              title="A place built around the table."
              description="Good food brings people together. MUSA is a place for family meals, conversations, celebrations and everyday moments."
              align="center"
            />
          </Container>
        </section>

        <section className="py-24 sm:py-32">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="aspect-[4/5] rounded-3xl border border-white/5 bg-brand-surface">
                <div className="flex h-full items-center justify-center">
                  <span className="font-display text-[10rem] text-brand-gold/15">
                    M
                  </span>
                </div>
              </div>

              <div>
                <SectionHeading
                  eyebrow="The MUSA Philosophy"
                  title="Food should create moments."
                  description="Our experience is built around variety, comfort and the simple pleasure of sharing a table."
                />

                <p className="mt-6 text-sm leading-8 text-brand-muted">
                  From Pakistani favorites and BBQ to cafe and continental
                  selections, our menu is designed to give guests the freedom to
                  find something they love.
                </p>

                <div className="mt-8">
                  <Button href="/menu">Explore Our Menu</Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-brand-surface py-24 sm:py-32">
          <Container>
            <SectionHeading
              eyebrow="What We Serve"
              title="Something for every table."
              align="center"
            />

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Pakistani Cuisine",
                "BBQ & Grill",
                "Cafe Favorites",
                "Continental",
              ].map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/5 bg-brand-bg p-7"
                >
                  <span className="text-xs text-brand-gold">0{index + 1}</span>

                  <h3 className="mt-10 font-display text-2xl text-brand-ivory">
                    {item}
                  </h3>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer restaurant={musaRestaurant} />

      <MobileActionBar restaurant={musaRestaurant} />
    </>
  );
}
