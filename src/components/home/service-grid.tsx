import { ArrowUpRight, Stethoscope } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { ServiceCarousel } from "@/components/home/service-carousel";
import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import { services as fallbackServices, type Service } from "@/content/site";

function imagePosition(service: Service) {
  return service.cardImage?.focalPoint
    ? { objectPosition: service.cardImage.focalPoint }
    : undefined;
}

export function ServiceGrid({
  items = fallbackServices,
}: {
  items?: Service[];
}) {
  const [featured, secondary, ...carouselServices] = items;

  if (!featured) return null;

  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-14 lg:py-12">
      <div className="shell">
        <MotionGroup
          className="service-collage"
          amount={0.08}
          stagger={0.1}
        >
          <MotionItem
            className="service-collage__heading"
            direction="left"
            mobileDirection="up"
          >
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.13em] text-brand-blue-dark sm:text-xs">
              Những chăm sóc thường bắt đầu từ đây
            </p>
            <h2 className="service-collage__statement mt-5 font-display font-semibold text-text-primary">
              Dịch vụ không bắt đầu bằng một chỉ định.{" "}
              <span className="text-brand-blue-dark">
                Nó bắt đầu bằng điều bạn nhận thấy.
              </span>
            </h2>
          </MotionItem>

          <MotionItem
            className="service-collage__featured"
            direction="right"
            mobileDirection="up"
          >
            <Link
              href={`/dich-vu/${featured.slug}`}
              className="group block rounded-[2.25rem] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-dark"
            >
              <figure className="service-collage__featured-image relative overflow-hidden bg-surface-soft shadow-[0_20px_50px_rgba(16,46,58,0.08)]">
                {featured.cardImage ? (
                  <Image
                    src={featured.cardImage.src}
                    alt={featured.cardImage.alt}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 82vw, 47vw"
                    style={imagePosition(featured)}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.018]"
                  />
                ) : null}
              </figure>

              <div
                className="featured-service-overlay"
                data-featured-service-overlay
              >
                <div className="featured-service-overlay__header">
                  <span
                    className="featured-service-overlay__icon"
                    aria-hidden="true"
                  >
                    <Stethoscope size={22} weight="regular" />
                  </span>
                  <div>
                    <p className="featured-service-overlay__eyebrow">
                      Dịch vụ nổi bật
                    </p>
                    <h3
                      className="featured-service-overlay__title font-display text-text-primary"
                      data-featured-service-title
                    >
                      {featured.shortTitle}
                    </h3>
                  </div>
                </div>
                <p className="featured-service-overlay__description text-text-secondary">
                  {featured.summary}
                </p>
                <span className="featured-service-overlay__cta">
                  Tìm hiểu dịch vụ
                  <ArrowUpRight
                    aria-hidden="true"
                    className="featured-service-overlay__cta-icon"
                    size={15}
                    weight="bold"
                  />
                </span>
              </div>
            </Link>
          </MotionItem>

          {secondary ? (
            <MotionItem
              className="service-collage__secondary"
              direction="left"
              mobileDirection="up"
            >
              <Link
                href={`/dich-vu/${secondary.slug}`}
                className="group grid gap-5 rounded-[2rem] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-dark"
              >
                <div className="service-collage__secondary-copy">
                  <h3 className="font-display text-[2rem] font-semibold leading-none text-text-primary sm:text-4xl lg:text-[2.2rem]">
                    {secondary.shortTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary lg:text-[0.8125rem] lg:leading-6">
                    {secondary.summary}
                  </p>
                </div>
                <figure className="service-collage__secondary-image relative overflow-hidden bg-surface-soft shadow-[0_14px_34px_rgba(16,46,58,0.07)]">
                  {secondary.cardImage ? (
                    <Image
                      src={secondary.cardImage.src}
                      alt={secondary.cardImage.alt}
                      fill
                      sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 48vw, 22vw"
                      style={imagePosition(secondary)}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.022]"
                    />
                  ) : null}
                </figure>
              </Link>
            </MotionItem>
          ) : null}
        </MotionGroup>

        {carouselServices.length > 0 ? (
          <MotionSection
            className="service-more border-t border-border pt-8 sm:pt-9"
            amount={0.08}
          >
            <ServiceCarousel items={carouselServices} />
            <div className="mt-7 flex justify-end pr-1 sm:mt-8">
              <CareActionLink href="/dich-vu" variant="text" divider>
                Xem toàn bộ dịch vụ
              </CareActionLink>
            </div>
          </MotionSection>
        ) : null}
      </div>
    </section>
  );
}
