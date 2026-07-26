import { ImageWithCaption } from "@/components/guides/image-with-caption";
import { ImportantCallout } from "@/components/guides/important-callout";
import { ObservationNote } from "@/components/guides/observation-note";
import { PreparationChecklist } from "@/components/guides/preparation-checklist";
import { PullQuote } from "@/components/guides/pull-quote";
import { MotionSection } from "@/components/motion/reveal";
import type { ArticleContentBlock } from "@/content/site";

function getBlockKey(block: ArticleContentBlock) {
  if ("id" in block && block.id) {
    return `${block._type}-${block.id}`;
  }

  if (block._type === "pullQuote") {
    return `${block._type}-${block.quote}`;
  }

  if (block._type === "imageWithCaption") {
    return `${block._type}-${block.image.src}`;
  }

  if (block._type === "importantCallout") {
    return `${block._type}-${block.title ?? block.body}`;
  }

  return `${block._type}-${block.title}`;
}

function ArticleSection({
  block,
}: {
  block: Extract<ArticleContentBlock, { _type: "section" }>;
}) {
  return (
    <section id={block.id} className="article-section scroll-mt-28">
      <h2>{block.title}</h2>
      {block.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {block.items && block.items.length > 0 ? (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function ArticleRenderer({ blocks }: { blocks: ArticleContentBlock[] }) {
  return (
    <div className="article-prose">
      {blocks.map((block) => {
        const key = getBlockKey(block);

        if (block._type === "section") {
          return (
            <MotionSection key={key} amount={0.08}>
              <ArticleSection block={block} />
            </MotionSection>
          );
        }

        if (block._type === "observationNote") {
          return (
            <MotionSection key={key} amount={0.08}>
              <ObservationNote block={block} />
            </MotionSection>
          );
        }

        if (block._type === "preparationChecklist") {
          return (
            <MotionSection key={key} amount={0.08}>
              <PreparationChecklist block={block} />
            </MotionSection>
          );
        }

        if (block._type === "importantCallout") {
          return (
            <MotionSection key={key} amount={0.08}>
              <ImportantCallout block={block} />
            </MotionSection>
          );
        }

        if (block._type === "pullQuote") {
          return (
            <MotionSection key={key} amount={0.08}>
              <PullQuote block={block} />
            </MotionSection>
          );
        }

        if (block._type === "imageWithCaption") {
          return (
            <MotionSection key={key} amount={0.08}>
              <ImageWithCaption block={block} />
            </MotionSection>
          );
        }

        return null;
      })}
    </div>
  );
}
