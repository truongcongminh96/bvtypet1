import Image from "next/image";

import { MotionItem } from "@/components/motion/reveal";
import { careSteps } from "@/content/site";

const timelineImages = [
  {
    src: "/images/clinic/pet-one-general-exam-cat.jpg",
    alt: "Bác sĩ Pet One quan sát và kiểm tra nhẹ nhàng cho một chú mèo",
    position: "center 42%",
  },
  {
    src: "/images/clinic/pet-one-team-records.jpg",
    alt: "Đội ngũ Pet One ghi nhận và đối chiếu thông tin trong buổi khám",
    position: "center 40%",
  },
  {
    src: "/images/clinic/pet-one-ultrasound-team.jpg",
    alt: "Đội ngũ Pet One thực hiện siêu âm hỗ trợ chẩn đoán",
    position: "center 52%",
  },
  {
    src: "/images/clinic/pet-one-general-exam-dog.jpg",
    alt: "Đội ngũ Pet One cùng theo dõi sức khỏe của một chú chó",
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
