"use client";

import { m } from "motion/react";

import { CareNote } from "@/components/ui/care-note";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export function CareNoteReveal({
  label,
  className,
  direction = "right",
  delay = 0,
}: {
  label: string;
  className?: string;
  direction?: "left" | "right";
  delay?: number;
}) {
  return (
    <div
      className={cn(
        "absolute z-10 hidden items-center gap-2 md:flex",
        direction === "left" && "flex-row-reverse",
        className,
      )}
    >
      <m.span
        data-motion-reveal
        aria-hidden="true"
        className="size-2.5 shrink-0 rounded-full border-2 border-brand-blue bg-surface"
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay, ease }}
      />
      <m.span
        data-motion-reveal
        aria-hidden="true"
        className={cn(
          "h-px w-5 bg-brand-blue/35",
          direction === "left" ? "origin-right" : "origin-left",
        )}
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.38, delay: delay + 0.1, ease }}
      />
      <m.span
        data-motion-reveal
        initial={{
          opacity: 0,
          x: direction === "left" ? 8 : -8,
        }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.48, delay: delay + 0.2, ease }}
      >
        <CareNote>{label}</CareNote>
      </m.span>
    </div>
  );
}
