import React from "react";

export const Contact = () => {
  return (
    <section id="contact" className="pt-6">
      <div className="glass-surface rounded-2xl p-8 sm:p-12 relative overflow-hidden border-white/15">
        {/* Subtle dual red-blue ambient reflection */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 via-rose-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-2xl space-y-6 relative z-10">
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
            Direct Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-heading">
            Available for Software Engineering Co-op roles starting Winter & Summer.
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Interested in backend engineering, distributed systems, developer tooling, or low-latency systems. Send an email or connect directly on GitHub.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="mailto:bynoeean@gmail.com"
              className="px-5 py-3 rounded-lg bg-white text-black font-semibold text-xs tracking-wide hover:bg-slate-200 transition shadow-lg shadow-blue-500/10"
            >
              bynoeean@gmail.com
            </a>
            <a
              href="https://github.com/DeathSurvivor02"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200 hover:text-white hover:border-rose-500/30 transition"
            >
              github.com/DeathSurvivor02 ↗
            </a>
          </div>

          <div className="text-xs font-mono text-slate-500 pt-2">
            Toronto, Ontario, Canada • Eligible to work in Canada
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
