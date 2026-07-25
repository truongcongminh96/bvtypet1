import {
  Heartbeat,
  Microscope,
  Scan,
  ShieldCheck,
  Tooth,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { services as fallbackServices, type Service } from "@/content/site";
import { cn } from "@/lib/cn";

const iconBySlug = {
  "kham-tong-quat": Heartbeat,
  "tiem-phong": ShieldCheck,
  "chan-doan-hinh-anh": Scan,
  "xet-nghiem": Microscope,
  "cham-soc-rang-mieng": Tooth,
};

const layoutByIndex = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-8",
];

const accentByName = {
  blue: "bg-medical-blue text-white border-medical-blue",
  red: "bg-care-red text-white border-care-red",
  navy: "bg-deep-navy text-clinical-white border-deep-navy",
  ice: "bg-ice text-deep-navy border-line",
};

export function ServiceBento({
  items = fallbackServices,
}: {
  items?: Service[];
}) {
  return (
    <div className="mt-12 grid gap-4 md:auto-rows-[13.5rem] md:grid-cols-12">
      {items.map((service, index) => {
        const Icon =
          iconBySlug[service.slug as keyof typeof iconBySlug] ?? Heartbeat;
        const featured = index === 0;

        return (
          <Link
            href={`/dich-vu/${service.slug}`}
            key={service.slug}
            className={cn(
              "group relative overflow-hidden rounded-3xl border p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(8,45,70,0.14)]",
              accentByName[service.accent],
              layoutByIndex[index],
            )}
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <span
                  className={cn(
                    "inline-flex size-11 items-center justify-center rounded-2xl",
                    service.accent === "ice"
                      ? "bg-medical-blue text-white"
                      : "bg-white/14 text-white",
                  )}
                >
                  <Icon size={23} weight="duotone" />
                </span>
                <span className="text-xs font-bold opacity-70">
                  0{index + 1}
                </span>
              </div>

              <div className={cn(featured && "max-w-md")}>
                <h3
                  className={cn(
                    "font-display text-xl font-extrabold tracking-[-0.035em]",
                    featured && "text-3xl sm:text-4xl",
                  )}
                >
                  {service.title}
                </h3>
                <p
                  className={cn(
                    "mt-3 max-w-lg text-sm leading-6 opacity-82",
                    featured && "sm:text-base sm:leading-7",
                  )}
                >
                  {service.summary}
                </p>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-8 size-32 rounded-full border-[18px] border-white/10 transition-transform duration-500 group-hover:scale-110" />
          </Link>
        );
      })}
    </div>
  );
}
