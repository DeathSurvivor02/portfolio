import React from "react";
import { projects, skillGroups } from "../../data/site";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export const Skills = ({ onShowProjects }) => {
  return (
    <section id="skills" aria-labelledby="skills-title" className="space-y-8">
      <SectionHeader
        id="skills-title"
        eyebrow="Skills"
        title="What I work with"
        description="Grouped by where each tool sits in the stack, with the projects that put it to use."
      />

      <div className="grid md:grid-cols-3 gap-5">
        {skillGroups.map((group, i) => {
          const count = projects.filter((p) => p.skillGroups.includes(group.id)).length;
          return (
            <Reveal key={group.id} delay={i * 80} className="card p-6 flex flex-col">
              <h3 className="text-xl font-bold text-fg">{group.title}</h3>

              <ul className="mt-4 grow">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-baseline justify-between gap-3 py-2.5 border-t border-line"
                  >
                    <span className="text-[0.9375rem] text-fg">{skill.name}</span>
                    <span className="text-xs font-mono text-subtle text-right shrink-0">{skill.tag}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => onShowProjects(group.id)}
                className="link mt-5 self-start text-sm font-medium"
              >
                See {count} related {count === 1 ? "project" : "projects"} <span aria-hidden="true">↑</span>
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
