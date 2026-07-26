import Image from "next/image";

import { CareNoteReveal } from "@/components/motion/care-note-reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import {
  CareNote,
  PawMarker,
} from "@/components/ui/care-note";

export function HeroVisual() {
  return (
    <figure className="mx-auto w-full max-w-[39rem] lg:mr-0">
      <div className="relative pb-3 pt-5 sm:px-5 md:pb-8 md:pt-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-[8%] bottom-[8%] top-[13%] rounded-[var(--radius-image)] bg-surface-soft"
        />

        <ImageReveal className="relative mx-auto aspect-[4/5] w-[82%] overflow-hidden rounded-b-[var(--radius-image)] rounded-t-[15rem] border border-border bg-surface shadow-[0_24px_64px_rgba(16,46,58,0.12)] sm:w-[78%]">
          {/* TODO: Replace this concept image with verified PetOne clinic photography before production launch. */}
          <Image
            src="/images/pet-one-hero.png"
            alt="Bác sĩ thú y đang kiểm tra cho một chú chó, bên cạnh có một chú mèo"
            fill
            priority
            sizes="(max-width: 767px) 82vw, (max-width: 1024px) 70vw, 38vw"
            className="object-cover"
          />
        </ImageReveal>

        <div className="absolute right-[5%] top-[3%] hidden md:block">
          <PawMarker />
        </div>
        <CareNoteReveal
          label="Ăn ít hơn"
          className="left-0 top-[23%]"
          delay={0.35}
        />
        <CareNoteReveal
          label="Ngủ nhiều hơn"
          className="right-0 top-[49%]"
          direction="left"
          delay={0.72}
        />
        <CareNoteReveal
          label="Lắng nghe bạn kể"
          className="bottom-[13%] left-[2%]"
          delay={1.08}
        />
      </div>

      <MotionGroup className="mt-4 grid gap-2 sm:grid-cols-3 md:hidden" delay={0.18}>
        <MotionItem><CareNote>Ăn ít hơn</CareNote></MotionItem>
        <MotionItem><CareNote>Ít vận động</CareNote></MotionItem>
        <MotionItem><CareNote>Lắng nghe bạn kể</CareNote></MotionItem>
      </MotionGroup>

      <figcaption className="mt-3 text-center text-xs leading-5 text-text-muted">
        Ảnh minh hoạ định hướng, sẽ thay bằng hình ảnh thực tế của PetOne.
      </figcaption>
    </figure>
  );
}
