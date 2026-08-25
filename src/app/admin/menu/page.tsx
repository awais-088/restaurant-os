import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminMenuClient from "@/components/admin/AdminMenuClient";

export const metadata = {
  title: "Menu Management | MUSA Cafe & Restaurant",
};

export default async function AdminMenuPage() {
  await requireAdmin();

  return (
    <AdminLayout>
      <section>
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
              Menu
            </p>

            <h1 className="mt-2 font-display text-4xl text-brand-ivory">
              Menu Items
            </h1>

            <p className="mt-2 text-sm text-brand-muted">
              Manage dishes, prices, availability and featured items.
            </p>
          </div>

          <Link
            href="/admin/menu/new"
            className="inline-flex w-fit rounded-full bg-brand-gold px-5 py-3 text-xs font-bold uppercase tracking-wider text-brand-bg transition hover:bg-brand-gold-light"
          >
            + Add Item
          </Link>
        </div>

        <AdminMenuClient />
      </section>
    </AdminLayout>
  );
}
