import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smol-reserve-readiness.jeff-r-winters.chatgpt.site"),
  title: "Reserve Health Guide | St. Moritz on the Lake",
  description:
    "An association member guide to current reserve funding, the 2027 agency requirement, and the plan for closing the gap.",
  openGraph: {
    title: "Closing the 15% reserve gap",
    description: "A clear guide to reserve health and the practical 2027 funding plan.",
    url: "https://smol-reserve-readiness.jeff-r-winters.chatgpt.site",
    siteName: "St. Moritz Reserve Health Guide",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1733,
        height: 908,
        alt: "Sunset over the lake with the title Closing the 15% reserve gap",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Closing the 15% reserve gap",
    description: "A clear guide to reserve health and the practical 2027 funding plan.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
