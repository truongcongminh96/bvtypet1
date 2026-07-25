import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { getArticles } from "@/sanity/content";

export const metadata: Metadata = {
  title: "Cẩm nang chăm thú cưng",
  description:
    "Những hướng dẫn ngắn gọn giúp người nuôi quan sát và chuẩn bị tốt hơn khi chăm sóc thú cưng.",
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <>
      <PageHero
        current="Cẩm nang"
        title="Quan sát tốt hơn, chăm sóc chủ động hơn"
        description="Kiến thức ngắn gọn dành cho những tình huống hằng ngày. Nội dung chỉ mang tính tham khảo và không thay thế đánh giá trực tiếp."
      />
      <section className="section-space">
        <div className="shell grid gap-5 lg:grid-cols-12">
          {articles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/cam-nang/${article.slug}`}
              className={`surface-card group flex min-h-[22rem] flex-col justify-between rounded-[2rem] p-7 ${
                index === 0 ? "lg:col-span-7" : "lg:col-span-5"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-ice px-3 py-2 text-xs font-bold text-medical-blue">
                  {article.category}
                </span>
                <ArrowUpRight
                  size={23}
                  className="text-medical-blue transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold text-muted-ink">
                  {article.readTime}
                </p>
                <h2 className="font-display text-2xl font-extrabold leading-tight tracking-[-0.04em] text-deep-navy sm:text-3xl">
                  {article.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-ink">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
