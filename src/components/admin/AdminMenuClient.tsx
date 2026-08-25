"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
type Category = {
  _id: string;
  name: string;
  slug: string;
};

type MenuItem = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  isAvailable: boolean;
  isFeatured: boolean;
  sortOrder: number;
  category?: Category;
};

export default function AdminMenuClient() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const router = useRouter();
  useEffect(() => {
    async function loadMenuItems() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/admin/menu-items", {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to load menu items.");
        }

        setItems(result.data);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error ? error.message : "Failed to load menu items.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadMenuItems();
  }, []);

  const categories = useMemo(() => {
    const map = new Map<string, Category>();

    items.forEach((item) => {
      if (item.category) {
        map.set(item.category._id, item.category);
      }
    });

    return Array.from(map.values());
  }, [items]);

  const filteredItems = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return items.filter((item) => {
      const matchesSearch =
        !searchValue ||
        item.name.toLowerCase().includes(searchValue) ||
        item.description?.toLowerCase().includes(searchValue);

      const matchesCategory =
        categoryFilter === "all" || item.category?._id === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [items, search, categoryFilter]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-brand-surface p-8">
        <p className="text-sm text-brand-muted">Loading menu items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
        <p className="text-sm text-red-300">{error}</p>
      </div>
    );
  }
  async function handleDelete(id: string, name: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/menu-items/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete menu item.");
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      window.alert(
        error instanceof Error ? error.message : "Failed to delete menu item.",
      );
    }
  }
  return (
    <div>
      {/* Filters */}
      <div className="mb-6 grid gap-4 md:grid-cols-[1fr_220px]">
        <input
          type="search"
          placeholder="Search dishes..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-12 rounded-xl border border-white/10 bg-brand-surface px-4 text-sm text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
        />

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className="h-12 rounded-xl border border-white/10 bg-brand-surface px-4 text-sm text-brand-ivory outline-none focus:border-brand-gold/50"
        >
          <option value="all">All Categories</option>

          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-brand-surface p-10 text-center">
          <p className="font-display text-2xl text-brand-ivory">
            No menu items found
          </p>

          <p className="mt-2 text-sm text-brand-muted">
            Try changing your search or category filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <article
              key={item._id}
              className="rounded-2xl border border-white/10 bg-brand-surface p-5 transition hover:border-brand-gold/20"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                {/* Item information */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-2xl text-brand-ivory">
                      {item.name}
                    </h2>

                    {item.isFeatured && (
                      <span className="rounded-full bg-brand-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-brand-bg">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-brand-muted">
                    <span>{item.category?.name || "Uncategorized"}</span>

                    <span>•</span>

                    <span className="font-semibold text-brand-gold">
                      Rs. {item.price.toLocaleString()}
                    </span>

                    <span>•</span>

                    <span
                      className={
                        item.isAvailable ? "text-green-400" : "text-red-400"
                      }
                    >
                      {item.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  {item.description && (
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-2">
                  <Link
                    href={`/admin/menu/${item._id}`}
                    className="rounded-full border border-brand-gold/30 px-5 py-3 text-xs font-bold uppercase tracking-wider text-brand-gold transition hover:bg-brand-gold hover:text-brand-bg"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(item._id, item.name)}
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

      <p className="mt-5 text-xs text-brand-muted">
        Showing {filteredItems.length} of {items.length} menu items.
      </p>
    </div>
  );
}
