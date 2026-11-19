import React from "react";
import { profile } from "../../data/site";
import { ArrowDown, ArrowUpRight, GitHub, LinkedIn } from "../ui/Icons";
import { CopyEmailButton } from "../ui/CopyEmailButton";

export const Hero = () => {
  return (
    <section aria-labelledby="hero-title" className="pt-12 sm:pt-20 pb-4">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_21rem] gap-12 lg:gap-16 items-end">
        <div className="space-y-7">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface pl-3 pr-4 py-1.5 text-sm text-muted">
            <span aria-hidden="true" className="pulse-dot w-2 h-2 rounded-full bg-ok" />
            {profile.availability}
          </p>

          <h1
            id="hero-title"
            className="text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem] font-extrabold text-fg"
          >
            Software engineer building <span className="text-accent">backend infrastructure</span>, retail data
            systems, and low-latency tooling.
          </h1>

          <p className="text-muted text-lg leading-relaxed max-w-2xl">{profile.summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a href="#projects" className="btn btn-primary">
              View projects
              <ArrowDown />
            </a>
            <CopyEmailButton email={profile.email} />
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <GitHub />
              GitHub
              <ArrowUpRight className="w-3.5 h-3.5 text-subtle" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <LinkedIn />
              LinkedIn
              <ArrowUpRight className="w-3.5 h-3.5 text-subtle" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        <aside aria-label="At a glance" className="card p-6">
          <p className="eyebrow mb-1">At a glance</p>
          <dl>
            {profile.facts.map((fact, i) => (
              <div key={fact.label} className={`py-3 ${i > 0 ? "border-t border-line" : ""}`}>
                <dt className="text-xs font-mono text-subtle">{fact.label}</dt>
                <dd className="text-[0.9375rem] font-medium text-fg mt-0.5 leading-snug">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
