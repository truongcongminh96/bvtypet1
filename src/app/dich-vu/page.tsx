import type { Metadata } from "next";
import {
  ArrowRight,
  Heartbeat,
  Microscope,
  Scan,
  ShieldCheck,
  Tooth,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { getServices } from "@/sanity/content";

export const metadata: Metadata = {
  title: "Dịch vụ thú y",
  description:
    "Tìm hiểu các nhóm dịch vụ chăm sóc, phòng ngừa và hỗ trợ chẩn đoán tại Pet One.",
};

const iconBySlug = {
  "kham-tong-quat": Heartbeat,
  "tiem-phong": ShieldCheck,
  "chan-doan-hinh-anh": Scan,
  "xet-nghiem": Microscope,
  "cham-soc-rang-mieng": Tooth,
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        current="Dịch vụ"
        title="Chăm sóc đúng nhu cầu của từng bé"
        description="Từ buổi khám đầu tiên đến theo dõi dự phòng, mỗi dịch vụ đều đi kèm mục tiêu rõ ràng và hướng dẫn dễ hiểu cho người nuôi."
      />
      <section className="section-space">
        <div className="shell grid gap-5 lg:grid-cols-2">
          {services.map((service, index) => {
            const Icon =
              iconBySlug[service.slug as keyof typeof iconBySlug] ?? Heartbeat;

            return (
              <Link
                href={`/dich-vu/${service.slug}`}
                key={service.slug}
                className="surface-card group flex min-h-[20rem] flex-col justify-between rounded-[2rem] p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex size-13 items-center justify-center rounded-2xl bg-medical-blue text-white">
                    <Icon size={27} weight="duotone" />
                  </span>
                  <span className="font-display text-xs font-extrabold tracking-[0.15em] text-muted-ink">
                    0{index + 1}
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-extrabold tracking-[-0.04em] text-deep-navy sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-muted-ink">
                    {service.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-medical-blue">
                    Xem quy trình
                    <ArrowRight
                      size={17}
                      weight="bold"
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="pb-[clamp(4.5rem,8vw,8rem)]">
        <div className="shell rounded-[2.5rem] bg-deep-navy p-8 text-clinical-white sm:p-12">
          <h2 className="section-title max-w-2xl text-clinical-white">
            Chưa chắc dịch vụ nào phù hợp?
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-clinical-white/70">
            Hãy mô tả điều bạn đang quan sát. Pet One sẽ tiếp nhận thông tin và
            hướng dẫn bước chuẩn bị phù hợp trước buổi khám.
          </p>
          <ButtonLink href="/lien-he#dat-lich" className="mt-8">
            Đặt lịch khám
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
