import { CareActionLink } from "@/components/ui/button";
import type { Service } from "@/content/site";
import type { ServiceRowPresentation } from "@/content/services-page";

const fallbackPresentation: ServiceRowPresentation = {
  observation: "Khi bạn cần trao đổi rõ hơn về điều đang quan sát ở bé",
  actionLabel: "Xem thông tin dịch vụ",
};

export function ServiceRow({
  service,
  presentation = fallbackPresentation,
}: {
  service: Service;
  presentation?: ServiceRowPresentation;
}) {
  return (
    <CareActionLink
      href={`/dich-vu/${service.slug}`}
      variant="text"
      aria-label={`${presentation.actionLabel}: ${service.title}`}
      className="group/service-row w-full rounded-none border-b border-border px-3 py-5 text-left transition-[background-color,border-color] duration-200 hover:border-brand-blue/45 hover:bg-brand-blue-soft/65 sm:px-4 sm:py-6"
    >
      <span className="grid gap-2.5">
        <span className="font-display text-[clamp(1.45rem,2.3vw,1.9rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-text-primary transition-colors duration-200 group-hover/service-row:text-brand-blue-dark">
          {service.title}
        </span>
        <span className="max-w-xl text-sm font-normal leading-6 text-text-secondary sm:text-[0.95rem] sm:leading-7">
          {service.summary}
        </span>
        <span className="mt-1 flex max-w-xl items-start gap-2 border-l-2 border-brand-blue/55 pl-3 text-xs font-medium leading-5 text-text-secondary">
          <span className="shrink-0 text-brand-blue-dark">Phù hợp khi</span>
          <span>{presentation.observation}</span>
        </span>
      </span>
    </CareActionLink>
  );
}
