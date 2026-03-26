"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LandingFooter } from "./components/LandingFooter";
import { LandingHeader } from "./components/LandingHeader";
import { RequestAccessModal } from "./components/RequestAccessModal";
import { AccessSection } from "./sections/AccessSection";
import { AudienceSection } from "./sections/AudienceSection";
import { ContextSection } from "./sections/ContextSection";
import { FinalCtaSection } from "./sections/FinalCtaSection";
import { HeroSection } from "./sections/HeroSection";
import { OutcomesSection } from "./sections/OutcomesSection";
import { ProblemSection } from "./sections/ProblemSection";
import { SolutionSection } from "./sections/SolutionSection";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-[#F7F7F5] font-sans text-[#111111] antialiased selection:bg-[#1F7A63]/15">
      <LandingHeader onRequestAccess={openModal} />
      <HeroSection onRequestAccess={openModal} />
      <ContextSection />
      <ProblemSection />
      <SolutionSection />
      <OutcomesSection />
      <AudienceSection />
      <AccessSection onRequestAccess={openModal} />
      <FinalCtaSection onRequestAccess={openModal} />
      <LandingFooter />

      <AnimatePresence>
        {isModalOpen ? <RequestAccessModal onClose={closeModal} /> : null}
      </AnimatePresence>
    </div>
  );
}
