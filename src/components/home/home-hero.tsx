import { CalendarDots, Phone } from "@phosphor-icons/react/dist/ssr";

import { ArchImage } from "@/components/home/arch-image";
import { HeroMedia } from "@/components/home/hero-media";
import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import { getPhoneHref } from "@/lib/site-config";

export function HomeHero() {
  return (
    <section className="home-hero relative isolate overflow-hidden">
      <div className="home-hero__desktop-media">
        <HeroMedia />
      </div>
      <div className="home-hero__scrim" aria-hidden="true" />

      <div className="home-hero__layout shell relative z-10 grid items-center gap-10 pb-28 pt-10 md:gap-12 md:pb-32 md:pt-14 lg:grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)] lg:gap-0 lg:pb-32 lg:pt-10">
        <MotionGroup
          className="relative z-10 max-w-[39rem] lg:pr-4 xl:pr-8"
          amount={0.15}
          delay={0.12}
          stagger={0.1}
        >
          <MotionItem direction="left">
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.13em] text-brand-blue-dark sm:mb-5">
              <span className="h-px w-9 bg-brand-blue/45" aria-hidden="true" />
              Chăm từ điều bé chưa thể nói
            </p>
          </MotionItem>
          <MotionItem direction="left">
            <h1 className="home-hero__title text-text-primary">
              <span className="block">Hiểu đúng.</span>
              <span className="block text-brand-blue sm:whitespace-nowrap">
                Chăm bé tốt hơn.
              </span>
            </h1>
          </MotionItem>
          <MotionItem direction="up">
            <p className="home-hero__description mt-5 max-w-[35rem] text-text-secondary sm:mt-6">
              Pet One đồng hành cùng bạn nhận ra những thay đổi nhỏ trong sức
              khỏe và hành vi của thú cưng, để mỗi quyết định chăm sóc đều rõ
              ràng và kịp thời.
            </p>
          </MotionItem>
          <MotionItem direction="up">
            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-nowrap">
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
                  <Phone aria-hidden="true" size={18} weight="bold" />
                }
              >
                Gọi phòng khám
              </CareActionLink>
            </div>
          </MotionItem>
        </MotionGroup>

        <div className="relative lg:hidden">
          <ArchImage />
        </div>
      </div>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-20 h-[4.5rem] w-full sm:h-[6rem] lg:h-[7.5rem]"
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
