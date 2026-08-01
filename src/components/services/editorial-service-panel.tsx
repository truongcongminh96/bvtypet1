import {
  CalendarBlank,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";

import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { ServiceImageCollage } from "@/components/services/service-image-collage";
import { ServiceList } from "@/components/services/service-list";
import { CareActionLink, careActionStyles } from "@/components/ui/button";
import type { ServiceDirectoryGroup } from "@/content/service-directory";
import type { Service } from "@/content/site";
import { cn } from "@/lib/cn";

const sectionToneClasses = {
  white: "bg-background",
  blue: "bg-surface-soft",
  warm: "bg-surface-warm",
};

export function EditorialServicePanel({
  group,
  services,
}: {
  group: ServiceDirectoryGroup;
  services: Service[];
}) {
  const servicesBySlug = new Map(
    services.map((service) => [service.slug, service]),
  );
  const availableItems = group.items.flatMap((presentation) => {
    const service = servicesBySlug.get(presentation.slug);
    return service ? [{ service, presentation }] : [];
  });
  const mediaFirst = group.layout === "media-left";
  const ctaIcon = <CalendarBlank size={18} weight="duotone" />;

  return (
    <section
      id={group.id}
      aria-labelledby={`${group.id}-title`}
      className={cn(
        "scroll-mt-24 py-10 sm:py-14 lg:py-16",
        sectionToneClasses[group.tone],
      )}
    >
      <div
        className={cn(
          "mx-auto grid w-[min(calc(100%_-_1.25rem),80rem)] overflow-hidden rounded-[30px] bg-surface shadow-[0_22px_60px_rgba(16,46,58,0.08)] sm:w-[min(calc(100%_-_2rem),80rem)] sm:rounded-[40px] lg:min-h-[clamp(42rem,82svh,51rem)]",
          mediaFirst
            ? "lg:grid-cols-[1.18fr_0.82fr]"
            : "lg:grid-cols-[0.82fr_1.18fr]",
        )}
      >
        <div
          className={cn(
            "order-1 min-h-0",
            mediaFirst ? "lg:order-1" : "lg:order-2",
          )}
        >
          <ServiceImageCollage group={group} />
        </div>

        <div
          className={cn(
            "order-2 flex min-h-full flex-col px-7 py-9 sm:px-10 sm:py-11 lg:px-11 lg:py-10 xl:px-14",
            mediaFirst ? "lg:order-2" : "lg:order-1",
          )}
        >
          <MotionGroup
            className="flex flex-1 flex-col"
            amount={0.08}
            stagger={0.08}
          >
            <MotionItem>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue-dark">
                {group.eyebrow}
              </p>
            </MotionItem>
            <MotionItem>
              <h2
                id={`${group.id}-title`}
                className="mt-3 font-display text-[clamp(3rem,4.5vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.025em] text-text-primary"
              >
                {group.label}
              </h2>
            </MotionItem>
            <MotionItem>
              <p className="mt-5 font-display text-[clamp(1.35rem,2.2vw,1.75rem)] italic leading-[1.18] text-text-secondary">
                {group.subtitle}
              </p>
            </MotionItem>
            <MotionItem>
              <span
                aria-hidden="true"
                className="mt-5 block h-px w-14 bg-brand-blue/45"
              />
            </MotionItem>

            <MotionItem className="mt-6">
              {availableItems.length > 0 ? (
                <ServiceList items={availableItems} />
              ) : (
                <div className="border-y border-border/80 py-5">
                  <p className="text-sm font-semibold text-text-primary">
                    Sắp cập nhật
                  </p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {group.unavailableMessage}
                  </p>
                </div>
              )}
            </MotionItem>

            <MotionItem className="mt-auto pt-9">
              {group.cta.href ? (
                <CareActionLink
                  href={group.cta.href}
                  variant={
                    group.cta.tone === "blue"
                      ? "panel-primary"
                      : "panel-warm"
                  }
                  leadingIcon={ctaIcon}
                  trailingIcon={<CaretRight size={17} weight="bold" />}
                >
                  {group.cta.label}
                </CareActionLink>
              ) : (
                <span
                  aria-disabled="true"
                  className={careActionStyles({
                    variant: "panel-warm",
                    className:
                      "grid min-h-13 w-full cursor-not-allowed grid-cols-[1fr_auto] opacity-70",
                  })}
                >
                  <span className="px-2">{group.cta.label}</span>
                  <span
                    aria-hidden="true"
                    className="inline-flex size-7 items-center justify-center rounded-full border border-border bg-surface"
                  >
                    —
                  </span>
                </span>
              )}
            </MotionItem>
          </MotionGroup>
        </div>
      </div>
    </section>
  );
}
