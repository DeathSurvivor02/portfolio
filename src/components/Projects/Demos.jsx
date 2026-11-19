import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Play } from "../ui/Icons";
import { VALORANT_API_BASE, fetchValorant, toPath } from "../../services/valorantApi";
import { findRoute, stations, TRANSFER_PENALTY_MIN } from "../../data/transit";

/*
 * Interactive demos for each project. The Valorant demo calls the deployed Valorant-API service,
 * the Transit demo runs the real A* graph search in the browser, and the SiteLine demo is a
 * simulation on sample data.
 */

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const Panel = ({ children, className = "" }) => (
  <div className={`rounded-lg border border-line bg-bg p-4 font-mono text-[0.8125rem] ${className}`}>{children}</div>
);

// ─── Valorant-API: live request console ─────────────────────────────────────

const ValorantDemo = () => {
  const [riotId, setRiotId] = useState("Bynoe#NA1");
  const [state, setState] = useState({ phase: "loading", kind: "player" });
  const controller = useRef(null);

  const request = useCallback((kind, id) => {
    controller.current?.abort();
    const ctrl = new AbortController();
    controller.current = ctrl;
    fetchValorant(id, kind, ctrl.signal).then((result) => {
      if (ctrl.signal.aborted) return;
      setState({ phase: result.ok ? "done" : "error", kind, result });
    });
  }, []);

  const send = useCallback(
    (kind, id) => {
      setState({ phase: "loading", kind });
      request(kind, id);
    },
    [request],
  );

  // The initial state is already "loading", so the first request only needs to start the fetch.
  useEffect(() => {
    request("player", "Bynoe#NA1");
    return () => controller.current?.abort();
  }, [request]);

  const { phase, kind, result } = state;
  const mode = result?.body?.mode;
  const statusText = phase === "loading" ? "Requesting..." : result?.status ? `${result.status} ${result.ok ? "OK" : "Error"}` : "No response";
  const statusClass = phase === "loading" ? "text-subtle" : result?.ok ? "text-ok" : "text-accent-2";

  return (
    <div className="space-y-3">
      <form
        className="flex flex-wrap items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send("player", riotId);
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
        <button type="submit" disabled={phase === "loading"} className="btn btn-primary btn-sm font-mono">
          <Play />
          GET player
        </button>
        <button
          type="button"
          disabled={phase === "loading"}
          onClick={() => send("matches", riotId)}
          className="btn btn-secondary btn-sm font-mono"
        >
          GET matches
        </button>
      </form>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-line text-xs">
          <span className="text-fg break-all">{result?.path || toPath(riotId, kind)}</span>
          <span className={statusClass}>
            {statusText}
            {result?.ms ? ` · ${result.ms} ms` : ""}
          </span>
        </div>
        <div aria-live="polite">
          {phase === "error" && !result.status && <p className="text-accent-2 text-xs">{result.error}</p>}
          {mode === "demo" && (
            <p className="text-warn text-xs pb-2">
              The deployed API is running in demo mode (no Riot or HenrikDev key configured), so the figures below are sample data.
            </p>
          )}
          {phase === "loading" && <p className="text-subtle text-xs">Waiting for {VALORANT_API_BASE.replace("https://", "")}...</p>}
          {result?.body && (
            <pre className="overflow-auto max-h-72 text-muted leading-relaxed text-xs">{JSON.stringify(result.body, null, 2)}</pre>
          )}
        </div>
      </Panel>
      <p className="text-xs text-subtle">
        Live request to <span className="font-mono">{VALORANT_API_BASE.replace("https://", "")}</span> from your browser.
      </p>
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
                <td className={`px-4 py-2 text-right whitespace-nowrap ${row.delta > 0 ? "text-ok" : "text-accent-2"}`}>
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

// ─── Transit Routing Engine: A* route search ────────────────────────────────

const stationKeys = Object.keys(stations);

const selectClass =
  "h-9 rounded-lg border border-line-strong bg-bg px-3 text-sm text-fg focus:border-accent focus:outline-none";
const Select = ({ label, value, onChange }) => (
  <label className="flex flex-col gap-1.5 text-xs font-mono text-subtle grow min-w-40">
    {label}
    <select value={value} onChange={(e) => onChange(e.target.value)} className={selectClass}>
      {stationKeys.map((k) => (
        <option key={k} value={k}>
          {stations[k].name}
        </option>
      ))}
    </select>
  </label>
);

const TransitDemo = () => {
  const [origin, setOrigin] = useState("kipling");
  const [dest, setDest] = useState("finch");
  const route = useMemo(() => findRoute(origin, dest), [origin, dest]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-2">
        <Select label="Origin" value={origin} onChange={setOrigin} />
        <Select label="Destination" value={dest} onChange={setDest} />
      </div>

      <Panel>
        <div aria-live="polite">
          {!route && <p className="text-accent-2 text-xs">No route found between these stations.</p>}
          {route && route.legs.length === 0 && <p className="text-subtle text-xs">Origin and destination are the same station.</p>}
          {route && route.legs.length > 0 && (
            <>
              <p className="pb-3 mb-3 border-b border-line text-xs text-subtle">
                {route.totalMin} min total · {route.transfers} {route.transfers === 1 ? "transfer" : "transfers"} (+{TRANSFER_PENALTY_MIN} min each)
              </p>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-1.5 w-2 h-2 rounded-full shrink-0 bg-line-strong" />
                  <span className="block text-sm font-medium text-fg">{stations[origin].name}</span>
                </li>
                {route.legs.map((leg) => (
                  <li key={leg.to} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${leg.transfer ? "bg-accent" : "bg-line-strong"}`}
                    />
                    <span>
                      <span className="block text-xs text-subtle">
                        {leg.mode} · {leg.minutes} min{leg.transfer ? " · transfer" : ""}
                      </span>
                      <span className={`block text-sm font-medium ${leg.transfer ? "text-accent" : "text-fg"}`}>
                        {stations[leg.to].name}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </Panel>
    </div>
  );
};

const demos = {
  valorant: ValorantDemo,
  siteline: SitelineDemo,
  transit: TransitDemo,
};

const demoCaptions = {
  valorant: "— live request to the deployed API",
  siteline: "— simulated in your browser with sample data",
  transit: "— A* search running in your browser on a sample Toronto network",
};

export const ProjectDemo = ({ kind }) => {
  const Demo = demos[kind];
  if (!Demo) return null;
  return (
    <div className="space-y-3 max-w-xl">
      <h4 className="text-[0.9375rem] font-semibold text-fg">
        Try it <span className="font-normal text-subtle">{demoCaptions[kind]}</span>
      </h4>
      <Demo />
    </div>
  );
};

export default ProjectDemo;
