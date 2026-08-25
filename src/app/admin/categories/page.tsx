import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import MenuCategory from "@/models/MenuCategory";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminCategoryClient from "@/components/admin/AdminCategoryClient";

export const metadata = {
  title: "Categories | MUSA Cafe & Restaurant",
};

export default async function AdminCategoriesPage() {
  await requireAdmin();

  await connectDB();

  const categories = await MenuCategory.find({})
    .sort({
      sortOrder: 1,
      name: 1,
    })
    .lean();

  const serializedCategories = categories.map((category) => ({
    id: category._id.toString(),
    name: category.name,
    slug: category.slug,
    description: category.description || "",
    isActive: category.isActive,
    sortOrder: category.sortOrder,
  }));

  return (
    <AdminLayout>
      <AdminCategoryClient categories={serializedCategories} />
    </AdminLayout>
  );
}
