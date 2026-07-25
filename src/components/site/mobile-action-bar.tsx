import { CalendarDots, Phone } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-clinical-white/94 p-2.5 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/lien-he"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-care-red px-3 text-sm font-bold text-white"
        >
          <Phone size={18} weight="bold" />
          Gọi phòng khám
        </Link>
        <Link
          href="/lien-he#dat-lich"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-medical-blue px-3 text-sm font-bold text-white"
        >
          <CalendarDots size={18} weight="bold" />
          Đặt lịch khám
        </Link>
      </div>
    </div>
  );
}
