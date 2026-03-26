import { CtaButton } from "../components/CtaButton";
import { FadeInSection } from "../components/FadeInSection";

type FinalCtaSectionProps = {
  onRequestAccess: () => void;
};

export function FinalCtaSection({ onRequestAccess }: FinalCtaSectionProps) {
  return (
    <section className="bg-[#F7F7F5] py-44 text-center">
      <div className="mx-auto max-w-4xl px-6">
        <FadeInSection>
          <h2 className="mb-14 text-5xl font-bold leading-tight text-[#111111] sm:text-6xl md:text-7xl">
            The Ground Truth Matters
          </h2>
          <CtaButton onClick={onRequestAccess} variant="outline">
            Request Access
          </CtaButton>
        </FadeInSection>
      </div>
    </section>
  );
}
