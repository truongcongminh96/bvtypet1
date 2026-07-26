"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export function ImageReveal({
  children,
  className,
  delay = 0.12,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      data-motion-reveal
      className={cn(className)}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              clipPath: "inset(0 0 10% 0 round var(--radius-image))",
              scale: 1.015,
            }
      }
      whileInView={{
        opacity: 1,
        clipPath: "inset(0 0 0% 0 round var(--radius-image))",
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.88, delay, ease }}
    >
      {children}
    </m.div>
  );
}
