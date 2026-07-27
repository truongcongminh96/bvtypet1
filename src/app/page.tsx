import {
  ArrowUpRight,
  CalendarDots,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { ArticleGrid } from "@/components/home/article-grid";
import { BookingCta } from "@/components/home/booking-cta";
import { ClinicEnvironment } from "@/components/home/clinic-environment";
import { CustomerReviews } from "@/components/home/customer-reviews";
import { HeroVisual } from "@/components/home/hero-visual";
import { ServiceGrid } from "@/components/home/service-grid";
import { WhyPetOne } from "@/components/home/why-pet-one";
import { HomeMotionProvider } from "@/components/motion/home-motion-provider";
import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getArticles,
  getCustomerReviews,
  getEquipment,
  getHomePageSettings,
  getHomeServices,
} from "@/sanity/content";

export default async function HomePage() {
  const [services, articles, equipment, reviews, settings] = await Promise.all([
    getHomeServices(),
    getArticles(),
    getEquipment(),
    getCustomerReviews(),
    getHomePageSettings(),
  ]);

  const hasVerifiedRating =
    settings.rating != null &&
    settings.reviewCount != null &&
    settings.reviewCount > 0;
  const verifiedReviewCount = settings.reviewCount ?? 0;

  return (
    <HomeMotionProvider>
      <section className="relative overflow-hidden bg-background">
        <div className="shell grid min-h-[calc(100dvh-4.5rem)] items-center gap-8 py-7 sm:py-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-10">
          <MotionGroup className="order-2 max-w-[37rem] lg:order-1" amount={0.3}>
            <MotionItem>
              <p className="mb-4 text-sm font-semibold text-brand-blue-dark">
                Chăm từ điều bé chưa thể nói
              </p>
            </MotionItem>
            <MotionItem>
              <h1 className="display-title text-text-primary">
                Hiểu đúng.
                <span className="block text-brand-blue">Chăm bé tốt hơn.</span>
              </h1>
            </MotionItem>
            <MotionItem>
              <p className="body-large mt-5 max-w-[35rem] text-text-secondary">
                Pet One đồng hành cùng bạn nhận ra những thay đổi nhỏ trong sức
                khỏe và hành vi của thú cưng, để mỗi quyết định chăm sóc đều rõ
                ràng và kịp thời.
              </p>
            </MotionItem>
            <MotionItem>
              <CareActionLink
                href="/lien-he#dat-lich"
                className="mt-7 w-full sm:w-auto"
                leadingIcon={<CalendarDots aria-hidden="true" size={19} weight="bold" />}
              >
                Đặt lịch khám
              </CareActionLink>
            </MotionItem>
            {hasVerifiedRating ? (
              <MotionItem>
                <Link
                  href={settings.googleMapsUrl || "/lien-he"}
                  target={settings.googleMapsUrl ? "_blank" : undefined}
                  rel={settings.googleMapsUrl ? "noreferrer" : undefined}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-text-secondary"
                >
                  <Star aria-hidden="true" size={18} weight="fill" className="text-[#e7a51a]" />
                  <strong className="text-text-primary">{settings.rating}/5</strong>
                  <span>· {verifiedReviewCount.toLocaleString("vi-VN")} đánh giá Google</span>
                </Link>
              </MotionItem>
            ) : null}
          </MotionGroup>
          <div className="order-1 lg:order-2">
            <HeroVisual />
          </div>
        </div>
      </section>

      <WhyPetOne settings={settings} />

      <section className="section-space">
        <div className="shell">
          <MotionGroup className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <MotionItem>
              <SectionHeading
                label="Được lựa chọn nhiều"
                title="Top dịch vụ tại Pet One"
                description="Ba dịch vụ nổi bật giúp bạn nhanh chóng tìm đúng thông tin cần thiết cho bé."
              />
            </MotionItem>
            <MotionItem>
              <CareActionLink href="/dich-vu" variant="text">
                Xem tất cả dịch vụ
              </CareActionLink>
            </MotionItem>
          </MotionGroup>
          <ServiceGrid items={services} />
        </div>
      </section>

      <ClinicEnvironment items={equipment} />
      <BookingCta />
      <CustomerReviews items={reviews} />

      <section className="section-space">
        <div className="shell">
          <MotionSection className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              label="Cẩm nang Pet One"
              title="Bài viết mới nhất"
              description="Kiến thức thực tế giúp bạn nhận ra thay đổi, chuẩn bị khi cần khám và tiếp tục theo dõi tại nhà."
            />
            <Link href="/cam-nang" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-dark">
              Xem thêm bài viết
              <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </MotionSection>
          <ArticleGrid items={articles} />
        </div>
      </section>
    </HomeMotionProvider>
  );
}
