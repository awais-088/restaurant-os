import AdminLayout from "@/components/admin/AdminLayout";
import AddGalleryForm from "@/components/admin/AddGalleryForm";

export const metadata = {
  title: "Add Gallery Item | MUSA Cafe & Restaurant",
};

export default function AddGalleryPage() {
  return (
    <AdminLayout>
      <section className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Gallery
          </p>

          <h1 className="mt-2 font-display text-4xl text-brand-ivory">
            Add Gallery Item
          </h1>

          <p className="mt-2 text-sm text-brand-muted">
            Add a restaurant photograph to the public gallery.
          </p>
        </div>

        <AddGalleryForm />
      </section>
    </AdminLayout>
  );
}
