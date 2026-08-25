import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Deal from "@/models/Deal";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminDealClient from "@/components/admin/AdminDealClient";

export const metadata = {
  title: "Deals | MUSA Cafe & Restaurant",
};

export default async function AdminDealsPage() {
  await requireAdmin();

  await connectDB();

  const deals = await Deal.find({})
    .sort({
      sortOrder: 1,
      createdAt: -1,
    })
    .lean();

  const serializedDeals = deals.map((deal) => ({
    id: deal._id.toString(),
    title: deal.title,
    description: deal.description,
    price: deal.price,
    badge: deal.badge || "",
    image: deal.image || "",
    isActive: deal.isActive,
    sortOrder: deal.sortOrder,
  }));

  return (
    <AdminLayout>
      <AdminDealClient deals={serializedDeals} />
    </AdminLayout>
  );
}
