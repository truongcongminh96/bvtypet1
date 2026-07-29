import { CalendarDots, Phone } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import { getPhoneHref } from "@/lib/site-config";

export function BookingCta() {
  return (
    <section className="relative min-h-[40rem] overflow-hidden bg-text-primary text-surface sm:min-h-[43rem] lg:min-h-[47rem]">
      <div className="absolute inset-y-0 right-0 w-full sm:w-[64%] lg:w-[56%]">
        <Image
          src="/images/clinic/pet-one-general-exam-dog.jpg"
          alt=""
          fill
          sizes="(max-width: 639px) 100vw, 64vw"
          className="object-cover opacity-55"
          style={{ objectPosition: "50% 44%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-text-primary via-text-primary/35 to-transparent sm:bg-gradient-to-r sm:from-text-primary sm:via-text-primary/55 sm:to-text-primary/5" />
      </div>
      <span
        aria-hidden="true"
        className="absolute -right-24 -top-24 size-[30rem] rounded-full border border-white/10"
      />

      <div className="shell relative z-10 flex min-h-[40rem] items-end pb-16 pt-48 sm:min-h-[43rem] sm:items-center sm:pb-0 sm:pt-0 lg:min-h-[47rem]">
        <MotionSection className="max-w-[45rem]" direction="left">
          <MotionGroup stagger={0.1}>
            <MotionItem direction="left">
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand-blue-soft">
                Khi bạn đã sẵn sàng kể điều mình quan sát
              </p>
            </MotionItem>
            <MotionItem direction="left">
              <h2 className="mt-5 max-w-[44rem] font-display text-[clamp(3.1rem,7vw,6.5rem)] font-semibold leading-[0.96] tracking-[-0.02em]">
                Cùng Pet One nhìn rõ bước tiếp theo.
              </h2>
            </MotionItem>
            <MotionItem direction="left">
              <p className="mt-6 max-w-xl text-base leading-8 text-surface/78">
                Gửi thông tin trước để phòng khám chuẩn bị cuộc trao đổi phù hợp
                với tình trạng và mức độ hợp tác của bé.
              </p>
            </MotionItem>
            <MotionItem direction="left">
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <CareActionLink
                  href="/lien-he#dat-lich"
                  className="w-full sm:w-auto"
                  leadingIcon={<CalendarDots aria-hidden="true" size={19} weight="bold" />}
                >
                  Đặt lịch khám
                </CareActionLink>
                <CareActionLink
                  href={getPhoneHref()}
                  variant="panel-warm"
                  className="w-full sm:w-auto"
                  leadingIcon={<Phone aria-hidden="true" size={18} weight="bold" />}
                >
                  Gọi phòng khám
                </CareActionLink>
              </div>
            </MotionItem>
          </MotionGroup>
        </MotionSection>
      </div>
    </section>
  );
}
