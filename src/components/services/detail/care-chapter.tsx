import Image from "next/image";
import type { ReactNode } from "react";

import { CareNoteReveal } from "@/components/motion/care-note-reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import type { ServiceDetailMedia } from "@/content/service-detail-presentation";
import { cn } from "@/lib/cn";

type CareChapterLayout = "media-left" | "media-right" | "media-top" | "text-only";
type CareChapterTone = "white" | "blue" | "warm";

const toneClasses: Record<CareChapterTone, string> = {
  white: "bg-background",
  blue: "bg-surface-soft",
  warm: "bg-surface-warm",
};

function ChapterMedia({
  image,
  careNote,
  className,
}: {
  image: ServiceDetailMedia;
  careNote?: string;
  className?: string;
}) {
  return (
    <figure className={cn("relative", className)}>
      <div className="relative">
        <ImageReveal className="relative aspect-[5/4] overflow-hidden rounded-[14px_36px_36px_36px] border border-border bg-surface shadow-[0_20px_52px_rgba(16,46,58,0.08)] lg:aspect-[4/3]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
        </ImageReveal>
        {careNote ? (
          <CareNoteReveal
            label={careNote}
            className="bottom-[9%] left-[-1rem]"
            delay={0.24}
          />
        ) : null}
      </div>
      {image.placeholder ? (
        <figcaption className="mt-3 text-xs leading-5 text-text-muted">
          Hình ảnh minh hoạ, chưa phải ảnh thực tế của PetOne.
        </figcaption>
      ) : null}
    </figure>
  );
}

export function CareChapter({
  id,
  title,
  intro,
  layout,
  tone = "white",
  image,
  careNote,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  layout: CareChapterLayout;
  tone?: CareChapterTone;
  image?: ServiceDetailMedia;
  careNote?: string;
  children: ReactNode;
}) {
  const heading = (
    <MotionGroup amount={0.12}>
      <MotionItem>
        <h2 className="max-w-3xl font-display text-[clamp(2.4rem,4.3vw,4.1rem)] font-semibold leading-[1.07] tracking-[-0.018em] text-text-primary text-balance">
          {title}
        </h2>
      </MotionItem>
      <MotionItem>
        <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
          {intro}
        </p>
      </MotionItem>
    </MotionGroup>
  );

  if (layout === "text-only") {
    return (
      <section id={id} className={cn("section-space", toneClasses[tone])}>
        <div className="shell">
          {heading}
          <div className="mt-10">{children}</div>
        </div>
      </section>
    );
  }

  if (layout === "media-top" && image) {
    return (
      <section id={id} className={cn("section-space", toneClasses[tone])}>
        <div className="shell flex flex-col">
          <ChapterMedia
            image={image}
            careNote={careNote}
            className="order-1 lg:order-2 lg:mt-10"
          />
          <div className="order-2 mt-9 lg:order-1 lg:mt-0">{heading}</div>
          <div className="order-3 mt-10">{children}</div>
        </div>
      </section>
    );
  }

  if (!image) {
    return null;
  }

  const mediaLeft = layout === "media-left";

  return (
    <section id={id} className={cn("section-space", toneClasses[tone])}>
      <div className="shell grid items-start gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
        <ChapterMedia
          image={image}
          careNote={careNote}
          className={cn(
            "order-1 lg:col-span-5",
            mediaLeft ? "lg:order-1" : "lg:order-2",
          )}
        />
        <div
          className={cn(
            "order-2 lg:col-span-7",
            mediaLeft ? "lg:order-2" : "lg:order-1",
          )}
        >
          {heading}
          <div className="mt-9">{children}</div>
        </div>
      </div>
    </section>
  );
}
