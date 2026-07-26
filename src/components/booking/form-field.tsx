import type { ReactNode } from "react";

export function getFieldDescription({
  id,
  hasHelper,
  hasError,
}: {
  id: string;
  hasHelper?: boolean;
  hasError?: boolean;
}) {
  const ids = [
    hasHelper ? `${id}-helper` : null,
    hasError ? `${id}-error` : null,
  ].filter(Boolean);

  return ids.length > 0 ? ids.join(" ") : undefined;
}

export function FormField({
  id,
  label,
  helper,
  error,
  required = false,
  children,
}: {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-semibold text-text-primary">
        {label}
        {required ? (
          <span className="ml-1 text-care-red" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {helper ? (
        <p id={`${id}-helper`} className="mt-1 text-xs leading-5 text-text-secondary">
          {helper}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-xs font-semibold leading-5 text-care-red"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
