import {
  ArrowUpRight,
  CaretRight,
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { ConsultationForm } from "@/components/consultation/consultation-form";
import { Brand } from "@/components/site/brand";
import type { ClinicLocation } from "@/content/experience";
import { getPhoneHref, type SiteSettings } from "@/lib/site-config";

const informationLinks = [
  { href: "/gioi-thieu", label: "Giới thiệu Pet One" },
  { href: "/dich-vu", label: "Dịch vụ" },
  { href: "/bac-si", label: "Đội ngũ bác sĩ" },
  { href: "/cam-nang", label: "Cẩm nang chăm bé" },
  { href: "/lien-he", label: "Liên hệ" },
  { href: "/chinh-sach-bao-mat", label: "Chính sách bảo mật" },
];

export function Footer({
  locations,
  settings,
}: {
  locations: ClinicLocation[];
  settings: SiteSettings;
}) {
  const displayLocations =
    locations.length > 0
      ? locations
      : [
          {
            address: settings.address,
            mapUrl: settings.googleMapsUrl,
          },
        ];

  return (
    <footer className="relative bg-transparent pt-20 sm:pt-24">
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-20 w-full sm:h-24"
      >
        <path
          d="M0 54C326 12 806 5 1440 60V96H0Z"
          fill="var(--surface-warm)"
        />
      </svg>

      <div className="relative bg-surface-warm">
        <div className="shell grid gap-10 pb-10 pt-5 sm:pb-12 md:grid-cols-2 lg:grid-cols-[1.05fr_0.7fr_1fr] lg:gap-14 lg:pb-14 lg:pt-3">
          <div className="lg:pt-2">
            <Brand settings={settings} />
            <p className="mt-5 max-w-sm text-sm leading-7 text-text-secondary">
              {settings.footerDescription}
            </p>

            {settings.phone ? (
              <Link
                href={getPhoneHref(settings.phone)}
                className="mt-6 inline-flex min-h-16 items-center gap-3 rounded-full bg-brand-blue-dark px-4 pr-6 text-white shadow-[0_14px_30px_rgba(13,95,168,0.2)] transition-transform hover:-translate-y-0.5"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Phone aria-hidden="true" size={20} weight="fill" />
                </span>
                <span>
                  <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white/75">
                    Tư vấn &amp; đặt lịch
                  </span>
                  <span className="mt-0.5 block text-lg font-bold tracking-[0.04em]">
                    {settings.phone}
                  </span>
                </span>
              </Link>
            ) : null}

            <address className="mt-7 not-italic">
              <ul className="grid gap-4 text-sm leading-6 text-text-secondary">
                <li className="flex items-start gap-3">
                  <MapPin
                    aria-hidden="true"
                    size={18}
                    weight="fill"
                    className="mt-1 shrink-0 text-brand-blue-dark"
                  />
                  <div className="max-w-[20rem]">
                    <p className="font-semibold text-text-primary">
                      Địa chỉ phòng khám
                    </p>
                    <ol className="mt-1 grid gap-1.5">
                      {displayLocations.map((location, index) => (
                        <li key={location.address}>
                          <Link
                            href={location.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-start gap-1.5 transition-colors hover:text-brand-blue-dark"
                          >
                            <span>
                              {index + 1}. {location.address}
                            </span>
                            <ArrowUpRight
                              aria-hidden="true"
                              size={13}
                              weight="bold"
                              className="mt-1 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <EnvelopeSimple
                    aria-hidden="true"
                    size={18}
                    weight="fill"
                    className="shrink-0 text-brand-blue-dark"
                  />
                  {settings.email ? (
                    <Link
                      href={`mailto:${settings.email}`}
                      className="transition-colors hover:text-brand-blue-dark"
                    >
                      {settings.email}
                    </Link>
                  ) : (
                    <span>Email đang được cập nhật.</span>
                  )}
                </li>
                <li className="flex items-start gap-3">
                  <Clock
                    aria-hidden="true"
                    size={18}
                    weight="fill"
                    className="mt-1 shrink-0 text-brand-blue-dark"
                  />
                  <span>
                    {settings.openingHours ||
                      "Giờ hoạt động đang được cập nhật."}
                  </span>
                </li>
              </ul>
            </address>
          </div>

          <nav aria-label="Thông tin tại footer" className="lg:pt-2">
            <h2 className="font-display text-[1.75rem] font-semibold text-text-primary">
              Về Pet One
            </h2>
            <div
              aria-hidden="true"
              className="mt-3 h-px w-16 bg-brand-blue-dark"
            />
            <ul className="mt-5 grid gap-3">
              {informationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm leading-6 text-text-secondary transition-colors hover:text-brand-blue-dark"
                  >
                    <CaretRight
                      aria-hidden="true"
                      size={12}
                      weight="bold"
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section
            aria-labelledby="footer-consultation-title"
            className="rounded-[var(--radius-lg)] border border-border-strong bg-surface/90 p-5 shadow-[0_18px_44px_rgba(16,46,58,0.07)] sm:p-6 md:col-span-2 md:w-full md:max-w-2xl md:justify-self-center lg:col-span-1 lg:max-w-none"
          >
            <h2
              id="footer-consultation-title"
              className="text-center font-display text-[1.75rem] font-semibold text-text-primary"
            >
              Đăng ký tư vấn
            </h2>
            <p className="mt-2 text-center text-sm leading-6 text-text-secondary">
              Để lại thông tin, Pet One sẽ liên hệ để trao đổi rõ hơn.
            </p>
            <ConsultationForm />
          </section>
        </div>

        <div className="shell pb-8 sm:pb-10">
          <div className="rounded-[var(--radius-md)] border border-border bg-surface px-5 py-5 text-center shadow-[0_10px_28px_rgba(16,46,58,0.045)] sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.06em] text-text-primary">
              {settings.name} {settings.tagline}
            </p>
            <div className="mt-2 flex flex-col items-center justify-center gap-1 text-xs leading-5 text-text-muted sm:flex-row sm:gap-2">
              <p>© {new Date().getFullYear()} {settings.name}.</p>
              <span aria-hidden="true" className="hidden sm:inline">
                ·
              </span>
              <p>
                {settings.footerDisclaimer}
              </p>
              <span aria-hidden="true" className="hidden sm:inline">
                ·
              </span>
              <Link
                href="/chinh-sach-bao-mat"
                className="font-medium text-brand-blue-dark hover:underline"
              >
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
