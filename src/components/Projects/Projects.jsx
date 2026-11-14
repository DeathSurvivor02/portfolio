import React, { useState } from "react";
import { projects, skillGroups } from "../../data/site";
import { ArrowUpRight, ChevronDown, GitHub } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { FlowDiagram } from "./FlowDiagram";
import { ProjectDemo } from "./Demos";

const toneDot = {
  live: "bg-ok",
  wip: "bg-warn",
  neutral: "bg-subtle",
};

const filters = [
  { id: "all", label: "All" },
  ...skillGroups.map((g) => ({ id: g.id, label: g.title })),
];

const countFor = (id) => (id === "all" ? projects.length : projects.filter((p) => p.skillGroups.includes(id)).length);

const ProjectCard = ({ project, index }) => {
  const [open, setOpen] = useState(false);
  const detailsId = `${project.id}-details`;

  return (
    <article aria-labelledby={`${project.id}-title`} className="card overflow-hidden">
      <div className="grid md:grid-cols-[minmax(0,1fr)_17.5rem] gap-6 md:gap-8 p-5 sm:p-7">
        <div className="space-y-4 min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono">
            <span className="text-accent font-medium">{String(index + 1).padStart(2, "0")}</span>
            <span className="inline-flex items-center gap-2 text-muted">
              <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${toneDot[project.status.tone]}`} />
              {project.status.label}
            </span>
          </div>

          <div className="space-y-1.5">
            <h3 id={`${project.id}-title`} className="text-2xl sm:text-[1.75rem] font-bold text-fg leading-tight">
              {project.title}
            </h3>
            <p className="text-sm font-mono text-subtle">{project.subtitle}</p>
          </div>

          <p className="text-muted leading-relaxed">{project.description}</p>

          <ul aria-label="Tech stack" className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
              <GitHub />
              Repository
              <ArrowUpRight className="w-3.5 h-3.5 text-subtle" />
              <span className="sr-only">for {project.title} (opens in a new tab)</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={detailsId}
              className="btn btn-sm text-muted hover:text-fg hover:bg-surface-2"
            >
              {open ? "Hide details" : project.demo ? "How it works + demo" : "How it works"}
              <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        <FlowDiagram nodes={project.flow} title={project.title} />
      </div>

      <div id={detailsId} hidden={!open} className="border-t border-line bg-surface-2/50">
        <div className={`grid gap-8 p-5 sm:p-7 ${project.demo ? "lg:grid-cols-2" : ""}`}>
          <div className="space-y-3">
            <h4 className="eyebrow">Engineering notes</h4>
            <ol className={`grid gap-x-8 ${project.demo ? "" : "md:grid-cols-2"}`}>
              {project.notes.map((note, i) => (
                <li key={note} className="flex gap-3 py-2.5 border-b border-line text-[0.9375rem] text-muted leading-relaxed">
                  <span aria-hidden="true" className="font-mono text-xs text-accent pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{note}</span>
                </li>
              ))}
            </ol>
          </div>
          {project.demo && open && <ProjectDemo kind={project.demo} />}
        </div>
      </div>
    </article>
  );
};

export const Projects = ({ filter = "all", onFilterChange }) => {
  const visible = filter === "all" ? projects : projects.filter((p) => p.skillGroups.includes(filter));

  return (
    <section id="projects" aria-labelledby="projects-title" className="space-y-8">
      <SectionHeader
        id="projects-title"
        eyebrow="Projects"
        title="Systems I've built"
        description="Each one shows how data moves through it. Open a project for the engineering notes and a small simulated demo."
      />

      <div role="group" aria-label="Filter projects by skill area" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const selected = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onFilterChange(f.id)}
              className={`inline-flex items-center gap-2 min-h-10 rounded-full border px-4 text-sm font-medium transition-colors ${
                selected
                  ? "border-fg bg-fg text-bg"
                  : "border-line-strong text-muted hover:text-fg hover:border-fg"
              }`}
            >
              {f.label}
              <span className={`font-mono text-xs ${selected ? "opacity-70" : "text-subtle"}`}>{countFor(f.id)}</span>
            </button>
          );
        })}
      </div>

      <p role="status" className="sr-only">
        Showing {visible.length} of {projects.length} projects
      </p>

      <div className="space-y-5">
        {visible.map((project) => (
          <Reveal key={project.id}>
            <ProjectCard project={project} index={projects.indexOf(project)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Projects;
