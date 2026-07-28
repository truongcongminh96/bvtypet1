"use client";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
} from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Service } from "@/content/site";

const AUTOPLAY_INTERVAL = 4600;

function cardImagePosition(service: Service) {
  return service.cardImage?.focalPoint
    ? { objectPosition: service.cardImage.focalPoint }
    : undefined;
}

export function ServiceCarousel({ items }: { items: Service[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const hasControls = items.length > 1;

  const scrollByCard = useCallback(
    (direction: -1 | 1) => {
      const viewport = viewportRef.current;
      const firstCard = viewport?.querySelector<HTMLElement>(
        "[data-service-carousel-card]",
      );

      if (!viewport || !firstCard) return;

      const styles = window.getComputedStyle(viewport);
      const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
      viewport.scrollBy({
        left: direction * (firstCard.offsetWidth + gap),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [reducedMotion],
  );

  const autoplayNext = useCallback(() => {
    const viewport = viewportRef.current;
    const firstCard = viewport?.querySelector<HTMLElement>(
      "[data-service-carousel-card]",
    );

    if (!viewport || !firstCard) return;

    const styles = window.getComputedStyle(viewport);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const isAtEnd =
      viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 4;

    viewport.scrollTo({
      left: isAtEnd ? 0 : viewport.scrollLeft + firstCard.offsetWidth + gap,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [reducedMotion]);

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };

    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (
      !hasControls ||
      reducedMotion ||
      isPaused ||
      isInteracting ||
      !isDocumentVisible
    ) {
      return;
    }

    const timer = window.setInterval(autoplayNext, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(timer);
  }, [
    autoplayNext,
    hasControls,
    isDocumentVisible,
    isInteracting,
    isPaused,
    reducedMotion,
  ]);

  return (
    <div
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onPointerDown={() => setIsInteracting(true)}
      onPointerUp={() => setIsInteracting(false)}
      onPointerCancel={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsInteracting(false);
        }
      }}
    >
      <div className="flex items-center justify-between gap-5">
        <h3
          id="other-services-title"
          className="font-display text-[2.35rem] font-semibold leading-none text-text-primary sm:text-5xl"
        >
          Các dịch vụ khác
        </h3>

        {hasControls ? (
          <div
            className="flex shrink-0 items-center gap-2"
            role="group"
            aria-label="Điều khiển danh sách dịch vụ"
          >
            {!reducedMotion ? (
              <button
                type="button"
                className="service-carousel-control"
                onClick={() => setIsPaused((paused) => !paused)}
                aria-label={isPaused ? "Tiếp tục tự động chuyển" : "Tạm dừng tự động chuyển"}
                aria-pressed={isPaused}
              >
                {isPaused ? (
                  <Play size={18} weight="bold" aria-hidden="true" />
                ) : (
                  <Pause size={18} weight="bold" aria-hidden="true" />
                )}
              </button>
            ) : null}
            <button
              type="button"
              className="service-carousel-control"
              onClick={() => scrollByCard(-1)}
              aria-label="Xem dịch vụ trước"
            >
              <ArrowLeft size={18} weight="bold" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="service-carousel-control"
              onClick={() => scrollByCard(1)}
              aria-label="Xem dịch vụ tiếp theo"
            >
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>

      <div
        ref={viewportRef}
        className="service-carousel-viewport mt-6"
        role="region"
        aria-labelledby="other-services-title"
      >
        {items.map((service) => (
          <Link
            key={service.slug}
            href={`/dich-vu/${service.slug}`}
            className="service-carousel-card group"
            data-service-carousel-card
          >
            <figure className="relative h-full min-w-0 overflow-hidden bg-surface-soft">
              {service.cardImage ? (
                <Image
                  src={service.cardImage.src}
                  alt={service.cardImage.alt}
                  fill
                  sizes="(max-width: 767px) 42vw, 10rem"
                  style={cardImagePosition(service)}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                />
              ) : null}
            </figure>
            <div className="flex min-w-0 flex-col items-start justify-center px-5 py-5 sm:px-6">
              <h4 className="font-display text-[1.75rem] font-semibold leading-[1.02] text-text-primary">
                {service.shortTitle}
              </h4>
              <span className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-[var(--radius-sm)] bg-brand-blue-dark px-3.5 text-xs font-semibold text-white shadow-[0_7px_16px_rgba(13,95,168,0.16)] transition-[transform,background-color] duration-200 group-hover:-translate-y-0.5 group-hover:bg-[var(--medical-blue-hover)]">
                Tìm hiểu
                <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
