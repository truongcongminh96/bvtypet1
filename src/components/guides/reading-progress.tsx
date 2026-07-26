"use client";

import { m, useReducedMotion, useScroll, useSpring } from "motion/react";

export function ReadingProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.28,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-[4.5rem] z-40 h-0.5 bg-transparent"
    >
      <m.span
        className="block h-full origin-left bg-brand-blue"
        style={{ scaleX: reduceMotion ? scrollYProgress : smoothProgress }}
      />
    </div>
  );
}

