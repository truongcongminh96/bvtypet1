import type { ArticleTocItem } from "@/lib/guides";

export function ArticleTableOfContents({
  items,
  compact = false,
}: {
  items: ArticleTocItem[];
  compact?: boolean;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Mục lục bài viết"
      className={
        compact
          ? "rounded-[var(--radius-md)] border border-border bg-surface-soft p-5"
          : "border-l border-border pl-5"
      }
    >
      <h2 className="text-sm font-semibold text-text-primary">Trong bài viết</h2>
      <ol className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="inline-flex min-h-8 items-center text-sm leading-6 text-text-secondary transition-colors hover:text-brand-blue-dark focus-visible:text-brand-blue-dark"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

