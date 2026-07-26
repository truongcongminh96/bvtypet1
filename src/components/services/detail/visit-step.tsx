import {
  ChatCircleText,
  ClipboardText,
  Eye,
  FirstAid,
  Heart,
  HouseLine,
  Stethoscope,
} from "@phosphor-icons/react/dist/ssr";

import type {
  ServiceDetailIconKey,
  ServiceVisitStep,
} from "@/content/service-detail-presentation";
import { cn } from "@/lib/cn";

const iconByKey: Record<ServiceDetailIconKey, typeof ChatCircleText> = {
  listen: ChatCircleText,
  observe: Eye,
  examine: Stethoscope,
  explain: ClipboardText,
  plan: FirstAid,
  "follow-up": HouseLine,
  care: Heart,
};

export function VisitStep({
  step,
  index,
  featured = false,
}: {
  step: ServiceVisitStep;
  index: number;
  featured?: boolean;
}) {
  const Icon = iconByKey[step.iconKey];

  return (
    <article
      className={cn(
        "relative h-full",
        featured
          ? "rounded-[12px_28px_28px_28px] border border-brand-blue/15 bg-brand-blue-soft/55 p-6 shadow-[0_14px_34px_rgba(16,46,58,0.055)] sm:p-8 lg:grid lg:grid-cols-[auto_1fr] lg:gap-7"
          : "border-t border-border-strong py-6 sm:py-7",
      )}
    >
      <div className={cn("flex items-center gap-3", featured && "lg:block")}>
        <span className="inline-flex size-11 items-center justify-center rounded-[9px_14px_14px_14px] border border-brand-blue/20 bg-surface text-brand-blue-dark">
          <Icon aria-hidden="true" size={22} weight="duotone" />
        </span>
        <span className="text-xs font-semibold tabular-nums text-text-muted lg:mt-3 lg:block lg:text-center">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className={cn(featured ? "mt-5 lg:mt-0" : "mt-5")}>
        <h3
          className={cn(
            "font-semibold leading-snug tracking-[-0.015em] text-text-primary",
            featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
          )}
        >
          {step.title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-7 text-text-secondary sm:text-[0.95rem]">
          {step.description}
        </p>
        {step.note ? (
          <p className="mt-4 border-l-2 border-brand-blue/45 pl-3 text-xs leading-6 text-text-secondary">
            {step.note}
          </p>
        ) : null}
      </div>
    </article>
  );
}
