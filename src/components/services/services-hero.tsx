import { CaretRight, House } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { CareNoteReveal } from "@/components/motion/care-note-reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import {
  MotionGroup,
  MotionItem,
} from "@/components/motion/reveal";
import { CareNote } from "@/components/ui/care-note";
import { servicesHero } from "@/content/services-page";

export function ServicesHero() {
  return (
    <section className="overflow-hidden border-b border-border bg-surface-soft">
      <div className="shell grid items-center gap-9 py-10 sm:py-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:py-16">
        <MotionGroup className="order-2 max-w-2xl lg:order-1" amount={0.08}>
          <MotionItem>
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 text-xs font-semibold text-text-secondary"
            >
              <Link
                href="/"
                className="inline-flex min-h-10 items-center gap-1.5 transition-colors hover:text-brand-blue-dark"
              >
                <House aria-hidden="true" size={15} weight="fill" />
                Trang chủ
              </Link>
              <CaretRight aria-hidden="true" size={13} />
              <span aria-current="page" className="text-brand-blue-dark">
                Dịch vụ
              </span>
            </nav>
          </MotionItem>
          <MotionItem>
            <p className="text-sm font-semibold text-brand-blue-dark">
              {servicesHero.eyebrow}
            </p>
          </MotionItem>
          <MotionItem>
            <h1 className="mt-4 font-display text-[clamp(2.8rem,5.2vw,4.9rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-text-primary text-balance">
              {servicesHero.title}
            </h1>
          </MotionItem>
          <MotionItem>
            <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
              {servicesHero.description}
            </p>
          </MotionItem>
        </MotionGroup>

        <div className="order-1 lg:order-2">
          {/* TODO: Replace this generated concept image with verified PetOne photography before production launch. */}
          <div className="relative mx-auto max-w-[43rem]">
            <ImageReveal className="relative aspect-[16/11] overflow-hidden rounded-[18px_36px_36px_36px] border border-border bg-surface shadow-[0_24px_60px_rgba(16,46,58,0.1)]">
              <Image
                src={servicesHero.image.src}
                alt={servicesHero.image.alt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 56vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(16,46,58,0.12))]"
              />
              <span className="absolute bottom-3 right-3 z-10 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-text-secondary shadow-sm backdrop-blur-sm">
                Hình ảnh minh hoạ
              </span>
            </ImageReveal>
            <CareNoteReveal
              label={servicesHero.careNotes[0]}
              className="left-[-1.25rem] top-[20%]"
              delay={0.22}
            />
            <CareNoteReveal
              label={servicesHero.careNotes[1]}
              direction="left"
              className="right-[-1rem] top-[47%]"
              delay={0.46}
            />
            <CareNoteReveal
              label={servicesHero.careNotes[2]}
              className="bottom-[9%] left-[7%]"
              delay={0.7}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2 md:hidden">
            {servicesHero.careNotes.map((note) => (
              <CareNote key={note} className="min-h-9 py-1.5">
                {note}
              </CareNote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
