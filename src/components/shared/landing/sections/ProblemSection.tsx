import { problemCards } from "@/constants/landing-data";
import { FadeInSection } from "../components/FadeInSection";

export function ProblemSection() {
  return (
    <section id="problem" className="bg-white py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInSection className="mb-16">
          <p className="mb-6 text-xs font-mono uppercase tracking-widest text-[#1F7A63]">
            The Gap
          </p>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight text-[#111111] sm:text-4xl md:text-5xl">
            A System Built on Incomplete Information
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {problemCards.map((card, index) => (
            <FadeInSection
              key={card.tag}
              delay={index * 0.1}
              className="border-t border-[#1F7A63]/20 pt-8"
            >
              <p className="mb-5 text-xs font-mono uppercase tracking-widest text-[#1F7A63]/60">
                {card.tag}
              </p>
              <h3 className="mb-4 text-xl font-semibold text-[#111111]">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#666666]">
                {card.body}
              </p>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
