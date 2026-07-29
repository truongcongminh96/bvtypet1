"use client";

import {
  ArrowUpRight,
  CaretLeft,
  CaretRight,
  GoogleLogo,
  Star,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type { CustomerReview } from "@/content/experience";
import { heroReviewers } from "@/content/experience";

const fallbackStoryImages = [
  "/images/services/services-daily-care-concept.png",
  "/images/pet-one-clinic.png",
  "/images/services/kham-tong-quat.png",
  "/images/pet-one-care.png",
  "/images/services/cham-soc-rang-mieng.png",
];

function getAvatar(review: CustomerReview) {
  if (review.avatar?.src) return review.avatar.src;

  return heroReviewers.find(
    (reviewer) =>
      reviewer.sourceUrl === review.sourceUrl || reviewer.name === review.author,
  )?.avatar;
}

function ReviewStoryCard({
  review,
  index,
}: {
  review: CustomerReview;
  index: number;
}) {
  const avatar = getAvatar(review);
  const storyImage =
    review.image?.src ??
    fallbackStoryImages[index % fallbackStoryImages.length];

  return (
    <li
      className="review-story-card group relative h-[29rem] w-[min(82vw,18.25rem)] flex-none snap-center overflow-hidden rounded-[1.75rem] bg-text-primary shadow-[0_24px_60px_rgba(49,39,29,0.16)] sm:h-[27rem] sm:w-[17.5rem]"
      data-review-story
    >
      <Image
        src={storyImage}
        alt={review.image?.alt ?? "Khoảnh khắc chăm sóc thú cưng tại Pet One"}
        fill
        sizes="(max-width: 639px) 82vw, 280px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        style={{ objectPosition: review.image?.focalPoint ?? "center" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,28,37,0.46)_0%,rgba(7,28,37,0.04)_30%,rgba(7,28,37,0.16)_45%,rgba(7,28,37,0.94)_100%)]"
      />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-4">
        <div className="flex min-w-0 items-center gap-2.5 rounded-full border border-white/40 bg-white/92 py-1.5 pr-3 pl-1.5 text-text-primary shadow-sm backdrop-blur-md">
          {avatar ? (
            <Image
              src={avatar}
              alt=""
              width={34}
              height={34}
              className="size-[2.125rem] flex-none rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="grid size-[2.125rem] flex-none place-items-center rounded-full bg-brand-blue-soft text-xs font-bold text-brand-blue-dark"
            >
              {review.author.charAt(0)}
            </span>
          )}
          <span className="truncate text-[0.7rem] font-bold">
            {review.author}
          </span>
        </div>
        <span
          className="inline-flex size-9 flex-none items-center justify-center rounded-full border border-white/40 bg-white/92 text-text-primary shadow-sm backdrop-blur-md"
          aria-label="Đánh giá từ Google"
          title="Google Review"
        >
          <GoogleLogo
            aria-hidden="true"
            size={17}
            weight="bold"
            className="text-[#4285f4]"
          />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
        <div
          className="flex gap-0.5 text-[#ffd369]"
          aria-label={`${review.rating} trên 5 sao`}
        >
          {Array.from({ length: 5 }, (_, starIndex) => (
            <Star
              key={starIndex}
              aria-hidden="true"
              size={15}
              weight={
                starIndex < Math.round(review.rating) ? "fill" : "regular"
              }
            />
          ))}
        </div>
        <blockquote className="review-story-card__quote mt-3 text-[0.93rem] leading-[1.65] text-white/95">
          “{review.quote}”
        </blockquote>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/22 pt-4">
          <span className="text-[0.7rem] font-medium text-white/72">
            {review.reviewedLabel ?? review.reviewedAt ?? "Đánh giá đã xác minh"}
          </span>
          <Link
            href={review.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-9 flex-none items-center gap-1.5 rounded-full bg-white px-3.5 text-[0.68rem] font-bold text-brand-blue-dark transition-transform hover:-translate-y-0.5"
            aria-label={`Xem đánh giá Google gốc của ${review.author}`}
          >
            Xem nguồn
            <ArrowUpRight aria-hidden="true" size={13} weight="bold" />
          </Link>
        </div>
      </div>
    </li>
  );
}

export function ReviewStoriesCarousel({
  items,
}: {
  items: CustomerReview[];
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPageHidden, setIsPageHidden] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const scrollToReview = useCallback((index: number) => {
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>(
      "[data-review-story]",
    )[index];
    if (!track || !card) return;

    const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    track.scrollTo({
      left,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
    setActiveIndex(index);
  }, []);

  useEffect(
    () => () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () =>
      setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () =>
      mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsPageHidden(document.hidden);

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);

    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (
      items.length < 2 ||
      isPaused ||
      isPageHidden ||
      prefersReducedMotion
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      scrollToReview((activeIndex + 1) % items.length);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [
    activeIndex,
    isPageHidden,
    isPaused,
    items.length,
    prefersReducedMotion,
    scrollToReview,
  ]);

  function updateActiveIndex() {
    const track = trackRef.current;
    if (!track) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    const cards = Array.from(
      track.querySelectorAll<HTMLElement>("[data-review-story]"),
    );
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - trackCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex(nearestIndex);
  }

  function handleScroll() {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = window.requestAnimationFrame(updateActiveIndex);
  }

  return (
    <div
      className="mt-10 sm:mt-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <ul
        ref={trackRef}
        onScroll={handleScroll}
        className="review-stories-track mx-auto flex max-w-[37rem] snap-x snap-mandatory gap-4 overflow-x-auto px-[calc((100%-min(82vw,18.25rem))/2)] py-3 sm:gap-5 sm:px-[calc((100%-17.5rem)/2)] lg:snap-proximity lg:px-0"
        aria-label="Các đánh giá của khách hàng Pet One"
      >
        {items.map((review, index) => (
          <ReviewStoryCard key={review.id} review={review} index={index} />
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => scrollToReview(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          className="review-story-control"
          aria-label="Xem đánh giá trước"
        >
          <CaretLeft aria-hidden="true" size={18} weight="bold" />
        </button>

        <div className="flex items-center gap-2" aria-label="Chọn đánh giá">
          {items.map((review, index) => (
            <button
              key={review.id}
              type="button"
              onClick={() => scrollToReview(index)}
              className="grid min-h-7 min-w-7 place-items-center rounded-full"
              aria-label={`Xem đánh giá ${index + 1} của ${items.length}`}
              aria-current={activeIndex === index ? "true" : undefined}
            >
              <span
                className={`block rounded-full transition-all ${
                  activeIndex === index
                    ? "h-2 w-6 bg-brand-blue-dark"
                    : "size-2 bg-text-primary/25"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            scrollToReview(Math.min(items.length - 1, activeIndex + 1))
          }
          disabled={activeIndex === items.length - 1}
          className="review-story-control"
          aria-label="Xem đánh giá tiếp theo"
        >
          <CaretRight aria-hidden="true" size={18} weight="bold" />
        </button>
      </div>

      <p className="sr-only" aria-live={isPaused ? "polite" : "off"}>
        Đang hiển thị đánh giá {activeIndex + 1} trên {items.length}
      </p>
    </div>
  );
}
