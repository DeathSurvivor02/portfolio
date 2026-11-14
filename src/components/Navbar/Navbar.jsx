import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full hairline-b bg-[#07080a]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Monogram */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-sm bg-[#0c0e13] border border-[#2a3040] flex items-center justify-center font-mono font-semibold text-xs text-white group-hover:border-blue-500 transition">
            EB
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-tight text-white group-hover:text-blue-400 transition">
              Ean Bynoe
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Software & Systems
            </span>
          </div>
        </a>

        {/* Navigation Links (Me -> Skills -> Projects -> Credentials -> Contact) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-slate-400">
          <a href="#hero" className="hover:text-white transition">01. Overview</a>
          <a href="#skills" className="hover:text-white transition">02. Skills</a>
          <a href="#projects" className="hover:text-white transition">03. Projects</a>
          <a href="#experience" className="hover:text-white transition">04. Credentials</a>
          <a href="#contact" className="hover:text-white transition">05. Contact</a>
        </nav>

        {/* Right Status & Action */}
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-[11px] font-mono text-slate-400 border-r border-[#1e222d] pr-4">
            CO-OP // 2027
          </span>
          <a
            href="#contact"
            className="px-4 py-1.5 rounded-sm bg-white text-black text-xs font-semibold hover:bg-slate-200 transition"
          >
            Contact
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden hairline-t bg-[#07080a] px-6 py-4 space-y-3 text-xs font-mono text-slate-300">
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
            01. Overview
          </a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
            02. Skills
          </a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
            03. Projects
          </a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
            04. Credentials
          </a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
            05. Contact
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
