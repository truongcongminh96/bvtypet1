import { CalendarDots, Phone } from "@phosphor-icons/react/dist/ssr";

import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import { getPhoneHref, siteConfig } from "@/lib/site-config";

export function BookingCta() {
  return (
    <section className="pb-[clamp(4.5rem,8vw,8rem)]">
      <div className="shell">
        <MotionGroup className="grid gap-8 border-y border-border py-10 sm:py-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <MotionItem className="max-w-3xl">
            <h2 className="section-title text-text-primary">
              Khi bạn nhận thấy một thay đổi, hãy kể PetOne điều bạn đã thấy
            </h2>
            <p className="body-large mt-5 max-w-2xl text-text-secondary">
              Gửi thông tin trước để PetOne hiểu tình trạng của bé và chuẩn bị cuộc trao đổi phù hợp.
            </p>
          </MotionItem>

          <MotionItem>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch xl:flex-row xl:items-center">
              <CareActionLink
                href="/lien-he#dat-lich"
                className="w-full sm:w-auto"
                leadingIcon={
                  <CalendarDots aria-hidden="true" size={19} weight="bold" />
                }
              >
                Đặt lịch khám
              </CareActionLink>
              <CareActionLink
                href={getPhoneHref()}
                variant="secondary"
                className="w-full sm:w-auto"
                leadingIcon={
                  <Phone
                    aria-hidden="true"
                    size={18}
                    weight="bold"
                    className="text-brand-red-strong"
                  />
                }
                aria-label={
                  siteConfig.phone ? `Gọi ${siteConfig.phone}` : "Gọi phòng khám"
                }
              >
                {siteConfig.phone || "Gọi phòng khám"}
              </CareActionLink>
            </div>
          </MotionItem>
        </MotionGroup>
      </div>
    </section>
  );
}
