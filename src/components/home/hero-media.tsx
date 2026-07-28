"use client";

import Image from "next/image";
import { m } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;
const mediaDescription =
  "Ảnh minh hoạ bác sĩ thú y đang kiểm tra nhẹ nhàng cho chó và mèo";

export function HeroMedia() {
  return (
    <m.figure
      data-motion-reveal
      className="home-hero__media-figure"
      initial={{ opacity: 0.65, scale: 1.025 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.3, delay: 0.08, ease }}
    >
      <div className="home-hero__media-visual">
        <Image
          src="/images/pet-one-hero-panorama.webp"
          alt={mediaDescription}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 1px"
          className="home-hero__media-poster"
        />
        <span className="home-hero__media-grid" aria-hidden="true" />
        <span className="home-hero__media-veil" aria-hidden="true" />
      </div>

      <figcaption className="home-hero__media-caption">
        Hình ảnh minh hoạ.
      </figcaption>
    </m.figure>
  );
}
