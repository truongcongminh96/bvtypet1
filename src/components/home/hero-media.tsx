"use client";

import Image from "next/image";
import { m } from "motion/react";

import type { ArticleImage } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroMedia({ image }: { image: ArticleImage }) {
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
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 1px"
          className="home-hero__media-poster"
          style={
            image.focalPoint ? { objectPosition: image.focalPoint } : undefined
          }
        />
        <span className="home-hero__media-grid" aria-hidden="true" />
        <span className="home-hero__media-veil" aria-hidden="true" />
      </div>
    </m.figure>
  );
}
