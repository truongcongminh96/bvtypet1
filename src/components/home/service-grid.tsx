import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { ServiceCarousel } from "@/components/home/service-carousel";
import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import type { HomePageSettings } from "@/content/experience";
import { partitionHomeServices } from "@/content/home-service-presentation";
import { services as fallbackServices, type Service } from "@/content/site";

function imagePosition(service: Service) {
  return service.cardImage?.focalPoint
    ? { objectPosition: service.cardImage.focalPoint }
    : undefined;
}

export function ServiceGrid({
  items = fallbackServices,
  content,
}: {
  items?: Service[];
  content: HomePageSettings["servicesSection"];
}) {
  const { featured, remaining } = partitionHomeServices(
    items,
    fallbackServices,
  );

  if (featured.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <MotionSection className="max-w-[48rem]" direction="left">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.13em] text-brand-blue-dark sm:text-xs">
            {content.eyebrow}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.65rem,7vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.022em] text-text-primary text-balance">
            {content.title}{" "}
            <span className="text-brand-blue-dark">
              {content.titleAccent}
            </span>
          </h2>
        </MotionSection>

        <MotionGroup
          className="mt-12 lg:mt-14"
          amount={0.08}
          stagger={0.1}
        >
          <div
            className="service-carousel-viewport pb-4 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-dark"
            role="region"
            aria-label="Ba dịch vụ nổi bật"
            tabIndex={0}
          >
            {featured.map(({ service, displayTitle }, index) => (
              <MotionItem
                key={service.slug}
                className="w-[min(85vw,22rem)] flex-none snap-start sm:w-[22rem] lg:w-[24rem]"
                direction={index % 2 === 0 ? "left" : "right"}
                mobileDirection="up"
              >
                <Link
                  href={`/dich-vu/${service.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_18px_50px_rgba(16,46,58,0.08)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_24px_60px_rgba(16,46,58,0.12)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-dark"
                >
                  <figure className="relative aspect-[4/3] overflow-hidden bg-surface-soft">
                    {service.cardImage ? (
                      <Image
                        src={service.cardImage.src}
                        alt={service.cardImage.alt}
                        fill
                        sizes="(max-width: 767px) 85vw, 24rem"
                        style={imagePosition(service)}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(22,132,214,0.2),transparent_42%),linear-gradient(145deg,#eef8fc,#dceef7)]"
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-text-primary/22 via-transparent to-transparent"
                    />
                    <span className="absolute left-5 top-5 rounded-full border border-white/70 bg-white/88 px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-[0.12em] text-brand-blue-dark shadow-sm backdrop-blur-sm">
                      Dịch vụ nổi bật {String(index + 1).padStart(2, "0")}
                    </span>
                  </figure>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="font-display text-[2rem] font-semibold leading-[1.02] tracking-[-0.02em] text-text-primary text-balance lg:text-[2.25rem]">
                      {displayTitle}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-text-secondary text-pretty">
                      {service.summary}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-7 text-xs font-bold text-brand-blue-dark">
                      Tìm hiểu dịch vụ
                      <ArrowUpRight
                        aria-hidden="true"
                        size={15}
                        weight="bold"
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </MotionItem>
            ))}
          </div>
        </MotionGroup>

        {remaining.length > 0 ? (
          <MotionSection
            className="mt-14 border-t border-border pt-8 sm:mt-16 sm:pt-9"
            amount={0.08}
          >
            <ServiceCarousel items={remaining} />
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
