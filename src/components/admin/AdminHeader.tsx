export default function AdminHeader() {
  return (
    <header className="flex min-h-20 items-center justify-between border-b border-white/10 bg-brand-bg px-5 sm:px-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-brand-gold">
          RestaurantOS
        </p>

        <h1 className="mt-1 font-display text-2xl text-brand-ivory">
          Admin Dashboard
        </h1>
      </div>

      <div className="hidden text-right sm:block">
        <p className="text-sm text-brand-ivory">
          MUSA Cafe & Restaurant
        </p>

        <p className="mt-1 text-xs text-brand-muted">
          Layyah
        </p>
      </div>
    </header>
  );
}