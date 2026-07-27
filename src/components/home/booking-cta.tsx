import { ArrowUpRight, CalendarDots } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";

export function BookingCta() {
  return (
    <section className="section-space">
      <div className="shell">
        <MotionGroup className="relative overflow-hidden rounded-[var(--radius-image)] bg-text-primary px-6 py-12 text-surface sm:px-10 lg:px-14 lg:py-16">
          <Image
            src="/images/pet-one-care.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-text-primary via-text-primary/90 to-text-primary/35" />
          <MotionItem className="relative max-w-2xl">
            <p className="text-sm font-semibold text-brand-blue-soft">
              Đăng ký nhận tư vấn
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.04]">
              Kể Pet One điều bạn đang quan sát
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-surface/80">
              Gửi thông tin trước để phòng khám chuẩn bị cuộc trao đổi phù hợp với tình trạng của bé.
            </p>
            <CareActionLink
              href="/lien-he#dat-lich"
              className="mt-8"
              leadingIcon={<CalendarDots aria-hidden="true" size={19} weight="bold" />}
              trailingIcon={<ArrowUpRight aria-hidden="true" size={17} />}
            >
              Liên hệ ngay
            </CareActionLink>
          </MotionItem>
        </MotionGroup>
      </div>
    </section>
  );
}
