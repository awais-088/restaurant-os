"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

type DealFormProps = {
  mode: "create" | "edit";

  deal?: {
    id: string;
    title: string;
    description: string;
    price?: number;
    badge?: string;
    image?: string;
    isActive: boolean;
    sortOrder: number;
  };
};

export default function DealForm({ mode, deal }: DealFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(deal?.title || "");

  const [description, setDescription] = useState(deal?.description || "");

  const [price, setPrice] = useState(deal?.price?.toString() || "");

  const [badge, setBadge] = useState(deal?.badge || "");

  const [image, setImage] = useState(deal?.image || "");

  const [sortOrder, setSortOrder] = useState(
    deal?.sortOrder?.toString() || "1",
  );

  const [isActive, setIsActive] = useState(deal?.isActive ?? true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Please enter a deal title.");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a deal description.");
      return;
    }

    if (price && Number(price) < 0) {
      setError("Please enter a valid price.");
      return;
    }

    try {
      setSaving(true);

      const url =
        mode === "create" ? "/api/admin/deals" : `/api/admin/deals/${deal?.id}`;

      const response = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price,
          badge,
          image,
          sortOrder: Number(sortOrder),
          isActive,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to save deal.");
      }

      router.push("/admin/deals");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError(error instanceof Error ? error.message : "Failed to save deal.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-brand-surface p-6 sm:p-8"
    >
      {error && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      <div>
        <label
          htmlFor="deal-title"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Deal Title
        </label>

        <input
          id="deal-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Family Dinner Deal"
          className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-brand-bg px-4 text-sm text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor="deal-description"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Description
        </label>

        <textarea
          id="deal-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe what this deal includes..."
          rows={5}
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-brand-bg px-4 py-3 text-sm leading-6 text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor="deal-price"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Price
        </label>

        <div className="relative mt-2">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-brand-muted">
            Rs.
          </span>

          <input
            id="deal-price"
            type="number"
            min="0"
            step="1"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="2500"
            className="h-12 w-full rounded-xl border border-white/10 bg-brand-bg pl-12 pr-4 text-sm text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
          />
        </div>

        <p className="mt-2 text-xs text-brand-muted">
          Leave empty if the deal does not have a fixed price.
        </p>
      </div>

      <div className="mt-6">
        <label
          htmlFor="deal-badge"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Badge
        </label>

        <input
          id="deal-badge"
          type="text"
          value={badge}
          onChange={(event) => setBadge(event.target.value)}
          placeholder="e.g. MUSA SPECIAL"
          className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-brand-bg px-4 text-sm text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor="deal-image"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Image URL
        </label>

        <input
          id="deal-image"
          type="url"
          value={image}
          onChange={(event) => setImage(event.target.value)}
          placeholder="https://..."
          className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-brand-bg px-4 text-sm text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
        />

        <p className="mt-2 text-xs text-brand-muted">
          We can connect proper image uploads later.
        </p>
      </div>

      <div className="mt-6">
        <label
          htmlFor="deal-sort-order"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Sort Order
        </label>

        <input
          id="deal-sort-order"
          type="number"
          min="1"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-brand-bg px-4 text-sm text-brand-ivory outline-none focus:border-brand-gold/50"
        />
      </div>

      <div className="mt-8">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(event) => setIsActive(event.target.checked)}
            className="h-4 w-4 accent-brand-gold"
          />

          <span>
            <span className="block text-sm text-brand-ivory">Active</span>

            <span className="block text-xs text-brand-muted">
              Show this deal on the public website.
            </span>
          </span>
        </label>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin/deals")}
          disabled={saving}
          className="rounded-full border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-brand-muted transition hover:border-white/20 hover:text-brand-ivory disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-brand-gold px-6 py-3 text-xs font-bold uppercase tracking-wider text-brand-bg transition hover:bg-brand-gold-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : mode === "create"
              ? "Create Deal"
              : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
