"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, CircleNotch, PaperPlaneTilt } from "@phosphor-icons/react";
import { useCallback, useId, useState } from "react";
import { useForm } from "react-hook-form";

import {
  submitBooking,
  type BookingActionResult,
} from "@/app/actions/booking";
import { TurnstileWidget } from "@/components/booking/turnstile-widget";
import { buttonStyles } from "@/components/ui/button";
import { bookingSchema, type BookingInput } from "@/lib/booking-schema";
import { cn } from "@/lib/cn";

const fieldClass =
  "mt-2 min-h-12 w-full rounded-[14px] border border-line bg-clinical-white px-4 text-sm text-clinical-ink outline-none transition-colors placeholder:text-muted-ink/55 focus:border-medical-blue";

export function BookingForm() {
  const formInstanceId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [result, setResult] = useState<BookingActionResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      ownerName: "",
      phone: "",
      email: "",
      petName: "",
      petType: "Chó",
      preferredTime: "Cần trao đổi thêm",
      preferredDate: "",
      concern: "",
      consent: false,
      turnstileToken: "",
      submissionId: `pet-one-${formInstanceId}`,
    },
  });

  const handleToken = useCallback(
    (token: string) => {
      setValue("turnstileToken", token, { shouldValidate: true });
    },
    [setValue],
  );

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);
    setResult(null);

    const response = await submitBooking(values);
    setResult(response);
    setSubmitting(false);

    if (response.success) {
      reset({
        ownerName: "",
        phone: "",
        email: "",
        petName: "",
        petType: "Chó",
        preferredTime: "Cần trao đổi thêm",
        preferredDate: "",
        concern: "",
        consent: false,
        turnstileToken: "",
        submissionId: `pet-one-${crypto.randomUUID()}`,
      });
    }
  });

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Tên người liên hệ"
          error={errors.ownerName?.message}
          required
        >
          <input
            {...register("ownerName")}
            autoComplete="name"
            placeholder="Tên của bạn"
            className={fieldClass}
          />
        </Field>
        <Field label="Số điện thoại" error={errors.phone?.message} required>
          <input
            {...register("phone")}
            autoComplete="tel"
            inputMode="tel"
            placeholder="Số để phòng khám liên hệ"
            className={fieldClass}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            autoComplete="email"
            inputMode="email"
            placeholder="Không bắt buộc"
            className={fieldClass}
          />
        </Field>
        <Field label="Tên thú cưng" error={errors.petName?.message} required>
          <input
            {...register("petName")}
            placeholder="Tên gọi ở nhà của bé"
            className={fieldClass}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Thú cưng là" error={errors.petType?.message} required>
          <select {...register("petType")} className={fieldClass}>
            <option value="Chó">Chó</option>
            <option value="Mèo">Mèo</option>
            <option value="Khác">Khác</option>
          </select>
        </Field>
        <Field label="Ngày mong muốn" error={errors.preferredDate?.message}>
          <input
            {...register("preferredDate")}
            type="date"
            className={fieldClass}
          />
        </Field>
        <Field
          label="Khung thời gian"
          error={errors.preferredTime?.message}
          required
        >
          <select {...register("preferredTime")} className={fieldClass}>
            <option value="Cần trao đổi thêm">Cần trao đổi thêm</option>
            <option value="Buổi sáng">Buổi sáng</option>
            <option value="Buổi chiều">Buổi chiều</option>
            <option value="Buổi tối">Buổi tối</option>
          </select>
        </Field>
      </div>

      <Field
        label="Bạn đang lo lắng điều gì về bé?"
        error={errors.concern?.message}
        required
      >
        <textarea
          {...register("concern")}
          rows={5}
          placeholder="Mô tả thay đổi, thời điểm bắt đầu và điều bạn đã quan sát được"
          className={cn(fieldClass, "resize-y py-3")}
        />
      </Field>

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-muted-ink">
        <input
          {...register("consent")}
          type="checkbox"
          className="mt-1 size-4 shrink-0 accent-medical-blue"
        />
        <span>
          Tôi đồng ý để Pet One sử dụng thông tin trên nhằm tiếp nhận yêu cầu và
          liên hệ xác nhận lịch. Đây chưa phải lịch hẹn đã được chốt.
          {errors.consent ? (
            <span className="mt-1 block text-xs font-semibold text-care-red">
              {errors.consent.message}
            </span>
          ) : null}
        </span>
      </label>

      <TurnstileWidget onToken={handleToken} />

      {result ? (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "flex items-start gap-3 rounded-2xl border p-4 text-sm leading-6",
            result.success
              ? "border-medical-blue/25 bg-medical-blue/6 text-deep-navy"
              : "border-care-red/25 bg-care-red/6 text-muted-ink",
          )}
        >
          {result.success ? (
            <CheckCircle
              size={21}
              weight="fill"
              className="mt-0.5 shrink-0 text-medical-blue"
            />
          ) : null}
          {result.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className={buttonStyles({
          className: "w-full sm:w-fit disabled:cursor-not-allowed disabled:opacity-60",
        })}
      >
        {submitting ? (
          <CircleNotch size={20} className="animate-spin" />
        ) : (
          <PaperPlaneTilt size={20} weight="bold" />
        )}
        {submitting ? "Đang gửi yêu cầu" : "Gửi yêu cầu đặt lịch"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  required = false,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-bold text-deep-navy">
      {label}
      {required ? (
        <span className="ml-1 text-care-red" aria-hidden="true">
          *
        </span>
      ) : null}
      {children}
      {error ? (
        <span className="mt-2 block text-xs font-semibold text-care-red">
          {error}
        </span>
      ) : null}
    </label>
  );
}
