import Link from "next/link";

import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import DeleteGalleryButton from "@/components/admin/DeleteGalleryButton";
import AdminLayout from "@/components/admin/AdminLayout";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery | MUSA Cafe & Restaurant",
};

export default async function AdminGalleryPage() {
  await connectDB();

  const gallery = await Gallery.find({})
    .sort({
      sortOrder: 1,
      createdAt: -1,
    })
    .lean();

  return (
    <AdminLayout>
      <section>
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
              Gallery
            </p>

            <h1 className="mt-2 font-display text-4xl text-brand-ivory">
              Gallery
            </h1>

            <p className="mt-2 text-sm text-brand-muted">
              Manage restaurant photography shown on the website.
            </p>
          </div>

          <Link
            href="/admin/gallery/new"
            className="w-fit rounded-full bg-brand-gold px-6 py-3 text-xs font-bold uppercase tracking-wider text-brand-bg transition hover:bg-brand-gold-light"
          >
            + Add Photo
          </Link>
        </div>

        {gallery.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-brand-surface p-8">
            <p className="text-sm text-brand-muted">
              No gallery photos have been added yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {gallery.map((item) => (
              <article
                key={item._id.toString()}
                className="overflow-hidden rounded-2xl border border-white/10 bg-brand-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-bg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-brand-bg/80 px-3 py-1.5 backdrop-blur">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl text-brand-ivory">
                        {item.title}
                      </h2>

                      <p className="mt-2 text-xs text-brand-muted">
                        Sort order: {item.sortOrder}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider ${
                        item.isActive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {item.isActive ? "Active" : "Hidden"}
                    </span>
                  </div>

                  {item.description && (
                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-brand-muted">
                      {item.description}
                    </p>
                  )}

                  <div className="mt-6 flex gap-3">
                    <Link
                      href={`/admin/gallery/${item._id.toString()}`}
                      className="rounded-full border border-brand-gold/30 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-gold transition hover:bg-brand-gold/10"
                    >
                      Edit
                    </Link>

                    <DeleteGalleryButton id={item._id.toString()} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="mt-6 text-sm text-brand-muted">
          Showing {gallery.length} gallery{" "}
          {gallery.length === 1 ? "item" : "items"}.
        </p>
      </section>
    </AdminLayout>
  );
}
