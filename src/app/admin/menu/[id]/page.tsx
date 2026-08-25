import { notFound } from "next/navigation";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import MenuItem from "@/models/MenuItem";
import MenuCategory from "@/models/MenuCategory";

import AdminLayout from "@/components/admin/AdminLayout";
import EditMenuItemForm from "@/components/admin/EditMenuItemForm";

type EditMenuItemPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata = {
  title: "Edit Menu Item | MUSA Cafe & Restaurant",
};

export default async function EditMenuItemPage({
  params,
}: EditMenuItemPageProps) {
  await requireAdmin();

  const { id } = await params;

  await connectDB();

  const [item, categories] = await Promise.all([
    MenuItem.findById(id).lean(),

    MenuCategory.find({
      isActive: true,
    })
      .sort({ sortOrder: 1 })
      .select("_id name slug")
      .lean(),
  ]);

  if (!item) {
    notFound();
  }

  const serializedItem = {
    id: item._id.toString(),
    name: item.name,
    categoryId: item.category.toString(),
    description: item.description || "",
    price: item.price,
    isAvailable: item.isAvailable,
    isFeatured: item.isFeatured,
  };

  const serializedCategories = categories.map((category) => ({
    id: category._id.toString(),
    name: category.name,
    slug: category.slug,
  }));

  return (
    <AdminLayout>
      <section className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Menu
          </p>

          <h1 className="mt-2 font-display text-4xl text-brand-ivory">
            Edit Menu Item
          </h1>

          <p className="mt-2 text-sm text-brand-muted">
            Update the dish information, price and availability.
          </p>
        </div>

        <EditMenuItemForm
          item={serializedItem}
          categories={serializedCategories}
        />
      </section>
    </AdminLayout>
  );
}
