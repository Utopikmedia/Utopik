import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Utopik Média — Création de contenu · Saguenay-Lac-Saint-Jean",
  description: "Agence créative spécialisée en vidéo, photographie et stratégie de contenu au Saguenay-Lac-Saint-Jean.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn(inter.variable, syne.variable)}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
