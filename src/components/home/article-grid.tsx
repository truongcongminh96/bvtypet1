import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { articles as fallbackArticles, type Article } from "@/content/site";

export function ArticleGrid({
  items = fallbackArticles,
}: {
  items?: Article[];
}) {
  const [featured, ...remaining] = items;

  if (!featured) {
    return null;
  }

  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
      <Link
        href={`/cam-nang/${featured.slug}`}
        className="group flex min-h-[28rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-deep-navy p-7 text-clinical-white shadow-[0_24px_60px_rgba(8,45,70,0.18)] sm:p-10"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold">
            {featured.category}
          </span>
          <ArrowUpRight
            size={25}
            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </div>
        <div className="max-w-xl">
          <p className="mb-4 text-sm text-clinical-white/65">
            {featured.readTime}
          </p>
          <h3 className="font-display text-3xl font-extrabold leading-tight tracking-[-0.045em] sm:text-5xl">
            {featured.title}
          </h3>
          <p className="mt-5 max-w-lg text-sm leading-7 text-clinical-white/72 sm:text-base">
            {featured.excerpt}
          </p>
        </div>
      </Link>

      <div className="grid gap-4">
        {remaining.map((article) => (
          <Link
            key={article.slug}
            href={`/cam-nang/${article.slug}`}
            className="surface-card group flex min-h-[13.5rem] flex-col justify-between rounded-3xl p-6"
          >
            <div className="flex items-center justify-between gap-4 text-xs font-bold text-medical-blue">
              <span>{article.category}</span>
              <ArrowUpRight
                size={20}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </div>
            <div>
              <h3 className="font-display text-xl font-extrabold leading-snug tracking-[-0.035em] text-deep-navy">
                {article.title}
              </h3>
              <p className="mt-3 text-xs text-muted-ink">{article.readTime}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
