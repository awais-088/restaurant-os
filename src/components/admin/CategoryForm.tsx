"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

type CategoryFormProps = {
  category?: {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    sortOrder: number;
  };
  mode: "create" | "edit";
};

export default function CategoryForm({ category, mode }: CategoryFormProps) {
  const router = useRouter();

  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [sortOrder, setSortOrder] = useState(
    category?.sortOrder?.toString() || "1",
  );
  const [isActive, setIsActive] = useState(category?.isActive ?? true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Please enter a category name.");
      return;
    }

    try {
      setSaving(true);

      const url =
        mode === "create"
          ? "/api/admin/categories"
          : `/api/admin/categories/${category?.id}`;

      const response = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          sortOrder: Number(sortOrder),
          isActive,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to save category.");
      }

      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Failed to save category.",
      );
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
          htmlFor="category-name"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Category Name
        </label>

        <input
          id="category-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. BBQ"
          className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-brand-bg px-4 text-sm text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor="category-description"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Description
        </label>

        <textarea
          id="category-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe this category..."
          rows={4}
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-brand-bg px-4 py-3 text-sm leading-6 text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor="sort-order"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Sort Order
        </label>

        <input
          id="sort-order"
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
              Show this category on the public menu.
            </span>
          </span>
        </label>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin/categories")}
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
              ? "Create Category"
              : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
