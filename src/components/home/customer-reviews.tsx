import { Star } from "@phosphor-icons/react/dist/ssr";

import { ReviewStoriesCarousel } from "@/components/home/review-stories-carousel";
import { MotionSection } from "@/components/motion/reveal";
import type { CustomerReview } from "@/content/experience";

type CustomerReviewsProps = {
  items: CustomerReview[];
  rating?: number;
  reviewCount?: number;
};

function formatRating(rating: number) {
  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(rating);
}

export function CustomerReviews({
  items,
  rating = 4.8,
  reviewCount = 295,
}: CustomerReviewsProps) {
  if (items.length === 0) return null;

  return (
    <section className="relative isolate overflow-hidden bg-surface-warm pt-24 pb-28 sm:pt-28 sm:pb-32">
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-14 w-full text-background sm:h-20"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0 0h1440v48C1166 86 906 8 647 44 379 81 191 79 0 101V0Z"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-14 w-full rotate-180 text-background sm:h-20"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0 0h1440v48C1166 86 906 8 647 44 379 81 191 79 0 101V0Z"
        />
      </svg>
      <span
        aria-hidden="true"
        className="absolute top-1/3 left-[8%] size-72 rounded-full bg-white/35 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="absolute right-[6%] bottom-1/4 size-80 rounded-full bg-brand-blue-soft/45 blur-3xl"
      />

      <div className="shell relative z-10">
        <MotionSection
          className="mx-auto max-w-2xl text-center"
          direction="none"
          scaleFrom={0.985}
        >
          <div
            className="flex justify-center gap-1 text-[#b58a4d]"
            aria-label={`${rating} trên 5 sao`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                aria-hidden="true"
                size={17}
                weight={index < Math.round(rating) ? "fill" : "regular"}
              />
            ))}
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-brand-blue-dark">
            Trải nghiệm thực tế
          </p>
          <h2 className="section-title mt-3 text-text-primary">
            Khách hàng Pet One
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
            Những chia sẻ được dẫn trực tiếp từ Google Review sau khi khách
            hàng trải nghiệm dịch vụ tại Pet One.
          </p>
          <p className="mt-3 text-xs font-semibold text-text-primary/65">
            {formatRating(rating)}/5 · {reviewCount.toLocaleString("vi-VN")} đánh
            giá trên Google
          </p>
        </MotionSection>

        <MotionSection direction="none" delay={0.12} scaleFrom={0.992}>
          <ReviewStoriesCarousel items={items} />
        </MotionSection>
      </div>
    </section>
  );
}
