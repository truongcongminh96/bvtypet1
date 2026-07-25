"use client";

import { Plus } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion
    ? false
    : { opacity: 0, scale: 0.96, x: 24 };

  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      className="relative mx-auto w-full max-w-[38rem] lg:mr-0"
    >
      <div className="absolute -inset-x-5 top-[7%] aspect-[1.08/1] rounded-[48%] border-[clamp(2.8rem,6vw,5rem)] border-medical-blue/12" />
      <div className="absolute -inset-x-2 top-[10%] aspect-square rounded-full border-2 border-medical-blue/40" />
      <div className="relative ml-auto aspect-[4/5] w-[88%] overflow-hidden rounded-[2.8rem_2.8rem_6rem_2.8rem] bg-ice shadow-[0_34px_80px_rgba(8,45,70,0.2)]">
        <Image
          src="/images/pet-one-hero.png"
          alt="Bác sĩ thú y đang kiểm tra cho chó, bên cạnh có một chú mèo"
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 43vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deep-navy/22 to-transparent" />
        <span className="absolute bottom-4 right-4 rounded-full bg-clinical-white/92 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.13em] text-muted-ink backdrop-blur-md">
          Hình ảnh minh hoạ
        </span>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.65 }}
        className="absolute -left-1 top-[18%] flex size-16 items-center justify-center rounded-2xl bg-care-red text-white shadow-[0_18px_38px_rgba(230,56,67,0.3)] sm:-left-4 sm:size-20"
      >
        <Plus size={38} weight="bold" />
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.74 }}
        className="surface-card absolute -bottom-5 left-0 max-w-[15rem] rounded-3xl p-4 sm:left-2 sm:p-5"
      >
        <p className="font-display text-sm font-extrabold text-deep-navy">
          Care Orbit
        </p>
        <p className="mt-1 text-xs leading-5 text-muted-ink">
          Mỗi quyết định chăm sóc đều xoay quanh thể trạng và nhịp sống của bé.
        </p>
      </motion.div>
    </motion.div>
  );
}
