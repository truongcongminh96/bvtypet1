import {
  Clock,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Brand } from "@/components/site/brand";
import { getPhoneHref, siteConfig } from "@/lib/site-config";

const serviceLinks = [
  { href: "/dich-vu/kham-tong-quat", label: "Khám tổng quát" },
  { href: "/dich-vu/tiem-phong", label: "Tiêm phòng" },
  { href: "/dich-vu/noi-khoa", label: "Nội khoa" },
  { href: "/dich-vu/ngoai-khoa", label: "Ngoại khoa" },
  { href: "/dich-vu/spa-grooming", label: "Spa & Grooming" },
];

const informationLinks = [
  { href: "/bac-si", label: "Đội ngũ bác sĩ" },
  { href: "/cam-nang", label: "Cẩm nang chăm bé" },
  { href: "/lien-he", label: "Thông tin liên hệ" },
];

export function Footer() {
  const phoneHref = getPhoneHref();
  const hasSocialLinks = Boolean(
    siteConfig.facebookUrl || siteConfig.instagramUrl,
  );

  return (
    <footer className="border-t border-border bg-surface-soft">
      <div className="shell grid gap-x-8 gap-y-12 py-14 md:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.8fr_1.25fr] lg:py-16">
        <div>
          <Brand />
          <p className="mt-5 max-w-sm text-sm leading-7 text-text-secondary">
            PetOne giúp người nuôi hiểu rõ tình trạng của bé và biết điều gì cần làm tiếp theo.
          </p>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-text-primary">
              Kết nối với PetOne
            </h2>
            {hasSocialLinks ? (
              <nav className="mt-3 flex gap-2" aria-label="Mạng xã hội của PetOne">
                {siteConfig.facebookUrl ? (
                  <Link
                    href={siteConfig.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook PetOne"
                    className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-surface text-brand-blue-dark transition-colors hover:border-brand-blue/40 hover:bg-brand-blue-soft"
                  >
                    <FacebookLogo aria-hidden="true" size={21} weight="fill" />
                  </Link>
                ) : null}
                {siteConfig.instagramUrl ? (
                  <Link
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram PetOne"
                    className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-surface text-brand-blue-dark transition-colors hover:border-brand-blue/40 hover:bg-brand-blue-soft"
                  >
                    <InstagramLogo aria-hidden="true" size={21} weight="bold" />
                  </Link>
                ) : null}
              </nav>
            ) : (
              <p className="mt-2 text-xs leading-5 text-text-muted">
                Liên kết mạng xã hội đang được cập nhật.
              </p>
            )}
          </div>
        </div>

        <nav aria-label="Dịch vụ tại footer">
          <h2 className="text-sm font-semibold text-text-primary">Dịch vụ</h2>
          <ul className="mt-5 grid gap-3">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm leading-6 text-text-secondary transition-colors hover:text-brand-blue-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Thông tin tại footer">
          <h2 className="text-sm font-semibold text-text-primary">Thông tin</h2>
          <ul className="mt-5 grid gap-3">
            {informationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm leading-6 text-text-secondary transition-colors hover:text-brand-blue-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-text-primary">
            Thông tin phòng khám
          </h2>
          <address className="mt-5 not-italic">
            <ul className="grid gap-4 text-sm leading-6 text-text-secondary">
              <li className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-brand-blue-dark" size={18} />
                <span>{siteConfig.address || "Địa chỉ đang được cập nhật."}</span>
              </li>
              <li className="flex gap-3">
                <Phone aria-hidden="true" className="mt-0.5 shrink-0 text-brand-red-strong" size={18} />
                {siteConfig.phone ? (
                  <Link href={phoneHref} className="hover:text-brand-blue-dark">
                    {siteConfig.phone}
                  </Link>
                ) : (
                  <span>Số điện thoại đang được cập nhật.</span>
                )}
              </li>
              <li className="flex gap-3">
                <EnvelopeSimple aria-hidden="true" className="mt-0.5 shrink-0 text-brand-blue-dark" size={18} />
                {siteConfig.email ? (
                  <Link href={`mailto:${siteConfig.email}`} className="break-all hover:text-brand-blue-dark">
                    {siteConfig.email}
                  </Link>
                ) : (
                  <span>Email công khai đang được cập nhật.</span>
                )}
              </li>
              <li className="flex gap-3">
                <Clock aria-hidden="true" className="mt-0.5 shrink-0 text-brand-blue-dark" size={18} />
                <span>{siteConfig.openingHours || "Giờ mở cửa đang được cập nhật."}</span>
              </li>
            </ul>
          </address>
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
