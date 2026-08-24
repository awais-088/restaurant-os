import type { Metadata } from "next";
import "./globals.css";
import { bodyFont, displayFont } from "./fonts";

export const metadata: Metadata = {
  title: "MUSA Cafe & Restaurant",
  description:
    "A premium dining destination in Layyah offering Pakistani, BBQ, cafe and continental favorites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
