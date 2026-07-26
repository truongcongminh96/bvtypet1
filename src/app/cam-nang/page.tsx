import type { Metadata } from "next";

import { ArticleCard } from "@/components/guides/article-card";
import { GuideListingHero } from "@/components/guides/guide-listing-hero";
import { GuideStageSection } from "@/components/guides/guide-stage-section";
import { HomeMotionProvider } from "@/components/motion/home-motion-provider";
import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import {
  guideCategoryLabels,
  guideJourneyStages,
} from "@/content/guide-presentation";
import { getArticles } from "@/sanity/content";
import { isArticleCategory } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Cẩm nang chăm thú cưng",
  description:
    "Kiến thức ngắn gọn giúp người nuôi nhận ra thay đổi, chuẩn bị khi cần khám và tiếp tục theo dõi thú cưng tại nhà.",
  openGraph: {
    title: "Cẩm nang chăm thú cưng | Pet One",
    description:
      "Một thư viện quan sát thực tế giúp người nuôi chăm sóc thú cưng chủ động hơn.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cẩm nang chăm thú cưng | Pet One",
    description:
      "Một thư viện quan sát thực tế giúp người nuôi chăm sóc thú cưng chủ động hơn.",
  },
};

type ArticlesPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const [{ category }, articles] = await Promise.all([
    searchParams,
    getArticles(),
  ]);
  const activeCategory = isArticleCategory(category) ? category : "all";
  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  return (
    <HomeMotionProvider>
      <GuideListingHero activeCategory={activeCategory} />

      {activeCategory === "all" ? (
        guideJourneyStages.map((stage, index) => (
          <GuideStageSection
            key={stage.id}
            stage={stage}
            articles={filteredArticles.filter(
              (article) => article.journeyStage === stage.id,
            )}
            featured={stage.id === "notice"}
            tone={index === 1 ? "soft" : index === 2 ? "warm" : "white"}
          />
        ))
      ) : (
        <section className="section-space">
          <div className="shell">
            <MotionSection className="max-w-3xl">
              <p className="text-sm font-semibold text-brand-blue-dark">
                Chuyên mục
              </p>
              <h2 className="section-title mt-3 text-text-primary">
                {guideCategoryLabels[activeCategory]}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
                Các hướng dẫn phù hợp với chủ đề bạn đang muốn tìm hiểu.
              </p>
            </MotionSection>

            {filteredArticles.length > 0 ? (
              <MotionGroup
                className="mt-10 grid gap-5 md:grid-cols-2"
                delay={0.05}
                amount={0.12}
              >
                {filteredArticles.map((article) => (
                  <MotionItem key={article.slug}>
                    <ArticleCard
                      article={article}
                      variant={article.featured ? "featured" : "standard"}
                      className={article.featured ? "md:col-span-2" : undefined}
                    />
                  </MotionItem>
                ))}
              </MotionGroup>
            ) : (
              <MotionSection className="mt-10 max-w-2xl rounded-[var(--radius-lg)] border border-border bg-surface p-7 shadow-[var(--shadow-card)]">
                <h3 className="font-display text-2xl font-semibold text-text-primary">
                  Chuyên mục đang được cập nhật
                </h3>
                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  PetOne chưa có bài viết đã xác minh trong chuyên mục này. Bạn
                  có thể xem các hướng dẫn hiện có trong toàn bộ cẩm nang.
                </p>
                <CareActionLink
                  href="/cam-nang"
                  variant="text"
                  className="mt-5"
                >
                  Xem tất cả bài viết
                </CareActionLink>
              </MotionSection>
            )}
          </div>
        </section>
      )}
    </HomeMotionProvider>
  );
}
