export const metadata = {
  title: "Admin Login | RestaurantOS",
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-bg px-5">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-brand-surface p-8 sm:p-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-gold">
            RestaurantOS
          </p>

          <h1 className="mt-3 font-display text-4xl text-brand-ivory">
            Admin Login
          </h1>

          <p className="mt-3 text-sm leading-6 text-brand-muted">
            Secure restaurant management portal.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="h-12 w-full rounded-xl border border-white/10 bg-brand-bg px-4 text-sm text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
          />

          <input
            type="password"
            placeholder="Password"
            className="h-12 w-full rounded-xl border border-white/10 bg-brand-bg px-4 text-sm text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
          />

          <button
            type="button"
            className="h-12 w-full rounded-xl bg-brand-gold text-sm font-bold uppercase tracking-wider text-brand-bg transition hover:bg-brand-gold-light"
          >
            Sign In
          </button>
        </div>
      </div>
    </main>
  );
}
