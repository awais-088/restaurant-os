import { requireAdmin } from "@/lib/auth";

import AdminLayout from "@/components/admin/AdminLayout";
import CategoryForm from "@/components/admin/CategoryForm";

export const metadata = {
  title: "Add Category | MUSA Cafe & Restaurant",
};

export default async function AddCategoryPage() {
  await requireAdmin();

  return (
    <AdminLayout>
      <section className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Menu
          </p>

          <h1 className="mt-2 font-display text-4xl text-brand-ivory">
            Add Category
          </h1>

          <p className="mt-2 text-sm text-brand-muted">
            Create a new category for your restaurant menu.
          </p>
        </div>

        <CategoryForm mode="create" />
      </section>
    </AdminLayout>
  );
}
