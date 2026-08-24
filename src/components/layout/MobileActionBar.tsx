import type { Restaurant } from "@/types/restaurant";

type MobileActionBarProps = {
  restaurant: Restaurant;
};

export default function MobileActionBar({ restaurant }: MobileActionBarProps) {
  const whatsapp = restaurant.whatsapp
    ? `https://wa.me/${restaurant.whatsapp}`
    : "#";

  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    restaurant.address ?? restaurant.name,
  )}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-brand-bg/95 px-3 py-2 backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-2">
        <a
          href={`tel:${restaurant.phone ?? ""}`}
          className="flex min-h-11 flex-col items-center justify-center rounded-xl text-[9px] font-semibold uppercase tracking-wider text-brand-muted"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
          </svg>

          <span className="mt-1">Call</span>
        </a>

        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-11 flex-col items-center justify-center rounded-xl bg-brand-gold text-[9px] font-bold uppercase tracking-wider text-brand-bg"
        >
          <span className="text-base">✦</span>
          <span>WhatsApp</span>
        </a>

        <a
          href={maps}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-11 flex-col items-center justify-center rounded-xl text-[9px] font-semibold uppercase tracking-wider text-brand-muted"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>

          <span className="mt-1">Directions</span>
        </a>
      </div>
    </div>
  );
}
