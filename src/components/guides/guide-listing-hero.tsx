import { CaretRight, House } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { CategoryNavigation } from "@/components/guides/category-navigation";
import { ImageReveal } from "@/components/motion/image-reveal";
import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { guideHeroMedia } from "@/content/guide-presentation";
import type { ArticleCategorySlug } from "@/content/site";

export function GuideListingHero({
  activeCategory,
}: {
  activeCategory: "all" | ArticleCategorySlug;
}) {
  return (
    <section className="overflow-hidden border-b border-border bg-surface-soft">
      <div className="shell grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-x-14 lg:gap-y-8 lg:py-16">
        <MotionGroup className="order-1 min-w-0 max-w-[39rem]" amount={0.12}>
          <MotionItem>
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 text-xs font-semibold text-text-secondary"
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
                Cẩm nang
              </span>
            </nav>
          </MotionItem>
          <MotionItem>
            <p className="text-sm font-semibold text-brand-blue-dark">
              Thư viện quan sát dành cho người nuôi
            </p>
          </MotionItem>
          <MotionItem>
            <h1 className="mt-4 font-display text-[clamp(2.8rem,5.2vw,5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-text-primary text-balance">
              Quan sát tốt hơn,
              <span className="block text-brand-blue">chăm sóc chủ động hơn</span>
            </h1>
          </MotionItem>
          <MotionItem>
            <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
              Kiến thức ngắn gọn giúp bạn nhận ra thay đổi, chuẩn bị khi cần
              khám và tiếp tục theo dõi bé tại nhà.
            </p>
          </MotionItem>
        </MotionGroup>

        <figure className="order-3 mx-auto w-full max-w-[43rem] lg:order-2">
          <div className="relative px-2 pb-3 pt-3 sm:px-5 sm:pb-6 sm:pt-5">
            <div
              aria-hidden="true"
              className="absolute inset-x-[7%] bottom-[8%] top-[10%] rounded-[var(--radius-image)] bg-brand-blue-soft"
            />
            <ImageReveal className="relative grid aspect-[16/12] grid-cols-[1.08fr_0.92fr] grid-rows-2 gap-2 overflow-hidden rounded-[18px_36px_36px_36px] border border-border bg-surface p-2 shadow-[0_24px_60px_rgba(16,46,58,0.1)] sm:gap-3 sm:p-3">
              <div className="relative row-span-2 overflow-hidden rounded-[12px_26px_26px_26px] bg-surface-soft">
                <Image
                  src={guideHeroMedia[0].src}
                  alt={guideHeroMedia[0].alt}
                  fill
                  priority
                  sizes="(max-width: 1023px) 55vw, 31vw"
                  style={{ objectPosition: guideHeroMedia[0].focalPoint }}
                  className="object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-[22px_12px_22px_22px] bg-surface-soft">
                <Image
                  src={guideHeroMedia[1].src}
                  alt={guideHeroMedia[1].alt}
                  fill
                  sizes="(max-width: 1023px) 40vw, 23vw"
                  style={{ objectPosition: guideHeroMedia[1].focalPoint }}
                  className="object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-[12px_22px_22px_22px] bg-surface-soft">
                <Image
                  src={guideHeroMedia[2].src}
                  alt={guideHeroMedia[2].alt}
                  fill
                  sizes="(max-width: 1023px) 40vw, 23vw"
                  style={{ objectPosition: guideHeroMedia[2].focalPoint }}
                  className="object-cover"
                />
              </div>
            </ImageReveal>
          </div>
        </figure>

        <MotionGroup
          className="order-2 min-w-0 lg:order-3 lg:col-span-2"
          amount={0.2}
        >
          <MotionItem>
            <CategoryNavigation
              activeCategory={activeCategory}
              className="mt-0"
            />
          </MotionItem>
        </MotionGroup>
      </div>
    </section>
  );
}
