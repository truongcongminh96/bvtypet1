import { CheckCircle, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import type { Equipment } from "@/content/experience";

export function ClinicEnvironment({ items }: { items: Equipment[] }) {
  return (
    <section className="relative overflow-hidden bg-surface-soft py-24 sm:py-28 lg:py-36">
      <div className="shell">
        <MotionSection className="ml-auto max-w-[48rem] lg:pr-[8%]" direction="right" mobileDirection="left">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand-blue-dark">
            Không gian chăm sóc
          </p>
          <h2 className="section-title mt-5 text-text-primary">
            Thiết bị chỉ có ý nghĩa khi trả lời
            <span className="block text-brand-blue-dark">một câu hỏi lâm sàng rõ ràng.</span>
          </h2>
        </MotionSection>
      </div>

      <MotionSection className="relative mx-auto mt-12 w-[calc(100%_-_1.25rem)] max-w-[92rem]" direction="left">
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem_4.5rem_1.5rem_1.5rem] bg-surface shadow-[0_28px_80px_rgba(16,46,58,0.12)] sm:aspect-[16/9] lg:aspect-[16/7]">
            <Image
              src="/images/pet-one-clinic.png"
              alt="Ảnh minh hoạ không gian phòng khám thú y với khu vực thăm khám và thiết bị hỗ trợ"
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "52% 50%" }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-text-primary/12 via-transparent to-brand-blue/5"
            />
          </div>
          <figcaption className="shell mt-3 text-[0.68rem] leading-5 text-text-muted">
            Hình ảnh minh hoạ, không đại diện cho cơ sở thực tế của Pet One.
          </figcaption>
        </figure>
      </MotionSection>

      <div className="shell">
        {items.length > 0 ? (
          <MotionGroup
            className="relative z-10 -mt-2 ml-auto max-w-5xl border-t border-border-strong pt-7 sm:mt-1 lg:-mt-10 lg:bg-surface-soft/95 lg:px-8 lg:pt-8"
            amount={0.12}
            stagger={0.09}
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-end">
              {items.slice(0, 4).map((item, index) => (
                <MotionItem
                  key={item.id}
                  className="max-w-[17rem] lg:border-l lg:border-border-strong lg:pl-6"
                  direction={index % 2 === 0 ? "left" : "right"}
                  mobileDirection="left"
                >
                  <h3 className="font-display text-2xl font-semibold text-text-primary">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-text-secondary">
                    {item.summary}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {item.supports.slice(0, 2).map((support) => (
                      <li key={support} className="flex gap-2 text-[0.7rem] leading-5 text-text-secondary">
                        <CheckCircle
                          aria-hidden="true"
                          size={14}
                          weight="fill"
                          className="mt-0.5 shrink-0 text-brand-blue-dark"
                        />
                        {support}
                      </li>
                    ))}
                  </ul>
                </MotionItem>
              ))}
            </div>
          </MotionGroup>
        ) : (
          <MotionSection className="mt-7 ml-auto flex max-w-2xl items-start gap-3 border-t border-border-strong pt-5" direction="right" mobileDirection="left">
            <ShieldCheck
              aria-hidden="true"
              size={21}
              weight="duotone"
              className="mt-0.5 shrink-0 text-brand-blue-dark"
            />
            <p className="text-sm leading-7 text-text-secondary">
              Danh mục thiết bị đang được Pet One đối chiếu hình ảnh, công dụng
              và phạm vi hỗ trợ trước khi công bố.
            </p>
          </MotionSection>
        )}
      </div>
    </section>
  );
}
