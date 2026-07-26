"use client";

import { CheckCircle, Phone, ShieldCheck, WarningCircle } from "@phosphor-icons/react";
import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

export type TurnstileStatus =
  | "loading"
  | "ready"
  | "verified"
  | "expired"
  | "unavailable"
  | "error";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
          theme: "light";
        },
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

export function TurnstileWidget({
  onToken,
  onStatusChange,
  resetSignal,
  supportPhone,
  supportPhoneHref,
}: {
  onToken: (token: string) => void;
  onStatusChange: (status: TurnstileStatus) => void;
  resetSignal: number;
  supportPhone?: string;
  supportPhoneHref?: string;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const isDevelopment = process.env.NODE_ENV !== "production";
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const previousResetSignal = useRef(resetSignal);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<TurnstileStatus>(
    siteKey ? "loading" : "unavailable",
  );

  const reportStatus = useCallback(
    (nextStatus: TurnstileStatus) => {
      setStatus(nextStatus);
      onStatusChange(nextStatus);
    },
    [onStatusChange],
  );

  const renderWidget = useCallback(() => {
    if (
      !siteKey ||
      !ready ||
      !containerRef.current ||
      !window.turnstile ||
      widgetIdRef.current
    ) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token) => {
        onToken(token);
        reportStatus("verified");
      },
      "expired-callback": () => {
        onToken("");
        reportStatus("expired");
      },
      "error-callback": () => {
        onToken("");
        reportStatus("error");
      },
      theme: "light",
    });
    reportStatus("ready");
  }, [onToken, ready, reportStatus, siteKey]);

  useEffect(() => {
    if (!siteKey) {
      onToken("");
      onStatusChange("unavailable");
    }
  }, [onStatusChange, onToken, siteKey]);

  useEffect(() => {
    renderWidget();

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget]);

  useEffect(() => {
    if (previousResetSignal.current === resetSignal) {
      return;
    }

    previousResetSignal.current = resetSignal;

    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      onToken("");
      reportStatus("ready");
    }
  }, [onToken, reportStatus, resetSignal]);

  if (!siteKey) {
    return (
      <SecurityMessage
        status="unavailable"
        supportPhone={supportPhone}
        supportPhoneHref={supportPhoneHref}
      >
        {isDevelopment
          ? "Xác minh bảo mật chưa được cấu hình trong môi trường phát triển."
          : "Biểu mẫu đang được hoàn thiện. Vui lòng gọi phòng khám để được hỗ trợ."}
      </SecurityMessage>
    );
  }

  return (
    <div className="grid gap-3">
      <Script
        id="petone-turnstile-script"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
        onReady={() => setReady(true)}
        onError={() => {
          onToken("");
          reportStatus("error");
        }}
      />

      <div
        ref={containerRef}
        role="group"
        aria-label="Xác minh biểu mẫu an toàn"
        className="min-h-[65px] max-w-full overflow-hidden"
      />

      {status === "loading" ? (
        <SecurityMessage status="loading">
          Đang chuẩn bị biểu mẫu an toàn.
        </SecurityMessage>
      ) : null}
      {status === "verified" ? (
        <SecurityMessage status="verified">
          Biểu mẫu đã sẵn sàng để gửi.
        </SecurityMessage>
      ) : null}
      {status === "expired" ? (
        <SecurityMessage status="expired">
          Phiên xác minh đã hết hạn. Vui lòng xác minh lại trước khi gửi.
        </SecurityMessage>
      ) : null}
      {status === "error" ? (
        <SecurityMessage
          status="error"
          supportPhone={supportPhone}
          supportPhoneHref={supportPhoneHref}
        >
          Biểu mẫu đang được hoàn thiện. Vui lòng gọi phòng khám để được hỗ trợ.
        </SecurityMessage>
      ) : null}
    </div>
  );
}

function SecurityMessage({
  status,
  supportPhone,
  supportPhoneHref,
  children,
}: {
  status: Exclude<TurnstileStatus, "ready">;
  supportPhone?: string;
  supportPhoneHref?: string;
  children: React.ReactNode;
}) {
  const isError = status === "unavailable" || status === "error";
  const isVerified = status === "verified";
  const Icon = isVerified
    ? CheckCircle
    : isError || status === "expired"
      ? WarningCircle
      : ShieldCheck;

  return (
    <div
      role={isError ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-[var(--radius-sm)] border p-3 text-xs leading-5",
        isError
          ? "border-care-red/25 bg-brand-red-soft text-text-secondary"
          : isVerified
            ? "border-brand-blue/20 bg-brand-blue-soft/70 text-text-primary"
            : "border-border bg-surface-soft text-text-secondary",
      )}
    >
      <Icon
        aria-hidden="true"
        size={18}
        weight={isVerified ? "fill" : "duotone"}
        className={cn(
          "mt-0.5 shrink-0",
          isError || status === "expired"
            ? "text-care-red"
            : "text-brand-blue-dark",
        )}
      />
      <div>
        <p>{children}</p>
        {isError && supportPhoneHref && supportPhone ? (
          <Link
            href={supportPhoneHref}
            className="mt-2 inline-flex min-h-9 items-center gap-2 font-semibold text-brand-blue-dark underline decoration-brand-blue/30 underline-offset-4"
          >
            <Phone aria-hidden="true" size={15} weight="fill" />
            Gọi {supportPhone}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
