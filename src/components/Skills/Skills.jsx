import React from "react";

export const Skills = ({ selectedGroup = "all", onSelectGroup }) => {
  const pillars = [
    {
      id: "systems",
      code: "01",
      title: "Backend & Systems",
      accentColor: "text-blue-400",
      activeBorder: "border-blue-500 bg-[#0e121b]",
      projectsMapped: "Valorant-API • Commitr-bot • Chess Server",
      skills: [
        { name: "C# (.NET 8, WPF, LINQ)", level: "Enterprise" },
        { name: "Node.js & Express REST", level: "Backend API" },
        { name: "Python (Discord / Async)", level: "Automation" },
        { name: "C / C++ (Memory & Wasm)", level: "Systems" },
        { name: "TypeScript / JavaScript", level: "Core" },
        { name: "SQL (PostgreSQL, Neon, MS SQL)", level: "Relational" },
      ],
    },
    {
      id: "fullstack",
      code: "02",
      title: "Full-Stack & Mobile",
      accentColor: "text-slate-200",
      activeBorder: "border-white bg-[#10131a]",
      projectsMapped: "SiteLine (YM Inc) • Transit Routing • Music App",
      skills: [
        { name: "React & Vite", level: "Web UI" },
        { name: "Flutter (Dart)", level: "Cross-Platform" },
        { name: "React Native (Expo)", level: "Mobile" },
        { name: "Graph Search & Routing (A*)", level: "Algorithms" },
        { name: "ASP.NET Core & EF Core", level: "ORM / MVC" },
        { name: "OpenStreetMap & GeoJSON", level: "Mapping" },
      ],
    },
    {
      id: "infra",
      code: "03",
      title: "Infra, Data & Tooling",
      accentColor: "text-rose-400",
      activeBorder: "border-rose-500 bg-[#170e13]",
      projectsMapped: "SiteLine Importer • Commitr-bot • Vercel CI",
      skills: [
        { name: "Git & GitHub Actions CI", level: "VCS / CI" },
        { name: "Vercel Serverless & Docker", level: "Deploy" },
        { name: "SQLite & Local Persistence", level: "Storage" },
        { name: "Amazon Web Services (AWS)", level: "Cloud" },
        { name: "Google Cloud Platform", level: "Cloud" },
        { name: "Linux / Bash & CLI Tooling", level: "OS / Shell" },
      ],
    },
  ];

  return (
    <section id="skills" className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 hairline-b pb-4">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            02 / Technical Matrix
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 font-heading">
            Core Skills &amp; Engineering Stack
          </h2>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span>Click any pillar to filter matching projects</span>
          {selectedGroup !== "all" && (
            <button
              onClick={() => onSelectGroup && onSelectGroup("all")}
              className="px-2.5 py-1 bg-[#161a24] border border-[#2d3344] text-white hover:border-white transition cursor-pointer"
            >
              Show All
            </button>
          )}
        </div>
      </div>

      {/* Connected Solid Architectural Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#1e222d] bg-[#0c0e13]">
        {pillars.map((pillar, idx) => {
          const isSelected = selectedGroup === pillar.id;
          return (
            <div
              key={pillar.id}
              onClick={() => onSelectGroup && onSelectGroup(isSelected ? "all" : pillar.id)}
              className={`p-6 space-y-5 cursor-pointer transition duration-150 ${
                idx < 2 ? "md:border-r border-b md:border-b-0 border-[#1e222d]" : ""
              } ${
                isSelected ? pillar.activeBorder : "hover:bg-[#11141c]"
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
                <span className={`font-semibold ${pillar.accentColor}`}>
                  {pillar.code} / {pillar.title}
                </span>
                <span className="text-slate-500">0{pillar.skills.length}</span>
              </div>

              <ul className="space-y-2 text-xs font-mono text-slate-200">
                {pillar.skills.map((s, sIdx) => (
                  <li
                    key={sIdx}
                    className={`flex items-center justify-between py-1.5 ${
                      sIdx < pillar.skills.length - 1 ? "hairline-b" : ""
                    }`}
                  >
                    <span>{s.name}</span>
                    <span className="text-slate-500 text-[11px]">{s.level}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 hairline-t flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 truncate pr-2">{pillar.projectsMapped}</span>
                <span className={isSelected ? "text-white font-semibold shrink-0" : "text-slate-500 shrink-0"}>
                  {isSelected ? "Filtered ✓" : "Filter ↓"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
