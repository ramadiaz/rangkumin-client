import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import { Providers } from "./providers";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const acorn8 = localFont({
  src: "./fonts/acorn-8.ttf",
  variable: "--font-acorn",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rangkumin | Summarizing Wisdom",
  description:
    "Rangkumin simplifies complex information into concise, meaningful summaries. Perfect for students, professionals, and lifelong learners who want to save time and absorb knowledge efficiently.",
  keywords: [
    "Rangkumin",
    "summarizing tool",
    "AI summaries",
    "knowledge extraction",
    "information summarization",
    "productivity tool",
    "time-saving",
    "learning aid",
    "summarizer",
  ],
  authors: [{ name: "Rama Diaz", url: "https://xann.my.id" }],
  robots: "index, follow",
  openGraph: {
    title: "Rangkumin | Summarizing Wisdom",
    description:
      "Rangkumin simplifies complex information into concise, meaningful summaries. Perfect for students, professionals, and lifelong learners who want to save time and absorb knowledge efficiently.",
    url: "https://rangkumin.xann.my.id",
    type: "website",
    images: [
      {
        url: "/images/rangkumin.jpg",
        width: 800,
        height: 600,
        alt: "Rangkumin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rangkumin | Summarizing Wisdom",
    description:
      "Rangkumin simplifies complex information into concise, meaningful summaries. Perfect for students, professionals, and lifelong learners who want to save time and absorb knowledge efficiently.",
    images: "/images/rangkumin.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${acorn8.variable} dark`}
      >
        <Providers>
          <div className="relative w-full h-screen overflow-auto">
            <div className="z-50 absolute w-full min-h-screen bg-black/20">
              {children}
            </div>
            <div className="wrap z-0 fixed top-0 right-0 w-screen h-screen">
              {Array.from({ length: 100 }).map((_, index) => (
                <div className="tri z-0" key={index}></div>
              ))}
            </div>
          </div>
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
