import { CtaButton } from "../components/CtaButton";
import { FadeInSection } from "../components/FadeInSection";

type AccessSectionProps = {
  onRequestAccess: () => void;
};

export function AccessSection({ onRequestAccess }: AccessSectionProps) {
  return (
    <section id="access" className="bg-white py-44 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <FadeInSection>
          <p className="mb-10 text-xs font-mono uppercase tracking-widest text-[#1F7A63]">
            Pilot Program
          </p>
          <h2 className="mb-8 text-4xl font-bold leading-tight text-[#111111] sm:text-5xl">
            Early Access
          </h2>
          <p className="mx-auto mb-14 max-w-xl text-lg leading-relaxed text-[#666666]">
            We are working with a small group of partners to shape the next
            generation of agricultural intelligence. Apply to join the pilot.
          </p>
          <CtaButton onClick={onRequestAccess}>Request Access</CtaButton>
        </FadeInSection>
      </div>
    </section>
  );
}
