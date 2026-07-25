import type { Metadata } from "next";
import { ArrowLeft, CalendarDots } from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button";
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

  return (
    <article>
      <header className="border-b border-line bg-ice">
        <div className="shell max-w-4xl py-16 sm:py-24">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-medical-blue">
            {article.category}
          </p>
          <h1 className="display-title mt-5 text-deep-navy">{article.title}</h1>
          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-muted-ink">
            <time dateTime={article.publishedAt}>
              {new Intl.DateTimeFormat("vi-VN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date(article.publishedAt))}
            </time>
            <span aria-hidden="true">•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </header>

      <div className="shell grid max-w-5xl gap-12 py-16 lg:grid-cols-[1fr_18rem] lg:py-24">
        <div className="prose-pet-one">
          <p className="!mt-0 text-xl !leading-9 text-deep-navy">
            {article.intro}
          </p>
          {article.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          <div className="mt-12 rounded-3xl border border-line bg-ice p-6">
            <p className="!m-0 text-sm !leading-7">
              Nếu thú cưng có biểu hiện nặng lên nhanh, đau rõ, khó thở hoặc mất
              phản ứng, hãy liên hệ cơ sở thú y phù hợp ngay. Nội dung này không
              thay thế chẩn đoán trực tiếp.
            </p>
          </div>
          <ButtonLink href="/cam-nang" variant="ghost" className="mt-10">
            <ArrowLeft size={18} weight="bold" />
            Về cẩm nang
          </ButtonLink>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl bg-medical-blue p-6 text-white">
            <CalendarDots size={30} weight="duotone" />
            <h2 className="mt-5 font-display text-xl font-extrabold">
              Cần bác sĩ đánh giá trực tiếp?
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/76">
              Gửi trước những thay đổi bạn quan sát được để chuẩn bị buổi trao
              đổi rõ ràng hơn.
            </p>
            <ButtonLink
              href="/lien-he#dat-lich"
              variant="dark"
              className="mt-6 w-full bg-white text-deep-navy hover:bg-white/90"
            >
              Đặt lịch khám
            </ButtonLink>
          </div>
        </aside>
      </div>
    </article>
  );
}
