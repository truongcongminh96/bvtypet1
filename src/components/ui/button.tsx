import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";

export function buttonStyles({
  variant = "primary",
  className,
}: {
  variant?: ButtonVariant;
  className?: string;
}) {
  return cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] px-5 py-3 text-sm font-bold transition-[transform,background-color,color,border-color] duration-200 focus-visible:outline-none active:translate-y-px",
    variant === "primary" &&
      "bg-medical-blue text-white shadow-[0_12px_28px_rgba(11,111,194,0.24)] hover:-translate-y-0.5 hover:bg-[#075fa8]",
    variant === "secondary" &&
      "bg-care-red text-white shadow-[0_12px_28px_rgba(230,56,67,0.2)] hover:-translate-y-0.5 hover:bg-[#cb2632]",
    variant === "ghost" &&
      "border border-line bg-clinical-white/80 text-deep-navy hover:border-medical-blue/40 hover:bg-ice",
    variant === "dark" &&
      "bg-deep-navy text-clinical-white hover:-translate-y-0.5 hover:opacity-90",
    className,
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
};

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonStyles({ variant, className })} {...props} />;
}
