import { FadeInSection } from "../components/FadeInSection";

export function ContextSection() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInSection>
          <p className="mb-6 text-xs font-mono uppercase tracking-widest text-[#1F7A63]">
            The Invisible Layer
          </p>
          <h2 className="mb-10 max-w-3xl text-3xl font-bold leading-tight text-[#111111] sm:text-4xl md:text-5xl">
            Agriculture Runs on What You Can&apos;t See
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-[#666666]">
            Soil is the foundation of every agricultural decision - yet it
            remains one of the least understood variables in lending, program
            design, and policy. Trillions in capital are allocated annually
            based on what is above ground, while the variables below it go
            unmeasured.
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}
