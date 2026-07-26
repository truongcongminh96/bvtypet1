import { ArticleCard } from "@/components/guides/article-card";
import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import type { Article } from "@/content/site";

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="section-space border-t border-border bg-surface-soft">
      <div className="shell">
        <MotionSection className="max-w-2xl">
          <h2 className="section-title text-text-primary">
            Tiếp tục quan sát cùng bé
          </h2>
          <p className="mt-4 text-base leading-7 text-text-secondary">
            Những hướng dẫn liên quan giúp bạn chuẩn bị và theo dõi liền mạch
            hơn.
          </p>
        </MotionSection>
        <MotionGroup
          className="mt-9 grid gap-4 md:grid-cols-2"
          delay={0.05}
          amount={0.1}
        >
          {articles.slice(0, 2).map((article) => (
            <MotionItem key={article.slug}>
              <ArticleCard article={article} variant="compact" />
            </MotionItem>
          ))}
        </MotionGroup>
      </div>
    </section>
  );
}

