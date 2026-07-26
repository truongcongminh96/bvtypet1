import { ArticleCard } from "@/components/guides/article-card";
import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import type { guideJourneyStages } from "@/content/guide-presentation";
import type { Article } from "@/content/site";

type GuideStage = (typeof guideJourneyStages)[number];

export function GuideStageSection({
  stage,
  articles,
  featured = false,
  tone = "white",
}: {
  stage: GuideStage;
  articles: Article[];
  featured?: boolean;
  tone?: "white" | "soft" | "warm";
}) {
  if (articles.length === 0) {
    return null;
  }

  const [first, ...remaining] = articles;
  const toneClass =
    tone === "soft"
      ? "bg-surface-soft"
      : tone === "warm"
        ? "bg-surface-warm"
        : "bg-background";

  return (
    <section id={stage.id} className={`section-space ${toneClass}`}>
      <div className="shell">
        <MotionSection className="max-w-3xl">
          <h2 className="section-title text-text-primary">{stage.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
            {stage.description}
          </p>
          <ul
            className="mt-6 flex flex-wrap gap-2"
            aria-label={`Chủ đề trong ${stage.title}`}
          >
            {stage.topics.map((topic) => (
              <li
                key={topic}
                className="rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-2 text-xs font-medium text-text-secondary"
              >
                {topic}
              </li>
            ))}
          </ul>
        </MotionSection>

        <MotionGroup className="mt-10" delay={0.05} amount={0.12}>
          <MotionItem>
            <ArticleCard
              article={first}
              variant={featured ? "featured" : "standard"}
              orientation={featured ? "vertical" : "horizontal"}
            />
          </MotionItem>
          {remaining.length > 0 ? (
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {remaining.map((article) => (
                <MotionItem key={article.slug}>
                  <ArticleCard article={article} />
                </MotionItem>
              ))}
            </div>
          ) : null}
        </MotionGroup>
      </div>
    </section>
  );
}
