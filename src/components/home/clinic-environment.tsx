import { CheckCircle, Stethoscope } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Equipment } from "@/content/experience";

export function ClinicEnvironment({ items }: { items: Equipment[] }) {
  return (
    <section className="section-space bg-surface-warm">
      <div className="shell">
        <MotionSection>
          <SectionHeading
            label="Cơ sở vật chất"
            title="Thiết bị phục vụ một câu hỏi lâm sàng rõ ràng"
            description="Thông tin thiết bị chỉ được công bố khi Pet One đã xác minh hình ảnh, công dụng và phạm vi hỗ trợ."
          />
        </MotionSection>
        {items.length > 0 ? (
          <MotionGroup className="mt-10 grid gap-5 md:grid-cols-2" amount={0.12}>
            {items.slice(0, 4).map((item) => (
              <MotionItem key={item.id}>
                <article className="grid h-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow-card)] sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-56 bg-surface-soft">
                    {item.image ? (
                      <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 767px) 100vw, 25vw" className="object-cover" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-brand-blue-dark">
                        <Stethoscope aria-hidden="true" size={36} weight="duotone" />
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-semibold text-text-primary">{item.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-text-secondary">{item.summary}</p>
                    <ul className="mt-4 grid gap-2">
                      {item.supports.map((support) => (
                        <li key={support} className="flex gap-2 text-xs leading-5 text-text-secondary">
                          <CheckCircle aria-hidden="true" size={16} weight="fill" className="mt-0.5 shrink-0 text-brand-blue-dark" />
                          {support}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </MotionItem>
            ))}
          </MotionGroup>
        ) : (
          <MotionSection className="mt-10 rounded-[var(--radius-lg)] border border-dashed border-border-strong bg-surface/70 p-8">
            <p className="max-w-2xl text-sm leading-7 text-text-secondary">
              Danh mục thiết bị đang được Pet One xác minh trước khi công bố.
            </p>
          </MotionSection>
        )}
      </div>
    </section>
  );
}
