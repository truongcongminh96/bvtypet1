import { ArrowUpRight, Star } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import type { CustomerReview } from "@/content/experience";

export function CustomerReviews({ items }: { items: CustomerReview[] }) {
  if (items.length === 0) return null;

  const featured = items[0];
  const supporting = items.slice(1, 3);

  return (
    <section className="relative overflow-hidden bg-surface-warm py-24 sm:py-28 lg:py-36">
      <span
        aria-hidden="true"
        className="absolute left-[8%] top-24 font-display text-[16rem] leading-none text-brand-blue/5"
      >
        “
      </span>
      <div className="shell relative z-10">
        <MotionSection className="max-w-xl" direction="left">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand-blue-dark">
            Ghi nhận từ khách hàng
          </p>
          <h2 className="section-title mt-5 text-text-primary">
            Điều còn lại sau một buổi chăm bé.
          </h2>
        </MotionSection>

        <MotionSection className="mx-auto mt-14 max-w-5xl" direction="none" scaleFrom={0.992}>
          <article>
            <div className="flex gap-1 text-[#c78612]" aria-label={`${featured.rating} trên 5 sao`}>
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  aria-hidden="true"
                  size={18}
                  weight={index < Math.round(featured.rating) ? "fill" : "regular"}
                />
              ))}
            </div>
            <blockquote className="mt-6 font-display text-[clamp(2.35rem,5vw,4.7rem)] font-medium leading-[1.08] tracking-[-0.015em] text-text-primary">
              “{featured.quote}”
            </blockquote>
            <footer className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-text-primary/12 pt-5 text-sm">
              <strong className="text-text-primary">{featured.author}</strong>
              <Link
                href={featured.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-brand-blue-dark"
              >
                Nguồn Google Maps
                <ArrowUpRight aria-hidden="true" size={14} />
              </Link>
            </footer>
          </article>
        </MotionSection>

        {supporting.length > 0 ? (
          <MotionGroup className="mt-16 grid gap-10 md:grid-cols-2 md:gap-16 lg:ml-auto lg:max-w-4xl" stagger={0.12}>
            {supporting.map((review, index) => (
              <MotionItem
                key={review.id}
                className={index === 1 ? "md:translate-y-10" : undefined}
                direction={index === 0 ? "left" : "right"}
                mobileDirection="left"
              >
                <article className="border-l border-brand-blue/25 pl-5">
                  <blockquote className="text-base leading-8 text-text-secondary">
                    “{review.quote}”
                  </blockquote>
                  <footer className="mt-5 text-xs font-semibold text-text-primary">
                    {review.author}
                  </footer>
                </article>
              </MotionItem>
            ))}
          </MotionGroup>
        ) : null}
      </div>
    </section>
  );
}
