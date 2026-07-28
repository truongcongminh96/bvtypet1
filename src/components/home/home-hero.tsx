import { CalendarDots, Phone } from "@phosphor-icons/react/dist/ssr";

import { ArchImage } from "@/components/home/arch-image";
import { TrustStrip } from "@/components/home/trust-strip";
import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import type { HomePageSettings } from "@/content/experience";
import { getPhoneHref } from "@/lib/site-config";

export function HomeHero({ settings }: { settings: HomePageSettings }) {
  return (
    <section className="home-hero relative overflow-hidden">
      <div className="shell relative z-10 grid min-h-[42rem] items-center gap-10 pb-28 pt-12 md:pt-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-6 lg:pb-36 lg:pt-12 xl:min-h-[47rem]">
        <MotionGroup
          className="relative z-10 max-w-[39rem]"
          amount={0.3}
          stagger={0.11}
        >
          <MotionItem direction="left">
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.13em] text-brand-blue-dark">
              <span className="h-px w-9 bg-brand-blue/45" aria-hidden="true" />
              Chăm từ điều bé chưa thể nói
            </p>
          </MotionItem>
          <MotionItem direction="left">
            <h1 className="display-title max-w-[10ch] text-text-primary">
              Hiểu đúng.
              <span className="block text-brand-blue">Chăm bé tốt hơn.</span>
            </h1>
          </MotionItem>
          <MotionItem direction="left">
            <p className="body-large mt-6 max-w-[35rem] text-text-secondary">
              Pet One đồng hành cùng bạn nhận ra những thay đổi nhỏ trong sức
              khỏe và hành vi của thú cưng, để mỗi quyết định chăm sóc đều rõ
              ràng và kịp thời.
            </p>
          </MotionItem>
          <MotionItem direction="left">
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
                leadingIcon={<Phone aria-hidden="true" size={18} weight="bold" />}
              >
                Gọi phòng khám
              </CareActionLink>
            </div>
          </MotionItem>
          <MotionItem direction="left">
            <div className="mt-7">
              <TrustStrip
                rating={settings.rating}
                reviewCount={settings.reviewCount}
                href={settings.googleMapsUrl}
              />
            </div>
          </MotionItem>
        </MotionGroup>

        <div className="relative">
          <ArchImage />
        </div>
      </div>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[4.5rem] w-full sm:h-[6rem] lg:h-[7.5rem]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80C192 112 356 114 532 84C748 47 917 14 1129 42C1268 60 1367 77 1440 66V120H0Z"
          fill="var(--surface-warm)"
        />
      </svg>
    </section>
  );
}
