import React from "react";
import { profile } from "../../data/site";
import { ArrowUpRight, GitHub, LinkedIn, Mail } from "../ui/Icons";
import { CopyEmailButton } from "../ui/CopyEmailButton";
import { Reveal } from "../ui/Reveal";

export const Contact = () => {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <Reveal className="card relative overflow-hidden p-7 sm:p-12 lg:p-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(28rem 20rem at 100% 0%, var(--glow-2), transparent 70%), radial-gradient(26rem 20rem at 62% 0%, var(--glow), transparent 70%)",
          }}
        />

        <div className="relative max-w-2xl space-y-6">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Contact
          </p>
          <h2 id="contact-title" className="text-3xl sm:text-5xl font-extrabold text-fg leading-[1.08]">
            Available for full-time software engineering roles from Spring 2027.
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            Interested in backend engineering, distributed systems, developer tooling, or low-latency systems. Email
            is the fastest way to reach me.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              <Mail />
              Email me
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

          <p className="text-sm font-mono text-subtle pt-2">Toronto, Ontario, Canada · Eligible to work in Canada</p>
        </div>
      </Reveal>
    </section>
  );
};

export default Contact;
