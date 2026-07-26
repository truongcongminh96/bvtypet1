import type { Article } from "@/content/site";
import {
  formatArticleDate,
  formatCompactArticleDate,
  formatReadingTime,
} from "@/lib/guides";

export function ArticleMeta({
  article,
  compact = false,
  className,
}: {
  article: Article;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted ${className ?? ""}`}
    >
      <time dateTime={article.publishedAt}>
        {compact
          ? formatCompactArticleDate(article.publishedAt)
          : formatArticleDate(article.publishedAt)}
      </time>
      <span aria-hidden="true" className="h-3 w-px bg-border-strong" />
      <span>{formatReadingTime(article.readingTime)}</span>
    </div>
  );
}

