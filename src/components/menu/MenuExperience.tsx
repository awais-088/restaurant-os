"use client";

import { useEffect, useState } from "react";

import MenuGrid from "./MenuGrid";
import OrderCart from "./OrderCart";

import type { CartItem, MenuCategory, MenuItem } from "@/types/content";

type MenuExperienceProps = {
  whatsapp?: string;
};

type MenuApiCategory = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
};

type MenuApiItem = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  isAvailable: boolean;
  isFeatured: boolean;
  sortOrder: number;

  category: {
    _id: string;
    name: string;
    slug: string;
  };
};

type MenuApiResponse = {
  success: boolean;
  data?: {
    categories: MenuApiCategory[];
    items: MenuApiItem[];
  };
  message?: string;
};

export default function MenuExperience({ whatsapp }: MenuExperienceProps) {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    async function loadMenu() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/menu");

        if (!response.ok) {
          throw new Error("Failed to fetch menu.");
        }

        const result: MenuApiResponse = await response.json();

        if (!result.success || !result.data) {
          throw new Error(result.message || "Failed to fetch menu.");
        }

        /*
         * Convert database/API category shape
         * into the reusable UI MenuCategory shape.
         */
        const mappedCategories: MenuCategory[] = result.data.categories.map(
          (category) => ({
            id: category._id,
            name: category.name,
            slug: category.slug,
            description: category.description,
            order: category.sortOrder,
          }),
        );

        /*
         * Convert database/API item shape
         * into the reusable UI MenuItem shape.
         */
        const mappedItems: MenuItem[] = result.data.items.map((item) => ({
          id: item._id,
          categoryId: item.category._id,
          name: item.name,
          description: item.description,
          price: item.price,
          featured: item.isFeatured,
          available: item.isAvailable,
        }));

        setCategories(mappedCategories);
        setItems(mappedItems);
      } catch (error) {
        console.error("Menu loading error:", error);

        setError(
          error instanceof Error ? error.message : "Unable to load menu.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id);

      if (existing) {
        return current.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem,
        );
      }

      return [
        ...current,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  if (loading) {
    return (
      <div className="py-20">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[430px] animate-pulse rounded-2xl border border-white/5 bg-brand-surface"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-brand-surface px-6 py-16 text-center">
        <p className="font-display text-3xl text-brand-ivory">
          Menu unavailable
        </p>

        <p className="mt-3 text-sm text-brand-muted">
          We could not load the menu right now. Please try again.
        </p>
      </div>
    );
  }

  return (
    <>
      <MenuGrid categories={categories} items={items} onAdd={addToCart} />

      <OrderCart items={cart} whatsapp={whatsapp} />
    </>
  );
}
