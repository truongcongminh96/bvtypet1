import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { ArticleMeta } from "@/components/guides/article-meta";
import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { articles as fallbackArticles, type Article } from "@/content/site";
import { guideCategoryLabels } from "@/content/guide-presentation";

export function ArticleGrid({
  items = fallbackArticles,
}: {
  items?: Article[];
}) {
  const featured = items.find((article) => article.featured) ?? items[0];

  if (!featured) return null;

  const remaining = items
    .filter((article) => article.slug !== featured.slug)
    .slice(0, 3);

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

        <MotionGroup className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-6" amount={0.1} stagger={0.12}>
          <MotionItem className="lg:col-span-8" direction="left">
            <Link
              href={`/cam-nang/${featured.slug}`}
              className="home-guide-feature group block focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-dark"
            >
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4rem_1.5rem_1.5rem_1.5rem] bg-surface-soft sm:aspect-[16/10]">
                  <Image
                    src={featured.coverImage.src}
                    alt={featured.coverImage.alt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 64vw"
                    style={{ objectPosition: featured.coverImage.focalPoint }}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                {featured.coverImage.placeholder ? (
                  <figcaption className="mt-2 text-[0.68rem] leading-5 text-text-muted">
                    Ảnh minh hoạ, không đại diện cho cơ sở hoặc nhân sự thực tế của Pet One.
                  </figcaption>
                ) : null}
              </figure>
              <div className="home-guide-feature__copy relative z-10 -mt-8 ml-4 max-w-[44rem] px-5 py-5 sm:-mt-14 sm:ml-10 sm:px-7 sm:py-6 lg:-mr-24 lg:ml-16">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-blue-dark">
                  {guideCategoryLabels[featured.category]}
                </p>
                <h3 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.7rem)] font-semibold leading-[1.01] tracking-[-0.018em] text-text-primary">
                  {featured.title}
                </h3>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
                  {featured.excerpt}
                </p>
                <ArticleMeta article={featured} className="mt-5" />
              </div>
            </Link>
          </MotionItem>

          {remaining.length > 0 ? (
            <MotionGroup className="home-guide-rail content-start lg:col-span-4 lg:mt-28 lg:pl-8" stagger={0.09}>
              <p className="border-b border-border pb-4 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-text-muted">
                Tiếp tục trong cẩm nang
              </p>
              {remaining.map((article) => {
                const image = article.thumbnailImage ?? article.coverImage;

                return (
                  <MotionItem
                    key={article.slug}
                    direction="right"
                    mobileDirection="left"
                  >
                    <Link
                      href={`/cam-nang/${article.slug}`}
                      className="guide-teaser-card group focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-blue-dark"
                    >
                      <figure className="guide-teaser-card__media relative overflow-hidden bg-surface-soft">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 639px) 7rem, 9rem"
                          style={{ objectPosition: image.focalPoint }}
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </figure>
                      <div className="guide-teaser-card__content min-w-0">
                        <p className="guide-teaser-card__category">
                          {guideCategoryLabels[article.category]}
                        </p>
                        <h3 className="guide-teaser-card__title">
                          {article.title}
                        </h3>
                        <p className="guide-teaser-card__meta">
                          {article.readingTime} phút đọc
                        </p>
                        <span className="guide-teaser-card__cta">
                          Đọc bài
                          <ArrowUpRight
                            aria-hidden="true"
                            size={14}
                            weight="bold"
                          />
                        </span>
                      </div>
                    </Link>
                  </MotionItem>
                );
              })}
            </MotionGroup>
          ) : null}
        </MotionGroup>
      </div>
    </section>
  );
}
