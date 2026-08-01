import Image from "next/image";
import Link from "next/link";
import type { ElementType } from "react";

import { CareActionRail } from "@/components/ui/button";
import type { HomeServicePresentation } from "@/content/home-service-presentation";
import { cn } from "@/lib/cn";

type CareRecordCardProps = {
  index: string;
  href: string;
  icon: ElementType;
  title: string;
  description: string;
  presentation: HomeServicePresentation;
};

function ObservationTags({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Dấu hiệu và nhu cầu thường gặp">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-[8px_11px_11px_11px] border border-border bg-surface-soft px-2.5 py-1.5 text-xs font-medium leading-5 text-text-secondary"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ObservationNotes({ items }: { items: string[] }) {
  return (
    <div className="flex h-full flex-col justify-between bg-surface-soft p-5 sm:p-6 lg:p-7">
      <p className="text-xs font-semibold text-brand-blue-dark">
        Điều bác sĩ cần biết
      </p>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-6 text-text-secondary">
            <span
              aria-hidden="true"
              className="mt-2 size-2 shrink-0 rounded-full border-2 border-brand-blue bg-surface"
            />
            {item}
          </li>
        ))}
      </ul>
      <span
        aria-hidden="true"
        className="mt-6 block h-px w-24 origin-left scale-x-[0.66] bg-brand-blue/35 transition-transform duration-300 group-hover/care-record:scale-x-100"
      />
    </div>
  );
}

export function CareRecordCard({
  index,
  href,
  icon: Icon,
  title,
  description,
  presentation,
}: CareRecordCardProps) {
  const isFeatured = presentation.variant !== "standard-record";
  const image =
    presentation.variant === "featured-photo" ? presentation.image : undefined;
  const observationNotes =
    presentation.variant === "featured-notes"
      ? presentation.observationNotes
      : undefined;

  return (
    <Link
      href={href}
      className={cn(
        "motion-feedback group/care-record relative flex h-full flex-col overflow-hidden rounded-[12px_28px_28px_28px] border border-border bg-surface shadow-[0_14px_34px_rgba(16,46,58,0.065)] transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-brand-blue/35 hover:shadow-[0_20px_44px_rgba(16,46,58,0.1)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-blue-dark",
        isFeatured ? "min-h-[27rem]" : "min-h-[22rem]",
      )}
    >
      <div
        className={cn(
          "flex flex-1 flex-col",
          isFeatured && (image || observationNotes) &&
            "lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(12rem,0.92fr)]",
        )}
      >
        <div className="flex min-w-0 flex-col p-6 sm:p-7 lg:p-8">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold tabular-nums text-text-muted">
              {index}
            </span>
            <span className="inline-flex size-10 items-center justify-center rounded-[9px_14px_14px_14px] border border-brand-blue/15 bg-brand-blue-soft text-brand-blue-dark">
              <Icon aria-hidden="true" size={21} weight="duotone" />
            </span>
          </div>

          <h3
            className={cn(
              "mt-7 font-semibold leading-snug tracking-[-0.02em] text-text-primary",
              isFeatured ? "text-2xl sm:text-[1.7rem]" : "text-xl",
            )}
          >
            {title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-text-secondary">
            {description}
          </p>

          <div className="mt-7 border-l-2 border-brand-blue/35 pl-4">
            <p className="text-xs font-semibold text-text-primary">
              Thường phù hợp khi
            </p>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {presentation.suitability}
            </p>
          </div>

          <ObservationTags items={presentation.observationTags} />
        </div>

        {image ? (
          <figure className="flex min-h-52 flex-col border-t border-border bg-surface-soft lg:min-h-0 lg:border-l lg:border-t-0">
            <div className="relative min-h-52 flex-1 overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 25vw"
                className="object-cover object-center"
              />
            </div>
          </figure>
        ) : null}

        {observationNotes ? (
          <div className="border-t border-border lg:border-l lg:border-t-0">
            <ObservationNotes items={observationNotes} />
          </div>
        ) : null}
      </div>

      <div className="px-6 pb-6 sm:px-7 sm:pb-7 lg:px-8 lg:pb-8">
        <CareActionRail>{presentation.actionLabel}</CareActionRail>
      </div>
    </Link>
  );
}
