import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Piskid.com — Votre mpisikidy IA big data",
  description: "Agent IA inspiré du mpisikidy malagasy. Analyse big data multi-source pour vous conseiller sur votre famille, finances, émotions et vie — sans arnaque religieuse.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body style={{ fontFamily: "var(--font-body)", background: "#f5f3ff" }}>{children}</body>
    </html>
  );
}
