import {
  ArrowUpRight,
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ClinicLocation } from "@/content/experience";

export function ClinicLocations({ items }: { items: ClinicLocation[] }) {
  if (items.length === 0) return null;

  return (
    <section className="section-space bg-surface-soft">
      <div className="shell">
        <MotionSection>
          <SectionHeading
            label="Cơ sở Pet One"
            title="Chọn địa điểm phù hợp với bạn"
            description="Kiểm tra địa chỉ và giờ tiếp nhận trước khi đưa bé đến."
          />
        </MotionSection>
        <MotionGroup className="mt-10 grid gap-6">
          {items.slice(0, 3).map((location, index) => (
            <MotionItem key={location.id}>
              <article className="grid overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow-card)] lg:grid-cols-2">
                <div className={`relative min-h-[19rem] bg-surface-warm ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  {location.mapEmbedUrl ? (
                    <iframe
                      src={location.mapEmbedUrl}
                      title={`Bản đồ ${location.name}`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 size-full border-0"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                      <MapPin aria-hidden="true" size={34} weight="duotone" className="text-brand-blue-dark" />
                      <p className="mt-3 text-sm text-text-secondary">Xem vị trí trên Google Maps</p>
                    </div>
                  )}
                </div>
                <div className="p-7 sm:p-9">
                  <p className="text-sm font-semibold text-brand-blue-dark">Cơ sở {index + 1}</p>
                  <h3 className="mt-2 font-display text-3xl font-semibold text-text-primary">{location.name}</h3>
                  <ul className="mt-6 grid gap-4 text-sm leading-6 text-text-secondary">
                    <li className="flex gap-3"><MapPin aria-hidden="true" size={19} className="mt-0.5 shrink-0 text-brand-blue-dark" />{location.address}</li>
                    {location.openingHours ? <li className="flex gap-3"><Clock aria-hidden="true" size={19} className="mt-0.5 shrink-0 text-brand-blue-dark" />{location.openingHours}</li> : null}
                    {location.phone ? <li className="flex gap-3"><Phone aria-hidden="true" size={19} className="mt-0.5 shrink-0 text-brand-red-strong" /><Link href={`tel:${location.phone.replace(/[^\d+]/g, "")}`}>{location.phone}</Link></li> : null}
                    {location.email ? <li className="flex gap-3"><EnvelopeSimple aria-hidden="true" size={19} className="mt-0.5 shrink-0 text-brand-blue-dark" /><Link href={`mailto:${location.email}`}>{location.email}</Link></li> : null}
                  </ul>
                  <Link href={location.mapUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-dark">
                    Mở Google Maps <ArrowUpRight aria-hidden="true" size={16} />
                  </Link>
                </div>
              </article>
            </MotionItem>
          ))}
        </MotionGroup>
      </div>
    </section>
  );
}
