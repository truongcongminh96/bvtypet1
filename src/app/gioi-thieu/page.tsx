import type { Metadata } from "next";
import {
  ArrowUpRight,
  CaretRight,
  House,
  PawPrint,
  ShieldCheck,
  Stethoscope,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { AboutCareTimeline } from "@/components/about/about-care-timeline";
import { HomeMotionProvider } from "@/components/motion/home-motion-provider";
import { ImageReveal } from "@/components/motion/image-reveal";
import {
  MotionGroup,
  MotionItem,
  MotionSection,
} from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { getAboutPage } from "@/sanity/content";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Tìm hiểu định hướng chăm sóc và nguyên tắc làm việc tại Pet One.",
};

export default async function AboutPage() {
  const content = await getAboutPage();

  return (
    <HomeMotionProvider>
      <section className="about-hero">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="about-breadcrumb">
            <Link href="/">
              <House aria-hidden="true" size={15} weight="fill" />
              Trang chủ
            </Link>
            <CaretRight aria-hidden="true" size={13} />
            <span aria-current="page">Giới thiệu</span>
          </nav>

          <MotionSection
            className="about-hero__motion"
            direction="none"
            scaleFrom={0.97}
          >
            <div className="about-hero__statement">
              <span
                className="about-hero__orbit about-hero__orbit--one"
                aria-hidden="true"
              />
              <span
                className="about-hero__orbit about-hero__orbit--two"
                aria-hidden="true"
              />
              <div className="about-hero__content">
                <p className="about-hero__eyebrow">{content.eyebrow}</p>
                <h1>{content.title}</h1>
                <p className="about-hero__description">
                  {content.description}
                </p>
                <span className="about-hero__rule" aria-hidden="true" />
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      <section className="about-journey">
        <div className="shell">
          <MotionGroup className="about-journey__intro">
            <MotionItem>
              <p className="about-section-label">Cách Pet One đồng hành</p>
              <h2>{content.storyTitle}</h2>
            </MotionItem>
            <div className="about-journey__story">
              {content.story.map((paragraph) => (
                <MotionItem key={paragraph}>
                  <p>{paragraph}</p>
                </MotionItem>
              ))}
            </div>
          </MotionGroup>

          <MotionSection className="about-journey__heading">
            <p className="about-section-label">Hành trình chăm sóc</p>
            <h2>Mỗi chặng đều có lý do rõ ràng</h2>
            <p>
              Từ điều bạn quan sát đến kế hoạch theo dõi tại nhà, mỗi bước đều
              được kết nối để việc chăm sóc không bị ngắt quãng.
            </p>
          </MotionSection>
          <AboutCareTimeline />
        </div>
      </section>

      <section className="about-team">
        <div className="about-team__ridge" aria-hidden="true" />
        <div className="shell about-team__layout">
          <ImageReveal
            className="about-team__portrait"
            direction="left"
          >
            <Image
              src={content.image?.src ?? "/images/pet-one-care.png"}
              alt={
                content.image?.alt ??
                "Bác sĩ Pet One kiểm tra nhẹ nhàng cho thú cưng"
              }
              fill
              sizes="(max-width: 1023px) calc(100vw - 2rem), 38rem"
              className="object-cover"
            />
            <span className="about-team__portrait-frame" aria-hidden="true" />
          </ImageReveal>

          <MotionGroup className="about-team__content">
            <MotionItem>
              <p className="about-section-label">Đội ngũ chăm sóc Pet One</p>
              <h2>Chuyên môn đi cùng sự thấu hiểu</h2>
              <p className="about-team__lead">
                Chúng tôi hướng đến một đội ngũ biết quan sát phản ứng của từng
                bé, giải thích rõ với người nuôi và chỉ đưa ra chỉ định khi có
                mục tiêu cụ thể.
              </p>
            </MotionItem>

            <MotionGroup className="about-team__principles" stagger={0.1}>
              {content.principles.map((principle, index) => {
                const Icon =
                  index === 0
                    ? Stethoscope
                    : index === 1
                      ? PawPrint
                      : ShieldCheck;

                return (
                  <MotionItem key={principle.title}>
                    <div className="about-team__principle">
                      <span aria-hidden="true">
                        <Icon size={20} weight="duotone" />
                      </span>
                      <div>
                        <h3>{principle.title}</h3>
                        <p>{principle.description}</p>
                      </div>
                    </div>
                  </MotionItem>
                );
              })}
            </MotionGroup>

            <MotionItem>
              <ButtonLink href="/bac-si" className="mt-8">
                Tìm hiểu đội ngũ bác sĩ
                <ArrowUpRight aria-hidden="true" size={18} weight="bold" />
              </ButtonLink>
            </MotionItem>
          </MotionGroup>
        </div>
      </section>
    </HomeMotionProvider>
  );
}
