import { outcomes } from "@/constants/landing-data";
import { FadeInSection } from "../components/FadeInSection";

export function OutcomesSection() {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInSection className="mb-16">
          <p className="mb-6 text-xs font-mono uppercase tracking-widest text-[#1F7A63]">
            Outcomes
          </p>
          <h2 className="max-w-xl text-3xl font-bold leading-tight text-[#111111] sm:text-4xl">
            What This Unlocks
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {outcomes.map((item, index) => (
            <FadeInSection
              key={item.n}
              delay={index * 0.08}
              className="border-t border-[#1F7A63]/20 pt-8"
            >
              <span className="mb-6 block text-xs font-mono text-[#1F7A63]/50">
                {item.n}
              </span>
              <h3 className="mb-3 text-lg font-semibold text-[#111111]">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#666666]">
                {item.body}
              </p>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
