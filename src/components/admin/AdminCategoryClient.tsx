"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
};

type AdminCategoryClientProps = {
  categories: Category[];
};

export default function AdminCategoryClient({
  categories,
}: AdminCategoryClientProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return categories;
    }

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(value) ||
        category.slug.toLowerCase().includes(value) ||
        category.description?.toLowerCase().includes(value),
    );
  }, [categories, search]);

  async function handleDelete(id: string, name: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete category.");
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      window.alert(
        error instanceof Error ? error.message : "Failed to delete category.",
      );
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Menu
          </p>

          <h1 className="mt-2 font-display text-4xl text-brand-ivory">
            Categories
          </h1>

          <p className="mt-2 text-sm text-brand-muted">
            Manage your restaurant menu categories.
          </p>
        </div>

        <Link
          href="/admin/categories/new"
          className="inline-flex w-fit rounded-full bg-brand-gold px-6 py-3 text-xs font-bold uppercase tracking-wider text-brand-bg transition hover:bg-brand-gold-light"
        >
          + Add Category
        </Link>
      </div>

      <div className="mb-8">
        <input
          type="search"
          placeholder="Search categories..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-12 w-full rounded-xl border border-white/10 bg-brand-surface px-4 text-sm text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
        />
      </div>

      {filteredCategories.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-brand-surface px-6 py-16 text-center">
          <p className="font-display text-3xl text-brand-ivory">
            No categories found
          </p>

          <p className="mt-2 text-sm text-brand-muted">
            Create a category or try another search.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <article
              key={category.id}
              className="rounded-2xl border border-white/10 bg-brand-surface p-5 sm:p-6"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-2xl text-brand-ivory">
                      {category.name}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider ${
                        category.isActive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-brand-muted">
                    /{category.slug}
                    <span className="mx-2">•</span>
                    Order {category.sortOrder}
                  </p>

                  {category.description && (
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">
                      {category.description}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 gap-2">
                  <Link
                    href={`/admin/categories/${category.id}`}
                    className="rounded-full border border-brand-gold/30 px-5 py-3 text-xs font-bold uppercase tracking-wider text-brand-gold transition hover:bg-brand-gold hover:text-brand-bg"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(category.id, category.name)}
                    className="rounded-full border border-red-500/30 px-5 py-3 text-xs font-bold uppercase tracking-wider text-red-400 transition hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="mt-6 text-xs text-brand-muted">
        Showing {filteredCategories.length} of {categories.length} categories.
      </p>
    </div>
  );
}
