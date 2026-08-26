import type { MenuItem } from "@/types/content";

type MenuCardProps = {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
};

export default function MenuCard({ item, onAdd }: MenuCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/5 bg-brand-surface transition duration-500 hover:-translate-y-1 hover:border-brand-gold/20 hover:shadow-2xl hover:shadow-black/20">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-surface-light">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.10),transparent_55%)]">
            <div className="text-center">
              <span className="font-display text-6xl text-brand-gold/15">
                M
              </span>

              <p className="mt-2 text-[8px] uppercase tracking-[0.25em] text-brand-muted/50">
                Photography Coming Soon
              </p>
            </div>
          </div>
        )}

        {/* Image overlay */}
        {item.image && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        )}

        {/* Featured badge */}
        {item.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-brand-gold px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-brand-bg shadow-lg">
            Signature
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl leading-tight text-brand-ivory">
            {item.name}
          </h3>

          <span className="whitespace-nowrap text-sm font-semibold text-brand-gold">
            Rs. {item.price.toLocaleString()}
          </span>
        </div>

        {/* Description */}
        {item.description && (
          <p className="mt-3 line-clamp-3 text-xs leading-6 text-brand-muted sm:text-sm">
            {item.description}
          </p>
        )}

        {/* Add button */}
        <button
          type="button"
          disabled={!item.available}
          onClick={() => onAdd(item)}
          className="mt-5 flex min-h-11 w-full items-center justify-center rounded-full border border-brand-gold/30 text-xs font-bold uppercase tracking-[0.15em] text-brand-gold transition hover:bg-brand-gold hover:text-brand-bg disabled:cursor-not-allowed disabled:border-white/10 disabled:text-brand-muted"
        >
          {item.available ? "Add to Order" : "Unavailable"}
        </button>
      </div>
    </article>
  );
}
