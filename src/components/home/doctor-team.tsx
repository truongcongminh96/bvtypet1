import {
  CalendarDots,
  Clock,
  IdentificationCard,
  SealCheck,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import {
  MotionGroup,
  MotionItem,
  MotionSection,
} from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import { PawMarker } from "@/components/ui/care-note";
import { SectionHeading } from "@/components/ui/section-heading";
import { doctors as fallbackDoctors, type Doctor } from "@/content/site";

export function DoctorTeam({
  items = fallbackDoctors,
}: {
  items?: Doctor[];
}) {
  const verifiedDoctors = items.filter((doctor) => doctor.status === "verified");
  const placeholders = items.filter((doctor) => doctor.status === "placeholder");

  return (
    <section className="section-space" id="doi-ngu-bac-si">
      <div className="shell">
        <MotionSection>
          <SectionHeading
            title="Một buổi khám nhẹ nhàng bắt đầu từ người biết chờ bé bình tĩnh"
            description="Hồ sơ chỉ hiển thị tên, vị trí, chuyên môn, kinh nghiệm và lịch làm việc sau khi dữ liệu chính thức được xác minh."
          />
        </MotionSection>

        {verifiedDoctors.length > 0 ? (
          <MotionGroup className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {verifiedDoctors.map((doctor) => (
              <MotionItem
                key={doctor.slug}
                className="min-w-[82vw] snap-start sm:min-w-[22rem] lg:min-w-0"
              >
                <article
                  id={doctor.slug}
                  className="surface-card h-full overflow-hidden rounded-[var(--radius-lg)]"
                >
                  {doctor.image ? (
                    <div className="relative aspect-[4/3] bg-surface-soft">
                      <Image
                        src={doctor.image.src}
                        alt={doctor.image.alt}
                        fill
                        sizes="(max-width: 767px) 82vw, (max-width: 1023px) 22rem, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-surface-soft">
                      <div className="text-center">
                        <PawMarker className="mx-auto" />
                        <p className="mt-3 text-xs text-text-muted">Ảnh hồ sơ đang cập nhật</p>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <p className="text-sm font-semibold text-brand-blue-dark">
                      {doctor.position}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold leading-snug text-text-primary">
                      {doctor.name}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-text-secondary">
                      {doctor.specialty}
                    </p>

                    <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
                      {doctor.yearsOfExperience ? (
                        <div className="flex items-start gap-3">
                          <SealCheck aria-hidden="true" size={19} className="mt-0.5 shrink-0 text-brand-blue-dark" />
                          <div>
                            <dt className="sr-only">Kinh nghiệm</dt>
                            <dd className="text-text-secondary">
                              {doctor.yearsOfExperience} năm kinh nghiệm đã xác minh
                            </dd>
                          </div>
                        </div>
                      ) : null}
                      {doctor.schedule ? (
                        <div className="flex items-start gap-3">
                          <Clock aria-hidden="true" size={19} className="mt-0.5 shrink-0 text-brand-blue-dark" />
                          <div>
                            <dt className="sr-only">Lịch làm việc</dt>
                            <dd className="text-text-secondary">{doctor.schedule}</dd>
                          </div>
                        </div>
                      ) : null}
                    </dl>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <CareActionLink href="/bac-si" variant="text">
                        Hồ sơ
                      </CareActionLink>
                      <CareActionLink
                        href="/lien-he#dat-lich"
                        variant="secondary"
                        leadingIcon={
                          <CalendarDots aria-hidden="true" size={18} weight="bold" />
                        }
                      >
                        Đặt lịch
                      </CareActionLink>
                    </div>
                  </div>
                </article>
              </MotionItem>
            ))}
          </MotionGroup>
        ) : (
          <MotionSection>
            <div className="mt-12 grid gap-6 rounded-[var(--radius-lg)] border border-border bg-surface-warm p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:p-10">
              <span className="inline-flex size-12 items-center justify-center rounded-[var(--radius-sm)] bg-surface text-brand-blue-dark shadow-[var(--shadow-card)]">
                <IdentificationCard aria-hidden="true" size={25} weight="duotone" />
              </span>
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold text-text-primary">
                  {placeholders[0]?.title ?? "Hồ sơ bác sĩ đang được cập nhật"}
                </h3>
                <p className="mt-2 text-sm leading-7 text-text-secondary">
                  {placeholders[0]?.message ??
                    "Thông tin chỉ hiển thị sau khi được PetOne xác minh chính thức."}
                </p>
              </div>
              <CareActionLink
                href="/lien-he#dat-lich"
                variant="secondary"
                className="justify-self-start"
                leadingIcon={
                  <CalendarDots aria-hidden="true" size={19} weight="bold" />
                }
              >
                Đặt lịch với PetOne
              </CareActionLink>
            </div>
          </MotionSection>
        )}
      </div>
    </section>
  );
}
