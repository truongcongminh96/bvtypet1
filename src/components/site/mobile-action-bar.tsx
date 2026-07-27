import {
  CalendarDots,
  ChatCircleDots,
  FacebookLogo,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { getContactHref, getPhoneHref, siteConfig } from "@/lib/site-config";

const iconClass =
  "inline-flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-surface text-brand-blue-dark";

export function MobileActionBar() {
  return (
    <nav
      aria-label="Hành động nhanh"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/96 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur-lg md:hidden"
    >
      <div className="flex gap-1.5">
        <Link
          href="/lien-he#dat-lich"
          className={buttonStyles({ className: "min-h-12 min-w-0 flex-1 px-3 text-xs sm:text-sm" })}
        >
          <CalendarDots aria-hidden="true" size={18} weight="bold" />
          Đặt lịch
        </Link>
        <Link
          href={getContactHref(siteConfig.zaloUrl)}
          target={siteConfig.zaloUrl ? "_blank" : undefined}
          rel={siteConfig.zaloUrl ? "noreferrer" : undefined}
          aria-label="Liên hệ Pet One qua Zalo"
          className={iconClass}
        >
          <ChatCircleDots aria-hidden="true" size={20} weight="fill" />
        </Link>
        <Link href={getPhoneHref()} aria-label="Gọi Pet One" className={iconClass}>
          <Phone aria-hidden="true" size={19} weight="fill" className="text-brand-red-strong" />
        </Link>
        <Link
          href={getContactHref(siteConfig.facebookUrl)}
          target={siteConfig.facebookUrl ? "_blank" : undefined}
          rel={siteConfig.facebookUrl ? "noreferrer" : undefined}
          aria-label="Facebook Pet One"
          className={iconClass}
        >
          <FacebookLogo aria-hidden="true" size={20} weight="fill" />
        </Link>
      </div>
    </nav>
  );
}
