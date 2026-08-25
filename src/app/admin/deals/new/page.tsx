import { requireAdmin } from "@/lib/auth";

import AdminLayout from "@/components/admin/AdminLayout";
import DealForm from "@/components/admin/DealForm";

export const metadata = {
  title: "Add Deal | MUSA Cafe & Restaurant",
};

export default async function AddDealPage() {
  await requireAdmin();

  return (
    <AdminLayout>
      <section className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Promotions
          </p>

          <h1 className="mt-2 font-display text-4xl text-brand-ivory">
            Add Deal
          </h1>

          <p className="mt-2 text-sm text-brand-muted">
            Create a new promotion for your restaurant.
          </p>
        </div>

        <DealForm mode="create" />
      </section>
    </AdminLayout>
  );
}
