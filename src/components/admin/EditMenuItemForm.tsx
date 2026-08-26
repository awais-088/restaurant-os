"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type MenuItemData = {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  isFeatured: boolean;
};

type EditMenuItemFormProps = {
  item: MenuItemData;
  categories: Category[];
};

export default function EditMenuItemForm({
  item,
  categories,
}: EditMenuItemFormProps) {
  const router = useRouter();

  const [name, setName] = useState(item.name);
  const [categoryId, setCategoryId] = useState(item.categoryId);
  const [price, setPrice] = useState(String(item.price));
  const [description, setDescription] = useState(item.description);
  const [image, setImage] = useState(item.image || "");

  const [isAvailable, setIsAvailable] = useState(item.isAvailable);
  const [isFeatured, setIsFeatured] = useState(item.isFeatured);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Please enter a menu item name.");
      return;
    }

    if (!categoryId) {
      setError("Please select a category.");
      return;
    }

    if (!price || Number(price) < 0) {
      setError("Please enter a valid price.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`/api/admin/menu-items/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          categoryId,
          price: Number(price),
          description,
          image,
          isAvailable,
          isFeatured,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update menu item.");
      }

      router.push("/admin/menu");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Failed to update menu item.",
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
      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Item Name
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-brand-bg px-4 text-sm text-brand-ivory outline-none focus:border-brand-gold/50"
        />
      </div>

      {/* Category */}
      <div className="mt-6">
        <label
          htmlFor="category"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Category
        </label>

        <select
          id="category"
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-brand-bg px-4 text-sm text-brand-ivory outline-none focus:border-brand-gold/50"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="mt-6">
        <label
          htmlFor="price"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Price
        </label>

        <div className="relative mt-2">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-brand-muted">
            Rs.
          </span>

          <input
            id="price"
            type="number"
            min="0"
            step="1"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="h-12 w-full rounded-xl border border-white/10 bg-brand-bg pl-12 pr-4 text-sm text-brand-ivory outline-none focus:border-brand-gold/50"
          />
        </div>
      </div>

      {/* Image URL */}
      <div className="mt-6">
        <label
          htmlFor="image"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Image URL
        </label>

        <input
          id="image"
          type="url"
          value={image}
          onChange={(event) => setImage(event.target.value)}
          placeholder="https://example.com/chicken-karahi.jpg"
          className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-brand-bg px-4 text-sm text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
        />

        <p className="mt-2 text-xs leading-5 text-brand-muted">
          Paste a publicly accessible image URL. You can replace it whenever the
          restaurant provides new photography.
        </p>
      </div>

      {/* Image Preview */}
      {image.trim() && (
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-brand-bg">
          <div className="aspect-[16/9]">
            <img
              src={image}
              alt={`${name || "Menu item"} preview`}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      )}

      {/* Description */}
      <div className="mt-6">
        <label
          htmlFor="description"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Description
        </label>

        <textarea
          id="description"
          rows={5}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-brand-bg px-4 py-3 text-sm leading-6 text-brand-ivory outline-none focus:border-brand-gold/50"
        />
      </div>

      {/* Options */}
      <div className="mt-8 space-y-4">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(event) => setIsAvailable(event.target.checked)}
            className="h-4 w-4 accent-brand-gold"
          />

          <span>
            <span className="block text-sm text-brand-ivory">Available</span>

            <span className="block text-xs text-brand-muted">
              Customers can order this item.
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(event) => setIsFeatured(event.target.checked)}
            className="h-4 w-4 accent-brand-gold"
          />

          <span>
            <span className="block text-sm text-brand-ivory">Featured</span>

            <span className="block text-xs text-brand-muted">
              Mark this dish as a signature item.
            </span>
          </span>
        </label>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={saving}
          onClick={() => router.push("/admin/menu")}
          className="rounded-full border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-brand-muted transition hover:border-white/20 hover:text-brand-ivory disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-brand-gold px-6 py-3 text-xs font-bold uppercase tracking-wider text-brand-bg transition hover:bg-brand-gold-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
