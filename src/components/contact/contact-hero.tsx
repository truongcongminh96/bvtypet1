import { CalendarCheck, CaretRight, House } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { CareNoteReveal } from "@/components/motion/care-note-reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { CareNote } from "@/components/ui/care-note";
import { contactPageContent } from "@/content/contact-page";

export function ContactHero() {
  const { hero } = contactPageContent;

  return (
    <section className="overflow-hidden border-b border-border bg-surface-soft">
      <div className="shell grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-16">
        <MotionGroup className="order-1 min-w-0 max-w-[39rem]" amount={0.1}>
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
                Liên hệ
              </span>
            </nav>
          </MotionItem>

          <MotionItem>
            <p className="text-sm font-semibold text-brand-blue-dark">
              {hero.eyebrow}
            </p>
          </MotionItem>

          <MotionItem>
            <h1 className="mt-4 font-display text-[clamp(2.75rem,5vw,4.85rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-text-primary text-balance">
              Kể PetOne điều bạn đang
              <span className="block text-brand-blue">quan sát</span>
            </h1>
          </MotionItem>

          <MotionItem>
            <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
              {hero.description}
            </p>
          </MotionItem>

          <MotionItem>
            <div className="mt-6 flex max-w-xl items-start gap-3 border-l-2 border-brand-blue pl-4 text-sm leading-6 text-text-secondary">
              <CalendarCheck
                aria-hidden="true"
                size={21}
                weight="duotone"
                className="mt-0.5 shrink-0 text-brand-blue-dark"
              />
              <p>{hero.expectation}</p>
            </div>
          </MotionItem>
        </MotionGroup>

        <figure className="order-2 mx-auto w-full max-w-[43rem]">
          <div className="relative px-2 pb-3 pt-3 sm:px-5 sm:pb-6 sm:pt-5">
            <div
              aria-hidden="true"
              className="absolute inset-x-[7%] bottom-[7%] top-[9%] rounded-[var(--radius-image)] bg-brand-blue-soft"
            />
            <ImageReveal className="relative aspect-[16/11] overflow-hidden rounded-[18px_36px_36px_36px] border border-border bg-surface shadow-[0_24px_60px_rgba(16,46,58,0.1)]">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 55vw"
                style={{ objectPosition: hero.image.focalPoint }}
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_64%,rgba(16,46,58,0.12))]"
              />
            </ImageReveal>

            <CareNoteReveal
              label={hero.careNotes[0]}
              className="left-[-0.75rem] top-[18%]"
              delay={0.24}
            />
            <CareNoteReveal
              label={hero.careNotes[1]}
              direction="left"
              className="right-[-0.75rem] top-[34%]"
              delay={0.44}
            />
            <CareNoteReveal
              label={hero.careNotes[2]}
              className="bottom-[24%] left-[1%]"
              delay={0.64}
            />
            <CareNoteReveal
              label={hero.careNotes[3]}
              direction="left"
              className="bottom-[10%] right-[1%]"
              delay={0.84}
            />
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 md:hidden">
            {hero.careNotes.map((note) => (
              <CareNote key={note}>{note}</CareNote>
            ))}
          </div>

          <figcaption className="mt-3 text-center text-xs leading-5 text-text-muted">
            Hình ảnh minh họa định hướng, không đại diện cho cơ sở hoặc nhân sự
            thực tế của PetOne.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
