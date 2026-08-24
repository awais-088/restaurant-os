"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-white/10 bg-brand-surface lg:block">
      <div className="border-b border-white/10 px-6 py-6">
        <div className="font-display text-2xl text-brand-ivory">MUSA</div>

        <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-brand-muted">
          RestaurantOS Admin
        </p>
      </div>

      <nav className="space-y-1 p-4">
        {navigation.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

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
  );
}
