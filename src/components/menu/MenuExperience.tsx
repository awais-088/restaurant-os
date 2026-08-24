"use client";

import { useState } from "react";
import MenuGrid from "./MenuGrid";
import OrderCart from "./OrderCart";

import type { CartItem, MenuCategory, MenuItem } from "@/types/content";

type MenuExperienceProps = {
  categories: MenuCategory[];
  items: MenuItem[];
  whatsapp?: string;
};

export default function MenuExperience({
  categories,
  items,
  whatsapp,
}: MenuExperienceProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

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

  return (
    <>
      <MenuGrid categories={categories} items={items} onAdd={addToCart} />

      <OrderCart items={cart} whatsapp={whatsapp} />
    </>
  );
}
