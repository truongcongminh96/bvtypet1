import { Eye } from "@phosphor-icons/react/dist/ssr";

import type { ObservationNoteBlock } from "@/content/site";

export function ObservationNote({ block }: { block: ObservationNoteBlock }) {
  return (
    <aside
      id={block.id}
      aria-labelledby={block.id ? `${block.id}-title` : undefined}
      className="article-block scroll-mt-28 rounded-[var(--radius-lg)] border border-brand-blue/20 bg-brand-blue-soft/70 p-6 sm:p-7"
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-brand-blue/20 bg-surface text-brand-blue-dark">
          <Eye aria-hidden="true" size={21} weight="duotone" />
        </span>
        <div className="min-w-0">
          <h2
            id={block.id ? `${block.id}-title` : undefined}
            className="font-display text-2xl font-semibold leading-[1.15] text-text-primary sm:text-[1.7rem]"
          >
            {block.title}
          </h2>
          {block.description ? (
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              {block.description}
            </p>
          ) : null}
        </div>
      </div>
      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {block.items.map((item) => (
          <li
            key={item}
            className="list-inside list-disc rounded-[var(--radius-sm)] border border-brand-blue/12 bg-surface/80 p-4 text-sm leading-6 text-text-secondary marker:text-brand-blue"
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
