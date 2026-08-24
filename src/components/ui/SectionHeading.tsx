type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto text-center items-center"
      : "text-left items-start";

  return (
    <div className={`flex max-w-2xl flex-col ${alignment}`}>
      {eyebrow && (
        <span className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-brand-gold sm:text-xs">
          {eyebrow}
        </span>
      )}

      <h2 className="font-display text-4xl leading-[0.95] text-brand-ivory sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-sm leading-7 text-brand-muted sm:text-base sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}
