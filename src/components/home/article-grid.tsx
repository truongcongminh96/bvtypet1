import { ArticleCard } from "@/components/guides/article-card";
import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { articles as fallbackArticles, type Article } from "@/content/site";

export function ArticleGrid({
  items = fallbackArticles,
}: {
  items?: Article[];
}) {
  const featured = items.find((article) => article.featured) ?? items[0];

  if (!featured) {
    return null;
  }

  const remaining = items
    .filter((article) => article.slug !== featured.slug)
    .slice(0, 2);

  return (
    <MotionGroup className="mt-12 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <MotionItem>
        <ArticleCard article={featured} variant="featured" />
      </MotionItem>
      {remaining.length > 0 ? (
        <MotionGroup className="grid content-start gap-4">
          {remaining.map((article) => (
            <MotionItem key={article.slug}>
              <ArticleCard article={article} variant="compact" />
            </MotionItem>
          ))}
        </MotionGroup>
      ) : null}
    </MotionGroup>
  );
}
