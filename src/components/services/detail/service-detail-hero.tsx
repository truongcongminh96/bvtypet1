import {
  CalendarCheck,
  CaretRight,
  House,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { CareNoteReveal } from "@/components/motion/care-note-reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import { CareNote } from "@/components/ui/care-note";
import type { ServiceDetailPresentation } from "@/content/service-detail-presentation";
import type { Service } from "@/content/site";
import { getPhoneHref, siteConfig } from "@/lib/site-config";

export function ServiceDetailHero({
  service,
  presentation,
}: {
  service: Service;
  presentation: ServiceDetailPresentation;
}) {
  const phoneAction = siteConfig.phone
    ? { href: getPhoneHref(), label: "Gọi phòng khám" }
    : { href: "/lien-he", label: "Thông tin liên hệ" };

  return (
    <section className="overflow-hidden border-b border-border bg-surface-soft">
      <div className="shell py-8 sm:py-10 lg:py-14">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs font-semibold text-text-secondary"
        >
          <Link
            href="/"
            className="inline-flex min-h-10 items-center gap-1.5 transition-colors hover:text-brand-blue-dark"
          >
            <House aria-hidden="true" size={15} weight="fill" />
            Trang chủ
          </Link>
          <CaretRight aria-hidden="true" size={13} />
          <Link
            href="/dich-vu"
            className="inline-flex min-h-10 items-center transition-colors hover:text-brand-blue-dark"
          >
            Dịch vụ
          </Link>
          <CaretRight aria-hidden="true" size={13} />
          <span aria-current="page" className="text-brand-blue-dark">
            {service.shortTitle}
          </span>
        </nav>

        <div className="mt-6 grid items-center gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-20">
          <div className="order-2 lg:order-1">
            <MotionGroup amount={0.08}>
              <MotionItem>
                <p className="text-sm font-semibold text-brand-blue-dark">
                  {presentation.eyebrow}
                </p>
              </MotionItem>
              <MotionItem>
                <h1 className="mt-4 font-display text-[clamp(2.8rem,5.1vw,4.9rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-text-primary text-balance">
                  {service.title}
                </h1>
              </MotionItem>
              <MotionItem>
                <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
                  {presentation.heroDescription}
                </p>
              </MotionItem>
            </MotionGroup>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CareActionLink
                href="/lien-he#dat-lich"
                leadingIcon={<CalendarCheck size={19} weight="duotone" />}
                className="w-full sm:w-auto"
              >
                Đặt lịch khám
              </CareActionLink>
              <CareActionLink
                href={phoneAction.href}
                variant="secondary"
                leadingIcon={<Phone size={18} weight="fill" />}
                className="w-full sm:w-auto"
              >
                {phoneAction.label}
              </CareActionLink>
            </div>
          </div>

          <figure className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[44rem]">
              <ImageReveal className="relative aspect-[16/11] overflow-hidden rounded-[18px_36px_36px_36px] border border-border bg-surface shadow-[0_24px_60px_rgba(16,46,58,0.1)]">
                <Image
                  src={presentation.images.hero.src}
                  alt={presentation.images.hero.alt}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 56vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_65%,rgba(16,46,58,0.1))]"
                />
              </ImageReveal>
              <CareNoteReveal
                label={presentation.careNotes[0]}
                className="left-[-1rem] top-[19%]"
                delay={0.18}
              />
              <CareNoteReveal
                label={presentation.careNotes[1]}
                direction="left"
                className="right-[-1rem] top-[48%]"
                delay={0.4}
              />
              <CareNoteReveal
                label={presentation.careNotes[2]}
                className="bottom-[9%] left-[8%]"
                delay={0.62}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2 md:hidden">
              {presentation.careNotes.map((note) => (
                <CareNote key={note} className="min-h-9 py-1.5">
                  {note}
                </CareNote>
              ))}
            </div>
            {presentation.images.hero.placeholder ? (
              <figcaption className="mt-3 text-xs leading-5 text-text-muted">
                Hình ảnh minh hoạ. Cần thay bằng ảnh thực tế của PetOne trước khi phát hành.
              </figcaption>
            ) : null}
          </figure>
        </div>
      </div>
    </section>
  );
}
