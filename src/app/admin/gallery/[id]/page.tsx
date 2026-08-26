import { notFound } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

import AdminLayout from "@/components/admin/AdminLayout";
import EditGalleryForm from "@/components/admin/EditGalleryForm";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function EditGalleryPage({ params }: PageProps) {
  const { id } = await params;

  await connectDB();

  const galleryItem = await Gallery.findById(id).lean();

  if (!galleryItem) {
    notFound();
  }

  const initialData = {
    id: galleryItem._id.toString(),
    title: galleryItem.title,
    description: galleryItem.description || "",
    category: galleryItem.category,
    image: galleryItem.image,
    isActive: galleryItem.isActive,
    sortOrder: galleryItem.sortOrder,
  };

  return (
    <AdminLayout>
      <section className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Gallery
          </p>

          <h1 className="mt-2 font-display text-4xl text-brand-ivory">
            Edit Gallery Item
          </h1>

          <p className="mt-2 text-sm text-brand-muted">
            Update the photograph and information shown on the website.
          </p>
        </div>

        <EditGalleryForm initialData={initialData} />
      </section>
    </AdminLayout>
  );
}
