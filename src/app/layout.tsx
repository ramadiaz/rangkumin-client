import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import { Providers } from "./providers";

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
  title: "Create Next App",
  description: "Generated by create next app",
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
            <div className="z-50 absolute w-full h-max bg-black/20">
              {children}
            </div>
            <div className="wrap z-0 fixed top-0 right-0 w-screen h-screen">
              {Array.from({ length: 100 }).map((_, index) => (
                <div className="tri z-0" key={index}></div>
              ))}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
