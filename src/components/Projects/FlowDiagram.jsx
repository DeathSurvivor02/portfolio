import React from "react";

/** Vertical three-stage data-flow pipeline: source → engine → sink. */
export const FlowDiagram = ({ nodes, title }) => (
  <figure className="rounded-xl border border-line bg-bg p-4 sm:p-5">
    <figcaption className="eyebrow mb-4">Data flow</figcaption>
    <ol aria-label={`${title} data flow`} className="flex flex-col">
      {nodes.map((node, i) => {
        const isCore = i === 1;
        return (
          <li key={node.label} className="flex flex-col">
            {i > 0 && (
              <span aria-hidden="true" className="relative mx-auto h-7 w-px bg-line-strong overflow-hidden">
                <span
                  className="flow-packet absolute inset-x-0 top-0 h-2 bg-accent"
                  style={{ animationDelay: `${i * 0.6}s` }}
                />
              </span>
            )}
            <div
              className={`rounded-lg border px-4 py-3 text-center ${
                isCore ? "border-accent bg-accent-soft" : "border-line bg-surface"
              }`}
            >
              <div className="text-sm font-semibold text-fg">{node.label}</div>
              <div className={`text-xs font-mono mt-0.5 ${isCore ? "text-accent" : "text-subtle"}`}>{node.sub}</div>
            </div>
          </li>
        );
      })}
    </ol>
  </figure>
);

export default FlowDiagram;
