import type { MenuItem } from "@/types/content";

type MenuCardProps = {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
};

export default function MenuCard({ item, onAdd }: MenuCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/5 bg-brand-surface transition duration-300 hover:border-brand-gold/20">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-surface-light">
        <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.10),transparent_55%)]">
          <span className="font-display text-6xl text-brand-gold/15">M</span>
        </div>

        {item.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-brand-gold px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-brand-bg">
            Signature
          </span>
        )}

        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-bg/80 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl leading-tight text-brand-ivory">
            {item.name}
          </h3>

          <span className="whitespace-nowrap text-sm font-semibold text-brand-gold">
            Rs. {item.price.toLocaleString()}
          </span>
        </div>

        {item.description && (
          <p className="mt-3 text-xs leading-6 text-brand-muted sm:text-sm">
            {item.description}
          </p>
        )}

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
