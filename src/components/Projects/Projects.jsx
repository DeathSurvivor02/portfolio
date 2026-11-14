import React, { useState } from "react";
import { projects, skillGroups } from "../../data/site";
import { ArrowUpRight, GitHub } from "../ui/Icons";
import { SectionHeader } from "../ui/SectionHeader";
import { ProjectDemo } from "./Demos";

const statusColor = {
  live: "text-ok",
  wip: "text-warn",
  neutral: "text-muted",
};

const filters = [
  { id: "all", label: "All" },
  ...skillGroups.map((g) => ({ id: g.id, label: g.title })),
];

const countFor = (id) => (id === "all" ? projects.length : projects.filter((p) => p.skillGroups.includes(id)).length);

const Pipeline = ({ nodes, title }) => (
  <ol aria-label={`How data moves through ${title}`} className="pipeline">
    {nodes.map((node) => (
      <li key={node.label}>
        <span className="block text-[0.9375rem] font-semibold text-fg leading-snug">{node.label}</span>
        <span className="block text-sm text-subtle mt-0.5">{node.sub}</span>
      </li>
    ))}
  </ol>
);

const ProjectEntry = ({ project }) => {
  const [open, setOpen] = useState(false);
  const detailsId = `${project.id}-details`;
  const titleId = `${project.id}-title`;

  return (
    <li className="border-b border-line">
      <article
        aria-labelledby={titleId}
        className="grid lg:grid-cols-12 gap-x-10 gap-y-5 py-10 sm:py-12"
      >
        <header className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start space-y-2">
          <h3 id={titleId} className="text-2xl sm:text-[1.75rem] font-bold text-fg leading-tight">
            {project.title}
          </h3>
          <p className="text-[0.9375rem] text-muted leading-snug">{project.subtitle}</p>
          <p className={`text-sm font-medium ${statusColor[project.status.tone]}`}>{project.status.label}</p>
        </header>

        <div className="lg:col-span-8 space-y-7 min-w-0">
          <p className="text-lg text-fg/90 leading-relaxed">{project.description}</p>

          <Pipeline nodes={project.flow} title={project.title} />

          <dl className="text-[0.9375rem]">
            <dt className="text-subtle">Built with</dt>
            <dd className="text-fg mt-0.5">{project.stack.join(" · ")}</dd>
          </dl>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.9375rem] font-medium">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link inline-flex items-center gap-2"
            >
              <GitHub />
              View repository
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span className="sr-only">for {project.title} (opens in a new tab)</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={detailsId}
              className="link inline-flex items-center gap-2"
            >
              <span aria-hidden="true" className="font-mono w-3 text-center">
                {open ? "−" : "+"}
              </span>
              {project.demo ? "Engineering notes & demo" : "Engineering notes"}
            </button>
          </div>

          <div id={detailsId} hidden={!open} className="space-y-8 pt-1">
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
              {project.notes.map((note) => (
                <li key={note} className="border-l border-line-strong pl-4 text-[0.9375rem] text-muted leading-relaxed">
                  {note}
                </li>
              ))}
            </ul>
            {project.demo && open && <ProjectDemo kind={project.demo} />}
          </div>
        </div>
      </article>
    </li>
  );
};

export const Projects = ({ filter = "all", onFilterChange }) => {
  const visible = filter === "all" ? projects : projects.filter((p) => p.skillGroups.includes(filter));

  return (
    <section id="projects" aria-labelledby="projects-title" className="space-y-8">
      <SectionHeader id="projects-title" eyebrow="Projects" title="Selected work" />

      <div>
        <div
          role="group"
          aria-label="Filter projects by skill area"
          className="flex gap-x-7 overflow-x-auto border-b border-line-strong"
        >
          {filters.map((f) => {
            const selected = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onFilterChange(f.id)}
                className={`shrink-0 -mb-px py-3 border-b-2 text-[0.9375rem] font-medium whitespace-nowrap transition-colors ${
                  selected ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg"
                }`}
              >
                {f.label}
                <span className="ml-1.5 text-sm font-normal text-subtle">{countFor(f.id)}</span>
              </button>
            );
          })}
        </div>

        <p role="status" className="sr-only">
          Showing {visible.length} of {projects.length} projects
        </p>

        <ol>
          {visible.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Projects;
