"use client";

import { useMemo, useState } from "react";
import MenuCard from "./MenuCard";
import type { MenuCategory, MenuItem } from "@/types/content";

type MenuGridProps = {
  categories: MenuCategory[];
  items: MenuItem[];
  onAdd: (item: MenuItem) => void;
};

export default function MenuGrid({ categories, items, onAdd }: MenuGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.categoryId === activeCategory;

      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        item.name.toLowerCase().includes(searchValue) ||
        item.description?.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, search]);

  return (
    <div>
      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="search"
            placeholder="Search dishes..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-12 w-full rounded-full border border-white/10 bg-brand-surface px-5 text-sm text-brand-ivory outline-none placeholder:text-brand-muted focus:border-brand-gold/50"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-10 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
              activeCategory === "all"
                ? "bg-brand-gold text-brand-bg"
                : "border border-white/10 text-brand-muted hover:border-brand-gold/30 hover:text-brand-ivory"
            }`}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
                activeCategory === category.id
                  ? "bg-brand-gold text-brand-bg"
                  : "border border-white/10 text-brand-muted hover:border-brand-gold/30 hover:text-brand-ivory"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu */}
      {filteredItems.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} onAdd={onAdd} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/5 bg-brand-surface px-6 py-16 text-center">
          <p className="font-display text-3xl text-brand-ivory">
            Nothing found
          </p>

          <p className="mt-2 text-sm text-brand-muted">
            Try another dish or category.
          </p>
        </div>
      )}
    </div>
  );
}
