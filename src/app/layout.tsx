import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";


const manrope = localFont({
  src: "./fonts/Manrope.ttf",
  variable: "--font-manrope",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TechCare",
  description: "A Healthcare Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased min-h-dvh h-dvh flex flex-col`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
