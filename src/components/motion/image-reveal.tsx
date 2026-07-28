"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

import { useHomeMotionPreferences } from "@/components/motion/home-motion-provider";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

type ImageRevealDirection = "left" | "right" | "up";

const clipPathByDirection: Record<ImageRevealDirection, string> = {
  left: "inset(0 10% 0 0 round var(--radius-image))",
  right: "inset(0 0 0 10% round var(--radius-image))",
  up: "inset(0 0 10% 0 round var(--radius-image))",
};

export function ImageReveal({
  children,
  className,
  delay = 0.12,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: ImageRevealDirection;
}) {
  const { distance, supportsInView } = useHomeMotionPreferences();
  const horizontalOffset =
    direction === "left"
      ? -distance / 2
      : direction === "right"
        ? distance / 2
        : 0;

  return (
    <m.div
      data-motion-reveal
      className={cn(className)}
      initial={{
        opacity: 0,
        clipPath: clipPathByDirection[direction],
        scale: 1.015,
        x: horizontalOffset,
      }}
      animate={
        !supportsInView
          ? {
              opacity: 1,
              clipPath: "inset(0 0 0% 0 round var(--radius-image))",
              scale: 1,
              x: 0,
            }
          : undefined
      }
      whileInView={
        supportsInView
          ? {
              opacity: 1,
              clipPath: "inset(0 0 0% 0 round var(--radius-image))",
              scale: 1,
              x: 0,
            }
          : undefined
      }
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 1.05, delay, ease }}
    >
      {children}
    </m.div>
  );
}
