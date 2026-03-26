import Image from "next/image";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="border-t border-black/[0.06] bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-[#111111]/35 md:flex-row">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-transparent.png"
            alt="SoilSynth"
            width={20}
            height={20}
            className="select-none opacity-60"
          />
          <span>
            SoilSynth - Building the global intelligence layer for soil data
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="transition-colors hover:text-[#111111]/70">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-[#111111]/70">
            Terms
          </Link>
          <a
            href="https://www.instagram.com/soilsynth"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#111111]/70"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
