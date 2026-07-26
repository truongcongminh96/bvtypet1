import type { PullQuoteBlock } from "@/content/site";

export function PullQuote({ block }: { block: PullQuoteBlock }) {
  return (
    <figure className="article-block border-y border-border py-7 sm:py-9">
      <blockquote className="font-display text-3xl font-medium leading-[1.2] tracking-[-0.012em] text-text-primary sm:text-4xl">
        “{block.quote}”
      </blockquote>
      {block.attribution ? (
        <figcaption className="mt-4 text-sm font-semibold text-brand-blue-dark">
          {block.attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}

