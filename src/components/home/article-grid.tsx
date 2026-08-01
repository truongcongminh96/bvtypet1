import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { ArticleCard } from "@/components/guides/article-card";
import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { articles as fallbackArticles, type Article } from "@/content/site";

export function ArticleGrid({
  items = fallbackArticles,
}: {
  items?: Article[];
}) {
  const visibleArticles = items.slice(0, 6);

  if (visibleArticles.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-28 lg:py-36">
      <div className="shell">
        <MotionSection className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" direction="left">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand-blue-dark">
              Cẩm nang Pet One
            </p>
            <h2 className="section-title mt-5 max-w-[56rem] text-text-primary">
              Đọc để nhận ra sớm hơn.{" "}
              <span className="text-brand-blue-dark">Chuẩn bị bình tĩnh hơn.</span>
            </h2>
          </div>
          <Link
            href="/cam-nang"
            className="inline-flex items-center gap-2 self-start border-b border-brand-blue/25 pb-2 text-sm font-semibold text-brand-blue-dark lg:self-auto"
          >
            Xem thêm bài viết
            <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
        </MotionSection>

        <MotionGroup
          className="mt-12 grid gap-4 md:grid-cols-2 md:gap-x-5 md:gap-y-5"
          amount={0.1}
          stagger={0.08}
        >
          {visibleArticles.map((article, index) => (
            <MotionItem
              key={article.slug}
              direction={index % 2 === 0 ? "left" : "right"}
              mobileDirection="up"
            >
              <ArticleCard
                article={article}
                variant="compact"
                className="h-full"
              />
            </MotionItem>
          ))}
        </MotionGroup>
      </div>
    </section>
  );
}
