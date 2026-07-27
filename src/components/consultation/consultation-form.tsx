"use client";

import { useRef, useState, useTransition } from "react";

import { submitConsultation, type ConsultationActionResult } from "@/app/actions/consultation";
import { TurnstileWidget } from "@/components/booking/turnstile-widget";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const fieldClass =
  "min-h-11 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-brand-blue";

export function ConsultationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [token, setToken] = useState("");
  const [resetSignal, setResetSignal] = useState(0);
  const [result, setResult] = useState<ConsultationActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      ref={formRef}
      className="mt-5 grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const input = {
          name: formData.get("name"),
          phone: formData.get("phone"),
          service: formData.get("service"),
          note: formData.get("note"),
          turnstileToken: token,
          submissionId: `pet-one-consult-${crypto.randomUUID()}`,
        };
        startTransition(async () => {
          const nextResult = await submitConsultation(input);
          setResult(nextResult);
          if (nextResult.success) formRef.current?.reset();
          setToken("");
          setResetSignal((value) => value + 1);
        });
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <input name="name" required autoComplete="name" placeholder="Họ và tên" aria-label="Họ và tên" className={fieldClass} />
        <input name="phone" required autoComplete="tel" inputMode="tel" placeholder="Số điện thoại" aria-label="Số điện thoại" className={fieldClass} />
      </div>
      <select name="service" required aria-label="Dịch vụ quan tâm" className={fieldClass} defaultValue="">
        <option value="" disabled>Chọn nhu cầu</option>
        <option>Khám chữa bệnh</option>
        <option>Tiêm phòng</option>
        <option>Spa / Grooming</option>
        <option>Phẫu thuật</option>
        <option>Pet Shop</option>
        <option>Khác</option>
      </select>
      <textarea name="note" rows={2} placeholder="Ghi chú (không bắt buộc)" aria-label="Ghi chú" className={cn(fieldClass, "resize-y py-3")} />
      <TurnstileWidget
        onToken={setToken}
        onStatusChange={() => undefined}
        resetSignal={resetSignal}
      />
      <button disabled={isPending} className={buttonStyles({ className: "w-full disabled:cursor-not-allowed disabled:opacity-60" })}>
        {isPending ? "Đang gửi..." : "Đăng ký tư vấn"}
      </button>
      {result ? (
        <p role={result.success ? "status" : "alert"} className={cn("text-xs leading-5", result.success ? "text-brand-blue-dark" : "text-brand-red-strong")}>
          {result.message}
        </p>
      ) : null}
    </form>
  );
}
