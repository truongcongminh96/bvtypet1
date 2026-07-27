import { ArrowUpRight, Star } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { CustomerReview } from "@/content/experience";

export function CustomerReviews({ items }: { items: CustomerReview[] }) {
  if (items.length === 0) return null;

  return (
    <section className="section-space bg-surface-soft">
      <div className="shell">
        <MotionSection direction="left">
          <SectionHeading
            label="Đánh giá từ Google Maps"
            title="Điều khách hàng ghi nhận sau khi chăm bé"
            description="Các đánh giá dưới đây được Pet One chọn lọc và đối chiếu với nguồn công khai."
          />
        </MotionSection>
        <MotionGroup className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((review, index) => {
            const column = index % 3;
            const direction = column === 0 ? "left" : column === 1 ? "none" : "right";

            return (
              <MotionItem
                key={review.id}
                direction={direction}
                mobileDirection="left"
                scaleFrom={column === 1 ? 0.985 : 1}
              >
                <article className="flex h-full flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
                  <div className="flex gap-1 text-[#e7a51a]" aria-label={`${review.rating} trên 5 sao`}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} aria-hidden="true" size={17} weight={index < Math.round(review.rating) ? "fill" : "regular"} />
                    ))}
                  </div>
                  <blockquote className="mt-5 flex-1 text-sm leading-7 text-text-secondary">
                    “{review.quote}”
                  </blockquote>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="text-sm font-semibold text-text-primary">{review.author}</p>
                    <Link
                      href={review.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-blue-dark"
                    >
                      Xem nguồn Google Maps
                      <ArrowUpRight aria-hidden="true" size={14} />
                    </Link>
                  </div>
                </article>
              </MotionItem>
            );
          })}
        </MotionGroup>
      </div>
    </section>
  );
}
