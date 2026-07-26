import Image from "next/image";

import { ImageReveal } from "@/components/motion/image-reveal";
import {
  MotionGroup,
  MotionItem,
  MotionSection,
} from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";

const clinicImages = [
  {
    src: "/images/pet-one-clinic.png",
    alt: "Ảnh minh hoạ khu vực thăm khám thú y với ánh sáng tự nhiên",
  },
  {
    src: "/images/pet-one-care.png",
    alt: "Ảnh minh hoạ bác sĩ thú y tương tác nhẹ nhàng với thú cưng",
  },
  {
    src: "/images/pet-one-hero.png",
    alt: "Ảnh minh hoạ buổi kiểm tra sức khỏe cho chó và mèo",
  },
] as const;

export function ClinicEnvironment() {
  return (
    <section className="section-space bg-surface-warm">
      <div className="shell">
        <MotionGroup className="max-w-3xl">
          <MotionItem>
            <h2 className="section-title text-text-primary">
              Một không gian đủ bình tĩnh để bé làm quen
            </h2>
          </MotionItem>
          <MotionItem>
            <p className="body-large mt-5 max-w-2xl text-text-secondary">
              Khu vực khám được định hướng để thú cưng di chuyển an toàn, người nuôi dễ trao đổi và bác sĩ thuận tiện quan sát.
            </p>
          </MotionItem>
          <MotionItem>
            <CareActionLink
              href="/lien-he"
              variant="text"
              divider
              className="mt-7"
            >
              Xem thông tin phòng khám
            </CareActionLink>
          </MotionItem>
        </MotionGroup>

        <figure className="mt-12">
          {/* TODO: Replace all concept images below with verified PetOne clinic photography before production launch. */}
          <div className="grid gap-4 md:grid-cols-12">
            <ImageReveal className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-image)] border border-border bg-surface md:col-span-8 md:row-span-2 md:aspect-auto md:min-h-[38rem]">
              <Image
                src={clinicImages[0].src}
                alt={clinicImages[0].alt}
                fill
                sizes="(max-width: 767px) 100vw, 66vw"
                className="object-cover"
              />
            </ImageReveal>
            <MotionGroup className="grid grid-cols-2 gap-4 md:col-span-4 md:grid-cols-1">
              {clinicImages.slice(1).map((image) => (
                <MotionItem key={image.src}>
                  <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface md:aspect-[4/3]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 767px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </MotionItem>
              ))}
            </MotionGroup>
          </div>
          <MotionSection>
            <figcaption className="mt-3 text-xs leading-5 text-text-muted">
              Hình ảnh hiện tại dùng để định hướng bố cục. Cần thay bằng ảnh thực tế của PetOne trước khi phát hành.
            </figcaption>
          </MotionSection>
        </figure>
      </div>
    </section>
  );
}
