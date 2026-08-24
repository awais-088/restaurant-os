import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { musaRestaurant } from "@/data/restaurant";
import { galleryItems } from "@/data/home";

export const metadata = {
  title: "Gallery | MUSA Cafe & Restaurant",
  description:
    "Explore the food, atmosphere and dining experience at MUSA Cafe & Restaurant.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar restaurant={musaRestaurant} />

      <main className="bg-brand-bg pt-[76px]">
        <section className="border-b border-white/5 py-24 sm:py-32">
          <Container>
            <SectionHeading
              eyebrow="The MUSA Gallery"
              title="A glimpse of the experience."
              description="Explore the atmosphere, food and moments that make MUSA a place worth visiting."
              align="center"
            />
          </Container>
        </section>

        <section className="py-16 sm:py-24">
          <Container>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {galleryItems.map((item, index) => (
                <article
                  key={item.id}
                  className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-brand-surface ${
                    index === 1 ? "lg:translate-y-12" : ""
                  }`}
                >
                  <div className="aspect-[3/4] bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.12),transparent_55%)]">
                    <div className="flex h-full items-end p-5 sm:p-7">
                      <div>
                        <span className="text-[8px] uppercase tracking-[0.25em] text-brand-gold">
                          {item.category}
                        </span>

                        <h2 className="mt-2 font-display text-xl text-brand-ivory sm:text-3xl">
                          {item.title}
                        </h2>
                      </div>
                    </div>
                  </div>
                </article>
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
