import {
  ArrowsClockwise,
  ChatCircleText,
  Eye,
  HandHeart,
  PawPrint,
  SealCheck,
} from "@phosphor-icons/react/dist/ssr";

import { MotionGroup, MotionItem } from "@/components/motion/reveal";

const icons = [
  Eye,
  ChatCircleText,
  HandHeart,
  ArrowsClockwise,
  SealCheck,
  PawPrint,
] as const;

export function BenefitGrid({
  reasons,
}: {
  reasons: Array<{ title: string; description: string }>;
}) {
  return (
    <MotionGroup
      className="why-reasons"
      amount={0.12}
      stagger={0.08}
    >
      {reasons.slice(0, 6).map((reason, index) => {
        const Icon = icons[index] ?? PawPrint;

        return (
          <MotionItem
            key={reason.title}
            direction={index % 2 === 0 ? "left" : "right"}
            mobileDirection="left"
          >
            <article className="why-reason">
              <span className="why-reason__icon" aria-hidden="true">
                <Icon size={20} weight="duotone" />
              </span>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-text-primary">
                  {reason.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-text-secondary">
                  {reason.description}
                </p>
              </div>
            </article>
          </MotionItem>
        );
      })}
    </MotionGroup>
  );
}
