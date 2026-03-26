import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EASE } from "@/constants/landing";

type FadeInSectionProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function FadeInSection({
  children,
  delay = 0,
  className = "",
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
