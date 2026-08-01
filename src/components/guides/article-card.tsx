import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { ArticleMeta } from "@/components/guides/article-meta";
import { CareActionRail } from "@/components/ui/button";
import { guideCategoryLabels } from "@/content/guide-presentation";
import type { Article } from "@/content/site";
import { cn } from "@/lib/cn";

export type ArticleCardVariant = "featured" | "standard" | "compact";

export function ArticleCard({
  article,
  variant = "standard",
  orientation = "vertical",
  className,
}: {
  article: Article;
  variant?: ArticleCardVariant;
  orientation?: "vertical" | "horizontal";
  className?: string;
}) {
  const image = article.thumbnailImage ?? article.coverImage;
  const categoryLabel = guideCategoryLabels[article.category];

  if (variant === "compact") {
    return (
      <article className={className}>
        <Link
          href={`/cam-nang/${article.slug}`}
          className="motion-feedback group grid grid-cols-[6.5rem_1fr] gap-4 rounded-[var(--radius-md)] border border-border bg-surface p-3 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-brand-blue/35 hover:shadow-[0_12px_28px_rgba(16,46,58,0.07)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-blue-dark sm:grid-cols-[7.5rem_1fr]"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-sm)] bg-surface-soft">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="8rem"
              style={{ objectPosition: image.focalPoint }}
              className="motion-feedback object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="min-w-0 py-1">
            <p className="text-xs font-semibold text-brand-blue-dark">
              {categoryLabel}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold leading-[1.14] tracking-[-0.012em] text-text-primary">
              {article.title}
            </h3>
            <div className="mt-3 text-xs text-text-muted">
              {article.readingTime} phút đọc
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <article className={className}>
        <Link
          href={`/cam-nang/${article.slug}`}
          className="surface-card motion-feedback group grid h-full overflow-hidden rounded-[var(--radius-lg)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand-blue/35 hover:shadow-[0_22px_52px_rgba(16,46,58,0.1)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-blue-dark lg:grid-cols-[1.08fr_0.92fr]"
        >
          <figure className="flex min-h-0 flex-col bg-surface-soft">
            <div className="relative aspect-[16/10] min-h-0 flex-1 overflow-hidden lg:aspect-auto lg:min-h-[29rem]">
              <Image
                src={article.coverImage.src}
                alt={article.coverImage.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 58vw"
                style={{ objectPosition: article.coverImage.focalPoint }}
                className="motion-feedback object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </figure>
          <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:p-10">
            <div className="flex items-start justify-between gap-5">
              <p className="text-sm font-semibold text-brand-blue-dark">
                {categoryLabel}
              </p>
              <ArrowUpRight
                aria-hidden="true"
                size={25}
                className="motion-feedback shrink-0 text-brand-blue-dark transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </div>
            <h3 className="mt-5 font-display text-[clamp(2.2rem,4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.018em] text-text-primary">
              {article.title}
            </h3>
            <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary">
              {article.excerpt}
            </p>
            <ArticleMeta article={article} className="mt-6" />
            <div className="mt-auto pt-8">
              <CareActionRail>Đọc hướng dẫn</CareActionRail>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className={className}>
      <Link
        href={`/cam-nang/${article.slug}`}
        className={cn(
          "surface-card motion-feedback group grid h-full overflow-hidden rounded-[var(--radius-md)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand-blue/35 hover:shadow-[0_18px_42px_rgba(16,46,58,0.09)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-blue-dark",
          orientation === "horizontal" &&
            "lg:grid-cols-[0.92fr_1.08fr]",
        )}
      >
        <figure className="flex flex-col bg-surface-soft">
          <div
            className={cn(
              "relative aspect-[16/10] overflow-hidden",
              orientation === "horizontal" &&
                "lg:aspect-auto lg:min-h-[22rem]",
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              style={{ objectPosition: image.focalPoint }}
              className="motion-feedback object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </figure>
        <div className="flex min-w-0 flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs font-semibold text-brand-blue-dark">
              {categoryLabel}
            </p>
            <ArrowUpRight
              aria-hidden="true"
              size={21}
              className="motion-feedback shrink-0 text-brand-blue-dark transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-[1.12] tracking-[-0.012em] text-text-primary sm:text-[1.75rem]">
            {article.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-text-secondary">
            {article.excerpt}
          </p>
          <ArticleMeta article={article} compact className="mt-5" />
          <div className="mt-auto pt-6">
            <CareActionRail>Đọc bài viết</CareActionRail>
          </div>
        </div>
      </Link>
    </article>
  );
}
