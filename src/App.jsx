import React, { useCallback, useEffect, useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/Hero/Hero";
import { Projects } from "./components/Projects/Projects";
import { Skills } from "./components/Skills/Skills";
import { Experience } from "./components/Experience/Experience";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer";

const useTheme = () => {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#07080a" : "#f5f7fa");
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {
        // Storage unavailable (private mode) — the choice just won't persist.
      }
      return next;
    });
  }, []);

  return [theme, toggle];
};

function App() {
  const [theme, toggleTheme] = useTheme();
  const [projectFilter, setProjectFilter] = useState("all");

  const showProjectsFor = (groupId) => {
    setProjectFilter(groupId);
    document.getElementById("projects")?.scrollIntoView({ block: "start" });
  };

  return (
    <div id="top" className="relative min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent focus:font-semibold"
      >
        Skip to content
      </a>

      <div aria-hidden="true" className="backdrop" />

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main id="main" className="relative max-w-6xl mx-auto px-5 sm:px-8 space-y-24 sm:space-y-32 pb-24 sm:pb-32">
        <Hero />
        <Projects filter={projectFilter} onFilterChange={setProjectFilter} />
        <Skills onShowProjects={showProjectsFor} />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
