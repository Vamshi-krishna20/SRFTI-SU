import type { Metadata } from "next";
import { Space_Grotesk, Inter, DM_Serif_Display, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SiteHeader } from "@/components/site-header";
import { Agentation } from "agentation";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SRFTI Student Union",
  description: "Shared digital home for SRFTI students — screenings, polls, news, profiles, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${dmSerif.variable} ${ibmPlexMono.variable} antialiased`}>
      <body className="bg-background text-foreground">
        <SiteHeader />
        <ThemeToggle className="fixed top-4 right-4 z-50" />
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
