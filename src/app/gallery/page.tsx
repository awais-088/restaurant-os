import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

import { musaRestaurant } from "@/data/restaurant";

import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery | MUSA Cafe & Restaurant",
  description:
    "Explore the food, atmosphere and dining experience at MUSA Cafe & Restaurant.",
};

export default async function GalleryPage() {
  await connectDB();

  const gallery = await Gallery.find({
    isActive: true,
  })
    .sort({
      sortOrder: 1,
      createdAt: -1,
    })
    .lean();

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
            {gallery.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-brand-surface p-10 text-center">
                <p className="text-sm text-brand-muted">
                  Our gallery is being prepared. Check back soon.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
                {gallery.map((item, index) => (
                  <article
                    key={item._id.toString()}
                    className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-brand-surface ${
                      index === 1 ? "lg:translate-y-12" : ""
                    }`}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                        <span className="text-[8px] uppercase tracking-[0.25em] text-brand-gold">
                          {item.category}
                        </span>

                        <h2 className="mt-2 font-display text-xl text-brand-ivory sm:text-3xl">
                          {item.title}
                        </h2>

                        {item.description && (
                          <p className="mt-2 text-xs leading-5 text-white/70">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer restaurant={musaRestaurant} />

      <MobileActionBar restaurant={musaRestaurant} />
    </>
  );
}
