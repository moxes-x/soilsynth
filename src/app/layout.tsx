import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoilSynth | Soil Intelligence Infrastructure",
  description:
    "SoilSynth is building the infrastructure layer for soil intelligence across agricultural systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col bg-[#F7F7F5] text-[#111111] font-sans">
        {children}
      </body>
    </html>
  );
}
