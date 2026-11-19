// All site content lives here so copy can be edited without touching layout.

export const profile = {
  name: "Ean Bynoe",
  role: "Software Engineer",
  email: "eanbynoe@gmail.com",
  github: "https://github.com/DeathSurvivor02",
  githubLabel: "github.com/DeathSurvivor02",
  linkedin: "https://www.linkedin.com/in/ean-bynoe",
  location: "Toronto, ON",
  availability: "Open to new grad roles · Graduating Spring 2027",
  summary:
    "Engineering full-stack inventory platforms, REST APIs, automated developer telemetry daemons, and algorithmic transit routing engines. Grounded in Computer Science & Mathematics with production C#, TypeScript, Python, and C/C++.",
  facts: [
    { label: "Based in", value: "Toronto, Ontario" },
    { label: "Studying", value: "Software Engineering Technology (Co-op), Centennial College" },
    { label: "Background", value: "Computer Science & Mathematics, UWI Cave Hill" },
    { label: "Core stack", value: "C# · TypeScript · Python · Dart" },
    { label: "Available", value: "Spring 2027" },
  ],
};

export const navLinks = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const skillGroups = [
  {
    id: "systems",
    title: "Backend & Systems",
    skills: [
      { name: "C# (.NET 8, WPF, LINQ)", tag: "Enterprise" },
      { name: "Node.js & Express REST", tag: "Backend API" },
      { name: "Python (Discord / Async)", tag: "Automation" },
      { name: "C / C++ (Memory & Wasm)", tag: "Systems" },
      { name: "TypeScript / JavaScript", tag: "Core" },
      { name: "Kotlin", tag: "JVM / Backend" },
      { name: "OAuth 2.0 / JWT", tag: "Auth" },
      { name: "SQL (PostgreSQL, Neon, MS SQL)", tag: "Relational" },
    ],
  },
  {
    id: "fullstack",
    title: "Full-Stack & Mobile",
    skills: [
      { name: "React & Vite", tag: "Web UI" },
      { name: "Flutter (Dart)", tag: "Cross-Platform" },
      { name: "React Native (Expo)", tag: "Mobile" },
      { name: "Graph Search & Routing (A*)", tag: "Algorithms" },
      { name: "ASP.NET Core & EF Core", tag: "ORM / MVC" },
      { name: "OpenStreetMap & GeoJSON", tag: "Mapping" },
    ],
  },
  {
    id: "infra",
    title: "Infra, Data & Tooling",
    skills: [
      { name: "Git & GitHub Actions CI", tag: "VCS / CI" },
      { name: "Vercel Serverless & Docker", tag: "Deploy" },
      { name: "SQLite & Local Persistence", tag: "Storage" },
      { name: "Amazon Web Services (AWS)", tag: "Cloud" },
      { name: "Google Cloud Platform", tag: "Cloud" },
      { name: "Linux / Bash & CLI Tooling", tag: "OS / Shell" },
    ],
  },
];

// status.tone: "live" (green), "wip" (amber), or "neutral"
export const projects = [
  {
    id: "siteline-ym",
    title: "SiteLine — Retail Store Tracking",
    subtitle: "Retail inventory, importer & multi-store tracking platform",
    status: { label: "Prototype", tone: "wip" },
    skillGroups: ["systems", "fullstack", "infra"],
    repoUrl: "https://github.com/DeathSurvivor02/ym-inc-store-tracking",
    description:
      "A self-initiated store-tracking and inventory platform, built on my own time with simulated data and modeled on a retail POS rollout workflow. Combines a C# desktop client, automated CSV/inventory importer, and React dashboard backed by Neon PostgreSQL.",
    flow: [
      { label: "Store Importer", sub: "SKU / batch sync" },
      { label: "C# / Node Engine", sub: "Validation & ledger" },
      { label: "Neon PostgreSQL", sub: "Store inventory DB" },
    ],
    notes: [
      "Automated batch importer ingesting store-level SKU counts, transfers, and stock discrepancies.",
      "C# desktop application interfacing with relational database records and barcode audit trails.",
      "React frontend dashboard visualizing per-store inventory health and audit timelines.",
      "Portable standalone sandbox build supporting offline/flash-drive retail deployment.",
    ],
    stack: ["C# / .NET", "React", "TypeScript", "PostgreSQL (Neon)", "Batch Importer", "Docker"],
    demo: "siteline",
  },
  {
    id: "valorant-api",
    title: "Valorant-API",
    subtitle: "Player profile, match telemetry & game data REST interface",
    status: { label: "Active", tone: "neutral" },
    skillGroups: ["systems", "infra"],
    repoUrl: "https://github.com/DeathSurvivor02/Valorant-API",
    description:
      "A lightweight Node.js and Express REST service exposing structured player profiles, competitive rank metadata, and match statistics for client applications and Discord bots.",
    flow: [
      { label: "Client / Bot", sub: "GET /api/player" },
      { label: "Express Gateway", sub: "CORS & rate limiter" },
      { label: "Riot / Stats API", sub: "JSON match payload" },
    ],
    notes: [
      "Express router handling parameterized player lookup (/api/player/:name/:tag) and match history routes.",
      "Stateless serverless export designed for Vercel Node runtime deployment.",
      "Rate-limit guard middleware protecting upstream Riot developer token quotas.",
      "JSON normalization layer formatting raw match telemetry for frontend and bot consumers.",
    ],
    stack: ["JavaScript", "Node.js", "Express", "REST API", "CORS", "Vercel Serverless"],
    demo: "valorant",
  },
  {
    id: "transit-routing",
    title: "Transit Routing Engine",
    subtitle: "Multi-modal pathfinding engine & cross-platform mobile client",
    status: { label: "In development", tone: "wip" },
    skillGroups: ["fullstack", "systems"],
    repoUrl: "https://github.com/DeathSurvivor02/Transit-Routing-Engine",
    description:
      "Algorithmic transit routing service resolving multi-hop transfers, schedule windows, and walking links across transit nodes, paired with a Flutter mobile client rendering vector route polylines.",
    flow: [
      { label: "Flutter Client", sub: "Origin → destination" },
      { label: "A* Graph Engine", sub: "Transfer weights" },
      { label: "OSM Map Canvas", sub: "Vector polyline" },
    ],
    notes: [
      "Adjacency graph modeling municipal stations, express corridors, and platform transfer penalties.",
      "Modified A* search weighting real-time departure headways and transfer walk times.",
      "Stateless routing response returning serialized hop sequences and polyline coordinates.",
      "Flutter cross-platform UI rendering interactive transit overlays on OpenStreetMap tiles.",
    ],
    stack: ["Dart", "Flutter", "Graph Search (A*)", "Node.js", "OpenStreetMap", "GeoJSON"],
    demo: "transit",
  },
  {
    id: "personal-dashboard",
    title: "Personal Dashboard",
    subtitle: "Productivity, POS support & R&D simulation command center",
    status: { label: "Active", tone: "neutral" },
    skillGroups: ["systems", "fullstack"],
    repoUrl: "https://github.com/DeathSurvivor02/personal-dashboard",
    description:
      "Modular desktop command center built in Rust with Dioxus combining YM Inc. POS support tracking, academic course deadlines, physics simulation R&D notes, and focus utilities.",
    flow: [
      { label: "Dioxus Shell", sub: "Sidebar & filters" },
      { label: "Rust State Core", sub: "Tasks & deadlines" },
      { label: "R&D / API Sync", sub: "GitHub & notes" },
    ],
    notes: [
      "Rust desktop shell using Dioxus 0.6 with minimal memory footprint and reactive state.",
      "YM Inc. POS support Kanban & incident log alongside academic assignment progress tracking.",
      "Dedicated R&D simulation hub documenting fixed-timestep and multi-threading strategies.",
      "Built-in focus utilities, scratchpad, and external API widgets.",
    ],
    stack: ["Rust", "Dioxus", "Serde", "Chrono", "HTML / Tailwind", "Desktop App"],
    demo: null,
  },
];

export const timeline = [
  {
    kind: "Work",
    period: "June 2026 — Present",
    current: true,
    title: "POS Project Implementation Support",
    org: "YM Inc. · Toronto",
    body: "Support POS rollouts across retail stores, triaging live incidents and coordinating store-level deployments.",
  },
  {
    kind: "Work",
    period: "2025",
    title: "Operations Intern (Short-Term)",
    org: "Marsh Canada · Toronto",
    body: "Analyzed operational data across business units and maintained process documentation.",
  },
  {
    kind: "Education",
    period: "2024 — Present",
    current: true,
    title: "Software Engineering Technology (Co-op)",
    org: "Centennial College · Toronto",
    body: "Advanced diploma specializing in full-cycle software architecture, advanced databases, Java programming, web systems, and software QA methodology.",
  },
  {
    kind: "Work",
    period: "2022 — 2024",
    title: "Customer Operations & Retail POS Specialist",
    org: "Popular Discounts",
    body: "Maintained fast-paced electronic Point of Sale checkout stations, handled inventory reconciliation, resolved checkout hardware faults, and communicated effectively under time constraints.",
  },
  {
    kind: "Education",
    period: "2021 — 2023",
    title: "Computer Science & Mathematics (B.Sc. coursework, completed through Year 3)",
    org: "UWI Cave Hill · Barbados",
    body: "Coursework in Data Structures & Algorithms, Object-Oriented Programming (Java), Systems Programming (C++), Calculus I & II, and Discrete Math.",
  },
];

export const certifications = [
  { name: "C++ Encryption & Decryption", done: true },
  { name: "Programming for Everybody (Python)", done: true },
  { name: "IBM Cybersecurity Analyst Specialization", done: false },
];
