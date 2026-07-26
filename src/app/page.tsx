import {
  CalendarDots,
  Phone,
} from "@phosphor-icons/react/dist/ssr";

import { ArticleGrid } from "@/components/home/article-grid";
import { BookingCta } from "@/components/home/booking-cta";
import { CareProcess } from "@/components/home/care-process";
import { ClinicEnvironment } from "@/components/home/clinic-environment";
import { DoctorTeam } from "@/components/home/doctor-team";
import { HeroVisual } from "@/components/home/hero-visual";
import { ServiceGrid } from "@/components/home/service-grid";
import { WhyPetOne } from "@/components/home/why-pet-one";
import { HomeMotionProvider } from "@/components/motion/home-motion-provider";
import {
  MotionGroup,
  MotionItem,
  MotionSection,
} from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import { TrustMetric } from "@/components/ui/care-note";
import { SectionHeading } from "@/components/ui/section-heading";
import { homepageTrustMetric } from "@/content/site";
import { getPhoneHref } from "@/lib/site-config";
import { getArticles, getDoctors, getHomeServices } from "@/sanity/content";

export default async function HomePage() {
  const [services, doctors, articles] = await Promise.all([
    getHomeServices(),
    getDoctors(),
    getArticles(),
  ]);
  const phoneHref = getPhoneHref();

  return (
    <HomeMotionProvider>
      <section className="relative overflow-hidden bg-background">
        <div className="shell grid min-h-[calc(100dvh-4.5rem)] items-center gap-12 py-10 md:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-12">
          <MotionGroup className="max-w-[37rem]" amount={0.3}>
            <MotionItem>
              <p className="mb-5 text-sm font-semibold tracking-[-0.01em] text-medical-blue">
                Chăm từ điều bé chưa thể nói
              </p>
            </MotionItem>
            <MotionItem>
              <h1 className="display-title text-deep-navy">
                Hiểu đúng.
                <span className="block text-brand-blue">Chăm bé tốt hơn.</span>
              </h1>
            </MotionItem>
            <MotionItem>
              <p className="body-large mt-6 max-w-[35rem] text-muted-ink">
                PetOne đồng hành cùng bạn nhận ra những thay đổi nhỏ trong sức
                khỏe và hành vi của thú cưng, để mỗi quyết định chăm sóc đều rõ
                ràng và kịp thời.
              </p>
            </MotionItem>
            <MotionItem>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CareActionLink
                  href="/lien-he#dat-lich"
                  className="w-full sm:w-auto"
                  leadingIcon={
                    <CalendarDots aria-hidden="true" size={19} weight="bold" />
                  }
                >
                  Đặt lịch khám
                </CareActionLink>
                <CareActionLink
                  href={phoneHref}
                  variant="secondary"
                  className="w-full sm:w-auto"
                  leadingIcon={
                    <Phone
                      aria-hidden="true"
                      size={18}
                      weight="bold"
                      className="text-brand-red-strong"
                    />
                  }
                >
                  Gọi phòng khám
                </CareActionLink>
              </div>
            </MotionItem>
            <MotionItem>
              <TrustMetric {...homepageTrustMetric} className="mt-7" />
            </MotionItem>
          </MotionGroup>
          <HeroVisual />
        </div>
      </section>

      <section className="section-space">
        <div className="shell">
          <MotionSection className="mb-10 max-w-2xl border-l-2 border-brand-blue pl-5">
            <p className="text-base font-semibold leading-7 text-text-primary sm:text-lg">
              Mọi buổi khám tại PetOne bắt đầu từ điều bạn đã nhận thấy.
            </p>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Bạn kể lại thay đổi của bé. PetOne giúp xác định bước đánh giá phù hợp tiếp theo.
            </p>
          </MotionSection>
          <MotionGroup className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <MotionItem>
              <SectionHeading
                title="Đúng bước cần thiết, vào đúng thời điểm"
                description="Mỗi dịch vụ trả lời một nhu cầu cụ thể về sức khỏe của bé, không phải một danh sách chỉ định có sẵn."
              />
            </MotionItem>
            <MotionItem>
              <CareActionLink
                href="/dich-vu"
                variant="text"
                className="self-start"
              >
                Xem tất cả dịch vụ
              </CareActionLink>
            </MotionItem>
          </MotionGroup>
          <ServiceGrid items={services} />
        </div>
      </section>

      <WhyPetOne />

      <DoctorTeam items={doctors} />

      <section className="section-space bg-surface-soft">
        <div className="shell">
          <MotionSection>
            <SectionHeading
              title="Bạn luôn biết PetOne đang làm gì và vì sao"
              description="Bốn bước rõ ràng giúp bạn theo dõi buổi khám, hiểu lựa chọn chăm sóc và biết điều cần tiếp tục quan sát."
            />
          </MotionSection>
          <CareProcess />
        </div>
      </section>

      <ClinicEnvironment />

      <section className="section-space">
        <div className="shell">
          <MotionSection>
            <SectionHeading
              title="Khi về nhà, bạn vẫn biết điều gì cần theo dõi"
              description="Các hướng dẫn thực tế giúp bạn ghi nhận thay đổi của bé. Nội dung không thay thế đánh giá trực tiếp của bác sĩ thú y."
            />
          </MotionSection>
          <ArticleGrid items={articles} />
        </div>
      </section>

      <BookingCta />
    </HomeMotionProvider>
  );
}
