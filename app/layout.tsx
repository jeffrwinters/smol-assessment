import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smol-reserve-readiness.jeff-r-winters.chatgpt.site"),
  title: "15% Reserve Readiness | St. Moritz on the Lake",
  description:
    "A board-ready plan for meeting the 2027 Fannie Mae and Freddie Mac replacement-reserve requirement.",
  openGraph: {
    title: "Closing the 15% reserve gap",
    description: "A practical 2027 plan for St. Moritz on the Lake.",
    url: "https://smol-reserve-readiness.jeff-r-winters.chatgpt.site",
    siteName: "St. Moritz Reserve Readiness",
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
    description: "A practical 2027 plan for St. Moritz on the Lake.",
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
