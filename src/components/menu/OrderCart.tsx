"use client";

import type { CartItem } from "@/types/content";

type OrderCartProps = {
  items: CartItem[];
  whatsapp?: string;
};

export default function OrderCart({ items, whatsapp }: OrderCartProps) {
  if (items.length === 0) {
    return null;
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const orderMessage = [
    "Assalam-o-Alaikum MUSA Cafe,",
    "",
    "I'd like to place an order:",
    "",
    ...items.map(
      (item) =>
        `${item.name} × ${item.quantity} — Rs. ${(
          item.price * item.quantity
        ).toLocaleString()}`,
    ),
    "",
    `Total: Rs. ${totalPrice.toLocaleString()}`,
    "",
    "Name:",
    "Phone:",
    "Address:",
  ].join("\n");

  const whatsappUrl = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(orderMessage)}`
    : "#";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-gold/20 bg-brand-bg/95 p-3 shadow-2xl backdrop-blur-xl sm:bottom-4 sm:left-auto sm:right-6 sm:w-[360px] sm:rounded-2xl sm:border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
            Your Order
          </p>

          <p className="mt-1 text-sm text-brand-muted">
            {totalItems} item
            {totalItems !== 1 ? "s" : ""} · Rs. {totalPrice.toLocaleString()}
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-brand-gold px-5 py-3 text-xs font-bold uppercase tracking-wider text-brand-bg transition hover:bg-brand-gold-light"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
