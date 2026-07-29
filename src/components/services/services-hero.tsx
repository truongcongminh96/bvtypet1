import { CaretRight, House } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { ImageReveal } from "@/components/motion/image-reveal";
import { MotionGroup, MotionItem } from "@/components/motion/reveal";

export function ServicesHero() {
  return (
    <section className="overflow-hidden border-b border-border bg-surface-soft">
      <div className="shell grid min-h-[24rem] items-center gap-9 py-10 sm:min-h-[27rem] sm:py-12 lg:min-h-[29rem] lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-12">
        <MotionGroup className="max-w-3xl" amount={0.08} stagger={0.08}>
          <MotionItem>
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex items-center gap-2 text-xs font-semibold text-text-secondary"
            >
              <Link
                href="/"
                className="inline-flex min-h-10 items-center gap-1.5 transition-colors hover:text-brand-blue-dark"
              >
                <House aria-hidden="true" size={15} weight="fill" />
                Trang chủ
              </Link>
              <CaretRight aria-hidden="true" size={13} />
              <span aria-current="page" className="text-brand-blue-dark">
                Dịch vụ
              </span>
            </nav>
          </MotionItem>
          <MotionItem>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue-dark">
              Chăm sóc tại PetOne
            </p>
          </MotionItem>
          <MotionItem>
            <h1 className="mt-3 font-display text-[clamp(3rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.025em] text-text-primary text-balance">
              Dịch vụ tại PetOne
            </h1>
          </MotionItem>
          <MotionItem>
            <p className="mt-4 max-w-xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
              Mỗi nhóm dịch vụ là một hành trình chăm sóc riêng, bắt đầu từ điều bạn đang quan sát ở bé.
            </p>
          </MotionItem>
        </MotionGroup>

        <MotionGroup className="hidden sm:block" amount={0.1} stagger={0.08}>
          <MotionItem>
            <ImageReveal className="relative ml-auto aspect-[5/3] max-w-[31rem] overflow-hidden rounded-[18px_38px_38px_38px] border border-border bg-surface shadow-[0_18px_45px_rgba(16,46,58,0.08)]">
              <Image
                src="/images/clinic/pet-one-ultrasound-team.jpg"
                alt="Đội ngũ Pet One thực hiện siêu âm cho thú cưng tại phòng khám"
                fill
                priority
                sizes="(max-width: 1023px) 82vw, 31rem"
                className="object-cover object-[50%_52%]"
              />
              <span className="absolute bottom-3 right-3 rounded-full border border-white/70 bg-white/92 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-text-secondary shadow-sm backdrop-blur-sm">
                Hình ảnh tại Pet One
              </span>
            </ImageReveal>
          </MotionItem>
        </MotionGroup>
      </div>
    </section>
  );
}
