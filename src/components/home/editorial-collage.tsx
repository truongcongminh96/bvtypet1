import Image from "next/image";

import { ImageReveal } from "@/components/motion/image-reveal";

const images = [
  {
    className: "editorial-collage__main",
    src: "/images/clinic/pet-one-general-exam-cat.jpg",
    alt: "Bác sĩ Pet One kiểm tra nhẹ nhàng cho một chú mèo",
    position: "50% 44%",
    direction: "left" as const,
  },
  {
    className: "editorial-collage__room",
    src: "/images/clinic/pet-one-team-records.jpg",
    alt: "Đội ngũ Pet One ghi nhận và đối chiếu thông tin trong phòng khám",
    position: "50% 42%",
    direction: "right" as const,
  },
  {
    className: "editorial-collage__exam",
    src: "/images/clinic/pet-one-general-exam-dog.jpg",
    alt: "Đội ngũ Pet One kiểm tra sức khỏe cho một chú chó",
    position: "50% 42%",
    direction: "right" as const,
  },
  {
    className: "editorial-collage__detail",
    src: "/images/clinic/pet-one-lab-microscope.jpg",
    alt: "Kỹ thuật viên Pet One quan sát mẫu xét nghiệm qua kính hiển vi",
    position: "50% 46%",
    direction: "up" as const,
  },
] as const;

export function EditorialCollage() {
  return (
    <figure className="relative">
      <div className="editorial-collage">
        {images.map((image, index) => (
          <ImageReveal
            key={image.src}
            className={image.className}
            direction={image.direction}
            delay={0.08 + index * 0.08}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 767px) 92vw, (max-width: 1023px) 48vw, 38vw"
              className="object-cover"
              style={{ objectPosition: image.position }}
            />
          </ImageReveal>
        ))}
      </div>
      <figcaption className="mt-4 max-w-[30rem] text-[0.68rem] leading-5 text-text-muted">
        Hình ảnh thực tế trong quá trình thăm khám và hỗ trợ chẩn đoán tại Pet One.
      </figcaption>
    </figure>
  );
}
