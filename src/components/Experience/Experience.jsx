import React from "react";
import { certifications, timeline } from "../../data/site";
import { Check } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export const Experience = () => {
  return (
    <section id="experience" aria-labelledby="experience-title" className="space-y-8">
      <SectionHeader id="experience-title" eyebrow="Experience" title="Education & experience" />

      <div className="grid lg:grid-cols-[minmax(0,1fr)_21rem] gap-10 lg:gap-16 items-start">
        <ol className="relative">
          <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 w-px bg-line" />
          {timeline.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 80} className="relative pl-8 pb-9 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-[7px] w-[11px] h-[11px] rounded-full border-2 ${
                  item.current ? "border-accent bg-accent" : "border-line-strong bg-bg"
                }`}
              />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono">
                <span className={item.current ? "text-accent font-medium" : "text-muted"}>{item.period}</span>
                <span className="chip">{item.kind}</span>
              </div>
              <h3 className="text-xl font-bold text-fg mt-2 leading-snug">{item.title}</h3>
              <p className="text-[0.9375rem] font-medium text-muted mt-0.5">{item.org}</p>
              <p className="text-muted mt-2.5 leading-relaxed max-w-prose">{item.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal as="aside" aria-labelledby="certs-title" className="card p-6">
          <h3 id="certs-title" className="eyebrow">
            Certifications
          </h3>
          <ul className="mt-2">
            {certifications.map((cert, i) => (
              <li key={cert.name} className={`flex items-start gap-3 py-3 ${i > 0 ? "border-t border-line" : ""}`}>
                {cert.done ? (
                  <Check className="w-4 h-4 mt-1 shrink-0 text-ok" />
                ) : (
                  <span aria-hidden="true" className="w-4 h-4 mt-1 shrink-0 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full border-2 border-warn" />
                  </span>
                )}
                <span>
                  <span className="block text-[0.9375rem] font-medium text-fg leading-snug">{cert.name}</span>
                  <span className={`block text-xs font-mono mt-0.5 ${cert.done ? "text-subtle" : "text-warn"}`}>
                    {cert.done ? "Completed" : "In progress"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default Experience;
