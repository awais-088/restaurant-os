import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import MenuCategory from "@/models/MenuCategory";
import AdminLayout from "@/components/admin/AdminLayout";
import AddMenuItemForm from "@/components/admin/AddMenuItemForm";

export const metadata = {
  title: "Add Menu Item | MUSA Cafe & Restaurant",
};

export default async function AddMenuItemPage() {
  await requireAdmin();

  await connectDB();

  const categories = await MenuCategory.find({
    isActive: true,
  })
    .sort({ sortOrder: 1 })
    .select("_id name slug")
    .lean();

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
            Add Menu Item
          </h1>

          <p className="mt-2 text-sm text-brand-muted">
            Add a new dish to the restaurant menu.
          </p>
        </div>

        <AddMenuItemForm categories={serializedCategories} />
      </section>
    </AdminLayout>
  );
}
