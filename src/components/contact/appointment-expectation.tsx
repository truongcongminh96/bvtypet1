import {
  CalendarCheck,
  ClipboardText,
  PhoneCall,
} from "@phosphor-icons/react/dist/ssr";

import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { contactPageContent } from "@/content/contact-page";

const stepIcons = [ClipboardText, PhoneCall, CalendarCheck] as const;

export function AppointmentExpectation() {
  const { expectation } = contactPageContent;

  return (
    <section aria-labelledby="appointment-expectation-title" className="pb-[var(--section-space)]">
      <div className="shell">
        <div className="rounded-[var(--radius-lg)] border border-border bg-surface-warm px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          <MotionSection className="max-w-2xl" amount={0.12}>
            <h2
              id="appointment-expectation-title"
              className="font-display text-[clamp(2rem,3.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-text-primary"
            >
              {expectation.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base">
              {expectation.description}
            </p>
          </MotionSection>

          <MotionGroup
            className="mt-8 grid gap-3 lg:grid-cols-3 lg:gap-0"
            delay={0.04}
            amount={0.12}
          >
            {expectation.steps.map((step, index) => {
              const Icon = stepIcons[index];

              return (
                <MotionItem
                  key={step.title}
                  className="relative border-t border-border pt-5 lg:border-l lg:border-t-0 lg:px-7 lg:pt-0 first:lg:border-l-0 first:lg:pl-0 last:lg:pr-0"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-surface text-brand-blue-dark shadow-[0_8px_18px_rgba(16,46,58,0.06)]">
                      <Icon aria-hidden="true" size={21} weight="duotone" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-brand-blue-dark">
                        0{index + 1}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold text-text-primary">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </MotionItem>
              );
            })}
          </MotionGroup>
        </div>
      </div>
    </section>
  );
}
