import { PawPrint, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function CareNote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-10 items-center border-l-2 border-brand-blue bg-surface/95 px-3 py-2 text-xs font-medium leading-5 text-text-primary shadow-[0_10px_28px_rgba(16,46,58,0.09)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ImageAnnotation({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute z-10 hidden items-center gap-2 md:flex",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="size-2.5 shrink-0 rounded-full border-2 border-brand-blue bg-surface"
      />
      <CareNote>{label}</CareNote>
    </div>
  );
}

export function PawMarker({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full border border-brand-blue/25 bg-brand-blue-soft text-brand-blue-dark",
        className,
      )}
    >
      <PawPrint size={20} weight="fill" />
    </span>
  );
}

export function TrustMetric({
  value,
  label,
  placeholder,
  className,
}: {
  value: string | null;
  label: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-md items-start gap-3 border-t border-border pt-5",
        className,
      )}
    >
      <ShieldCheck
        aria-hidden="true"
        size={22}
        weight="duotone"
        className="mt-0.5 shrink-0 text-brand-blue-dark"
      />
      <div>
        <p className="text-sm font-semibold text-text-primary">
          {value ?? placeholder}
        </p>
        <p className="mt-0.5 text-xs leading-5 text-text-secondary">{label}</p>
      </div>
    </div>
  );
}
