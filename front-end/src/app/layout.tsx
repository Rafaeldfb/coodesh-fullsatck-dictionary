import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { GlobalState } from "@/context/GlobalContext";
import Navbar from "@/ui/navbar/Navbar";

const geistSans = localFont({
  // src: "@/public/fonts/GeistVF.woff",
  src: '../public/fonts/GeistVF.woff',
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  // src: "@/public/fonts/GeistMonoVF.woff",
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Fullstack Challenge - Dictionary",
  description: "A web dictionary based on Free Dictionary API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto container`}
      >
        <GlobalState >
          <>
            <Navbar/>
            
            {children}
          </>
        </GlobalState>
      </body>
    </html>
  );
}
