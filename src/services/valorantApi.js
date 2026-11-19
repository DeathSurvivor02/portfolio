// Client for the deployed Valorant-API service (https://github.com/DeathSurvivor02/Valorant-API).
// The service enables CORS, so the portfolio can call it directly from the browser.

export const VALORANT_API_BASE = (import.meta.env.VITE_VALORANT_API_URL || "https://valorant-api-six.vercel.app").replace(/\/+$/, "");

const REQUEST_TIMEOUT_MS = 12000;

export const parseRiotId = (input) => {
  const [rawName = "", rawTag = ""] = String(input).trim().split("#");
  return { name: rawName.trim(), tag: rawTag.trim() };
};

export const toPath = (riotId, kind) => {
  const { name, tag } = parseRiotId(riotId);
  const base = kind === "matches" ? "/api/matches" : "/api/player";
  const query = kind === "matches" ? "?size=3" : "";
  return `${base}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}${query}`;
};

/**
 * Calls the live service and always resolves with a result object (never throws):
 *   { ok, status, path, ms, body }          on any HTTP response
 *   { ok: false, status: 0, path, error }   on network failure, timeout or invalid input
 */
export async function fetchValorant(riotId, kind, outerSignal) {
  const { name, tag } = parseRiotId(riotId);
  const path = toPath(riotId, kind);
  if (!name || !tag) {
    return { ok: false, status: 0, path, error: "Enter a Riot ID in the form Name#TAG." };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const onOuterAbort = () => controller.abort();
  outerSignal?.addEventListener("abort", onOuterAbort);
  const started = performance.now();

  try {
    const res = await fetch(`${VALORANT_API_BASE}${path}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    const text = await res.text();
    let body = null;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = { raw: text.slice(0, 400) };
    }
    return { ok: res.ok, status: res.status, path, ms: Math.round(performance.now() - started), body };
  } catch (err) {
    if (outerSignal?.aborted) return { ok: false, status: 0, path, aborted: true, error: "Request cancelled." };
    const timedOut = err?.name === "AbortError";
    return {
      ok: false,
      status: 0,
      path,
      error: timedOut
        ? "The API did not respond in time. It may be cold-starting; try again."
        : "Could not reach the API. Check your connection and try again.",
    };
  } finally {
    clearTimeout(timer);
    outerSignal?.removeEventListener("abort", onOuterAbort);
  }
}
