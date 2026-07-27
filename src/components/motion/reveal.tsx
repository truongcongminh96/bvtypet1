"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { useHomeMotionPreferences } from "@/components/motion/home-motion-provider";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

const revealVariants: Variants = {
  hidden: ({ distance = 28 }: { distance?: number } = {}) => ({
    opacity: 0,
    y: distance,
  }),
  visible: ({ delay = 0 }: { delay?: number } = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay,
      ease,
    },
  }),
};

const groupVariants: Variants = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: {
      delayChildren: delay,
      staggerChildren: 0.16,
    },
  }),
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
};

export function MotionSection({
  children,
  className,
  delay = 0,
  amount = 0.16,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const { distance } = useHomeMotionPreferences();

  return (
    <m.div
      data-motion-reveal
      className={cn(className)}
      custom={{ delay, distance }}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
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
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      custom={delay}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
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
}: Omit<RevealProps, "amount">) {
  const reduceMotion = useReducedMotion();
  const { distance } = useHomeMotionPreferences();

  return (
    <m.div
      data-motion-reveal
      className={cn(className)}
      custom={{ delay, distance }}
      variants={reduceMotion ? undefined : revealVariants}
    >
      {children}
    </m.div>
  );
}
