"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Deal = {
  id: string;
  title: string;
  description: string;
  price?: number;
  badge?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
};

type AdminDealClientProps = {
  deals: Deal[];
};

export default function AdminDealClient({ deals }: AdminDealClientProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const filteredDeals = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return deals;
    }

    return deals.filter(
      (deal) =>
        deal.title.toLowerCase().includes(value) ||
        deal.description.toLowerCase().includes(value) ||
        deal.badge?.toLowerCase().includes(value),
    );
  }, [deals, search]);

  async function handleDelete(id: string, title: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/deals/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete deal.");
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      window.alert(
        error instanceof Error ? error.message : "Failed to delete deal.",
      );
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Promotions
          </p>

          <h1 className="mt-2 font-display text-4xl text-brand-ivory">Deals</h1>

          <p className="mt-2 text-sm text-brand-muted">
            Create and manage restaurant promotions.
          </p>
        </div>

        <Link
          href="/admin/deals/new"
          className="inline-flex w-fit rounded-full bg-brand-gold px-6 py-3 text-xs font-bold uppercase tracking-wider text-brand-bg transition hover:bg-brand-gold-light"
        >
          + Add Deal
        </Link>
      </div>

      <div className="mb-8">
        <input
          type="search"
          placeholder="Search deals..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-12 w-full rounded-xl border border-white/10 bg-brand-surface px-4 text-sm text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
        />
      </div>

      {filteredDeals.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-brand-surface px-6 py-16 text-center">
          <p className="font-display text-3xl text-brand-ivory">
            No deals found
          </p>

          <p className="mt-2 text-sm text-brand-muted">
            Create your first restaurant deal.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDeals.map((deal) => (
            <article
              key={deal.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-brand-surface"
            >
              <div className="flex flex-col lg:flex-row">
                {deal.image ? (
                  <div className="h-52 w-full bg-brand-surface-light lg:h-auto lg:w-64">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-40 w-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.10),transparent_55%)] lg:h-auto lg:w-64">
                    <span className="font-display text-6xl text-brand-gold/15">
                      M
                    </span>
                  </div>
                )}

                <div className="flex min-w-0 flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-2xl text-brand-ivory">
                        {deal.title}
                      </h2>

                      {deal.badge && (
                        <span className="rounded-full bg-brand-gold px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-brand-bg">
                          {deal.badge}
                        </span>
                      )}

                      <span
                        className={`rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider ${
                          deal.isActive
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {deal.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    {deal.price !== undefined && (
                      <p className="mt-2 text-sm font-semibold text-brand-gold">
                        Rs. {deal.price.toLocaleString()}
                      </p>
                    )}

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">
                      {deal.description}
                    </p>

                    <p className="mt-3 text-xs text-brand-muted">
                      Sort order: {deal.sortOrder}
                    </p>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <Link
                      href={`/admin/deals/${deal.id}`}
                      className="rounded-full border border-brand-gold/30 px-5 py-3 text-xs font-bold uppercase tracking-wider text-brand-gold transition hover:bg-brand-gold hover:text-brand-bg"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(deal.id, deal.title)}
                      className="rounded-full border border-red-500/30 px-5 py-3 text-xs font-bold uppercase tracking-wider text-red-400 transition hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="mt-6 text-xs text-brand-muted">
        Showing {filteredDeals.length} of {deals.length} deals.
      </p>
    </div>
  );
}
