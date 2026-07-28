import {
  ArrowUpRight,
  Clock,
  EnvelopeSimple,
  Info,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { contactPageContent } from "@/content/contact-page";
import type { ClinicContactDetails } from "@/lib/site-config";

const channelIcons = {
  phone: Phone,
  email: EnvelopeSimple,
  address: MapPin,
  openingHours: Clock,
} as const;

export function ContactRail({ contact }: { contact: ClinicContactDetails }) {
  const { title, description, unavailableNote, channels } =
    contactPageContent.contact;
  const hasAnyContactValue = Object.values(contact).some(Boolean);

  const items = (
    Object.keys(channels) as Array<keyof typeof channels>
  ).map((key) => {
    const content = channels[key];
    const value = contact[key];
    const href =
      key === "phone" && value
        ? `tel:${value.replace(/[^\d+]/g, "")}`
        : key === "email" && value
          ? `mailto:${value}`
          : key === "address" && value
            ? contact.googleMapsUrl
            : undefined;

    return {
      ...content,
      key,
      value,
      href,
      icon: channelIcons[key],
    };
  });

  return (
    <aside aria-labelledby="contact-rail-title" className="min-w-0">
      <MotionSection amount={0.12}>
        <h2
          id="contact-rail-title"
          className="font-display text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-text-primary"
        >
          {title}
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-text-secondary">
          {description}
        </p>
      </MotionSection>

      {!hasAnyContactValue ? (
        <MotionSection
          amount={0.12}
          className="mt-6 flex items-start gap-3 rounded-[var(--radius-md)] border border-brand-blue/20 bg-brand-blue-soft/70 p-4 text-sm leading-6 text-text-secondary"
        >
          <Info
            aria-hidden="true"
            size={20}
            weight="duotone"
            className="mt-0.5 shrink-0 text-brand-blue-dark"
          />
          <p>{unavailableNote}</p>
        </MotionSection>
      ) : null}

      <MotionGroup
        className="mt-7 overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface"
        amount={0.1}
      >
        {items.map((item, index) => (
          <MotionItem
            key={item.key}
            className={index === 0 ? undefined : "border-t border-border"}
          >
            <div className="grid grid-cols-[auto_1fr] gap-4 p-5 sm:p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] bg-brand-blue-soft text-brand-blue-dark">
                <item.icon aria-hidden="true" size={21} weight="duotone" />
              </span>

              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-text-secondary">
                  {item.description}
                </p>

                {item.value ? (
                  <div className="mt-3 flex flex-col items-start gap-2">
                    <p className="break-words text-sm font-semibold leading-6 text-text-primary">
                      {item.value}
                    </p>
                    {item.href && "actionLabel" in item ? (
                      <Link
                        href={item.href}
                        target={item.key === "address" ? "_blank" : undefined}
                        rel={item.key === "address" ? "noreferrer" : undefined}
                        className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand-blue-dark underline decoration-brand-blue/30 underline-offset-4 transition-colors hover:decoration-brand-blue-dark"
                      >
                        {item.actionLabel}
                        <ArrowUpRight aria-hidden="true" size={16} />
                      </Link>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </MotionItem>
        ))}
      </MotionGroup>
    </aside>
  );
}
