import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

import type { PreparationChecklistBlock } from "@/content/site";

export function PreparationChecklist({
  block,
}: {
  block: PreparationChecklistBlock;
}) {
  return (
    <section
      id={block.id}
      aria-labelledby={block.id ? `${block.id}-title` : undefined}
      className="article-block scroll-mt-28 rounded-[var(--radius-lg)] border border-border bg-surface-warm p-6 sm:p-8"
    >
      <h2
        id={block.id ? `${block.id}-title` : undefined}
        className="font-display text-2xl font-semibold leading-[1.15] text-text-primary sm:text-[1.8rem]"
      >
        {block.title}
      </h2>
      {block.description ? (
        <p className="mt-3 text-sm leading-7 text-text-secondary">
          {block.description}
        </p>
      ) : null}
      <ul className="mt-6 grid gap-3">
        {block.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 border-b border-border pb-3 text-base leading-7 text-text-secondary last:border-b-0 last:pb-0"
          >
            <CheckCircle
              aria-hidden="true"
              size={21}
              weight="duotone"
              className="mt-0.5 shrink-0 text-brand-blue-dark"
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

