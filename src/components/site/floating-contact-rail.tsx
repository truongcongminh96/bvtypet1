import {
  ChatCircleDots,
  FacebookLogo,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { getContactHref, getPhoneHref, siteConfig } from "@/lib/site-config";

const linkClass =
  "inline-flex size-12 items-center justify-center rounded-full border border-border bg-surface text-brand-blue-dark shadow-[0_10px_28px_rgba(16,46,58,0.13)] transition-transform hover:-translate-y-0.5 hover:border-brand-blue/40";

export function FloatingContactRail() {
  return (
    <nav
      aria-label="Liên hệ nhanh"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex xl:right-6"
    >
      <Link
        href={getContactHref(siteConfig.zaloUrl)}
        target={siteConfig.zaloUrl ? "_blank" : undefined}
        rel={siteConfig.zaloUrl ? "noreferrer" : undefined}
        aria-label="Liên hệ Pet One qua Zalo"
        className={linkClass}
      >
        <ChatCircleDots aria-hidden="true" size={22} weight="fill" />
      </Link>
      <Link href={getPhoneHref()} aria-label="Gọi Pet One" className={linkClass}>
        <Phone aria-hidden="true" size={21} weight="fill" className="text-brand-red-strong" />
      </Link>
      <Link
        href={getContactHref(siteConfig.facebookUrl)}
        target={siteConfig.facebookUrl ? "_blank" : undefined}
        rel={siteConfig.facebookUrl ? "noreferrer" : undefined}
        aria-label="Facebook Pet One"
        className={linkClass}
      >
        <FacebookLogo aria-hidden="true" size={22} weight="fill" />
      </Link>
    </nav>
  );
}
