import type { ReactNode } from "react";

export function FormSection({
  legend,
  description,
  children,
}: {
  legend: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="min-w-0 border-0 p-0">
      <legend className="font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.01em] text-text-primary sm:text-[1.75rem]">
        {legend}
      </legend>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
          {description}
        </p>
      ) : null}
      <div className="mt-5 grid gap-4">{children}</div>
    </fieldset>
  );
}
