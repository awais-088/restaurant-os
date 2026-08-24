import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold tracking-wide transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg";

  const variants = {
    primary:
      "bg-brand-gold text-brand-bg hover:bg-brand-gold-light active:scale-[0.98]",

    secondary:
      "border border-brand-gold/40 bg-transparent text-brand-ivory hover:border-brand-gold hover:bg-brand-gold/10 active:scale-[0.98]",

    ghost: "text-brand-gold hover:text-brand-gold-light",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
