import type { Metadata } from "next";
import {
  ArrowLeft,
  CalendarDots,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/site/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { getServices } from "@/sanity/content";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServicePageProps) {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHero
        current={service.shortTitle}
        title={service.title}
        description={service.summary}
      />
      <section className="section-space">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_22rem]">
          <article>
            <h2 className="section-title text-deep-navy">
              Một buổi chăm sóc bắt đầu như thế nào?
            </h2>
            <p className="body-large mt-6 max-w-3xl text-muted-ink">
              {service.description}
            </p>
            <div className="mt-10 grid gap-4">
              {service.points.map((point, index) => (
                <div
                  key={point}
                  className="surface-card flex items-center gap-4 rounded-2xl p-5"
                >
                  <span className="font-display text-xs font-extrabold text-medical-blue">
                    0{index + 1}
                  </span>
                  <CheckCircle
                    size={22}
                    weight="fill"
                    className="shrink-0 text-medical-blue"
                  />
                  <p className="font-semibold text-deep-navy">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-3xl border border-line bg-ice p-6 sm:p-8">
              <h2 className="font-display text-xl font-extrabold text-deep-navy">
                Lưu ý trước khi đặt lịch
              </h2>
              <p className="mt-3 leading-7 text-muted-ink">
                Nội dung trên mô tả định hướng trải nghiệm, không phải cam kết
                chỉ định cho mọi trường hợp. Bác sĩ cần đánh giá trực tiếp trước
                khi đưa ra tư vấn phù hợp.
              </p>
            </div>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] bg-medical-blue p-7 text-white shadow-[0_24px_60px_rgba(11,111,194,0.24)]">
              <CalendarDots size={34} weight="duotone" />
              <h2 className="mt-6 font-display text-2xl font-extrabold">
                Chuẩn bị tốt hơn trước buổi khám
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/78">
                Gửi trước triệu chứng, thói quen gần đây và điều bạn đang lo
                nhất về thú cưng.
              </p>
              <ButtonLink
                href="/lien-he#dat-lich"
                variant="dark"
                className="mt-7 w-full bg-white text-deep-navy hover:bg-white/90"
              >
                Đặt lịch khám
              </ButtonLink>
            </div>
            <ButtonLink
              href="/dich-vu"
              variant="ghost"
              className="mt-4 w-full"
            >
              <ArrowLeft size={18} weight="bold" />
              Tất cả dịch vụ
            </ButtonLink>
          </aside>
        </div>
      </section>
    </>
  );
}
