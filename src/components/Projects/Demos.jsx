import React, { useEffect, useRef, useState } from "react";
import { Play } from "../ui/Icons";

/*
 * Small in-browser simulations of each system's core behaviour.
 * They run entirely on sample data — nothing here calls a real backend.
 */

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const Panel = ({ children, className = "" }) => (
  <div className={`rounded-lg border border-line bg-bg p-4 font-mono text-[0.8125rem] ${className}`}>{children}</div>
);

// ─── Valorant-API: request console ──────────────────────────────────────────

const valorantPayload = (riotId, kind) =>
  kind === "matches"
    ? {
        player: riotId,
        recent_matches: [
          { id: "match_904a", map: "Haven", score: "13-11", acs: 264 },
          { id: "match_881c", map: "Bind", score: "13-7", acs: 289 },
        ],
      }
    : {
        player: riotId,
        rank: "Ascendant II",
        rr: 68,
        last_match: { map: "Ascent", agent: "Jett", kda: "24/14/6", result: "WIN (13-9)" },
      };

const toPath = (riotId, kind) => {
  const [name, tag = "NA1"] = riotId.trim().split("#");
  const base = kind === "matches" ? "/api/matches" : "/api/player";
  return `${base}/${encodeURIComponent(name || "Player")}/${encodeURIComponent(tag || "NA1")}`;
};

const ValorantDemo = () => {
  const [riotId, setRiotId] = useState("Bynoe#NA1");
  const [request, setRequest] = useState({ riotId: "Bynoe#NA1", kind: "player" });

  const send = (kind) => setRequest({ riotId: riotId.trim() || "Player#NA1", kind });

  return (
    <div className="space-y-3">
      <form
        className="flex flex-wrap items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send("player");
        }}
      >
        <label className="flex flex-col gap-1.5 text-xs font-mono text-subtle grow min-w-40">
          Riot ID
          <input
            type="text"
            value={riotId}
            onChange={(e) => setRiotId(e.target.value)}
            placeholder="Player#TAG"
            autoComplete="off"
            spellCheck="false"
            className="h-9 rounded-lg border border-line-strong bg-bg px-3 text-sm text-fg placeholder:text-subtle focus:border-accent focus:outline-none"
          />
        </label>
        <button type="submit" className="btn btn-primary btn-sm font-mono">
          <Play />
          GET player
        </button>
        <button type="button" onClick={() => send("matches")} className="btn btn-secondary btn-sm font-mono">
          GET matches
        </button>
      </form>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-line text-xs">
          <span className="text-fg break-all">{toPath(request.riotId, request.kind)}</span>
          <span className="text-ok">200 OK</span>
        </div>
        <pre aria-live="polite" className="overflow-x-auto text-muted leading-relaxed text-xs">
          {JSON.stringify(valorantPayload(request.riotId, request.kind), null, 2)}
        </pre>
      </Panel>
    </div>
  );
};

// ─── SiteLine: inventory ledger ─────────────────────────────────────────────

const stores = ["STR-042 Toronto", "STR-109 Mississauga", "STR-074 Vaughan", "STR-018 Scarborough"];

const SitelineDemo = () => {
  const nextId = useRef(3);
  const [total, setTotal] = useState(1428);
  const [rows, setRows] = useState([
    { id: 0, store: "STR-042 Toronto", sku: "YM-88412", delta: 24 },
    { id: 1, store: "STR-109 Mississauga", sku: "YM-30914", delta: -6 },
    { id: 2, store: "STR-018 Scarborough", sku: "YM-55201", delta: 12 },
  ]);

  const addBatch = () => {
    const delta = randomInt(2, 19);
    const row = {
      id: nextId.current++,
      store: stores[randomInt(0, stores.length - 1)],
      sku: `YM-${randomInt(10000, 99999)}`,
      delta,
    };
    setTotal((t) => t + delta);
    setRows((prev) => [row, ...prev].slice(0, 4));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={addBatch} className="btn btn-primary btn-sm font-mono">
          <Play />
          Import transfer batch
        </button>
        <p className="text-sm text-muted" aria-live="polite">
          Units tracked: <span className="font-mono font-medium text-fg">{total.toLocaleString()}</span>
        </p>
      </div>

      <Panel className="!p-0 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-subtle">
              <th scope="col" className="font-normal px-4 py-2.5 border-b border-line">Store</th>
              <th scope="col" className="font-normal px-4 py-2.5 border-b border-line">SKU</th>
              <th scope="col" className="font-normal px-4 py-2.5 border-b border-line text-right">Change</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="text-fg">
                <td className="px-4 py-2 whitespace-nowrap">{row.store}</td>
                <td className="px-4 py-2 text-muted">{row.sku}</td>
                <td className={`px-4 py-2 text-right whitespace-nowrap ${row.delta > 0 ? "text-ok" : "text-warn"}`}>
                  {row.delta > 0 ? "+" : "−"}
                  {Math.abs(row.delta)} units
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
};

// ─── Transit Routing Engine: route search ───────────────────────────────────

const hubs = ["Bloor-Yonge Interchange", "Kennedy Station Hub", "St. George Transfer"];

const TransitDemo = () => {
  const [busy, setBusy] = useState(false);
  const [route, setRoute] = useState({ hub: hubs[0], eta: 28, hops: 3 });
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const compute = () => {
    setBusy(true);
    timer.current = setTimeout(() => {
      setRoute({ hub: hubs[randomInt(0, hubs.length - 1)], eta: randomInt(22, 30), hops: randomInt(2, 3) });
      setBusy(false);
    }, 450);
  };

  const stops = [
    { label: "Origin", value: "Scarborough Centre" },
    { label: `Transfer · ${route.hops} hops`, value: route.hub, accent: true },
    { label: `Destination · ${route.eta} min`, value: "Union Station" },
  ];

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={compute}
        aria-disabled={busy}
        className="btn btn-primary btn-sm font-mono aria-disabled:opacity-70"
      >
        <Play />
        {busy ? "Running A* search…" : "Compute a route"}
      </button>

      <Panel>
        <ol aria-live="polite" className={`space-y-3 transition-opacity ${busy ? "opacity-40" : ""}`}>
          {stops.map((stop) => (
            <li key={stop.label} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${stop.accent ? "bg-accent" : "bg-line-strong"}`}
              />
              <span>
                <span className="block text-xs text-subtle">{stop.label}</span>
                <span className={`block text-sm font-medium ${stop.accent ? "text-accent" : "text-fg"}`}>
                  {stop.value}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
};

const demos = {
  valorant: ValorantDemo,
  siteline: SitelineDemo,
  transit: TransitDemo,
};

export const ProjectDemo = ({ kind }) => {
  const Demo = demos[kind];
  if (!Demo) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h4 className="eyebrow">Try it</h4>
        <span className="chip">Simulated · sample data</span>
      </div>
      <Demo />
    </div>
  );
};

export default ProjectDemo;
