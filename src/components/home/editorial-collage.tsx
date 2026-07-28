import Image from "next/image";

import { ImageReveal } from "@/components/motion/image-reveal";

const images = [
  {
    className: "editorial-collage__main",
    src: "/images/pet-one-care.png",
    alt: "Ảnh minh hoạ bác sĩ thú y trấn an một chú chó nhỏ trong buổi khám",
    position: "52% 50%",
    direction: "left" as const,
  },
  {
    className: "editorial-collage__room",
    src: "/images/pet-one-clinic.png",
    alt: "Ảnh minh hoạ không gian phòng khám thú y sáng và gọn gàng",
    position: "58% 50%",
    direction: "right" as const,
  },
  {
    className: "editorial-collage__exam",
    src: "/images/services/kham-tong-quat.png",
    alt: "Ảnh minh hoạ bác sĩ kiểm tra sức khỏe tổng quát cho một chú chó",
    position: "52% 50%",
    direction: "right" as const,
  },
  {
    className: "editorial-collage__detail",
    src: "/images/services/xet-nghiem.png",
    alt: "Ảnh minh hoạ thao tác xét nghiệm hỗ trợ trong phòng khám thú y",
    position: "34% 50%",
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
        Hình ảnh minh hoạ, sẵn sàng thay thế bằng ảnh Pet One đã xác minh mà
        không thay đổi bố cục.
      </figcaption>
    </figure>
  );
}
