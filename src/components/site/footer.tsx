import {
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { ConsultationForm } from "@/components/consultation/consultation-form";
import { Brand } from "@/components/site/brand";
import { getPhoneHref, siteConfig } from "@/lib/site-config";

const informationLinks = [
  { href: "/gioi-thieu", label: "Giới thiệu Pet One" },
  { href: "/dich-vu", label: "Dịch vụ" },
  { href: "/bac-si", label: "Đội ngũ bác sĩ" },
  { href: "/cam-nang", label: "Cẩm nang chăm bé" },
  { href: "/lien-he", label: "Liên hệ" },
  { href: "/chinh-sach-bao-mat", label: "Chính sách bảo mật" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-soft">
      <div className="shell grid gap-10 py-14 lg:grid-cols-[1.05fr_0.7fr_1.25fr] lg:gap-12 lg:py-16">
        <div>
          <Brand />
          <p className="mt-5 max-w-sm text-sm leading-7 text-text-secondary">
            Pet One giúp người nuôi hiểu rõ tình trạng của bé và biết điều gì cần làm tiếp theo.
          </p>
          <address className="mt-6 not-italic">
            <ul className="grid gap-3 text-sm leading-6 text-text-secondary">
              <li className="flex gap-3">
                <MapPin
                  aria-hidden="true"
                  size={18}
                  className="mt-0.5 shrink-0 text-brand-blue-dark"
                />
                {siteConfig.address ? (
                  <Link
                    href={siteConfig.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {siteConfig.address}
                  </Link>
                ) : (
                  <span>Địa chỉ đang được cập nhật.</span>
                )}
              </li>
              <li className="flex gap-3"><Phone aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-brand-red-strong" />{siteConfig.phone ? <Link href={getPhoneHref()}>{siteConfig.phone}</Link> : <span>Số điện thoại đang được cập nhật.</span>}</li>
              <li className="flex gap-3"><EnvelopeSimple aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-brand-blue-dark" />{siteConfig.email ? <Link href={`mailto:${siteConfig.email}`}>{siteConfig.email}</Link> : <span>Email đang được cập nhật.</span>}</li>
              <li className="flex gap-3"><Clock aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-brand-blue-dark" /><span>{siteConfig.openingHours || "Giờ hoạt động đang được cập nhật."}</span></li>
            </ul>
          </address>
        </div>

        <nav aria-label="Thông tin tại footer">
          <h2 className="font-display text-2xl font-semibold text-text-primary">Về Pet One</h2>
          <ul className="mt-5 grid gap-3">
            {informationLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm leading-6 text-text-secondary transition-colors hover:text-brand-blue-dark">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-2xl font-semibold text-text-primary">Đăng ký tư vấn</h2>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Để lại thông tin ngắn, Pet One sẽ liên hệ lại để trao đổi rõ hơn.
          </p>
          <ConsultationForm />
        </div>
      </div>
      <div className="border-t border-border">
        <div className="shell flex flex-col gap-2 py-5 text-xs leading-5 text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Pet One.</p>
          <p>Nội dung chăm sóc có tính tham khảo, không thay thế chẩn đoán trực tiếp.</p>
        </div>
      </div>
    </footer>
  );
}
