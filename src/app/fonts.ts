import { Cormorant_Garamond, Manrope } from "next/font/google";

export const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display-musa",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body-musa",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
