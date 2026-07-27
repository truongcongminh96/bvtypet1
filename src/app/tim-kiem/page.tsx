import type { Metadata } from "next";
import { ArrowUpRight, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { ArticleCard } from "@/components/guides/article-card";
import { PageHero } from "@/components/site/page-hero";
import { buttonStyles } from "@/components/ui/button";
import { searchSite } from "@/lib/site-search";
import { getArticles, getServices } from "@/sanity/content";

export const metadata: Metadata = {
  title: "Tìm kiếm",
  description: "Tìm dịch vụ và cẩm nang chăm thú cưng tại Pet One.",
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const [{ q = "" }, services, articles] = await Promise.all([
    searchParams,
    getServices(),
    getArticles(),
  ]);
  const results = searchSite(q, services, articles);
  const hasQuery = q.trim().length > 0;
  const hasResults = results.services.length > 0 || results.articles.length > 0;

  return (
    <>
      <PageHero
        current="Tìm kiếm"
        title="Tìm thông tin tại Pet One"
        description="Tìm trong dịch vụ và cẩm nang bằng từ khóa bạn đang quan tâm."
      />
      <section className="section-space">
        <div className="shell">
          <form action="/tim-kiem" className="mx-auto flex max-w-3xl gap-2">
            <label htmlFor="search-page-input" className="sr-only">Từ khóa tìm kiếm</label>
            <input
              id="search-page-input"
              type="search"
              name="q"
              defaultValue={q}
              required
              placeholder="Tiêm phòng, da lông, chuẩn bị đi khám..."
              className="min-h-12 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-border bg-surface px-4 outline-none focus:border-brand-blue"
            />
            <button className={buttonStyles({ className: "min-h-12" })}>
              <MagnifyingGlass aria-hidden="true" size={18} />
              Tìm
            </button>
          </form>

          {!hasQuery ? (
            <div className="mx-auto mt-12 max-w-2xl rounded-[var(--radius-lg)] border border-dashed border-border-strong bg-surface-soft p-8 text-center">
              <p className="text-sm leading-7 text-text-secondary">
                Nhập một chủ đề hoặc dịch vụ để bắt đầu tìm.
              </p>
            </div>
          ) : !hasResults ? (
            <div className="mx-auto mt-12 max-w-2xl rounded-[var(--radius-lg)] border border-border bg-surface p-8 text-center">
              <h2 className="font-display text-3xl font-semibold text-text-primary">
                Chưa tìm thấy kết quả
              </h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary">
                Thử một từ khóa ngắn hơn hoặc xem toàn bộ dịch vụ và cẩm nang.
              </p>
            </div>
          ) : (
            <div className="mt-14 grid gap-16">
              {results.services.length > 0 ? (
                <section>
                  <h2 className="section-title text-text-primary">Dịch vụ</h2>
                  <div className="mt-7 grid gap-4 md:grid-cols-2">
                    {results.services.map((service) => (
                      <Link key={service.slug} href={`/dich-vu/${service.slug}`} className="rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
                        <h3 className="text-lg font-semibold text-text-primary">{service.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-text-secondary">{service.summary}</p>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-dark">
                          Xem dịch vụ <ArrowUpRight aria-hidden="true" size={16} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
              {results.articles.length > 0 ? (
                <section>
                  <h2 className="section-title text-text-primary">Cẩm nang</h2>
                  <div className="mt-7 grid gap-4 md:grid-cols-2">
                    {results.articles.map((article) => (
                      <ArticleCard key={article.slug} article={article} variant="standard" />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
