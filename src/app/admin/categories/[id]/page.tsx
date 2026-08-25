import { notFound } from "next/navigation";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import MenuCategory from "@/models/MenuCategory";

import AdminLayout from "@/components/admin/AdminLayout";
import CategoryForm from "@/components/admin/CategoryForm";

type EditCategoryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata = {
  title: "Edit Category | MUSA Cafe & Restaurant",
};

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  await requireAdmin();

  const { id } = await params;

  await connectDB();

  const category = await MenuCategory.findById(id).lean();

  if (!category) {
    notFound();
  }

  const serializedCategory = {
    id: category._id.toString(),
    name: category.name,
    description: category.description || "",
    isActive: category.isActive,
    sortOrder: category.sortOrder,
  };

  return (
    <AdminLayout>
      <section className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Menu
          </p>

          <h1 className="mt-2 font-display text-4xl text-brand-ivory">
            Edit Category
          </h1>

          <p className="mt-2 text-sm text-brand-muted">
            Update the category information and settings.
          </p>
        </div>

        <CategoryForm mode="edit" category={serializedCategory} />
      </section>
    </AdminLayout>
  );
}
