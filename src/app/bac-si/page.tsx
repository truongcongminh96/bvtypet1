import type { Metadata } from "next";
import { ArrowUpRight, IdentificationCard } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { HomeMotionProvider } from "@/components/motion/home-motion-provider";
import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { PageHero } from "@/components/site/page-hero";
import { CareActionLink } from "@/components/ui/button";
import { getDoctors } from "@/sanity/content";

export const metadata: Metadata = {
  title: "Đội ngũ bác sĩ",
  description: "Xem hồ sơ chuyên môn đã được xác minh của đội ngũ bác sĩ Pet One.",
};

export default async function DoctorsPage() {
  const doctors = (await getDoctors()).filter((doctor) => doctor.status === "verified");

  return (
    <HomeMotionProvider>
      <PageHero
        current="Bác sĩ"
        title="Đội ngũ chăm bé bằng chuyên môn và sự bình tĩnh"
        description="Mỗi hồ sơ chỉ được công bố sau khi thông tin chuyên môn đã được Pet One xác minh."
      />
      <section className="section-space">
        <div className="shell">
          {doctors.length > 0 ? (
            <MotionGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" amount={0.12}>
              {doctors.map((doctor) => (
                <MotionItem key={doctor.slug}>
                  <Link href={`/bac-si/${doctor.slug}`} className="group block h-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow-card)]">
                    <div className="relative aspect-[4/3] bg-surface-soft">
                      {doctor.image ? (
                        <Image src={doctor.image.src} alt={doctor.image.alt} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center text-brand-blue-dark">
                          <IdentificationCard aria-hidden="true" size={42} weight="duotone" />
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-sm font-semibold text-brand-blue-dark">{doctor.position}</p>
                      <h2 className="mt-2 font-display text-3xl font-semibold text-text-primary">{doctor.name}</h2>
                      <p className="mt-3 text-sm leading-6 text-text-secondary">{doctor.specialty}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-dark">
                        Xem hồ sơ <ArrowUpRight aria-hidden="true" size={16} />
                      </span>
                    </div>
                  </Link>
                </MotionItem>
              ))}
            </MotionGroup>
          ) : (
            <MotionSection className="rounded-[var(--radius-lg)] border border-border bg-surface-soft p-8 sm:p-10">
              <IdentificationCard aria-hidden="true" size={34} weight="duotone" className="text-brand-blue-dark" />
              <h2 className="mt-5 font-display text-3xl font-semibold text-text-primary">
                Hồ sơ bác sĩ đang được hoàn thiện
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
                Pet One chỉ hiển thị tên, chuyên môn, kinh nghiệm và bằng cấp sau khi dữ liệu chính thức được xác minh.
              </p>
              <CareActionLink
                href="/lien-he#dat-lich"
                className="mt-6"
                leadingIcon={<IdentificationCard aria-hidden="true" size={19} />}
              >
                Đặt lịch với Pet One
              </CareActionLink>
            </MotionSection>
          )}
        </div>
      </section>
    </HomeMotionProvider>
  );
}
