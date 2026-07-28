import Image from "next/image";

import { ImageReveal } from "@/components/motion/image-reveal";

export function ArchImage() {
  return (
    <figure className="relative mx-auto w-full max-w-[36rem] lg:mr-0">
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-[46%] h-[72%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(circle_at_center,rgba(22,132,214,0.2),rgba(232,244,252,0.62)_48%,transparent_72%)]"
      />
      <ImageReveal
        className="hero-arch relative z-[1] mx-auto aspect-[4/5] w-[82%] overflow-hidden border border-white/80 bg-surface-soft shadow-[0_26px_70px_rgba(16,46,58,0.14)] sm:w-[78%] lg:w-[84%]"
        direction="right"
      >
        <Image
          src="/images/pet-one-hero.png"
          alt="Ảnh minh hoạ bác sĩ thú y đang kiểm tra nhẹ nhàng cho chó và mèo"
          fill
          priority
          loading="eager"
          sizes="(max-width: 639px) 82vw, (max-width: 1023px) 62vw, 38vw"
          className="object-cover"
          style={{ objectPosition: "54% 46%" }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-text-primary/16 to-transparent"
        />
      </ImageReveal>

      <figcaption className="relative z-[2] mx-auto mt-3 max-w-[27rem] text-center text-[0.68rem] leading-5 text-text-muted">
        Hình ảnh minh hoạ.
      </figcaption>
    </figure>
  );
}
