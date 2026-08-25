import { notFound } from "next/navigation";

import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Deal from "@/models/Deal";

import AdminLayout from "@/components/admin/AdminLayout";
import DealForm from "@/components/admin/DealForm";

type EditDealPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata = {
  title: "Edit Deal | MUSA Cafe & Restaurant",
};

export default async function EditDealPage({ params }: EditDealPageProps) {
  await requireAdmin();

  const { id } = await params;

  await connectDB();

  const deal = await Deal.findById(id).lean();

  if (!deal) {
    notFound();
  }

  const serializedDeal = {
    id: deal._id.toString(),
    title: deal.title,
    description: deal.description,
    price: deal.price,
    badge: deal.badge || "",
    image: deal.image || "",
    isActive: deal.isActive,
    sortOrder: deal.sortOrder,
  };

  return (
    <AdminLayout>
      <section className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Promotions
          </p>

          <h1 className="mt-2 font-display text-4xl text-brand-ivory">
            Edit Deal
          </h1>

          <p className="mt-2 text-sm text-brand-muted">
            Update the promotion information and settings.
          </p>
        </div>

        <DealForm mode="edit" deal={serializedDeal} />
      </section>
    </AdminLayout>
  );
}
