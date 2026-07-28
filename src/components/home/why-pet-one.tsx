import { BenefitGrid } from "@/components/home/benefit-grid";
import { EditorialCollage } from "@/components/home/editorial-collage";
import { MetricsRow } from "@/components/home/metrics-row";
import { MotionSection } from "@/components/motion/reveal";
import type { HomePageSettings } from "@/content/experience";

export function WhyPetOne({ settings }: { settings: HomePageSettings }) {
  return (
    <section className="why-editorial relative overflow-hidden bg-surface-warm pb-24 pt-14 sm:pb-28 lg:pb-36 lg:pt-20">
      <span
        aria-hidden="true"
        className="absolute left-[-8rem] top-[18%] size-[26rem] rounded-full bg-brand-blue-soft/70 blur-[1px]"
      />
      <div className="shell relative z-10 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-x-6">
        <MotionSection
          className="relative z-20 lg:col-start-7 lg:col-end-13 lg:row-start-1 lg:pl-7"
          direction="right"
          mobileDirection="left"
        >
          <p className="inline-flex rounded-full border border-brand-blue/20 bg-surface/75 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-brand-blue-dark shadow-[0_7px_22px_rgba(16,46,58,0.05)]">
            Vì sao chọn Pet One
          </p>
          <h2 className="section-title mt-5 max-w-[11ch] text-text-primary">
            Rõ điều đang làm,
            <span className="block text-brand-blue-dark">nhẹ nhàng với từng bé</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
            Một trải nghiệm chăm sóc được xây dựng để người nuôi hiểu, thú cưng
            bớt căng thẳng và kế hoạch theo dõi dễ tiếp tục.
          </p>
        </MotionSection>

        <div className="relative z-10 mt-10 lg:col-start-1 lg:col-end-8 lg:row-start-1 lg:row-end-3 lg:mt-24">
          <EditorialCollage />
        </div>

        <div className="relative z-20 mt-12 lg:col-start-7 lg:col-end-13 lg:row-start-2 lg:mt-16 lg:pl-7">
          <BenefitGrid reasons={settings.reasons} />
          <MetricsRow items={settings.metrics} />
        </div>
      </div>
    </section>
  );
}
