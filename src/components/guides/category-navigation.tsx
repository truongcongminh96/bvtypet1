import Link from "next/link";

import { guideCategories } from "@/content/guide-presentation";
import type { ArticleCategorySlug } from "@/content/site";
import { cn } from "@/lib/cn";

export function CategoryNavigation({
  activeCategory,
  className,
}: {
  activeCategory: "all" | ArticleCategorySlug;
  className?: string;
}) {
  return (
    <nav
      aria-label="Chuyên mục cẩm nang"
      className={cn("min-w-0 max-w-full overflow-hidden", className)}
    >
      <div className="-mx-1 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex w-max min-w-full gap-1 rounded-[var(--radius-md)] border border-border bg-surface/85 p-1 shadow-[0_8px_22px_rgba(16,46,58,0.05)]">
          {guideCategories.map((category) => {
            const active = activeCategory === category.slug;

            return (
              <li key={category.slug}>
                <Link
                  href={
                    category.slug === "all"
                      ? "/cam-nang"
                      : `/cam-nang?category=${category.slug}`
                  }
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center whitespace-nowrap rounded-[calc(var(--radius-md)-4px)] px-4 text-sm font-semibold transition-[background-color,color,box-shadow,transform] duration-200 active:translate-y-px focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-dark",
                    active
                      ? "bg-brand-blue-dark text-white shadow-[0_7px_18px_rgba(13,95,168,0.2)]"
                      : "text-text-secondary hover:bg-brand-blue-soft hover:text-brand-blue-dark",
                  )}
                >
                  {category.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
