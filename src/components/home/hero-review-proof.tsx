import { Star } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { heroReviewers } from "@/content/experience";

type HeroReviewProofProps = {
  rating: number;
  reviewCount: number;
  googleMapsUrl: string;
};

export function HeroReviewProof({
  rating,
  reviewCount,
  googleMapsUrl,
}: HeroReviewProofProps) {
  return (
    <div className="mt-7 flex max-w-[38rem] flex-wrap items-end gap-x-7 gap-y-4 sm:mt-8 sm:flex-nowrap">
      <Link
        href={googleMapsUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${rating} trên 5 sao từ ${reviewCount} đánh giá Google`}
        className="shrink-0 transition-transform hover:-translate-y-0.5"
      >
        <span className="flex gap-0.5 text-[#c78612]" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={16}
              weight={index < Math.round(rating) ? "fill" : "regular"}
            />
          ))}
        </span>
        <span className="mt-1 flex items-baseline gap-1.5">
          <strong className="font-display text-[2rem] font-semibold leading-none text-text-primary">
            {rating.toFixed(1)}
          </strong>
          <span className="text-xs font-medium text-text-secondary">
            / 5 đánh giá
          </span>
        </span>
      </Link>

      <div className="flex min-w-0 items-center gap-3">
        <div className="flex shrink-0 -space-x-2.5">
          {heroReviewers.map((reviewer) => (
            <Link
              key={reviewer.id}
              href={reviewer.sourceUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Xem đánh giá Google của ${reviewer.name}`}
              title={reviewer.name}
              className="relative block size-10 overflow-hidden rounded-full border-2 border-white bg-surface shadow-[0_4px_12px_rgba(16,46,58,0.12)] transition-transform hover:z-10 hover:-translate-y-1"
            >
              <Image
                src={reviewer.avatar}
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            </Link>
          ))}
        </div>

        <Link
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="min-w-0 text-sm leading-5 text-text-secondary transition-colors hover:text-brand-blue-dark"
        >
          <strong className="block text-lg font-semibold leading-5 text-text-primary">
            {reviewCount}+
          </strong>
          <span>
            đánh giá trên{" "}
            <span className="font-semibold text-brand-blue-dark">Google</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
