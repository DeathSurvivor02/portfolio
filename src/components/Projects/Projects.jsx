import React, { useState, useRef, useEffect } from "react";
import { FaGithub, FaPlay, FaSyncAlt, FaTerminal, FaCheck } from "react-icons/fa";
import { AnimatedBeam } from "../ui/animated-beam";

export const Projects = ({ selectedSkillGroup = "all", onClearFilter }) => {
  // Real, verified project list (no unbuilt concepts)
  const projectList = [
    {
      id: "valorant-api",
      num: "01",
      title: "Valorant-API",
      meta: "NODE.JS • EXPRESS • REST SERVICE",
      subtitle: "Player Profile, Match Telemetry & Game Data REST Interface",
      skillGroups: ["systems", "infra"],
      accentBorder: "border-t-2 border-t-blue-500",
      accentText: "text-blue-400",
      repoUrl: "https://github.com/DeathSurvivor02/Valorant-API",
      status: "Active API Repo",
      description:
        "A lightweight Node.js and Express REST service exposing structured player profiles, competitive rank metadata, and match statistics for client applications and Discord bots.",
      beamNodes: [
        { label: "Client / Bot", sub: "GET /api/player" },
        { label: "Express Gateway", sub: "CORS & Rate Limiter" },
        { label: "Riot / Stats API", sub: "JSON Match Payload" },
      ],
      beamColors: { start: "#3b82f6", stop: "#ef4444" },
      architecture: [
        "Express router handling parameterized player lookup (/api/player/:name/:tag) and match history routes.",
        "Stateless serverless export designed for Vercel Node runtime deployment.",
        "Rate-limit guard middleware protecting upstream Riot developer token quotas.",
        "JSON normalization layer formatting raw match telemetry for frontend and bot consumers.",
      ],
      techStack: ["JavaScript", "Node.js", "Express", "REST API", "CORS", "Vercel Serverless"],
    },
    {
      id: "siteline-ym",
      num: "02",
      title: "SiteLine — YM Inc Store Tracking",
      meta: "C# • REACT • NEON POSTGRESQL",
      subtitle: "Enterprise Retail Inventory, Importer & Multi-Store Tracking Platform",
      skillGroups: ["systems", "fullstack", "infra"],
      accentBorder: "border-t-2 border-t-rose-500",
      accentText: "text-rose-400",
      repoUrl: "https://github.com/DeathSurvivor02/ym-inc-store-tracking",
      status: "Production System",
      description:
        "Full-stack store tracking and inventory management suite built for YM Inc retail operations. Combines a C# desktop client, automated CSV/inventory importer, and React dashboard backed by Neon PostgreSQL.",
      beamNodes: [
        { label: "Store Importer", sub: "SKU / Batch Sync" },
        { label: "C# / Node Engine", sub: "Validation & Ledger" },
        { label: "Neon PostgreSQL", sub: "Store Inventory DB" },
      ],
      beamColors: { start: "#f43f5e", stop: "#3b82f6" },
      architecture: [
        "Automated batch importer ingesting store-level SKU counts, transfers, and stock discrepancies.",
        "C# desktop application interfacing with relational database records and barcode audit trails.",
        "React frontend dashboard visualizing per-store inventory health and audit timelines.",
        "Portable standalone sandbox build supporting offline/flash-drive retail deployment.",
      ],
      techStack: ["C# / .NET", "React", "TypeScript", "PostgreSQL (Neon)", "Batch Importer", "Docker"],
    },
    {
      id: "transit-routing",
      num: "03",
      title: "Transit Routing Engine",
      meta: "DART • FLUTTER • A* GRAPH SEARCH",
      subtitle: "Multi-Modal Pathfinding Engine & Cross-Platform Mobile Client",
      skillGroups: ["fullstack", "systems"],
      accentBorder: "border-t-2 border-t-blue-500",
      accentText: "text-blue-400",
      repoUrl: "https://github.com/DeathSurvivor02/Transit-Routing-Engine",
      status: "In Development",
      description:
        "Algorithmic transit routing service resolving multi-hop transfers, schedule windows, and walking links across transit nodes, paired with a Flutter mobile client rendering vector route polylines.",
      beamNodes: [
        { label: "Flutter Client", sub: "Origin → Dest" },
        { label: "A* Graph Engine", sub: "Transfer Weights" },
        { label: "OSM Map Canvas", sub: "Vector Polyline" },
      ],
      beamColors: { start: "#3b82f6", stop: "#60a5fa" },
      architecture: [
        "Adjacency graph modeling municipal stations, express corridors, and platform transfer penalties.",
        "Modified A* search weighting real-time departure headways and transfer walk times.",
        "Stateless routing response returning serialized hop sequences and polyline coordinates.",
        "Flutter cross-platform UI rendering interactive transit overlays on OpenStreetMap tiles.",
      ],
      techStack: ["Dart", "Flutter", "Graph Search (A*)", "Node.js", "OpenStreetMap", "GeoJSON"],
    },
    {
      id: "discord-music",
      num: "04",
      title: "Discord Music Bot & App",
      meta: "PYTHON • REACT NATIVE • SPOTIFY/YT",
      subtitle: "Real-Time Audio Streaming Bot with Expo Mobile Companion Controller",
      skillGroups: ["systems", "fullstack"],
      accentBorder: "border-t-2 border-t-rose-500",
      accentText: "text-rose-400",
      repoUrl: "https://github.com/DeathSurvivor02/discord_music_bot",
      status: "Completed",
      description:
        "Two-part music streaming ecosystem: a Python Discord bot resolving Spotify tracks and YouTube audio streams into voice channels, paired with a React Native Expo mobile app for remote queue control.",
      beamNodes: [
        { label: "Expo Mobile App", sub: "Queue & Controls" },
        { label: "Python Bot Core", sub: "FFmpeg / Voice Gateway" },
        { label: "Spotify & YouTube", sub: "Audio Stream Source" },
      ],
      beamColors: { start: "#f43f5e", stop: "#818cf8" },
      architecture: [
        "Asynchronous Python voice client streaming audio frames via FFmpeg with zero-gap queue transitions.",
        "Metadata resolver translating Spotify playlist/track URLs into playable YouTube audio streams.",
        "React Native (Expo) companion interface syncing live playback state, skip/pause, and track search.",
        "Persistent guild queue state handling reconnects and concurrent voice sessions.",
      ],
      techStack: ["Python", "Discord.py", "React Native (Expo)", "JavaScript", "Spotify API", "FFmpeg"],
    },
    {
      id: "commitr-bot",
      num: "05",
      title: "Commitr-Bot",
      meta: "TYPESCRIPT • GIT CLI • DISCORD WEBHOOK",
      subtitle: "Event-Driven Developer Telemetry & Automated Standup Reporter",
      skillGroups: ["systems", "infra"],
      accentBorder: "border-t-2 border-t-blue-500",
      accentText: "text-blue-400",
      repoUrl: "https://github.com/DeathSurvivor02/Commitr-bot",
      status: "Completed",
      description:
        "Background telemetry daemon tracking local workspace file hooks and Git diff statistics, aggregating active coding sessions locally, and dispatching structured standup digests to Discord.",
      beamNodes: [
        { label: "Chokidar Hook", sub: "File Write Events" },
        { label: "Git & SQLite", sub: "Diff + Session Store" },
        { label: "Discord Webhook", sub: "Backoff Dispatcher" },
      ],
      beamColors: { start: "#3b82f6", stop: "#f43f5e" },
      architecture: [
        "Filesystem change hooks (Chokidar) feeding a debounced in-memory event buffer.",
        "Git CLI subprocess queries computing exact insertions, deletions, and language breakdown.",
        "Local SQLite / JSON state persistence surviving restarts without losing session duration.",
        "Exponential backoff retry dispatcher respecting Discord's 30 req/min webhook limit.",
      ],
      techStack: ["TypeScript", "Node.js", "Chokidar", "Git CLI", "SQLite", "Discord Webhooks"],
    },
  ];

  // Filter projects by selected skill pillar from Skills section
  const filteredProjects =
    selectedSkillGroup === "all"
      ? projectList
      : projectList.filter((p) => p.skillGroups.includes(selectedSkillGroup));

  const [activeProject, setActiveProject] = useState("valorant-api");

  // Keep activeProject valid when skill filter changes
  useEffect(() => {
    if (!filteredProjects.some((p) => p.id === activeProject) && filteredProjects.length > 0) {
      setActiveProject(filteredProjects[0].id);
    }
  }, [selectedSkillGroup, filteredProjects, activeProject]);

  const current = filteredProjects.find((p) => p.id === activeProject) || filteredProjects[0];

  // Refs for Magic UI AnimatedBeam
  const beamContainerRef = useRef(null);
  const node1Ref = useRef(null);
  const node2Ref = useRef(null);
  const node3Ref = useRef(null);

  // ─── INTERACTIVE SIMULATION STATES ─────────────────────────────────────────
  // 1. Valorant-API Simulator
  const [valTag, setValTag] = useState("Bynoe#NA1");
  const [valEndpoint, setValEndpoint] = useState("/api/player/Bynoe/NA1");
  const [valLoading, setValLoading] = useState(false);
  const [valResponse, setValResponse] = useState({
    status: 200,
    latency: "42ms",
    payload: `{
  "player": "Bynoe#NA1",
  "rank": "Ascendant II",
  "rr": 68,
  "last_match": {
    "map": "Ascent",
    "agent": "Jett",
    "kda": "24/14/6",
    "result": "WIN (13-9)"
  }
}`,
  });

  const handleTestValorantApi = async (endpointType) => {
    setValLoading(true);
    const sanitized = valTag.includes("#") ? valTag.replace("#", "/") : `${valTag}/NA1`;
    const ep = endpointType === "matches" ? `/api/matches/${sanitized}` : `/api/player/${sanitized}`;
    setValEndpoint(ep);

    const start = performance.now();
    try {
      const res = await fetch(`http://localhost:3000${ep}`);
      const data = await res.json();
      const elapsed = `${Math.round(performance.now() - start)}ms (Live Local API)`;
      setValResponse({
        status: res.status,
        latency: elapsed,
        payload: JSON.stringify(data, null, 2),
      });
    } catch {
      const elapsed = `${Math.floor(Math.random() * 20) + 25}ms (Sandbox Fallback)`;
      setValResponse({
        status: 200,
        latency: elapsed,
        payload:
          endpointType === "matches"
            ? `{
  "player": "${valTag}",
  "recent_matches": [
    { "id": "match_904a", "map": "Haven", "score": "13-11", "acs": 264 },
    { "id": "match_881c", "map": "Bind", "score": "13-7", "acs": 289 }
  ]
}`
            : `{
  "player": "${valTag}",
  "rank": "Ascendant II",
  "rr": ${Math.floor(Math.random() * 40) + 55},
  "region": "na",
  "status": "LIVE_SYNC"
}`,
      });
    } finally {
      setValLoading(false);
    }
  };

  // 2. SiteLine (YM Inc) Simulator
  const [storeSkuCount, setStoreSkuCount] = useState(1428);
  const [storeAuditLogs, setStoreAuditLogs] = useState([
    { store: "STR-042 (Toronto)", sku: "YM-88412", delta: "+24 units", status: "COMMITTED" },
    { store: "STR-109 (Mississauga)", sku: "YM-30914", delta: "-6 units", status: "COMMITTED" },
    { store: "STR-018 (Scarborough)", sku: "YM-55201", delta: "+12 units", status: "SYNCED" },
  ]);

  const handleSimulateSkuScan = () => {
    const stores = ["STR-042 (Toronto)", "STR-109 (Mississauga)", "STR-074 (Vaughan)", "STR-018 (Scarborough)"];
    const store = stores[Math.floor(Math.random() * stores.length)];
    const sku = `YM-${Math.floor(Math.random() * 89999) + 10000}`;
    const qty = Math.floor(Math.random() * 18) + 2;
    setStoreSkuCount((c) => c + qty);
    setStoreAuditLogs((prev) => [
      { store, sku, delta: `+${qty} units`, status: "COMMITTED" },
      ...prev.slice(0, 3),
    ]);
  };

  // 3. Transit Routing Simulator
  const [routeCalculating, setRouteCalculating] = useState(false);
  const [routeResult, setRouteResult] = useState({
    origin: "Scarborough Centre",
    hub: "Bloor-Yonge Interchange",
    dest: "Union Station",
    eta: "28 mins",
    computeLatency: "3.2ms",
    hops: 3,
  });

  const handleComputeRoute = () => {
    setRouteCalculating(true);
    setTimeout(() => {
      setRouteCalculating(false);
      const hubs = ["Bloor-Yonge Interchange", "Kennedy Station Hub", "St. George Transfer"];
      setRouteResult({
        origin: "Scarborough Centre",
        hub: hubs[Math.floor(Math.random() * hubs.length)],
        dest: "Union Station",
        eta: `${Math.floor(Math.random() * 9) + 22} mins`,
        computeLatency: `${(Math.random() * 1.8 + 2.1).toFixed(1)}ms`,
        hops: Math.floor(Math.random() * 2) + 2,
      });
    }, 350);
  };

  // 4. Discord Music Bot Simulator
  const [isPlaying, setIsPlaying] = useState(true);
  const [trackIndex, setTrackIndex] = useState(0);
  const tracks = [
    { title: "Nights — Frank Ocean", source: "Spotify → YT Stream", duration: "5:07" },
    { title: "Redbone — Childish Gambino", source: "Spotify → YT Stream", duration: "5:26" },
    { title: "505 — Arctic Monkeys", source: "YouTube Direct", duration: "4:13" },
  ];

  // 5. Commitr-Bot Simulator
  const [linesInserted, setLinesInserted] = useState(148);
  const [linesDeleted, setLinesDeleted] = useState(32);
  const [commitrEvents, setCommitrEvents] = useState([
    { time: "09:14:02", file: "src/worker/telemetry.ts", diff: "+42 -12" },
    { time: "09:18:44", file: "src/db/sqlite.ts", diff: "+18 -4" },
  ]);
  const [discordDispatched, setDiscordDispatched] = useState(false);

  const handleSimulateEdit = () => {
    const files = ["src/daemon.ts", "src/hooks/git-diff.ts", "src/queue/retry.ts"];
    const chosen = files[Math.floor(Math.random() * files.length)];
    const add = Math.floor(Math.random() * 20) + 5;
    const del = Math.floor(Math.random() * 8) + 1;
    const now = new Date().toTimeString().split(" ")[0];
    setLinesInserted((prev) => prev + add);
    setLinesDeleted((prev) => prev + del);
    setCommitrEvents((prev) => [{ time: now, file: chosen, diff: `+${add} -${del}` }, ...prev.slice(0, 3)]);
    setDiscordDispatched(false);
  };

  return (
    <section id="projects" className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 hairline-b pb-4">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            03 / Engineered Systems {selectedSkillGroup !== "all" ? `— Filtered by ${selectedSkillGroup}` : ""}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 font-heading">
            Projects &amp; Live Architecture
          </h2>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span>Select any system to inspect its data flow</span>
          {selectedSkillGroup !== "all" && (
            <button
              onClick={onClearFilter}
              className="px-2.5 py-1 bg-[#161a24] border border-[#2d3344] text-white hover:border-white transition cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* ─── SOLID ARCHITECTURAL SELECTOR STRIP (Zero translucent pills) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border border-[#1e222d] bg-[#0c0e13]">
        {filteredProjects.map((p, idx) => {
          const isActive = p.id === current.id;
          return (
            <button
              key={p.id}
              onClick={() => setActiveProject(p.id)}
              className={`text-left p-4 transition duration-150 cursor-pointer flex flex-col justify-between ${
                idx < filteredProjects.length - 1 ? "lg:border-r border-b lg:border-b-0 border-[#1e222d]" : ""
              } ${
                isActive ? `bg-[#121620] ${p.accentBorder}` : "hover:bg-[#10131a]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                  <span className={isActive ? p.accentText + " font-bold" : "text-slate-500"}>
                    {p.num} //
                  </span>
                  <span className="text-slate-500 uppercase">{p.status}</span>
                </div>
                <div className={`text-sm font-bold font-heading leading-snug ${isActive ? "text-white" : "text-slate-300"}`}>
                  {p.title}
                </div>
              </div>
              <div className="mt-3 pt-2 hairline-t text-[10px] font-mono text-slate-500 truncate">
                {p.meta}
              </div>
            </button>
          );
        })}
      </div>

      {/* ─── ACTIVE SYSTEM SPECIFICATION PANEL ─── */}
      <div className="bg-[#0c0e13] border border-[#1e222d] p-6 sm:p-8 space-y-8">
        
        {/* System Header & Clean Inline Metadata */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 hairline-b pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              <span className={current.accentText + " font-semibold"}>{current.num}</span>
              <span className="mx-2 text-slate-600">/</span>
              <span>{current.meta}</span>
              <span className="mx-2 text-slate-600">/</span>
              <span className="text-slate-300">{current.status}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-heading">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-slate-400">
              {current.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {current.description}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <a
              href={current.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-sm bg-white text-black font-semibold text-xs tracking-wide hover:bg-slate-200 transition flex items-center gap-2"
            >
              <FaGithub className="w-4 h-4" />
              <span>View Repository</span>
              <span className="font-mono text-xs">↗</span>
            </a>
            <span className="text-[11px] font-mono text-slate-500">
              {current.repoUrl.replace("https://", "")}
            </span>
          </div>
        </div>

        {/* ─── MAGIC UI ANIMATED BEAM ARCHITECTURE FLOW ─── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            <span>System Data-Flow Topology</span>
            <span className="text-slate-500">Live SVG Signal Beam</span>
          </div>

          <div
            ref={beamContainerRef}
            className="relative flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 bg-[#07080a] border border-[#1e222d] overflow-hidden"
          >
            {/* Node 1 */}
            <div
              ref={node1Ref}
              className="z-10 w-full sm:w-48 p-3.5 bg-[#0c0e13] border border-[#2a3040] text-center"
            >
              <div className="text-xs font-bold text-white font-heading">{current.beamNodes[0].label}</div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">{current.beamNodes[0].sub}</div>
            </div>

            {/* Node 2 (Central Engine) */}
            <div
              ref={node2Ref}
              className="z-10 w-full sm:w-52 p-4 bg-[#10141e] border border-blue-500/60 text-center"
            >
              <div className="text-xs font-bold text-white font-heading">{current.beamNodes[1].label}</div>
              <div className="text-[10px] font-mono text-blue-400 mt-1">{current.beamNodes[1].sub}</div>
            </div>

            {/* Node 3 */}
            <div
              ref={node3Ref}
              className="z-10 w-full sm:w-48 p-3.5 bg-[#0c0e13] border border-[#2a3040] text-center"
            >
              <div className="text-xs font-bold text-white font-heading">{current.beamNodes[2].label}</div>
              <div className="text-[10px] font-mono text-rose-400 mt-1">{current.beamNodes[2].sub}</div>
            </div>

            {/* Animated Beams connecting Node 1 -> Node 2 -> Node 3 */}
            <AnimatedBeam
              containerRef={beamContainerRef}
              fromRef={node1Ref}
              toRef={node2Ref}
              duration={2.6}
              gradientStartColor={current.beamColors.start}
              gradientStopColor={current.beamColors.stop}
              pathColor="rgba(255,255,255,0.08)"
              pathWidth={2}
            />
            <AnimatedBeam
              containerRef={beamContainerRef}
              fromRef={node2Ref}
              toRef={node3Ref}
              duration={2.6}
              delay={0.8}
              gradientStartColor={current.beamColors.stop}
              gradientStopColor={current.beamColors.start}
              pathColor="rgba(255,255,255,0.08)"
              pathWidth={2}
            />
          </div>
        </div>

        {/* ─── INTERACTIVE SYSTEM SANDBOX ─── */}
        <div className="border border-[#1e222d] bg-[#07080a] p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between hairline-b pb-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-white">
              <FaTerminal className={current.accentText} />
              <span className="font-semibold uppercase tracking-wider">Interactive System Demonstration</span>
            </div>
            <span className="text-[11px] text-slate-400">Module: {current.id}</span>
          </div>

          {/* 1. Valorant-API Interactive Console */}
          {current.id === "valorant-api" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={valTag}
                  onChange={(e) => setValTag(e.target.value)}
                  className="px-3 py-2 bg-[#0c0e13] border border-[#2a3040] text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                  placeholder="Player#TAG"
                />
                <button
                  onClick={() => handleTestValorantApi("player")}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold transition cursor-pointer flex items-center gap-2"
                >
                  <FaPlay className="w-2.5 h-2.5" />
                  <span>GET /api/player</span>
                </button>
                <button
                  onClick={() => handleTestValorantApi("matches")}
                  className="px-3.5 py-2 bg-[#161a24] hover:bg-[#1f2432] border border-[#2d3344] text-slate-200 font-mono text-xs transition cursor-pointer"
                >
                  GET /api/matches
                </button>
                <div className="flex items-center gap-3 ml-auto text-[11px] font-mono">
                  <a
                    href="https://github.com/DeathSurvivor02/Valorant-API/blob/main/api/index.js"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    api/index.js ↗
                  </a>
                  <a
                    href="https://github.com/DeathSurvivor02/Valorant-API#readme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white hover:underline"
                  >
                    API Docs ↗
                  </a>
                </div>
              </div>
              <div className="p-4 bg-[#0c0e13] border border-[#1e222d] font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 hairline-b pb-2">
                  <span>Endpoint: <span className="text-white">{valEndpoint}</span></span>
                  <span className="text-emerald-400">HTTP {valResponse.status} • {valLoading ? "..." : valResponse.latency}</span>
                </div>
                <pre className="text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
                  {valResponse.payload}
                </pre>
              </div>
            </div>
          )}

          {/* 2. SiteLine (YM Inc) Interactive Ledger */}
          {current.id === "siteline-ym" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleSimulateSkuScan}
                  className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-semibold transition cursor-pointer flex items-center gap-2"
                >
                  <FaPlay className="w-2.5 h-2.5" />
                  <span>Simulate Store SKU Transfer Batch</span>
                </button>
                <div className="text-xs font-mono text-slate-300">
                  Total Tracked SKUs: <span className="text-white font-bold">{storeSkuCount.toLocaleString()}</span>
                </div>
              </div>
              <div className="bg-[#0c0e13] border border-[#1e222d] p-4 font-mono text-xs space-y-2">
                <div className="grid grid-cols-4 text-[10px] text-slate-500 uppercase hairline-b pb-2">
                  <span>Store Node</span>
                  <span>SKU ID</span>
                  <span>Inventory Delta</span>
                  <span className="text-right">DB Status</span>
                </div>
                {storeAuditLogs.map((log, i) => (
                  <div key={i} className="grid grid-cols-4 text-[11px] py-1 text-slate-200">
                    <span>{log.store}</span>
                    <span className="text-slate-400">{log.sku}</span>
                    <span className={log.delta.startsWith("+") ? "text-emerald-400" : "text-rose-400"}>{log.delta}</span>
                    <span className="text-right text-blue-400">{log.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Transit Routing Engine Interactive Simulation */}
          {current.id === "transit-routing" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleComputeRoute}
                  disabled={routeCalculating}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold transition cursor-pointer flex items-center gap-2"
                >
                  <FaPlay className="w-2.5 h-2.5" />
                  <span>{routeCalculating ? "Running A* Search..." : "Compute Optimal Multi-Hop Route"}</span>
                </button>
                <span className="text-xs font-mono text-emerald-400">
                  Compute Latency: {routeResult.computeLatency}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#0c0e13] border border-[#1e222d] p-4 font-mono text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Origin Node</div>
                  <div className="text-white font-semibold mt-1">{routeResult.origin}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Transfer Hub ({routeResult.hops} hops)</div>
                  <div className="text-blue-400 font-semibold mt-1">{routeResult.hub}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Destination • ETA</div>
                  <div className="text-white font-semibold mt-1">{routeResult.dest} ({routeResult.eta})</div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Discord Music Bot & App Interactive Controller */}
          {current.id === "discord-music" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-semibold transition cursor-pointer"
                >
                  {isPlaying ? "Pause Voice Stream" : "Resume Voice Stream"}
                </button>
                <button
                  onClick={() => setTrackIndex((i) => (i + 1) % tracks.length)}
                  className="px-3.5 py-2 bg-[#161a24] hover:bg-[#1f2432] border border-[#2d3344] text-slate-200 font-mono text-xs transition cursor-pointer"
                >
                  Skip Next Track →
                </button>
              </div>
              <div className="bg-[#0c0e13] border border-[#1e222d] p-4 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">
                    Voice Channel State: {isPlaying ? "STREAMING (FFmpeg Opus)" : "PAUSED"}
                  </div>
                  <div className="text-sm font-bold text-white mt-1">{tracks[trackIndex].title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{tracks[trackIndex].source}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase">Synced Mobile Client</div>
                  <div className="text-xs text-blue-400 font-semibold mt-1">Expo App Connected • {tracks[trackIndex].duration}</div>
                </div>
              </div>
            </div>
          )}

          {/* 5. Commitr-Bot Interactive Simulator */}
          {current.id === "commitr-bot" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleSimulateEdit}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold transition cursor-pointer flex items-center gap-2"
                >
                  <FaPlay className="w-2.5 h-2.5" />
                  <span>Simulate File Write &amp; Git Diff</span>
                </button>
                <button
                  onClick={() => setDiscordDispatched(true)}
                  className="px-3.5 py-2 bg-[#161a24] hover:bg-[#1f2432] border border-[#2d3344] text-slate-200 font-mono text-xs transition cursor-pointer flex items-center gap-2"
                >
                  <FaSyncAlt className="w-2.5 h-2.5" />
                  <span>Dispatch Discord Standup</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0c0e13] border border-[#1e222d] p-4 font-mono text-xs">
                <div className="space-y-2">
                  <div className="text-[10px] text-slate-500 uppercase">Filesystem Hook Stream</div>
                  {commitrEvents.map((evt, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">[{evt.time}]</span>
                      <span className="text-slate-200">{evt.file}</span>
                      <span className="text-emerald-400">{evt.diff}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 md:border-l md:border-[#1e222d] md:pl-4">
                  <div className="text-[10px] text-slate-500 uppercase">Aggregated Standup Payload</div>
                  <div className="text-white">Net Churn: <span className="text-emerald-400">+{linesInserted}</span> / <span className="text-rose-400">-{linesDeleted}</span> lines</div>
                  {discordDispatched && (
                    <div className="text-emerald-400 text-[11px] flex items-center gap-1.5 pt-1">
                      <FaCheck /> <span>HTTP 204 Dispatched to Discord Webhook</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Architectural Specs & Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 font-mono text-xs">
          <div className="space-y-3">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">
              Engineering Notes &amp; Execution
            </div>
            <ul className="space-y-2 text-slate-300">
              {current.architecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 py-1.5 hairline-b">
                  <span className={current.accentText + " font-bold"}>0{idx + 1}.</span>
                  <span className="leading-relaxed font-sans text-xs">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">
              Stack Components
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {current.techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 bg-[#07080a] border border-[#1e222d] text-slate-200 text-xs font-mono"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
