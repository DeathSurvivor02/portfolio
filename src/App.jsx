import React, { useEffect, useState } from "react";
import { profile, projects, skillGroups, timeline, certifications } from "./data/site";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
];

const useTheme = () => {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0b1220" : "#f8fafc");
  }, [theme]);
  const toggle = () =>
    setTheme((cur) => {
      const next = cur === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {
        // Storage unavailable (private mode): the choice just won't persist.
      }
      return next;
    });
  return [theme, toggle];
};

// Highlights the nav link of whichever section crosses the middle of the viewport.
const useActiveSection = () => {
  const [active, setActive] = useState(sections[0].id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach(({ id }) => io.observe(document.getElementById(id)));
    return () => io.disconnect();
  }, []);
  return active;
};

const Spotlight = () => {
  useEffect(() => {
    const move = (e) => {
      document.documentElement.style.setProperty("--x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div className="spotlight" aria-hidden="true" />;
};

const Ext = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

function App() {
  const [theme, toggleTheme] = useTheme();
  const active = useActiveSection();

  return (
    <>
      <Spotlight />
      <a className="skip" href="#content">Skip to content</a>
      <div className="page">
        <header className="side">
          <div>
            <h1>{profile.name}</h1>
            <h2>{profile.role}</h2>
            <p className="tag">Backend infrastructure, retail data systems, and low-latency tooling.</p>
            <p className="status"><i aria-hidden="true" />{profile.availability}</p>
            <nav className="nav" aria-label="Sections">
              {sections.map(({ id, label }) => (
                <a key={id} href={`#${id}`} className={active === id ? "on" : ""} aria-current={active === id ? "true" : undefined}>
                  <span className="bar" aria-hidden="true" />
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="social">
            <Ext href={profile.github}>GitHub</Ext>
            <Ext href={profile.linkedin}>LinkedIn</Ext>
            <a href={`mailto:${profile.email}`}>Email</a>
            <button className="theme" onClick={toggleTheme} aria-label="Toggle light or dark theme">
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </header>

        <main className="main" id="content">
          <section id="about" aria-label="About">
            <h2 className="label">About</h2>
            <p>{profile.summary}</p>
            {profile.facts.map((f) => (
              <p key={f.label}>
                <strong>{f.label}:</strong> {f.value}
              </p>
            ))}
          </section>

          <section id="experience" aria-label="Experience">
            <h2 className="label">Experience</h2>
            <ol className="items">
              {timeline.map((t) => (
                <li key={t.title} className="item">
                  <span className="when">{t.period}</span>
                  <div>
                    <h3>
                      {t.title}
                      {t.current && <span className="badge">Now</span>}
                    </h3>
                    <p className="org">{t.org}</p>
                    <p>{t.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="projects" aria-label="Projects">
            <h2 className="label">Projects</h2>
            <ul className="items">
              {projects.map((p) => (
                <li key={p.id} className="item">
                  <span className="when">{p.status.label}</span>
                  <div>
                    <h3><Ext href={p.liveUrl || p.repoUrl}>{p.title}</Ext></h3>
                    <p>{p.description}</p>
                    <ul className="chips" aria-label="Tech stack">
                      {p.stack.map((s) => <li key={s} className="chip">{s}</li>)}
                    </ul>
                    <div className="links">
                      <Ext href={p.repoUrl}>Code</Ext>
                      {p.liveUrl && <Ext href={p.liveUrl}>Live</Ext>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section id="skills" aria-label="Skills">
            <h2 className="label">Skills</h2>
            <div className="skills">
              {skillGroups.map((g) => (
                <div key={g.id}>
                  <h3>{g.title}</h3>
                  <ul className="chips">
                    {g.skills.map((s) => <li key={s.name} className="chip">{s.name}</li>)}
                  </ul>
                </div>
              ))}
              <div>
                <h3>Certifications</h3>
                <ul className="chips">
                  {certifications.map((c) => (
                    <li key={c.name} className="chip">{c.name}{c.done ? "" : " (in progress)"}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <footer className="end">
            Open to new grad roles. Reach me at <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          </footer>
        </main>
      </div>
    </>
  );
}

export default App;
