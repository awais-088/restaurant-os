import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Review } from "@/types/content";

type ReviewsPreviewProps = {
  reviews: Review[];
};

export default function ReviewsPreview({ reviews }: ReviewsPreviewProps) {
  return (
    <section className="bg-brand-bg py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Guest Experiences"
          title="What people remember."
          description="Real experiences from guests help tell the story of a restaurant."
          align="center"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-white/5 bg-brand-surface p-7 sm:p-8"
            >
              <div className="flex gap-1 text-brand-gold">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </div>

              <blockquote className="mt-6 font-display text-2xl leading-tight text-brand-ivory">
                “{review.text}”
              </blockquote>

              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-5">
                <div>
                  <p className="text-sm font-semibold text-brand-ivory">
                    {review.name}
                  </p>

                  {review.source && (
                    <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-brand-muted">
                      {review.source}
                    </p>
                  )}
                </div>

                <span className="text-xs text-brand-gold">
                  {review.rating}.0
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
