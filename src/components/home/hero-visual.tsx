import Image from "next/image";

import { ImageReveal } from "@/components/motion/image-reveal";

export function HeroVisual() {
  return (
    <figure className="mx-auto w-full max-w-[37rem] lg:mr-0">
      <ImageReveal
        className="relative aspect-[5/4] overflow-hidden rounded-[2rem_7rem_2rem_2rem] border border-border bg-surface-soft shadow-[0_24px_64px_rgba(16,46,58,0.12)] sm:aspect-[4/3]"
        direction="right"
      >
        <Image
          src="/images/pet-one-hero.png"
          alt="Bác sĩ thú y đang kiểm tra nhẹ nhàng cho một chú chó"
          fill
          priority
          loading="eager"
          sizes="(max-width: 767px) 94vw, (max-width: 1024px) 72vw, 44vw"
          className="object-cover"
        />
      </ImageReveal>
      <figcaption className="mt-3 text-center text-xs leading-5 text-text-muted">
        Ảnh minh hoạ định hướng, sẽ thay bằng hình ảnh thực tế đã xác minh của Pet One.
      </figcaption>
    </figure>
  );
}
