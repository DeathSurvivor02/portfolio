// Station graph and A* search mirrored from the Transit Routing Engine live preview
// (flutter_transit_app/web-preview). Edge weights are minutes; switching mode or line
// between consecutive edges adds TRANSFER_PENALTY_MIN.

export const TRANSFER_PENALTY_MIN = 3;

export const stations = {
  union: { name: "Union Station", lat: 43.6453, lng: -79.3806 },
  bloor: { name: "Bloor-Yonge", lat: 43.6709, lng: -79.3857 },
  stgeorge: { name: "St. George", lat: 43.6682, lng: -79.3997 },
  spadina: { name: "Spadina", lat: 43.6672, lng: -79.4038 },
  kennedy: { name: "Kennedy", lat: 43.7325, lng: -79.2636 },
  finch: { name: "Finch", lat: 43.7805, lng: -79.4148 },
  kipling: { name: "Kipling", lat: 43.6375, lng: -79.5356 },
  eglinton: { name: "Eglinton", lat: 43.7056, lng: -79.3983 },
};

const edgeList = [
  ["union", "bloor", 6, "Line 1 Yonge-University"],
  ["bloor", "eglinton", 8, "Line 1 Yonge-University"],
  ["eglinton", "finch", 11, "Line 1 Yonge-University"],
  ["union", "stgeorge", 7, "Line 1 University"],
  ["stgeorge", "spadina", 2, "Line 2 Bloor-Danforth"],
  ["stgeorge", "bloor", 3, "Line 2 Bloor-Danforth"],
  ["bloor", "kennedy", 18, "Line 2 Bloor-Danforth"],
  ["spadina", "kipling", 19, "Line 2 Bloor-Danforth"],
  ["union", "kennedy", 16, "GO Stouffville Express"],
];

const adjacency = Object.fromEntries(Object.keys(stations).map((k) => [k, []]));
edgeList.forEach(([a, b, w, mode]) => {
  adjacency[a].push({ to: b, w, mode });
  adjacency[b].push({ to: a, w, mode });
});

// Straight-line distance in degrees scaled to minutes (same heuristic as the live preview).
const heuristic = (a, b) => {
  const dx = stations[a].lat - stations[b].lat;
  const dy = stations[a].lng - stations[b].lng;
  return Math.sqrt(dx * dx + dy * dy) * 60;
};

/**
 * A* over the station graph.
 * Returns { totalMin, transfers, legs: [{ from, to, minutes, mode, transfer }] } or null if unreachable.
 */
export function findRoute(start, goal) {
  if (!stations[start] || !stations[goal]) return null;
  if (start === goal) return { totalMin: 0, transfers: 0, legs: [] };

  const open = new Set([start]);
  const cameFrom = {};
  const g = Object.fromEntries(Object.keys(stations).map((k) => [k, Infinity]));
  const f = { ...g };
  g[start] = 0;
  f[start] = heuristic(start, goal);

  while (open.size > 0) {
    let current = null;
    for (const n of open) if (current === null || f[n] < f[current]) current = n;

    if (current === goal) {
      const legs = [];
      let node = goal;
      while (cameFrom[node]) {
        legs.unshift(cameFrom[node]);
        node = cameFrom[node].from;
      }
      return { totalMin: g[goal], transfers: legs.filter((l) => l.transfer).length, legs };
    }

    open.delete(current);
    for (const edge of adjacency[current]) {
      const prevMode = cameFrom[current]?.mode;
      const transfer = Boolean(prevMode && prevMode !== edge.mode);
      const tentative = g[current] + edge.w + (transfer ? TRANSFER_PENALTY_MIN : 0);
      if (tentative < g[edge.to]) {
        cameFrom[edge.to] = { from: current, to: edge.to, minutes: edge.w, mode: edge.mode, transfer };
        g[edge.to] = tentative;
        f[edge.to] = tentative + heuristic(edge.to, goal);
        open.add(edge.to);
      }
    }
  }
  return null;
}
