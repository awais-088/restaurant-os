"use client";

import { useState } from "react";
import Link from "next/link";

type MobileMenuProps = {
  restaurantName: string;
  whatsapp?: string;
};

export default function MobileMenu({
  restaurantName,
  whatsapp,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        className="flex size-11 items-center justify-center rounded-full border border-white/10 text-brand-ivory"
      >
        {open ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-[76px] border-b border-white/5 bg-brand-bg px-5 pb-8 pt-6 shadow-2xl">
          <div className="flex flex-col">
            <div className="mb-6 border-b border-white/5 pb-5">
              <p className="font-display text-2xl text-brand-ivory">
                {restaurantName}
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-brand-muted">
                A taste worth gathering for
              </p>
            </div>

            <Link
              href="/"
              onClick={closeMenu}
              className="border-b border-white/5 py-4 text-base text-brand-ivory"
            >
              Home
            </Link>

            <Link
              href="/menu"
              onClick={closeMenu}
              className="border-b border-white/5 py-4 text-base text-brand-ivory"
            >
              Menu
            </Link>

            <Link
              href="/about"
              onClick={closeMenu}
              className="border-b border-white/5 py-4 text-base text-brand-ivory"
            >
              Our Story
            </Link>

            <Link
              href="/gallery"
              onClick={closeMenu}
              className="border-b border-white/5 py-4 text-base text-brand-ivory"
            >
              Gallery
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="border-b border-white/5 py-4 text-base text-brand-ivory"
            >
              Contact
            </Link>

            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-brand-gold px-6 text-sm font-bold text-brand-bg"
              >
                Order on WhatsApp
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
