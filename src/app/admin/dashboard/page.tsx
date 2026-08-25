import AdminLayout from "@/components/admin/AdminLayout";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import MenuItem from "@/models/MenuItem";
import MenuCategory from "@/models/MenuCategory";
import Deal from "@/models/Deal";

export const metadata = {
  title: "Admin Dashboard | MUSA Cafe & Restaurant",
};

export default async function AdminDashboardPage() {
  await requireAdmin();
  await connectDB();

  const [availableMenuItems, totalCategories, activeDeals] = await Promise.all([
    MenuItem.countDocuments({
      isAvailable: true,
    }),

    MenuCategory.countDocuments({
      isActive: true,
    }),

    Deal.countDocuments({
      isActive: true,
    }),
  ]);

  return (
    <AdminLayout>
      <section>
        {/* Intro */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Overview
          </p>

          <h2 className="mt-2 font-display text-4xl text-brand-ivory sm:text-5xl">
            Welcome back.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-brand-muted">
            Manage your restaurant menu, deals, gallery and business information
            from one place.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Menu */}
          <div className="rounded-2xl border border-white/10 bg-brand-surface p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">
              Menu Items
            </p>

            <p className="mt-6 font-display text-4xl text-brand-ivory">
              {availableMenuItems}
            </p>

            <p className="mt-2 text-xs text-brand-muted">Currently available</p>
          </div>

          {/* Categories */}
          <div className="rounded-2xl border border-white/10 bg-brand-surface p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">
              Categories
            </p>

            <p className="mt-6 font-display text-4xl text-brand-ivory">
              {totalCategories}
            </p>

            <p className="mt-2 text-xs text-brand-muted">
              Active menu categories
            </p>
          </div>

          {/* Orders */}
          <div className="rounded-2xl border border-white/10 bg-brand-surface p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">
              Orders
            </p>

            <p className="mt-6 font-display text-4xl text-brand-ivory">—</p>

            <p className="mt-2 text-xs text-brand-muted">WhatsApp orders</p>
          </div>

          {/* Deals */}
          <div className="rounded-2xl border border-white/10 bg-brand-surface p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">
              Deals
            </p>

            <p className="mt-6 font-display text-4xl text-brand-ivory">
              {activeDeals}
            </p>

            <p className="mt-2 text-xs text-brand-muted">Active promotions</p>
          </div>
        </div>

        {/* Next section */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-brand-surface p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Next
          </p>

          <h3 className="mt-3 font-display text-3xl text-brand-ivory">
            Restaurant management
          </h3>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-muted">
            Your dashboard is connected to the live restaurant database. Changes
            made to menu items, categories and deals are reflected
            automatically.
          </p>
        </div>
      </section>
    </AdminLayout>
  );
}
