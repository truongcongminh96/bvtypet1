import {
  ChatCircleText,
  CheckCircle,
  ClipboardText,
  Heartbeat,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { ImageReveal } from "@/components/motion/image-reveal";
import {
  MotionGroup,
  MotionItem,
  MotionSection,
} from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import { PawMarker } from "@/components/ui/care-note";
import { SectionHeading } from "@/components/ui/section-heading";

const principles = [
  {
    icon: ShieldCheck,
    title: "Lắng nghe điều bạn quan sát",
    description: "Bác sĩ bắt đầu từ thay đổi bạn đã thấy trong sinh hoạt của bé.",
  },
  {
    icon: Heartbeat,
    title: "Đánh giá dấu hiệu cần ưu tiên",
    description: "Những biểu hiện cần chú ý trước được xác định trong buổi khám.",
  },
  {
    icon: ClipboardText,
    title: "Giải thích lựa chọn chăm sóc",
    description: "Mỗi kiểm tra hoặc hướng điều trị đều đi cùng một lý do rõ ràng.",
  },
  {
    icon: ChatCircleText,
    title: "Hướng dẫn theo dõi tại nhà",
    description: "Bạn biết dấu hiệu nào cần ghi lại và khi nào nên liên hệ PetOne.",
  },
];

export function WhyPetOne() {
  return (
    <section className="section-space bg-surface-soft">
      <div className="shell grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <MotionGroup>
          <MotionItem>
            <SectionHeading
              label="Cách PetOne chăm sóc"
              title="Mỗi quyết định chăm sóc đều được giải thích rõ"
              description="Bạn kể điều đã thấy. PetOne giúp nối các dấu hiệu lại, xác định điều cần ưu tiên và hướng dẫn cách theo dõi tiếp theo."
            />
          </MotionItem>

          <MotionGroup className="mt-9 grid gap-x-7 gap-y-6 sm:grid-cols-2">
            {principles.map((principle) => (
              <MotionItem key={principle.title}>
                <div className="flex gap-3">
                  <principle.icon
                    aria-hidden="true"
                    size={22}
                    weight="duotone"
                    className="mt-0.5 shrink-0 text-brand-blue-dark"
                  />
                  <div>
                    <h3 className="text-sm font-semibold leading-6 text-text-primary">
                      {principle.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-text-secondary">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </MotionItem>
            ))}
          </MotionGroup>

          <MotionItem>
            <CareActionLink
              href="/bac-si"
              variant="text"
              divider
              className="mt-9"
            >
              Tìm hiểu về đội ngũ
            </CareActionLink>
          </MotionItem>
        </MotionGroup>

        <div>
          <figure>
            <ImageReveal className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-image)] border border-border bg-surface shadow-[var(--shadow-soft)]">
              {/* TODO: Replace this concept image with verified PetOne clinic photography before production launch. */}
              <Image
                src="/images/pet-one-care.png"
                alt="Bác sĩ thú y đang trấn an một chú chó nhỏ trong buổi khám"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </ImageReveal>
            <figcaption className="mt-3 text-xs leading-5 text-text-muted">
              Ảnh minh hoạ định hướng, sẽ thay bằng hình ảnh thực tế của PetOne.
            </figcaption>
          </figure>

          <MotionSection delay={0.12}>
            <div className="mt-5 flex items-center gap-4 border-l-2 border-brand-blue bg-surface px-4 py-4 shadow-[var(--shadow-card)]">
              <PawMarker className="size-10 shrink-0" />
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                  <CheckCircle aria-hidden="true" size={18} weight="fill" className="text-brand-blue-dark" />
                  Thông tin rõ ràng
                </div>
                <p className="mt-1 text-xs leading-5 text-text-secondary">
                  Hồ sơ và số liệu chỉ hiển thị sau khi được xác minh.
                </p>
              </div>
            </div>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
