import { FadeInSection } from "../components/FadeInSection";

export function SolutionSection() {
  return (
    <section id="solution" className="bg-[#F7F7F5] py-44 text-center">
      <div className="mx-auto max-w-4xl px-6">
        <FadeInSection>
          <p className="mb-10 text-xs font-mono uppercase tracking-widest text-[#1F7A63]">
            What We&apos;re Building
          </p>
          <h2 className="mb-10 text-4xl font-bold leading-tight text-[#111111] sm:text-5xl md:text-7xl">
            Introducing SoilSynth
          </h2>
          <p className="mx-auto max-w-3xl text-xl font-light leading-relaxed text-[#666666] sm:text-2xl">
            Building the intelligence layer for soil data - transforming how
            agricultural systems are understood, evaluated, and financed.
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}
