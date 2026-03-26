import Image from "next/image";
import Link from "next/link";

type LandingHeaderProps = {
  onRequestAccess: () => void;
};

export function LandingHeader({ onRequestAccess }: LandingHeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-black/[0.06] bg-[#F7F7F5]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-transparent.png"
            alt="SoilSynth"
            width={30}
            height={30}
            className="select-none"
          />
          <span className="text-sm font-semibold tracking-[0.12em] text-[#111111]">
            SOILSYNTH
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-[#111111]/50 md:flex">
          <a href="#problem" className="transition-colors hover:text-[#111111]">
            The Problem
          </a>
          <a href="#solution" className="transition-colors hover:text-[#111111]">
            Solution
          </a>
          <a href="#access" className="transition-colors hover:text-[#111111]">
            Early Access
          </a>
        </nav>
        <button
          type="button"
          onClick={onRequestAccess}
          className="border border-[#1F7A63]/30 px-5 py-2 text-sm font-medium text-[#1F7A63] transition-all hover:border-[#1F7A63] hover:bg-[#1F7A63]/5"
        >
          Request Access
        </button>
      </div>
    </header>
  );
}
