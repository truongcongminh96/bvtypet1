import Image from "next/image";

import { MotionItem } from "@/components/motion/reveal";
import { careSteps } from "@/content/site";

const timelineImages = [
  {
    src: "/images/pet-one-care.png",
    alt: "Bác sĩ Pet One lắng nghe và kiểm tra nhẹ nhàng cho thú cưng",
    position: "center 48%",
  },
  {
    src: "/images/pet-one-clinic.png",
    alt: "Không gian khám và đánh giá tại Pet One",
    position: "center",
  },
  {
    src: "/images/services/chan-doan-hinh-anh.png",
    alt: "Bác sĩ Pet One thực hiện chẩn đoán hình ảnh cho thú cưng",
    position: "center",
  },
  {
    src: "/images/pet-one-hero.png",
    alt: "Bác sĩ Pet One theo dõi sức khỏe của chó và mèo",
    position: "center 42%",
  },
] as const;

export function AboutCareTimeline() {
  return (
    <ol
      className="about-timeline"
      aria-label="Hành trình chăm sóc tại Pet One"
    >
      {careSteps.map((step, index) => {
        const image = timelineImages[index] ?? timelineImages[0];
        const isEven = index % 2 === 0;

        return (
          <li
            key={step.number}
            className={`about-timeline__item ${
              isEven
                ? "about-timeline__item--left"
                : "about-timeline__item--right"
            }`}
          >
            <span className="about-timeline__ghost" aria-hidden="true">
              {step.number}
            </span>
            <span className="about-timeline__node" aria-hidden="true">
              <span>{step.number}</span>
            </span>

            <MotionItem
              className="about-timeline__motion"
              direction={isEven ? "left" : "right"}
              mobileDirection="up"
            >
              <article className="about-timeline__card">
                <div className="about-timeline__media">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 4rem), 34rem"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ objectPosition: image.position }}
                  />
                  <span className="about-timeline__image-wash" aria-hidden="true" />
                </div>
                <div className="about-timeline__content">
                  <p className="about-timeline__label">
                    Chặng {step.number}
                  </p>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            </MotionItem>
          </li>
        );
      })}
    </ol>
  );
}
