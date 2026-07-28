"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { useHomeMotionPreferences } from "@/components/motion/home-motion-provider";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export type RevealDirection = "up" | "left" | "right" | "none";

type RevealVariantOptions = {
  delay?: number;
  direction?: RevealDirection;
  distance?: number;
  scaleFrom?: number;
};

function getHiddenOffset(
  direction: RevealDirection,
  distance: number,
) {
  if (direction === "left") {
    return { x: -distance, y: 0 };
  }

  if (direction === "right") {
    return { x: distance, y: 0 };
  }

  if (direction === "none") {
    return { x: 0, y: 0 };
  }

  return { x: 0, y: distance };
}

const revealVariants: Variants = {
  hidden: ({
    direction = "up",
    distance = 28,
    scaleFrom = 1,
  }: RevealVariantOptions = {}) => {
    const offset = getHiddenOffset(direction, distance);

    return {
      opacity: 0,
      scale: scaleFrom,
      ...offset,
    };
  },
  visible: ({ delay = 0 }: RevealVariantOptions = {}) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 1,
      delay,
      ease,
    },
  }),
};

type GroupVariantOptions = {
  delay?: number;
  stagger?: number;
};

const groupVariants: Variants = {
  hidden: {},
  visible: ({
    delay = 0,
    stagger = 0.16,
  }: GroupVariantOptions = {}) => ({
    transition: {
      delayChildren: delay,
      staggerChildren: stagger,
    },
  }),
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  direction?: RevealDirection;
  mobileDirection?: RevealDirection;
  scaleFrom?: number;
};

export function MotionSection({
  children,
  className,
  delay = 0,
  amount = 0.16,
  direction = "up",
  mobileDirection,
  scaleFrom = 1,
}: RevealProps) {
  const { distance, isMobile, supportsInView } = useHomeMotionPreferences();
  const resolvedDirection =
    isMobile && mobileDirection ? mobileDirection : direction;

  return (
    <m.div
      data-motion-reveal
      className={cn(className)}
      custom={{
        delay,
        direction: resolvedDirection,
        distance,
        scaleFrom,
      }}
      initial="hidden"
      animate={!supportsInView ? "visible" : undefined}
      whileInView={supportsInView ? "visible" : undefined}
      viewport={{ once: true, amount }}
      variants={revealVariants}
    >
      {children}
    </m.div>
  );
}

export function MotionGroup({
  children,
  className,
  delay = 0,
  amount = 0.16,
  stagger = 0.16,
}: RevealProps & { stagger?: number }) {
  const { supportsInView } = useHomeMotionPreferences();

  return (
    <m.div
      className={className}
      custom={{ delay, stagger }}
      initial="hidden"
      animate={!supportsInView ? "visible" : undefined}
      whileInView={supportsInView ? "visible" : undefined}
      viewport={{ once: true, amount }}
      variants={groupVariants}
    >
      {children}
    </m.div>
  );
}

export function MotionItem({
  children,
  className,
  delay = 0,
  direction = "up",
  mobileDirection,
  scaleFrom = 1,
}: Omit<RevealProps, "amount">) {
  const { distance, isMobile } = useHomeMotionPreferences();
  const resolvedDirection =
    isMobile && mobileDirection ? mobileDirection : direction;

  return (
    <m.div
      data-motion-reveal
      className={cn(className)}
      custom={{
        delay,
        direction: resolvedDirection,
        distance,
        scaleFrom,
      }}
      variants={revealVariants}
    >
      {children}
    </m.div>
  );
}
