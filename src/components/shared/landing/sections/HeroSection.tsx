import { motion } from "framer-motion";
import { EASE } from "@/constants/landing";
import { CtaButton } from "../components/CtaButton";

type HeroSectionProps = {
  onRequestAccess: () => void;
};

export function HeroSection({ onRequestAccess }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1F7A6308_1px,transparent_1px),linear-gradient(to_bottom,#1F7A6308_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_30%,transparent_100%)]"
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-8 text-xs font-mono uppercase tracking-widest text-[#1F7A63]"
        >
          SoilSynth - Climate Intelligence
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="mb-8 text-5xl font-bold leading-[1.06] tracking-tight text-[#111111] sm:text-6xl md:text-7xl"
        >
          Soil Intelligence for Smarter Agricultural Decisions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          className="mx-auto mb-14 max-w-2xl text-lg leading-relaxed text-[#666666] sm:text-xl"
        >
          A new layer of data infrastructure helping financial institutions
          understand agricultural risk from the ground up.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
        >
          <CtaButton onClick={onRequestAccess}>Request Access</CtaButton>
        </motion.div>
      </div>
    </section>
  );
}
