import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";

export type CareActionVariant =
  | "primary"
  | "secondary"
  | "text"
  | "card-action"
  | "icon-only";

type CareActionStyleProps = {
  variant?: CareActionVariant;
  className?: string;
};

export function careActionStyles({
  variant = "primary",
  className,
}: CareActionStyleProps) {
  return cn(
    "motion-feedback group/care-action relative items-center font-semibold transition-[transform,background-color,color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-blue-dark",
    variant === "primary" &&
      "inline-grid min-h-12 grid-cols-[auto_1fr_auto] gap-2 whitespace-nowrap rounded-[12px_16px_16px_16px] border border-brand-blue-dark/35 bg-[linear-gradient(145deg,var(--brand-blue-dark),#084d86)] p-1.5 pr-2 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_9px_22px_rgba(13,95,168,0.2)] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_12px_26px_rgba(13,95,168,0.24)] active:translate-y-px",
    variant === "secondary" &&
      "inline-grid min-h-12 grid-cols-[auto_1fr_auto] gap-2 whitespace-nowrap rounded-[12px_16px_16px_16px] border border-brand-blue/25 bg-surface p-1.5 pr-2 text-sm text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_7px_18px_rgba(16,46,58,0.07)] hover:-translate-y-0.5 hover:border-brand-blue/45 hover:bg-brand-blue-soft/65 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_10px_22px_rgba(16,46,58,0.09)] active:translate-y-px",
    variant === "text" &&
      "inline-grid min-h-11 grid-cols-[1fr_auto] gap-3 rounded-[var(--radius-sm)] px-1 py-1 text-sm text-brand-blue-dark hover:text-brand-blue-dark",
    variant === "card-action" &&
      "grid min-h-12 w-full grid-cols-[1fr_auto] gap-4 border-t border-border pt-4 text-left text-sm text-brand-blue-dark",
    variant === "icon-only" &&
      "inline-flex size-11 justify-center rounded-[10px_14px_14px_14px] border border-brand-blue/20 bg-surface text-brand-blue-dark shadow-[0_5px_14px_rgba(16,46,58,0.06)] hover:-translate-y-0.5 hover:border-brand-blue/40 hover:bg-brand-blue-soft active:translate-y-px",
    className,
  );
}

function CareActionContent({
  variant,
  leadingIcon,
  trailingIcon,
  children,
}: {
  variant: CareActionVariant;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children?: ReactNode;
}) {
  if (variant === "icon-only") {
    return <>{leadingIcon ?? children}</>;
  }

  if (variant === "text" || variant === "card-action") {
    return (
      <>
        <span
          className={cn(
            "min-w-0",
            variant === "card-action" &&
              "transition-colors duration-200 group-hover/care-record:text-brand-blue-dark",
          )}
        >
          {children}
        </span>
        <span
          aria-hidden="true"
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-brand-blue/20 bg-brand-blue-soft text-base leading-none text-brand-blue-dark transition-transform duration-200 group-hover/care-action:-translate-y-0.5 group-hover/care-action:translate-x-0.5 group-hover/care-record:-translate-y-0.5 group-hover/care-record:translate-x-0.5"
        >
          {trailingIcon ?? "↗"}
        </span>
      </>
    );
  }

  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-9 shrink-0 items-center justify-center rounded-[9px_12px_12px_12px] border",
          variant === "primary" &&
            "border-white/20 bg-white/14 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]",
          variant === "secondary" &&
            "border-brand-blue/15 bg-brand-blue-soft text-brand-blue-dark",
        )}
      >
        {leadingIcon}
      </span>
      <span className="px-1 text-center">{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-7 shrink-0 items-center justify-center rounded-full text-sm leading-none transition-transform duration-200 group-hover/care-action:-translate-y-0.5 group-hover/care-action:translate-x-0.5",
          variant === "primary" && "bg-white/12 text-white",
          variant === "secondary" &&
            "border border-brand-blue/15 bg-surface text-brand-blue-dark",
        )}
      >
        {trailingIcon ?? "↗"}
      </span>
    </>
  );
}

type CareActionLinkBaseProps = Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "children"
> & {
  trailingIcon?: ReactNode;
  divider?: boolean;
};

type CareActionLinkProps = CareActionLinkBaseProps &
  (
    | {
        variant?: "primary" | "secondary";
        leadingIcon: ReactNode;
        children: ReactNode;
      }
    | {
        variant: "text" | "card-action";
        leadingIcon?: ReactNode;
        children: ReactNode;
      }
    | {
        variant: "icon-only";
        leadingIcon: ReactNode;
        children?: never;
        "aria-label": string;
      }
  );

export function CareActionLink({
  variant = "primary",
  leadingIcon,
  trailingIcon,
  divider = false,
  children,
  className,
  ...props
}: CareActionLinkProps) {
  return (
    <Link
      className={careActionStyles({
        variant,
        className: cn(
          variant === "text" &&
            divider &&
            "border-b border-border pb-2 hover:border-brand-blue/40",
          className,
        ),
      })}
      {...props}
    >
      <CareActionContent
        variant={variant}
        leadingIcon={leadingIcon}
        trailingIcon={trailingIcon}
      >
        {children}
      </CareActionContent>
    </Link>
  );
}

type CareActionButtonBaseProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  trailingIcon?: ReactNode;
  loading?: boolean;
  loadingLabel?: string;
};

type CareActionButtonProps = CareActionButtonBaseProps &
  (
    | {
        variant?: "primary" | "secondary";
        leadingIcon: ReactNode;
        children: ReactNode;
      }
    | {
        variant: "icon-only";
        leadingIcon: ReactNode;
        children?: never;
        "aria-label": string;
      }
  );

export function CareActionButton({
  variant = "primary",
  leadingIcon,
  trailingIcon,
  loading = false,
  loadingLabel = "Đang xử lý",
  disabled,
  children,
  className,
  type = "button",
  ...props
}: CareActionButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={careActionStyles({
        variant,
        className: cn(
          "disabled:cursor-not-allowed disabled:border-border-strong disabled:bg-none disabled:bg-border disabled:text-text-secondary disabled:shadow-none disabled:transform-none",
          className,
        ),
      })}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      <CareActionContent
        variant={variant}
        leadingIcon={
          loading ? (
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-current/30 border-t-current"
            />
          ) : (
            leadingIcon
          )
        }
        trailingIcon={trailingIcon}
      >
        {loading ? loadingLabel : children}
      </CareActionContent>
    </button>
  );
}

export function CareActionRail({
  children,
  trailingIcon,
  className,
}: {
  children: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
}) {
  return (
    <span className={careActionStyles({ variant: "card-action", className })}>
      <CareActionContent
        variant="card-action"
        trailingIcon={trailingIcon}
      >
        {children}
      </CareActionContent>
    </span>
  );
}

type ButtonVariant = "primary" | "ghost" | "dark";

export function buttonStyles({
  variant = "primary",
  className,
}: {
  variant?: ButtonVariant;
  className?: string;
}) {
  return cn(
    "motion-feedback inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] px-5 py-3 text-sm font-semibold transition-[transform,background-color,color,border-color,box-shadow] duration-200 active:translate-y-px",
    variant === "primary" &&
      "bg-brand-blue-dark text-white shadow-[0_10px_24px_rgba(13,95,168,0.18)] hover:-translate-y-0.5 hover:bg-[var(--medical-blue-hover)]",
    variant === "ghost" &&
      "border border-border bg-surface text-text-primary hover:border-brand-blue/45 hover:bg-brand-blue-soft",
    variant === "dark" &&
      "bg-text-primary text-surface hover:-translate-y-0.5 hover:bg-[#0a2630]",
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
