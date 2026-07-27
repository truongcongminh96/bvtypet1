import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { services as fallbackServices, type Service } from "@/content/site";

export function ServiceGrid({
  items = fallbackServices.slice(0, 3),
}: {
  items?: Service[];
}) {
  return (
    <MotionGroup className="mt-10 grid gap-5 md:grid-cols-3" amount={0.12}>
      {items.slice(0, 3).map((service, index) => {
        const direction = index === 0 ? "left" : index === 1 ? "none" : "right";

        return (
          <MotionItem
            key={service.slug}
            direction={direction}
            mobileDirection="left"
            scaleFrom={index === 1 ? 0.985 : 1}
          >
            <Link
              href={`/dich-vu/${service.slug}`}
              className="group block h-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow-card)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-soft">
                {service.cardImage ? (
                  <Image
                    src={service.cardImage.src}
                    alt={service.cardImage.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                ) : null}
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-text-primary">
                  {service.shortTitle}
                </h3>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {service.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-dark">
                  Tìm hiểu thêm
                  <ArrowUpRight aria-hidden="true" size={17} />
                </span>
              </div>
            </Link>
          </MotionItem>
        );
      })}
    </MotionGroup>
  );
}
