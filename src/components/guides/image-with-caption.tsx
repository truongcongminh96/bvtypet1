import Image from "next/image";

import type { ArticleImageBlock } from "@/content/site";

export function ImageWithCaption({ block }: { block: ArticleImageBlock }) {
  return (
    <figure className="article-block overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-soft">
        <Image
          src={block.image.src}
          alt={block.image.alt}
          fill
          sizes="(max-width: 767px) 100vw, 43rem"
          style={{ objectPosition: block.image.focalPoint }}
          className="object-cover"
        />
      </div>
      {block.caption ? (
        <figcaption className="border-t border-border px-5 py-3 text-xs leading-6 text-text-muted">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
