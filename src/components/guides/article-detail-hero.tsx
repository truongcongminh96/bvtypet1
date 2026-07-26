import { CaretRight, House } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { ArticleMeta } from "@/components/guides/article-meta";
import { ArticleDisclaimer } from "@/components/guides/article-disclaimer";
import { ArticleLead } from "@/components/guides/article-lead";
import { ImageReveal } from "@/components/motion/image-reveal";
import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { guideCategoryLabels } from "@/content/guide-presentation";
import type { Article } from "@/content/site";

export function ArticleDetailHero({ article }: { article: Article }) {
  return (
    <header className="overflow-hidden border-b border-border bg-surface-soft">
      <div className="shell py-10 sm:py-14 lg:py-16">
        <MotionGroup amount={0.1}>
          <MotionItem>
            <nav
              aria-label="Breadcrumb"
              className="mb-7 flex flex-wrap items-center gap-2 text-xs font-semibold text-text-secondary"
            >
              <Link
                href="/"
                className="inline-flex min-h-10 items-center gap-1.5 transition-colors hover:text-brand-blue-dark"
              >
                <House aria-hidden="true" size={15} weight="fill" />
                Trang chủ
              </Link>
              <CaretRight aria-hidden="true" size={13} />
              <Link
                href="/cam-nang"
                className="inline-flex min-h-10 items-center transition-colors hover:text-brand-blue-dark"
              >
                Cẩm nang
              </Link>
              <CaretRight aria-hidden="true" size={13} />
              <span
                aria-current="page"
                className="max-w-[16rem] truncate text-brand-blue-dark sm:max-w-[28rem]"
              >
                {article.title}
              </span>
            </nav>
          </MotionItem>
        </MotionGroup>

        <div className="grid items-center gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <MotionGroup className="max-w-[42rem]" amount={0.1}>
            <MotionItem>
              <p className="text-sm font-semibold text-brand-blue-dark">
                {guideCategoryLabels[article.category]}
              </p>
            </MotionItem>
            <MotionItem>
              <h1 className="mt-4 font-display text-[clamp(2.75rem,5.1vw,4.9rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-text-primary text-balance">
                {article.title}
              </h1>
            </MotionItem>
            <MotionItem>
              <div className="mt-6">
                <ArticleLead>{article.lead}</ArticleLead>
              </div>
            </MotionItem>
            <MotionItem>
              <ArticleMeta article={article} className="mt-6" />
            </MotionItem>
            {article.reviewedBy ? (
              <MotionItem>
                <p className="mt-3 text-xs leading-6 text-text-muted">
                  Đã được duyệt bởi {article.reviewedBy.name}
                  {article.reviewedBy.position
                    ? `, ${article.reviewedBy.position}`
                    : ""}
                </p>
              </MotionItem>
            ) : null}
            <MotionItem>
              <div className="mt-6">
                <ArticleDisclaimer>{article.disclaimer}</ArticleDisclaimer>
              </div>
            </MotionItem>
          </MotionGroup>

          <figure>
            <ImageReveal className="relative aspect-[16/11] overflow-hidden rounded-[18px_36px_36px_36px] border border-border bg-surface shadow-[0_24px_60px_rgba(16,46,58,0.1)]">
              <Image
                src={article.coverImage.src}
                alt={article.coverImage.alt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 56vw"
                style={{ objectPosition: article.coverImage.focalPoint }}
                className="object-cover"
              />
            </ImageReveal>
            {article.coverImage.placeholder ? (
              <figcaption className="mt-3 text-center text-xs leading-5 text-text-muted">
                Ảnh minh hoạ, không đại diện cho cơ sở hoặc nhân sự thực tế của
                PetOne.
              </figcaption>
            ) : null}
          </figure>
        </div>
      </div>
    </header>
  );
}
