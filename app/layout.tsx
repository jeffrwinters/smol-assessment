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
    "An association member guide to current reserve funding and the 2027 agency requirement.",
  openGraph: {
    title: "Meeting the 15% reserve standard",
    description: "The adopted 2026 budget is already above the 15% line-item minimum.",
    url: "https://smol-reserve-readiness.jeff-r-winters.chatgpt.site",
    siteName: "St. Moritz Reserve Health Guide",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1733,
        height: 908,
        alt: "Sunset over the lake with the title Meeting the 15% reserve standard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meeting the 15% reserve standard",
    description: "The adopted 2026 budget is already above the 15% line-item minimum.",
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
