import React from "react";

export const SectionHeader = ({ eyebrow, title, description, id }) => (
  <header className="max-w-2xl space-y-3">
    <p className="eyebrow flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-8 bg-accent" />
      {eyebrow}
    </p>
    <h2 id={id} className="text-3xl sm:text-4xl font-bold text-fg leading-tight">
      {title}
    </h2>
    {description && <p className="text-muted text-base sm:text-lg">{description}</p>}
  </header>
);

export default SectionHeader;
