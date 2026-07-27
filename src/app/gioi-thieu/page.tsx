import type { Metadata } from "next";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { HomeMotionProvider } from "@/components/motion/home-motion-provider";
import { ImageReveal } from "@/components/motion/image-reveal";
import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAboutPage } from "@/sanity/content";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Tìm hiểu định hướng chăm sóc và nguyên tắc làm việc tại Pet One.",
};

export default async function AboutPage() {
  const content = await getAboutPage();

  return (
    <HomeMotionProvider>
      <PageHero
        current="Giới thiệu"
        title={content.title}
        description={content.description}
      />
      <section className="section-space">
        <div className="shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem_6rem_2rem_2rem] border border-border bg-surface-soft shadow-[var(--shadow-soft)]">
            {content.image ? (
              <Image src={content.image.src} alt={content.image.alt} fill priority sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
            ) : null}
          </ImageReveal>
          <MotionGroup>
            <MotionItem>
              <SectionHeading label={content.eyebrow} title={content.storyTitle} />
            </MotionItem>
            {content.story.map((paragraph) => (
              <MotionItem key={paragraph}>
                <p className="mt-5 text-base leading-8 text-text-secondary">{paragraph}</p>
              </MotionItem>
            ))}
          </MotionGroup>
        </div>
      </section>
      <section className="section-space bg-surface-soft">
        <div className="shell">
          <MotionSection>
            <SectionHeading
              label="Nguyên tắc Pet One"
              title="Điều giữ trải nghiệm chăm sóc nhất quán"
              description="Ba nguyên tắc định hướng cách Pet One lắng nghe, trao đổi và đồng hành cùng người nuôi."
            />
          </MotionSection>
          <MotionGroup className="mt-10 grid gap-5 md:grid-cols-3">
            {content.principles.map((principle) => (
              <MotionItem key={principle.title}>
                <article className="h-full rounded-[var(--radius-lg)] border border-border bg-surface p-7 shadow-[var(--shadow-card)]">
                  <CheckCircle aria-hidden="true" size={24} weight="fill" className="text-brand-blue-dark" />
                  <h2 className="mt-5 font-display text-3xl font-semibold text-text-primary">{principle.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{principle.description}</p>
                </article>
              </MotionItem>
            ))}
          </MotionGroup>
        </div>
      </section>
    </HomeMotionProvider>
  );
}
