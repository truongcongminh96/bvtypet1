import Image from "next/image";

import { ImageReveal } from "@/components/motion/image-reveal";
import type { ServiceDirectoryGroup } from "@/content/service-directory";
import { cn } from "@/lib/cn";

const collageClasses = {
  mosaic: "grid-cols-2 grid-rows-2",
  "feature-stack": "grid-cols-12 grid-rows-2",
  "portrait-stack": "grid-cols-12 grid-rows-2",
  "placeholder-pair": "grid-cols-2 grid-rows-1",
};

function getImageClass(
  variant: ServiceDirectoryGroup["collage"]["variant"],
  index: number,
) {
  if (variant === "feature-stack") {
    return index === 0
      ? "col-span-7 row-span-2 rounded-[34px_16px_34px_34px]"
      : "col-span-5 rounded-[16px_34px_34px_16px]";
  }

  if (variant === "portrait-stack") {
    return index === 0
      ? "col-span-7 row-span-2 rounded-[20px_42px_20px_42px]"
      : "col-span-5 rounded-[42px_20px_42px_20px]";
  }

  if (variant === "placeholder-pair") {
    return index === 0
      ? "rounded-[42px_18px_42px_42px]"
      : "translate-y-7 rounded-[18px_42px_42px_42px]";
  }

  const mosaicCorners = [
    "rounded-[42px_18px_18px_18px]",
    "rounded-[18px_42px_18px_18px]",
    "rounded-[18px_18px_18px_42px]",
    "rounded-[18px_18px_42px_18px]",
  ];

  return mosaicCorners[index] ?? "rounded-[var(--radius-md)]";
}

export function ServiceImageCollage({
  group,
}: {
  group: ServiceDirectoryGroup;
}) {
  const direction = group.layout === "media-left" ? "left" : "right";

  return (
    <ImageReveal
      direction={direction}
      className="relative h-full min-h-[21rem] overflow-hidden sm:min-h-[28rem] lg:min-h-0"
    >
      <div
        className={cn(
          "grid h-full min-h-[inherit] gap-2.5 p-2.5 sm:gap-3 sm:p-3",
          collageClasses[group.collage.variant],
          group.tone === "blue" ? "bg-[#e4f1f7]" : "bg-[#f2e9dd]",
        )}
      >
        {group.collage.images.map((image, index) => (
          <figure
            key={`${group.id}-${image.src}-${index}`}
            className={cn(
              "relative min-h-0 overflow-hidden bg-surface",
              getImageClass(group.collage.variant, index),
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1023px) 50vw, 36vw"
              className="object-cover"
              style={{
                objectPosition: image.focalPoint,
              }}
            />
          </figure>
        ))}
      </div>

    </ImageReveal>
  );
}
