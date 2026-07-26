import type { Metadata } from "next";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";

import { ArticleDetailHero } from "@/components/guides/article-detail-hero";
import { ArticleRenderer } from "@/components/guides/article-renderer";
import { ArticleTableOfContents } from "@/components/guides/article-table-of-contents";
import { CompactCareCta } from "@/components/guides/compact-care-cta";
import { ReadingProgress } from "@/components/guides/reading-progress";
import { RelatedArticles } from "@/components/guides/related-articles";
import { HomeMotionProvider } from "@/components/motion/home-motion-provider";
import { ButtonLink } from "@/components/ui/button";
import {
  getArticleTableOfContents,
  resolveRelatedArticles,
} from "@/lib/guides";
import { siteConfig } from "@/lib/site-config";
import { getArticles } from "@/sanity/content";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/cam-nang/${article.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "vi_VN",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      images: [
        {
          url: article.coverImage.src,
          alt: article.coverImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage.src],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const tableOfContents = getArticleTableOfContents(
    article.contentBlocks,
    article.readingTime,
  );
  const relatedArticles = resolveRelatedArticles(article, articles);
  const articleUrl = `${siteConfig.url}/cam-nang/${article.slug}`;
  const imageUrl = article.coverImage.src.startsWith("http")
    ? article.coverImage.src
    : `${siteConfig.url}${article.coverImage.src}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    image: imageUrl,
    mainEntityOfPage: articleUrl,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(article.reviewedBy
      ? {
          reviewedBy: {
            "@type": "Person",
            name: article.reviewedBy.name,
            ...(article.reviewedBy.position
              ? { jobTitle: article.reviewedBy.position }
              : {}),
          },
        }
      : {}),
  };

  return (
    <HomeMotionProvider>
      <article>
        <ReadingProgress />
        <ArticleDetailHero article={article} />

        <div className="shell grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_16rem] lg:py-20 xl:grid-cols-[11rem_minmax(0,43rem)_15rem] xl:gap-8">
          {tableOfContents.length > 0 ? (
            <aside className="hidden xl:block xl:col-start-1 xl:self-start">
              <div className="sticky top-28">
                <ArticleTableOfContents items={tableOfContents} />
              </div>
            </aside>
          ) : null}

          <div className="min-w-0 lg:col-start-1 xl:col-start-2">
            {tableOfContents.length > 0 ? (
              <div className="mb-8 xl:hidden">
                <ArticleTableOfContents
                  items={tableOfContents}
                  compact
                />
              </div>
            ) : null}

            <CompactCareCta className="mb-8 lg:hidden" />

            <ArticleRenderer blocks={article.contentBlocks} />

            <div className="mt-12 border-t border-border pt-8">
              <ButtonLink href="/cam-nang" variant="ghost">
                <ArrowLeft aria-hidden="true" size={18} weight="bold" />
                Về cẩm nang
              </ButtonLink>
            </div>
          </div>

          <aside className="hidden lg:col-start-2 lg:block lg:self-start xl:col-start-3">
            <div className="sticky top-28">
              <CompactCareCta />
            </div>
          </aside>
        </div>

        <RelatedArticles articles={relatedArticles} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
          }}
        />
      </article>
    </HomeMotionProvider>
  );
}
