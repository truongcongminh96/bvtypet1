import type { Metadata } from "next";
import { CalendarDots, Certificate, SealCheck } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { notFound } from "next/navigation";

import { HomeMotionProvider } from "@/components/motion/home-motion-provider";
import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import { getDoctor, getDoctors } from "@/sanity/content";
import { siteConfig } from "@/lib/site-config";

export async function generateStaticParams() {
  const doctors = await getDoctors();
  return doctors.flatMap((doctor) =>
    doctor.status === "verified" ? [{ slug: doctor.slug }] : [],
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await getDoctor(slug);
  if (!doctor) return {};
  return {
    title: doctor.name,
    description: `${doctor.position} · ${doctor.specialty} tại Pet One.`,
  };
}

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = await getDoctor(slug);
  if (!doctor) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: doctor.name,
    jobTitle: doctor.position,
    description: doctor.biography || doctor.specialty,
    knowsAbout: doctor.specialty,
    url: `${siteConfig.url}/bac-si/${doctor.slug}`,
  };

  return (
    <HomeMotionProvider>
      <article>
        <section className="section-space bg-surface-soft">
          <div className="shell grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem_5rem_2rem_2rem] border border-border bg-surface shadow-[var(--shadow-soft)]">
              {doctor.image ? (
                <Image src={doctor.image.src} alt={doctor.image.alt} fill priority sizes="(max-width: 1024px) 100vw, 34vw" className="object-cover" />
              ) : null}
            </div>
            <MotionGroup>
              <MotionItem><p className="text-sm font-semibold text-brand-blue-dark">{doctor.position}</p></MotionItem>
              <MotionItem><h1 className="display-title mt-3 text-text-primary">{doctor.name}</h1></MotionItem>
              <MotionItem><p className="body-large mt-5 text-text-secondary">{doctor.specialty}</p></MotionItem>
              {doctor.biography ? (
                <MotionItem><p className="mt-6 max-w-3xl text-base leading-8 text-text-secondary">{doctor.biography}</p></MotionItem>
              ) : null}
              <MotionItem>
                <div className="mt-7 flex flex-wrap gap-4 text-sm text-text-secondary">
                  {doctor.yearsOfExperience ? (
                    <span className="inline-flex items-center gap-2"><SealCheck aria-hidden="true" size={19} className="text-brand-blue-dark" />{doctor.yearsOfExperience} năm kinh nghiệm</span>
                  ) : null}
                  {doctor.credentials?.length ? (
                    <span className="inline-flex items-center gap-2"><Certificate aria-hidden="true" size={19} className="text-brand-blue-dark" />{doctor.credentials.length} chứng chỉ / bằng cấp</span>
                  ) : null}
                </div>
                <CareActionLink href="/lien-he#dat-lich" className="mt-8" leadingIcon={<CalendarDots aria-hidden="true" size={19} />}>
                  Đặt lịch khám
                </CareActionLink>
              </MotionItem>
            </MotionGroup>
          </div>
        </section>

        {doctor.credentials?.length ? (
          <section className="section-space">
            <div className="shell max-w-4xl">
              <h2 className="section-title text-text-primary">Chuyên môn đã xác minh</h2>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {doctor.credentials.map((credential) => (
                  <li key={credential} className="flex gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-5 text-sm leading-6 text-text-secondary">
                    <SealCheck aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-brand-blue-dark" />
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {doctor.journey?.length ? (
          <section className="section-space bg-surface-warm">
            <div className="shell max-w-4xl">
              <h2 className="section-title text-text-primary">Hành trình bác sĩ</h2>
              <ol className="mt-10 border-l-2 border-brand-blue/30 pl-7">
                {doctor.journey.map((step) => (
                  <li key={`${step.year}-${step.title}`} className="relative pb-9 last:pb-0">
                    <span className="absolute -left-[2.15rem] top-1 size-3 rounded-full bg-brand-blue ring-4 ring-surface-warm" />
                    <p className="text-sm font-semibold text-brand-blue-dark">{step.year}</p>
                    <h3 className="mt-2 text-lg font-semibold text-text-primary">{step.title}</h3>
                    {step.description ? <p className="mt-2 text-sm leading-7 text-text-secondary">{step.description}</p> : null}
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ) : null}
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </HomeMotionProvider>
  );
}
