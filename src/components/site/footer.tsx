import { ArrowUpRight, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Brand } from "@/components/site/brand";

const footerLinks = [
  { href: "/dich-vu", label: "Dịch vụ" },
  { href: "/bac-si", label: "Bác sĩ" },
  { href: "/cam-nang", label: "Cẩm nang" },
  { href: "/lien-he", label: "Liên hệ" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ice">
      <div className="shell grid gap-12 py-14 md:grid-cols-[1.25fr_0.75fr_1fr]">
        <div>
          <Brand />
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted-ink">
            Chăm sóc thú y với quy trình rõ ràng, giao tiếp dễ hiểu và sự tôn
            trọng dành cho từng thú cưng.
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-deep-navy">
            Khám phá
          </h2>
          <ul className="mt-5 grid gap-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-ink transition-colors hover:text-medical-blue"
                  href={link.href}
                >
                  {link.label}
                  <ArrowUpRight size={14} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-deep-navy">
            Thông tin phòng khám
          </h2>
          <ul className="mt-5 grid gap-4 text-sm leading-6 text-muted-ink">
            <li className="flex gap-3">
              <Phone className="mt-0.5 shrink-0 text-medical-blue" size={18} />
              Số điện thoại sẽ hiển thị sau khi được cấu hình.
            </li>
            <li className="flex gap-3">
              <EnvelopeSimple
                className="mt-0.5 shrink-0 text-medical-blue"
                size={18}
              />
              Email tiếp nhận lịch hẹn được bảo vệ trên máy chủ.
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 shrink-0 text-medical-blue" size={18} />
              Địa chỉ phòng khám đang được cập nhật.
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="shell flex flex-col gap-2 py-5 text-xs text-muted-ink sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Pet One. Nội dung chăm sóc có tính tham khảo.</p>
          <p>Thiết kế cho trải nghiệm nhẹ nhàng của người nuôi và thú cưng.</p>
        </div>
      </div>
    </footer>
  );
}
