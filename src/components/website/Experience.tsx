import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const experiences = [
  {
    number: "01",
    title: "Desi Kitchen",
    description:
      "Rich Pakistani flavors, traditional favorites and dishes prepared for the table.",
  },
  {
    number: "02",
    title: "BBQ & Grill",
    description:
      "Smoky grilled favorites made for sharing with family and friends.",
  },
  {
    number: "03",
    title: "Cafe & Continental",
    description:
      "A wider selection of cafe and continental favorites for every kind of craving.",
  },
];

export default function Experience() {
  return (
    <section className="bg-brand-surface py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="The MUSA Experience"
          title="More than a meal. A place to gather."
          description="From traditional Pakistani flavors to BBQ, cafe favorites and continental dishes, MUSA brings variety to the table."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 md:grid-cols-3">
          {experiences.map((experience) => (
            <article
              key={experience.number}
              className="group bg-brand-surface p-7 transition duration-500 hover:bg-brand-surface-light sm:p-9"
            >
              <span className="text-xs tracking-[0.25em] text-brand-gold">
                {experience.number}
              </span>

              <h3 className="mt-10 font-display text-3xl text-brand-ivory">
                {experience.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-brand-muted">
                {experience.description}
              </p>

              <div className="mt-8 h-px w-10 bg-brand-gold/50 transition-all duration-500 group-hover:w-20" />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
