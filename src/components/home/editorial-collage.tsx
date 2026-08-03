import Image from "next/image";

import { ImageReveal } from "@/components/motion/image-reveal";
import type { ArticleImage } from "@/content/site";

const imageSlots = [
  {
    className: "editorial-collage__main",
    direction: "left" as const,
  },
  {
    className: "editorial-collage__room",
    direction: "right" as const,
  },
  {
    className: "editorial-collage__exam",
    direction: "right" as const,
  },
  {
    className: "editorial-collage__detail",
    direction: "up" as const,
  },
] as const;

export function EditorialCollage({
  images,
  caption,
}: {
  images: ArticleImage[];
  caption: string;
}) {
  return (
    <figure className="relative">
      <div className="editorial-collage">
        {imageSlots.map((slot, index) => {
          const image = images[index];
          if (!image) return null;

          return (
            <ImageReveal
              key={image.src}
              className={slot.className}
              direction={slot.direction}
              delay={0.08 + index * 0.08}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 767px) 92vw, (max-width: 1023px) 48vw, 38vw"
                className="object-cover"
                style={
                  image.focalPoint
                    ? { objectPosition: image.focalPoint }
                    : undefined
                }
              />
            </ImageReveal>
          );
        })}
      </div>
      <figcaption className="mt-4 max-w-[30rem] text-[0.68rem] leading-5 text-text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
