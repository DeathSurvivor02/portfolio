import React from "react";

export const Footer = () => {
  return (
    <footer className="hairline-t py-8 text-center text-xs font-mono text-slate-500 mt-28">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>Ean Bynoe © {new Date().getFullYear()}. Architected with precision.</div>
        <div className="flex items-center gap-6">
          <a href="#hero" className="hover:text-slate-300 transition">
            Top ↑
          </a>
          <a
            href="https://github.com/DeathSurvivor02"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition"
          >
            GitHub
          </a>
          <a href="mailto:bynoeean@gmail.com" className="hover:text-slate-300 transition">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
