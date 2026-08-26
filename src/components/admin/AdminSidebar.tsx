"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  {
    label: "Overview",
    href: "/admin/dashboard",
  },
  {
    label: "Menu",
    href: "/admin/menu",
  },
  {
    label: "Categories",
    href: "/admin/categories",
  },
  {
    label: "Deals",
    href: "/admin/deals",
  },
  {
    label: "Gallery",
    href: "/admin/gallery",
  },
  {
    label: "Restaurant",
    href: "/admin/restaurant",
  },
  {
    label: "Settings",
    href: "/admin/settings",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* =========================================================
          DESKTOP SIDEBAR
      ========================================================= */}
      <aside className="hidden min-h-screen w-64 shrink-0 border-r border-white/10 bg-brand-surface lg:block">
        <div className="border-b border-white/10 px-6 py-6">
          <div className="font-display text-2xl text-brand-ivory">MUSA</div>

          <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-brand-muted">
            RestaurantOS Admin
          </p>
        </div>

        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-xl px-4 py-3 text-sm transition ${
                  active
                    ? "bg-brand-gold text-brand-bg"
                    : "text-brand-muted hover:bg-white/5 hover:text-brand-ivory"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* =========================================================
          MOBILE MENU BUTTON
      ========================================================= */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open admin menu"
        aria-expanded={mobileOpen}
        className="fixed right-4 top-4 z-[70] flex size-11 items-center justify-center rounded-full border border-white/10 bg-brand-surface text-brand-ivory shadow-lg transition hover:border-brand-gold/40 hover:text-brand-gold lg:hidden"
      >
        <span className="sr-only">Open menu</span>

        <div className="flex flex-col gap-1.5">
          <span className="block h-px w-5 bg-current" />
          <span className="block h-px w-5 bg-current" />
          <span className="block h-px w-5 bg-current" />
        </div>
      </button>

      {/* =========================================================
          MOBILE OVERLAY
      ========================================================= */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close admin menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* =========================================================
          MOBILE SIDEBAR
      ========================================================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-[90] w-[280px] border-r border-white/10 bg-brand-surface shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
          <div>
            <div className="font-display text-2xl text-brand-ivory">MUSA</div>

            <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-brand-muted">
              RestaurantOS Admin
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close admin menu"
            className="flex size-9 items-center justify-center rounded-full border border-white/10 text-brand-muted transition hover:border-brand-gold/40 hover:text-brand-gold"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm transition ${
                  active
                    ? "bg-brand-gold text-brand-bg"
                    : "text-brand-muted hover:bg-white/5 hover:text-brand-ivory"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Footer */}
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 px-6 py-5">
          <p className="text-[9px] uppercase tracking-[0.2em] text-brand-muted">
            MUSA Cafe & Restaurant
          </p>

          <p className="mt-1 text-xs text-brand-muted">Layyah</p>
        </div>
      </aside>
    </>
  );
}
