import { ShieldCheck, Star } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export function TrustStrip({
  rating,
  reviewCount,
  href,
}: {
  rating?: number;
  reviewCount?: number;
  href?: string;
}) {
  const hasVerifiedRating =
    rating != null && reviewCount != null && reviewCount > 0;

  if (!hasVerifiedRating) {
    return (
      <div className="flex max-w-md items-center gap-3 border-t border-brand-blue/15 pt-4 text-sm text-text-secondary">
        <ShieldCheck
          aria-hidden="true"
          size={21}
          weight="duotone"
          className="shrink-0 text-brand-blue-dark"
        />
        <span>Thông tin đánh giá đang được Pet One xác minh trước khi hiển thị.</span>
      </div>
    );
  }

  const content = (
    <>
      <span className="inline-flex items-center gap-1 text-[#c78612]">
        <Star aria-hidden="true" size={18} weight="fill" />
        <strong className="text-text-primary">{rating}/5</strong>
      </span>
      <span className="h-4 w-px bg-border-strong" aria-hidden="true" />
      <span>{reviewCount.toLocaleString("vi-VN")} đánh giá Google đã xác minh</span>
    </>
  );

  return href ? (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex flex-wrap items-center gap-3 border-t border-brand-blue/15 pt-4 text-sm text-text-secondary transition-colors hover:text-brand-blue-dark"
    >
      {content}
    </Link>
  ) : (
    <div className="inline-flex flex-wrap items-center gap-3 border-t border-brand-blue/15 pt-4 text-sm text-text-secondary">
      {content}
    </div>
  );
}
