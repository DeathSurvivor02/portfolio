import React, { useEffect, useState } from "react";
import { navLinks, profile } from "../../data/site";
import { Close, Menu, Moon, Sun } from "../ui/Icons";

/** Tracks which section currently sits under the header. */
const useActiveSection = (ids) => {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        // Prefer the last section (in page order) that crosses the reading line
        const current = ids.filter((id) => visible.has(id)).pop();
        setActive(current || "");
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return active;
};

const sectionIds = navLinks.map((l) => l.id);

export const Navbar = ({ theme, onToggleTheme }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open
          ? "border-line bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] backdrop-blur-md"
          : "border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <span
            aria-hidden="true"
            className="w-9 h-9 rounded-lg bg-surface border border-line-strong flex items-center justify-center font-mono font-medium text-sm text-accent group-hover:border-accent transition-colors"
          >
            EB
          </span>
          <span className="font-display font-bold text-fg text-base tracking-tight">{profile.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-3 right-3 -bottom-px h-0.5 rounded-full bg-accent transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-muted hover:text-fg hover:bg-surface-2 transition-colors"
          >
            {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>

          <a href="#contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Get in touch
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-fg hover:bg-surface-2 transition-colors"
          >
            {open ? <Close className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="md:hidden border-t border-line px-5 pb-5 pt-2">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`flex items-center justify-between py-3.5 border-b border-line text-lg font-display font-semibold ${
                    active === link.id ? "text-accent" : "text-fg"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full mt-5 sm:hidden">
            Get in touch
          </a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
