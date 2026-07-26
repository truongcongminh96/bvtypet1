import { CalendarDots, Phone } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { getPhoneHref, siteConfig } from "@/lib/site-config";

export function MobileActionBar() {
  return (
    <nav
      aria-label="Hành động nhanh"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/96 px-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-lg md:hidden"
    >
      <div className="flex gap-2">
        <Link
          href={getPhoneHref()}
          aria-label={
            siteConfig.phone ? `Gọi ${siteConfig.phone}` : "Gọi phòng khám"
          }
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-sm font-semibold text-text-primary"
        >
          <Phone
            aria-hidden="true"
            size={18}
            weight="bold"
            className="text-brand-red-strong"
          />
          Gọi
        </Link>
        <Link
          href="/lien-he#dat-lich"
          className={buttonStyles({ className: "min-h-12 flex-1 px-3" })}
        >
          <CalendarDots aria-hidden="true" size={18} weight="bold" />
          Đặt lịch khám
        </Link>
      </div>
    </nav>
  );
}
