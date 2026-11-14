import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

export const Hero = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("bynoeean@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <section id="hero" className="pt-8 pb-6">
      <div className="space-y-8 max-w-4xl">
        
        {/* Clean Inline Origin & Academic Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 uppercase tracking-widest">
          <span className="text-blue-400 font-semibold">TORONTO, ON</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300">CENTENNIAL COLLEGE (CO-OP)</span>
          <span className="text-slate-600">/</span>
          <span>EX-UWI CAVE HILL</span>
        </div>

        {/* High-Contrast Authoritative Headline (Zero generic gradients) */}
        <h1 className="text-4xl sm:text-6xl md:text-[64px] font-extrabold tracking-tight text-white leading-[1.08] font-heading">
          Software Engineer building{" "}
          <span className="text-slate-400">backend infrastructure</span>,
          retail data systems, and low-latency tooling.
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
          Engineering full-stack inventory platforms, REST APIs, automated developer telemetry daemons, and algorithmic transit routing engines. Grounded in Computer Science &amp; Mathematics with production C#, TypeScript, Python, and C/C++.
        </p>

        {/* Sharp Solid Action Row */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#skills"
            className="px-5 py-2.5 rounded-sm bg-white text-black font-semibold text-xs tracking-wide hover:bg-slate-200 transition flex items-center gap-2"
          >
            <span>Inspect Skills &amp; Systems</span>
            <span className="font-mono text-slate-600">↓</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="px-4 py-2.5 rounded-sm bg-[#0c0e13] hover:bg-[#131720] border border-[#222631] hover:border-blue-500/60 text-xs font-mono text-slate-300 transition flex items-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <FaCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied: bynoeean@gmail.com</span>
              </>
            ) : (
              <span>bynoeean@gmail.com</span>
            )}
          </button>

          <a
            href="https://github.com/DeathSurvivor02"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-sm bg-[#0c0e13] hover:bg-[#131720] border border-[#222631] hover:border-red-500/60 text-xs font-mono text-slate-300 hover:text-white transition flex items-center gap-1.5"
          >
            <span>github.com/DeathSurvivor02</span>
            <span className="text-[10px] text-slate-500">↗</span>
          </a>
        </div>

        {/* Crisp Technical Specification Strip */}
        <div className="pt-8 hairline-t grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono">
          <div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wider">Core Stack</div>
            <div className="text-sm font-semibold text-white mt-1">C# • TS • Python • Dart</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wider">Academic Focus</div>
            <div className="text-sm font-semibold text-white mt-1">Software Eng. &amp; Math</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wider">GitHub Index</div>
            <div className="text-sm font-semibold text-blue-400 mt-1">18 Public Repositories</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wider">Availability</div>
            <div className="text-sm font-semibold text-white mt-1">Winter / Summer 2027</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
