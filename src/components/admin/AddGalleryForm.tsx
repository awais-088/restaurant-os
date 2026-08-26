"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

const categories = [
  "Food",
  "Interior",
  "Exterior",
  "Dining",
  "Events",
  "Experience",
];

export default function AddGalleryForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState("");
  const [sortOrder, setSortOrder] = useState("1");
  const [isActive, setIsActive] = useState(true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Please enter a gallery title.");
      return;
    }

    if (!category) {
      setError("Please select a category.");
      return;
    }

    if (!image.trim()) {
      setError("Please enter an image URL.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          category,
          image,
          sortOrder: Number(sortOrder),
          isActive,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create gallery item.");
      }

      router.push("/admin/gallery");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to create gallery item.",
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
          htmlFor="title"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Title
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Main Dining Area"
          className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-brand-bg px-4 text-sm text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor="category"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Category
        </label>

        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-brand-bg px-4 text-sm text-brand-ivory outline-none focus:border-brand-gold/50"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

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
          placeholder="https://..."
          className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-brand-bg px-4 text-sm text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
        />

        {image && (
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
            <img
              src={image}
              alt="Preview"
              className="h-48 w-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="mt-6">
        <label
          htmlFor="description"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Description
        </label>

        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe this photograph..."
          rows={4}
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-brand-bg px-4 py-3 text-sm leading-6 text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor="sortOrder"
          className="text-xs font-bold uppercase tracking-wider text-brand-muted"
        >
          Sort Order
        </label>

        <input
          id="sortOrder"
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
              Show this photograph on the public website.
            </span>
          </span>
        </label>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin/gallery")}
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
          {saving ? "Saving..." : "Save Photo"}
        </button>
      </div>
    </form>
  );
}
