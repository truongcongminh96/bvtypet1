import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import type { Service } from "@/content/site";

export function RelatedServices({ services }: { services: Service[] }) {
  if (services.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-services-title"
      className="bg-background pb-[clamp(4.5rem,8vw,7.5rem)] pt-8"
    >
      <MotionGroup className="shell" amount={0.12}>
        <MotionItem>
          <h2
            id="related-services-title"
            className="font-display text-[clamp(2.2rem,3.8vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-text-primary"
          >
            Dịch vụ bạn có thể xem thêm
          </h2>
        </MotionItem>
        <MotionItem>
          <ul className="mt-8 grid border-t border-border-strong md:grid-cols-2 md:gap-x-10">
            {services.map((service) => (
              <li key={service.slug} className="border-b border-border">
                <CareActionLink
                  href={`/dich-vu/${service.slug}`}
                  variant="text"
                  aria-label={`Xem dịch vụ ${service.title}`}
                  className="w-full rounded-none px-1 py-5 text-left sm:py-6"
                >
                  <span>
                    <span className="block font-display text-xl font-semibold leading-7 text-text-primary sm:text-2xl">
                      {service.title}
                    </span>
                    <span className="mt-2 block text-sm font-normal leading-6 text-text-secondary">
                      {service.summary}
                    </span>
                  </span>
                </CareActionLink>
              </li>
            ))}
          </ul>
        </MotionItem>
        <MotionItem>
          <CareActionLink
            href="/dich-vu"
            variant="text"
            className="mt-6"
          >
            Xem tất cả dịch vụ
          </CareActionLink>
        </MotionItem>
      </MotionGroup>
    </section>
  );
}
