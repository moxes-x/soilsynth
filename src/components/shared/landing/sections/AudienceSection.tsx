import { institutionRows } from "@/constants/landing-data";
import { FadeInSection } from "../components/FadeInSection";

export function AudienceSection() {
  return (
    <section className="bg-[#F7F7F5] py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <FadeInSection>
            <p className="mb-6 text-xs font-mono uppercase tracking-widest text-[#1F7A63]">
              Who It&apos;s For
            </p>
            <h2 className="mb-8 text-3xl font-bold leading-tight text-[#111111] sm:text-4xl">
              Designed for Institutions Operating in Agriculture
            </h2>
            <p className="text-lg leading-relaxed text-[#666666]">
              SoilSynth is built for the organizations that shape agricultural
              outcomes at scale - banks, insurers, NGOs, and governments - who
              need a common language for soil risk to make better decisions.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.15}>
            <div className="divide-y divide-black/[0.06]">
              {institutionRows.map((row) => (
                <div key={row.type} className="flex items-center gap-6 py-5">
                  <span className="w-24 shrink-0 text-xs font-mono text-[#1F7A63]/60">
                    {row.type}
                  </span>
                  <span className="text-sm text-[#444444]">{row.label}</span>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
