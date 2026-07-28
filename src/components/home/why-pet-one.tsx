import { BenefitGrid } from "@/components/home/benefit-grid";
import { EditorialCollage } from "@/components/home/editorial-collage";
import { MetricsRow } from "@/components/home/metrics-row";
import { MotionSection } from "@/components/motion/reveal";
import type { HomePageSettings } from "@/content/experience";

export function WhyPetOne({ settings }: { settings: HomePageSettings }) {
  return (
    <section className="why-editorial relative overflow-hidden bg-surface-warm py-24 sm:py-28 lg:py-36">
      <div className="shell relative z-10 grid gap-16 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.1fr)] lg:items-center lg:gap-x-16 xl:gap-x-24">
        <div className="lg:col-start-2 lg:row-start-1">
          <MotionSection direction="right" mobileDirection="left">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.13em] text-brand-blue-dark">
              <span className="h-px w-9 bg-brand-blue/45" aria-hidden="true" />
              Vì sao chọn Pet One
            </p>
            <h2 className="editorial-statement mt-5 max-w-[43rem] text-text-primary">
              Rõ điều đang làm,{" "}
              <span className="text-brand-blue-dark">nhẹ nhàng với từng bé</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
              Một trải nghiệm chăm sóc được xây dựng để người nuôi hiểu, thú cưng
              bớt căng thẳng và kế hoạch theo dõi dễ tiếp tục.
            </p>
          </MotionSection>

          <div className="mt-10">
            <BenefitGrid reasons={settings.reasons} />
            <MetricsRow items={settings.metrics} />
          </div>
        </div>

        <div className="lg:col-start-1 lg:row-start-1">
          <EditorialCollage />
        </div>
      </div>
    </section>
  );
}
