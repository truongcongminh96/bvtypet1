import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import type { Equipment } from "@/content/experience";

const equipmentDisplaySlots = [
  {
    name: "X Quang",
    matches: ["x quang", "x ray", "xray"],
  },
  {
    name: "Mê bay hơi",
    matches: ["me bay hoi", "gay me bay hoi", "may me"],
  },
  {
    name: "Siêu âm",
    matches: ["sieu am"],
  },
  {
    name: "XN Sinh lý/Sinh hóa",
    matches: ["xn sinh ly", "sinh ly sinh hoa", "xet nghiem sinh ly"],
  },
] as const;

function normalizeEquipmentName(value: string) {
  return value
    .normalize("NFD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function ClinicEnvironment({ items }: { items: Equipment[] }) {
  return (
    <section className="relative overflow-hidden bg-surface-soft py-24 sm:py-28 lg:py-36">
      <div className="shell">
        <MotionSection className="ml-auto max-w-[64rem]" direction="right" mobileDirection="left">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand-blue-dark">
            Không gian chăm sóc
          </p>
          <h2 className="editorial-statement mt-5 text-text-primary">
            Thiết bị chỉ có ý nghĩa khi trả lời{" "}
            <span className="text-brand-blue-dark">một câu hỏi lâm sàng rõ ràng.</span>
          </h2>
        </MotionSection>
      </div>

      <MotionSection className="relative mx-auto mt-12 w-[calc(100%_-_1.25rem)] max-w-[92rem]" direction="left">
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem_4.5rem_1.5rem_1.5rem] bg-surface shadow-[0_28px_80px_rgba(16,46,58,0.12)] sm:aspect-[16/9] lg:aspect-[16/7]">
            <Image
              src="/images/clinic/pet-one-ultrasound-team.jpg"
              alt="Đội ngũ Pet One thực hiện siêu âm hỗ trợ đánh giá sức khỏe cho thú cưng"
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "50% 52%" }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-text-primary/12 via-transparent to-brand-blue/5"
            />
          </div>
          <figcaption className="shell mt-3 text-[0.68rem] leading-5 text-text-muted">
            Hình ảnh thực tế trong quá trình siêu âm tại Pet One.
          </figcaption>
        </figure>
      </MotionSection>

      <div className="shell">
        <MotionGroup
          className="relative z-10 -mt-2 border-t border-border-strong pt-7 sm:mt-1 lg:-mt-10 lg:bg-surface-soft/95 lg:px-8 lg:pt-8"
          amount={0.12}
          stagger={0.09}
        >
          <div
            className="service-carousel-viewport pb-4 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-dark"
            role="region"
            aria-label="Bốn nhóm trang thiết bị"
            tabIndex={0}
          >
            {equipmentDisplaySlots.map((slot, index) => {
              const item = items.find((candidate) => {
                if (!candidate.verified) return false;

                const normalizedName = normalizeEquipmentName(candidate.name);
                return slot.matches.some((match) => normalizedName.includes(match));
              });

              return (
                <MotionItem
                  key={slot.name}
                  className="flex min-h-56 w-[min(78vw,19rem)] flex-none snap-start flex-col rounded-[1.5rem] border border-border bg-surface/80 p-5 shadow-[0_12px_30px_rgba(16,46,58,0.06)] sm:w-[19rem] lg:min-h-64 lg:w-[20rem]"
                  direction={index % 2 === 0 ? "left" : "right"}
                  mobileDirection="left"
                >
                  <span className="text-[0.625rem] font-bold uppercase tracking-[0.13em] text-brand-blue-dark">
                    Thiết bị {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-[1.85rem] font-semibold leading-[1.02] text-text-primary text-balance">
                    {slot.name}
                  </h3>

                  {item ? (
                    <>
                      <p className="mt-4 text-xs leading-6 text-text-secondary">
                        {item.summary}
                      </p>
                      <ul className="mt-auto space-y-2 pt-4">
                        {item.supports.slice(0, 2).map((support) => (
                          <li
                            key={support}
                            className="flex gap-2 text-[0.7rem] leading-5 text-text-secondary"
                          >
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
                    </>
                  ) : (
                    <p className="mt-auto pt-5 text-xs leading-6 text-text-muted">
                      Thông tin chi tiết đang được đối chiếu trước khi công bố.
                    </p>
                  )}
                </MotionItem>
              );
            })}
          </div>
        </MotionGroup>
      </div>
    </section>
  );
}
