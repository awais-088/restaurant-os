import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { GalleryItem } from "@/types/content";

type GalleryPreviewProps = {
  items: GalleryItem[];
};

export default function GalleryPreview({ items }: GalleryPreviewProps) {
  return (
    <section className="bg-brand-surface py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="A Glimpse Inside"
            title="Come hungry. Leave with a memory."
          />

          <Link
            href="/gallery"
            className="w-fit text-xs font-bold uppercase tracking-[0.2em] text-brand-gold hover:text-brand-gold-light"
          >
            View Gallery ↗
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-brand-bg ${
                index === 1 ? "lg:translate-y-8" : ""
              }`}
            >
              <div className="aspect-[3/4] bg-[radial-gradient(circle_at_50%_30%,rgba(201,164,92,0.12),transparent_50%)]">
                <div className="flex h-full items-end p-4 sm:p-6">
                  <div>
                    <span className="text-[8px] uppercase tracking-[0.25em] text-brand-gold">
                      {item.category}
                    </span>

                    <h3 className="mt-1 font-display text-xl text-brand-ivory sm:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
