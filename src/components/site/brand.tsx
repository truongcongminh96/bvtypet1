import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import {
  fallbackSiteSettings,
  type SiteSettings,
} from "@/lib/site-config";

export function Brand({
  compact = false,
  settings = fallbackSiteSettings,
}: {
  compact?: boolean;
  settings?: Pick<SiteSettings, "name" | "tagline" | "logo">;
}) {
  const logo = settings.logo ?? fallbackSiteSettings.logo!;

  return (
    <Link
      href="/"
      aria-label={`${settings.name}, về trang chủ`}
      className="inline-flex items-center gap-3"
    >
      <span className="relative block size-12 shrink-0 overflow-hidden rounded-full border border-border-strong bg-white">
        <Image
          src={logo.src}
          alt=""
          fill
          sizes="48px"
          className="object-cover"
          style={
            logo.focalPoint ? { objectPosition: logo.focalPoint } : undefined
          }
          priority
        />
      </span>
      <span className={cn("leading-none", compact && "sr-only sm:not-sr-only")}>
        <span className="block text-[1.2rem] font-semibold tracking-[-0.025em] text-deep-navy">
          {settings.name}
        </span>
        <span className="mt-1 block text-[0.68rem] font-medium tracking-[0.02em] text-brand-blue-dark">
          {settings.tagline}
        </span>
      </span>
    </Link>
  );
}
