import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.soilsynth.com"),
  title: {
    default: "SoilSynth | Soil Intelligence Infrastructure",
    template: "%s | SoilSynth",
  },
  description:
    "SoilSynth is building the infrastructure layer for soil intelligence across agricultural systems.",
  alternates: {
    canonical: "/",
  },
  applicationName: "SoilSynth",
  authors: [{ name: "SoilSynth", url: "https://www.soilsynth.com" }],
  creator: "SoilSynth",
  publisher: "SoilSynth",
  keywords: [
    "soil intelligence",
    "agricultural risk",
    "climate intelligence",
    "agriculture analytics",
    "soil data infrastructure",
    "agtech",
    "SoilSynth",
  ],
  icons: {
    apple: [{ url: "/icon.png" }],
    icon: [{ type: "image/png", url: "/icon.png" }],
    shortcut: ["/icon.png"],
  },
  openGraph: {
    type: "website",
    url: "https://www.soilsynth.com",
    siteName: "SoilSynth",
    title: "SoilSynth | Soil Intelligence Infrastructure",
    description:
      "SoilSynth is building the infrastructure layer for soil intelligence across agricultural systems.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "SoilSynth",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "SoilSynth | Soil Intelligence Infrastructure",
    description:
      "SoilSynth is building the infrastructure layer for soil intelligence across agricultural systems.",
    images: ["/logo.png"],
  },
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
