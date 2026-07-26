"use client";

import {
  m,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

type TimelineStepData = {
  number: string;
  title: string;
  description: string;
};

function TimelineNode({
  number,
  progress,
  threshold,
  reduced,
}: {
  number: string;
  progress: MotionValue<number>;
  threshold: number;
  reduced: boolean;
}) {
  const nodeProgress = useTransform(
    progress,
    [Math.max(0, threshold - 0.045), threshold],
    [0, 1],
  );
  const numberColor = useTransform(
    nodeProgress,
    [0, 1],
    ["#0d5fa8", "#ffffff"],
  );

  return (
    <span className="absolute -left-[1.1rem] top-0 inline-flex size-9 items-center justify-center overflow-hidden rounded-full border border-brand-blue/25 bg-surface text-xs font-semibold shadow-[0_6px_16px_rgba(16,46,58,0.06)] lg:-top-[1.1rem] lg:left-0">
      <m.span
        data-motion-progress
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-brand-blue"
        style={{ scale: reduced ? 1 : nodeProgress }}
      />
      <m.span
        data-motion-progress
        data-motion-progress-number
        className="relative"
        style={{ color: reduced ? "#ffffff" : numberColor }}
      >
        {number}
      </m.span>
    </span>
  );
}

export function ScrollTimeline({ steps }: { steps: TimelineStepData[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 72%", "end 45%"],
  });

  return (
    <div ref={ref} className="relative ml-4 mt-12 lg:ml-0">
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 top-0 w-px bg-border lg:hidden"
      />
      <m.span
        data-motion-progress
        aria-hidden="true"
        className="absolute bottom-0 left-0 top-0 w-px origin-top bg-brand-blue lg:hidden"
        style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
      />
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 hidden h-px bg-border lg:block"
      />
      <m.span
        data-motion-progress
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 hidden h-px origin-left bg-brand-blue lg:block"
        style={{ scaleX: reduceMotion ? 1 : scrollYProgress }}
      />

      <ol
        className="grid gap-0 lg:grid-cols-4"
        aria-label="Quy trình thăm khám tại PetOne"
      >
        {steps.map((step, index) => (
          <li
            key={step.number}
            className="relative pb-10 pl-8 last:pb-0 lg:pb-0 lg:pl-0 lg:pt-8"
          >
            <TimelineNode
              number={step.number}
              progress={scrollYProgress}
              threshold={steps.length > 1 ? index / (steps.length - 1) : 1}
              reduced={Boolean(reduceMotion)}
            />
            <div className="lg:pr-8">
              <h3 className="text-base font-semibold leading-6 text-text-primary lg:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
