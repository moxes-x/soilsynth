import { LandingPage } from "@/components/shared/landing";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SoilSynth",
  url: "https://www.soilsynth.com",
  logo: "https://www.soilsynth.com/logo.png",
  email: "partnerships@soilsynth.com",
  sameAs: ["https://www.instagram.com/soilsynth"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SoilSynth",
  url: "https://www.soilsynth.com",
  description:
    "SoilSynth is building the infrastructure layer for soil intelligence across agricultural systems.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <LandingPage />
    </>
  );
}
