import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import type { ServiceDirectoryItem } from "@/content/service-directory";
import type { Service } from "@/content/site";

export function ServiceList({
  items,
}: {
  items: Array<{
    service: Service;
    presentation: ServiceDirectoryItem;
  }>;
}) {
  return (
    <MotionGroup
      className="border-y border-border/80 py-2"
      amount={0.08}
      stagger={0.07}
    >
      <ul>
        {items.map(({ service }) => (
          <MotionItem key={service.slug}>
            <li>
              <Link
                href={`/dich-vu/${service.slug}`}
                className="group/service-list flex min-h-11 items-center justify-between gap-4 py-1.5 text-sm font-medium leading-5 text-text-primary transition-colors hover:text-brand-blue-dark sm:text-[0.95rem] lg:min-h-9"
              >
                <span>{service.title}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  size={16}
                  weight="bold"
                  className="shrink-0 text-brand-blue-dark/65 transition-transform duration-200 group-hover/service-list:translate-x-0.5 group-hover/service-list:-translate-y-0.5 motion-reduce:transform-none"
                />
              </Link>
            </li>
          </MotionItem>
        ))}
      </ul>
    </MotionGroup>
  );
}
