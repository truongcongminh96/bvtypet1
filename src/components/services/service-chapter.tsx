import Image from "next/image";

import { CareNoteReveal } from "@/components/motion/care-note-reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import {
  MotionGroup,
  MotionItem,
} from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import { ServiceRow } from "@/components/services/service-row";
import type { Service } from "@/content/site";
import {
  serviceConceptMedia,
  serviceRowPresentation,
  type ServiceChapterDefinition,
  type ServicesPageMedia,
} from "@/content/services-page";
import { cn } from "@/lib/cn";

const toneClasses = {
  white: "bg-background",
  blue: "bg-surface-soft",
  warm: "bg-surface-warm",
};

const mediaFrameClasses = {
  foundation:
    "aspect-[5/4] rounded-[14px_36px_36px_36px] lg:aspect-[4/5] xl:aspect-[5/4]",
  treatment:
    "aspect-[4/5] rounded-[36px_14px_36px_36px] lg:ml-auto lg:max-w-[31rem]",
  diagnostics:
    "aspect-[16/11] rounded-[14px_36px_14px_36px] lg:aspect-[6/5]",
  daily:
    "aspect-[5/4] rounded-[36px_36px_14px_36px] lg:ml-auto lg:max-w-[34rem] lg:aspect-[4/5]",
};

export function ServiceChapter({
  chapter,
  services,
}: {
  chapter: ServiceChapterDefinition;
  services: Service[];
}) {
  const mediaFirst = chapter.layout === "media-left";
  const serviceMedia = services.flatMap((service) => {
    const media = serviceConceptMedia[service.slug];
    return media ? [media] : [];
  });

  return (
    <section
      id={chapter.id}
      className={cn("section-space overflow-hidden", toneClasses[chapter.tone])}
    >
      <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
        <div
          className={cn(
            "relative lg:col-span-6",
            mediaFirst ? "lg:order-1" : "lg:order-2",
            chapter.mediaStyle === "foundation" && "lg:pr-5",
            chapter.mediaStyle === "diagnostics" && "lg:pl-5",
          )}
        >
          <ImageReveal
            className={cn(
              "relative overflow-hidden border border-border bg-surface shadow-[0_22px_56px_rgba(16,46,58,0.09)]",
              mediaFrameClasses[chapter.mediaStyle],
            )}
          >
            {serviceMedia.length > 0 ? (
              <ServiceMediaGallery items={serviceMedia} />
            ) : (
              <Image
                src={chapter.media.src}
                alt={chapter.media.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 motion-reduce:transition-none lg:hover:scale-[1.015]"
              />
            )}
            <span className="absolute bottom-3 right-3 z-10 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-text-secondary shadow-sm backdrop-blur-sm">
              Hình ảnh minh hoạ
            </span>
          </ImageReveal>
          <CareNoteReveal
            label={chapter.careNote}
            direction={mediaFirst ? "right" : "left"}
            className={cn(
              mediaFirst
                ? "bottom-[9%] left-[-1rem]"
                : "bottom-[11%] right-[-1rem]",
            )}
            delay={0.25}
          />
        </div>

        <MotionGroup
          className={cn(
            "lg:col-span-6",
            mediaFirst ? "lg:order-2" : "lg:order-1",
          )}
          amount={0.1}
        >
          <MotionItem>
            <p className="text-sm font-semibold text-brand-blue-dark">
              {chapter.label}
            </p>
          </MotionItem>
          <MotionItem>
            <h2 className="mt-3 font-display text-[clamp(2.35rem,4.2vw,4rem)] font-semibold leading-[1.06] tracking-[-0.018em] text-text-primary text-balance">
              {chapter.title}
            </h2>
          </MotionItem>
          <MotionItem>
            <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
              {chapter.description}
            </p>
          </MotionItem>
          <MotionItem>
            <div className="mt-8 border-t border-border-strong">
              {services.map((service) => (
                <ServiceRow
                  key={service.slug}
                  service={service}
                  presentation={serviceRowPresentation[service.slug]}
                />
              ))}
            </div>
          </MotionItem>
          <MotionItem>
            <CareActionLink
              href="/lien-he#dat-lich"
              variant="text"
              divider
              className="mt-7"
            >
              {chapter.actionLabel}
            </CareActionLink>
          </MotionItem>
        </MotionGroup>
      </div>
    </section>
  );
}

function ServiceMediaGallery({ items }: { items: ServicesPageMedia[] }) {
  const featuredLayout = items.length >= 3;

  return (
    <div
      className={cn(
        "absolute inset-0 grid gap-1.5 bg-border",
        featuredLayout
          ? "grid-cols-[1.45fr_0.8fr] grid-rows-2"
          : "grid-cols-2",
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.src}
          className={cn(
            "group/service-media relative min-h-0 overflow-hidden bg-surface",
            featuredLayout && index === 0 && "row-span-2",
          )}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            loading="eager"
            sizes={
              featuredLayout && index > 0
                ? "(max-width: 1023px) 40vw, 18vw"
                : "(max-width: 1023px) 65vw, 34vw"
            }
            className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover/service-media:scale-[1.025]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,transparent_68%,rgba(16,46,58,0.12))]"
          />
        </div>
      ))}
    </div>
  );
}
