import React from "react";

export const Experience = () => {
  return (
    <section id="experience" className="space-y-8">
      <div className="hairline-b pb-4">
        <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
          Academic & Career Path
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 font-heading">
          Credentials & Experience
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Education */}
        <div className="space-y-6">
          <div className="text-xs uppercase font-mono text-slate-400 tracking-wider">
            Education
          </div>

          <div className="glass-surface rounded-xl p-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-white">Centennial College • Toronto</span>
              <span className="text-emerald-400">2024 — Present</span>
            </div>
            <h3 className="text-base font-bold text-white font-heading">
              Software Engineering Technology (Co-op)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Advanced diploma specializing in full-cycle software architecture, advanced databases, Java programming, web systems, and software QA methodology.
            </p>
          </div>

          <div className="glass-surface rounded-xl p-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-white">UWI Cave Hill • Barbados</span>
              <span>2021 — 2023</span>
            </div>
            <h3 className="text-base font-bold text-white font-heading">
              B.Sc. in Computer Science & Mathematics
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Coursework in Data Structures & Algorithms, Object-Oriented Programming (Java), Systems Programming (C++), Calculus I & II, and Discrete Math.
            </p>
          </div>
        </div>

        {/* Right: Applied Experience & Certs */}
        <div className="space-y-6">
          <div className="text-xs uppercase font-mono text-slate-400 tracking-wider">
            Industry & Professional Development
          </div>

          <div className="glass-surface rounded-xl p-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-white">Popular Discounts</span>
              <span>2022 — 2024</span>
            </div>
            <h3 className="text-base font-bold text-white font-heading">
              Customer Operations & Retail POS Specialist
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Maintained fast-paced electronic Point of Sale checkout stations, handled inventory reconciliation, resolved checkout hardware faults, and communicated effectively under time constraints.
            </p>
          </div>

          <div className="glass-surface rounded-xl p-6 space-y-3 font-mono text-xs">
            <div className="text-slate-400 uppercase tracking-wider text-[11px]">
              Certifications
            </div>
            <div className="flex items-center justify-between py-1 hairline-b text-slate-200">
              <span>C++ Encryption & Decryption</span>
              <span className="text-emerald-400">Completed</span>
            </div>
            <div className="flex items-center justify-between py-1 hairline-b text-slate-200">
              <span>Programming for Everybody (Python)</span>
              <span className="text-emerald-400">Completed</span>
            </div>
            <div className="flex items-center justify-between py-1 text-slate-200">
              <span>IBM Cybersecurity Analyst Spec.</span>
              <span className="text-amber-400">In Progress</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
