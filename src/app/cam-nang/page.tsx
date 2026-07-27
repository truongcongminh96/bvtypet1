import type { Metadata } from "next";
import Link from "next/link";

import { ArticleCard } from "@/components/guides/article-card";
import { GuideListingHero } from "@/components/guides/guide-listing-hero";
import { HomeMotionProvider } from "@/components/motion/home-motion-provider";
import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { guideCategories, guideCategoryLabels } from "@/content/guide-presentation";
import { isArticleCategory } from "@/lib/guides";
import { cn } from "@/lib/cn";
import { getArticles } from "@/sanity/content";

export const metadata: Metadata = {
  title: "Cẩm nang chăm thú cưng",
  description: "Kiến thức giúp người nuôi nhận ra thay đổi, chuẩn bị khi cần khám và theo dõi thú cưng tại nhà.",
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ category }, articles] = await Promise.all([searchParams, getArticles()]);
  const activeCategory = isArticleCategory(category) ? category : "all";
  const filtered =
    activeCategory === "all"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  return (
    <HomeMotionProvider>
      <GuideListingHero activeCategory={activeCategory} />
      <section className="section-space">
        <div className="shell">
          <nav className="flex gap-2 overflow-x-auto pb-3 lg:hidden" aria-label="Chủ đề cẩm nang">
            {guideCategories.map((item) => (
              <Link
                key={item.slug}
                href={item.slug === "all" ? "/cam-nang" : `/cam-nang?category=${item.slug}`}
                aria-current={activeCategory === item.slug ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text-secondary",
                  activeCategory === item.slug && "border-brand-blue bg-brand-blue-soft text-brand-blue-dark",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-7 grid items-start gap-10 lg:mt-0 lg:grid-cols-[17rem_1fr] lg:gap-12">
            <MotionSection className="sticky top-28 hidden rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow-card)] lg:block">
              <h2 className="font-display text-2xl font-semibold text-text-primary">Chủ đề</h2>
              <nav className="mt-5 grid gap-1" aria-label="Chủ đề cẩm nang">
                {guideCategories.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.slug === "all" ? "/cam-nang" : `/cam-nang?category=${item.slug}`}
                    aria-current={activeCategory === item.slug ? "page" : undefined}
                    className={cn(
                      "rounded-[var(--radius-sm)] px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-soft",
                      activeCategory === item.slug && "bg-brand-blue-soft font-semibold text-brand-blue-dark",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </MotionSection>

            <div>
              <MotionSection>
                <p className="text-sm font-semibold text-brand-blue-dark">Cẩm nang Pet One</p>
                <h2 className="section-title mt-3 text-text-primary">
                  {activeCategory === "all" ? "Bài viết mới nhất" : guideCategoryLabels[activeCategory]}
                </h2>
                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Nội dung thực tế để bạn dễ quan sát, chuẩn bị và tiếp tục chăm bé.
                </p>
              </MotionSection>

              {filtered.length > 0 ? (
                <MotionGroup className="mt-8 grid gap-5 md:grid-cols-2" amount={0.12}>
                  {filtered.map((article, index) => (
                    <MotionItem key={article.slug} className={index === 0 ? "md:col-span-2" : undefined}>
                      <ArticleCard article={article} variant={index === 0 ? "featured" : "standard"} />
                    </MotionItem>
                  ))}
                </MotionGroup>
              ) : (
                <MotionSection className="mt-8 rounded-[var(--radius-lg)] border border-dashed border-border-strong bg-surface-soft p-8">
                  <p className="text-sm leading-7 text-text-secondary">
                    Chuyên mục đang được cập nhật với nội dung đã xác minh.
                  </p>
                </MotionSection>
              )}
            </div>
          </div>
        </div>
      </section>
    </HomeMotionProvider>
  );
}
