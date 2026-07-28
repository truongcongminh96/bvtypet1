import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import { services as fallbackServices, type Service } from "@/content/site";

export function ServiceGrid({
  items = fallbackServices.slice(0, 3),
}: {
  items?: Service[];
}) {
  const featured = items[0];
  const secondary = items[1];
  const tertiary = items[2];

  if (!featured) return null;

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-28 lg:py-36">
      <span
        aria-hidden="true"
        className="absolute right-[-12rem] top-20 size-[34rem] rounded-full border border-brand-blue/10"
      />
      <div className="shell relative z-10">
        <MotionSection className="max-w-3xl" direction="left">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand-blue-dark">
            Những chăm sóc thường bắt đầu từ đây
          </p>
          <h2 className="section-title mt-5 text-text-primary">
            Dịch vụ không bắt đầu bằng một chỉ định.
            <span className="block text-brand-blue-dark">Nó bắt đầu bằng điều bạn nhận thấy.</span>
          </h2>
        </MotionSection>

        <MotionGroup
          className="mt-14 grid gap-x-6 gap-y-12 lg:grid-cols-12 lg:items-start"
          amount={0.1}
          stagger={0.12}
        >
          <MotionItem className="lg:col-span-8 lg:col-start-4 lg:row-start-1" direction="right">
            <Link
              href={`/dich-vu/${featured.slug}`}
              className="group block focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-dark"
            >
              <figure className="relative aspect-[16/10] overflow-hidden rounded-[2rem_5rem_2rem_2rem] bg-surface-soft shadow-[0_22px_60px_rgba(16,46,58,0.1)]">
                {featured.cardImage ? (
                  <Image
                    src={featured.cardImage.src}
                    alt={featured.cardImage.alt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 64vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                ) : null}
              </figure>
              <div className="relative z-10 -mt-14 ml-4 max-w-[36rem] bg-background px-5 pb-2 pt-5 sm:ml-10 sm:px-8 lg:-ml-28 lg:mt-[-5.5rem]">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-blue-dark">
                  Dịch vụ nổi bật
                </p>
                <h3 className="mt-2 font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.98] text-text-primary">
                  {featured.shortTitle}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-text-secondary">
                  {featured.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-dark">
                  Tìm hiểu dịch vụ
                  <ArrowUpRight aria-hidden="true" size={17} />
                </span>
              </div>
            </Link>
          </MotionItem>

          {secondary ? (
            <MotionItem className="lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:pt-44" direction="left">
              <Link
                href={`/dich-vu/${secondary.slug}`}
                className="group block focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-dark"
              >
                <figure className="relative aspect-[4/5] overflow-hidden rounded-[4rem_1.5rem_4rem_1.5rem] bg-surface-soft">
                  {secondary.cardImage ? (
                    <Image
                      src={secondary.cardImage.src}
                      alt={secondary.cardImage.alt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                  ) : null}
                </figure>
                <h3 className="mt-6 font-display text-4xl font-semibold leading-none text-text-primary">
                  {secondary.shortTitle}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-text-secondary">
                  {secondary.summary}
                </p>
              </Link>
            </MotionItem>
          ) : null}

          {tertiary ? (
            <MotionItem className="lg:col-span-9 lg:col-start-4" direction="right">
              <Link
                href={`/dich-vu/${tertiary.slug}`}
                className="group grid gap-6 border-y border-border py-6 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-dark sm:grid-cols-[1fr_11rem] sm:items-center lg:grid-cols-[1fr_16rem] lg:py-8"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-blue-dark">
                    Chăm sóc tiếp nối
                  </p>
                  <h3 className="mt-2 font-display text-4xl font-semibold leading-none text-text-primary sm:text-5xl">
                    {tertiary.shortTitle}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
                    {tertiary.summary}
                  </p>
                </div>
                <figure className="relative aspect-[16/9] overflow-hidden rounded-[1rem_3rem_1rem_3rem] bg-surface-soft sm:aspect-[4/3]">
                  {tertiary.cardImage ? (
                    <Image
                      src={tertiary.cardImage.src}
                      alt={tertiary.cardImage.alt}
                      fill
                      sizes="(max-width: 639px) 100vw, 16rem"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </figure>
              </Link>
            </MotionItem>
          ) : null}
        </MotionGroup>

        <MotionSection className="mt-12 flex justify-end" direction="right" mobileDirection="left">
          <CareActionLink href="/dich-vu" variant="text" divider>
            Xem toàn bộ dịch vụ
          </CareActionLink>
        </MotionSection>
      </div>
    </section>
  );
}
