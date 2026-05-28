import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Piskid — Votre mpisikidy IA, sans arnaque",
  description: "Piskid utilise l'IA et des données réelles pour vous conseiller sur votre vie — amour, argent, carrière — gratuitement. Fini les faux pasteurs et devins indiens.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body style={{ fontFamily: "var(--font-body)", background: "#0F0A1E", color: "#F3F0FF" }}>
        {children}
      </body>
    </html>
  );
}
