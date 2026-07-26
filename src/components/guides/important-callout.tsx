import { Info } from "@phosphor-icons/react/dist/ssr";

import type { ImportantCalloutBlock } from "@/content/site";

export function ImportantCallout({
  block,
}: {
  block: ImportantCalloutBlock;
}) {
  return (
    <aside
      id={block.id}
      className="article-block scroll-mt-28 border-l-2 border-brand-blue bg-surface-soft px-5 py-5 sm:px-6"
    >
      <div className="flex items-start gap-3">
        <Info
          aria-hidden="true"
          size={22}
          weight="duotone"
          className="mt-0.5 shrink-0 text-brand-blue-dark"
        />
        <div>
          {block.title ? (
            <h2 className="text-base font-semibold leading-6 text-text-primary">
              {block.title}
            </h2>
          ) : null}
          <p className="mt-1 text-sm leading-7 text-text-secondary">
            {block.body}
          </p>
        </div>
      </div>
    </aside>
  );
}

