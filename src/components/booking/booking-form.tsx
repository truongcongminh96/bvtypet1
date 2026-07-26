"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CheckCircle,
  PaperPlaneTilt,
  WarningCircle,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import {
  submitBooking,
  type BookingActionResult,
} from "@/app/actions/booking";
import {
  FormField,
  getFieldDescription,
} from "@/components/booking/form-field";
import { FormSection } from "@/components/booking/form-section";
import {
  TurnstileWidget,
  type TurnstileStatus,
} from "@/components/booking/turnstile-widget";
import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { CareActionButton } from "@/components/ui/button";
import { bookingSchema, type BookingInput } from "@/lib/booking-schema";
import { cn } from "@/lib/cn";

const fieldClass =
  "min-h-12 w-full rounded-[var(--radius-sm)] border border-border-strong bg-surface px-4 text-[0.95rem] text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-text-muted focus-visible:border-brand-blue-dark focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-blue/15 aria-[invalid=true]:border-care-red aria-[invalid=true]:focus-visible:ring-care-red/12";

const initialValues = {
  ownerName: "",
  phone: "",
  email: "",
  petName: "",
  petType: "Chó" as const,
  preferredTime: "Linh hoạt, PetOne liên hệ lại" as const,
  preferredDate: "",
  concern: "",
  consent: false,
  turnstileToken: "",
};

export function BookingForm({
  supportPhone,
  supportPhoneHref,
}: {
  supportPhone?: string;
  supportPhoneHref?: string;
}) {
  const formInstanceId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const resultRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<BookingActionResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [turnstileStatus, setTurnstileStatus] =
    useState<TurnstileStatus>("loading");
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      ...initialValues,
      submissionId: `pet-one-${formInstanceId}`,
    },
  });

  const handleToken = useCallback(
    (token: string) => {
      setValue("turnstileToken", token, {
        shouldValidate: Boolean(token),
      });
    },
    [setValue],
  );

  const handleTurnstileStatus = useCallback((status: TurnstileStatus) => {
    setTurnstileStatus(status);
  }, []);

  useEffect(() => {
    if (result) {
      resultRef.current?.focus();
    }
  }, [result]);

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);
    setResult(null);

    const response = await submitBooking(values);

    setResult(response);
    setSubmitting(false);
    setTurnstileStatus("ready");
    setTurnstileResetSignal((current) => current + 1);

    if (response.success) {
      reset({
        ...initialValues,
        submissionId: `pet-one-${crypto.randomUUID()}`,
      });
    } else {
      setValue("turnstileToken", "", { shouldValidate: false });
    }
  });

  const securityVerified = turnstileStatus === "verified";
  const submitDisabled = submitting || !securityVerified;

  return (
    <form onSubmit={onSubmit} className="grid gap-6 sm:gap-8" noValidate>
      <MotionGroup className="grid gap-6 sm:gap-8" amount={0.06}>
        <MotionItem>
          <FormSection
            legend="Thông tin để PetOne liên hệ lại"
            description="PetOne dùng những thông tin này để xác nhận và trao đổi thêm khi cần."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="ownerName"
                label="Tên người liên hệ"
                error={errors.ownerName?.message}
                required
              >
                <input
                  {...register("ownerName")}
                  id="ownerName"
                  autoComplete="name"
                  placeholder="Tên của bạn"
                  className={fieldClass}
                  aria-invalid={Boolean(errors.ownerName)}
                  aria-describedby={getFieldDescription({
                    id: "ownerName",
                    hasError: Boolean(errors.ownerName),
                  })}
                  aria-required="true"
                />
              </FormField>

              <FormField
                id="phone"
                label="Số điện thoại"
                helper="Số PetOne có thể dùng để liên hệ xác nhận."
                error={errors.phone?.message}
                required
              >
                <input
                  {...register("phone")}
                  id="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="Ví dụ: 090 123 4567"
                  className={fieldClass}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={getFieldDescription({
                    id: "phone",
                    hasHelper: true,
                    hasError: Boolean(errors.phone),
                  })}
                  aria-required="true"
                />
              </FormField>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="email"
                label="Email"
                helper="Không bắt buộc. Dùng khi bạn muốn nhận trao đổi bằng email."
                error={errors.email?.message}
              >
                <input
                  {...register("email")}
                  id="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="tenban@example.com"
                  className={fieldClass}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={getFieldDescription({
                    id: "email",
                    hasHelper: true,
                    hasError: Boolean(errors.email),
                  })}
                />
              </FormField>
            </div>
          </FormSection>
        </MotionItem>

        <MotionItem className="border-t border-border pt-6 sm:pt-8">
          <FormSection
            legend="Thông tin cơ bản về bé"
            description="Một vài dữ liệu ngắn giúp phòng khám chuẩn bị cách trao đổi phù hợp hơn."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="petName"
                label="Tên thú cưng"
                error={errors.petName?.message}
                required
              >
                <input
                  {...register("petName")}
                  id="petName"
                  autoComplete="off"
                  placeholder="Tên gọi ở nhà của bé"
                  className={fieldClass}
                  aria-invalid={Boolean(errors.petName)}
                  aria-describedby={getFieldDescription({
                    id: "petName",
                    hasError: Boolean(errors.petName),
                  })}
                  aria-required="true"
                />
              </FormField>

              <FormField
                id="petType"
                label="Loài"
                error={errors.petType?.message}
                required
              >
                <select
                  {...register("petType")}
                  id="petType"
                  className={fieldClass}
                  aria-invalid={Boolean(errors.petType)}
                  aria-describedby={getFieldDescription({
                    id: "petType",
                    hasError: Boolean(errors.petType),
                  })}
                  aria-required="true"
                >
                  <option value="Chó">Chó</option>
                  <option value="Mèo">Mèo</option>
                  <option value="Khác">Khác</option>
                </select>
              </FormField>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="preferredDate"
                label="Ngày mong muốn"
                helper="PetOne sẽ liên hệ lại để kiểm tra thời gian phù hợp."
                error={errors.preferredDate?.message}
              >
                <input
                  {...register("preferredDate")}
                  id="preferredDate"
                  type="date"
                  className={fieldClass}
                  aria-invalid={Boolean(errors.preferredDate)}
                  aria-describedby={getFieldDescription({
                    id: "preferredDate",
                    hasHelper: true,
                    hasError: Boolean(errors.preferredDate),
                  })}
                />
              </FormField>

              <FormField
                id="preferredTime"
                label="Khung thời gian"
                error={errors.preferredTime?.message}
                required
              >
                <select
                  {...register("preferredTime")}
                  id="preferredTime"
                  className={fieldClass}
                  aria-invalid={Boolean(errors.preferredTime)}
                  aria-describedby={getFieldDescription({
                    id: "preferredTime",
                    hasError: Boolean(errors.preferredTime),
                  })}
                  aria-required="true"
                >
                  <option value="Buổi sáng">Buổi sáng</option>
                  <option value="Buổi chiều">Buổi chiều</option>
                  <option value="Buổi tối">Buổi tối</option>
                  <option value="Linh hoạt, PetOne liên hệ lại">
                    Linh hoạt, PetOne liên hệ lại
                  </option>
                </select>
              </FormField>
            </div>
          </FormSection>
        </MotionItem>

        <MotionItem className="border-t border-border pt-6 sm:pt-8">
          <FormSection
            legend="Quan sát về bé"
            description="Mô tả ngắn và cụ thể sẽ hữu ích hơn việc cố dùng thuật ngữ y khoa."
          >
            <FormField
              id="concern"
              label="Điều bạn đang quan sát"
              helper="Mô tả thay đổi, thời điểm bắt đầu và điều bạn lo nhất."
              error={errors.concern?.message}
              required
            >
              <textarea
                {...register("concern")}
                id="concern"
                rows={4}
                placeholder="Ví dụ: Bé ăn ít từ tối qua, ngủ nhiều và có vẻ đau khi đứng dậy."
                className={cn(fieldClass, "min-h-32 resize-y py-3 sm:min-h-36")}
                aria-invalid={Boolean(errors.concern)}
                aria-describedby={getFieldDescription({
                  id: "concern",
                  hasHelper: true,
                  hasError: Boolean(errors.concern),
                })}
                aria-required="true"
              />
            </FormField>
          </FormSection>
        </MotionItem>
      </MotionGroup>

      <div className="border-t border-border pt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-text-secondary">
          <input
            {...register("consent")}
            id="consent"
            type="checkbox"
            className="mt-1 size-4 shrink-0 accent-brand-blue-dark"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            aria-required="true"
          />
          <span>
            Tôi đồng ý để PetOne liên hệ xác nhận yêu cầu. Lịch chỉ được chốt
            sau khi hai bên thống nhất.
            {errors.consent ? (
              <span
                id="consent-error"
                role="alert"
                className="mt-1 block text-xs font-semibold text-care-red"
              >
                {errors.consent.message}
              </span>
            ) : null}
          </span>
        </label>
      </div>

      <div className="grid gap-4">
        <TurnstileWidget
          onToken={handleToken}
          onStatusChange={handleTurnstileStatus}
          resetSignal={turnstileResetSignal}
          supportPhone={supportPhone}
          supportPhoneHref={supportPhoneHref}
        />
        {errors.turnstileToken ? (
          <p role="alert" className="text-xs font-semibold text-care-red">
            {errors.turnstileToken.message}
          </p>
        ) : null}
      </div>

      {result ? (
        <div
          ref={resultRef}
          tabIndex={-1}
          role={result.success ? "status" : "alert"}
          aria-live={result.success ? "polite" : "assertive"}
          className={cn(
            "flex items-start gap-3 rounded-[var(--radius-md)] border p-4 text-sm leading-6 outline-none sm:p-5",
            result.success
              ? "border-brand-blue/25 bg-brand-blue-soft/70 text-text-primary"
              : "border-care-red/25 bg-brand-red-soft text-text-secondary",
          )}
        >
          {result.success ? (
            <CheckCircle
              aria-hidden="true"
              size={22}
              weight="fill"
              className="mt-0.5 shrink-0 text-brand-blue-dark"
            />
          ) : (
            <WarningCircle
              aria-hidden="true"
              size={22}
              weight="duotone"
              className="mt-0.5 shrink-0 text-care-red"
            />
          )}
          <div>
            <p className="font-semibold text-text-primary">
              {result.success
                ? "PetOne đã nhận được thông tin."
                : "Yêu cầu chưa được gửi."}
            </p>
            <p className="mt-1">{result.message}</p>
            {!result.success && supportPhoneHref && supportPhone ? (
              <Link
                href={supportPhoneHref}
                className="mt-2 inline-flex min-h-10 items-center gap-2 font-semibold text-brand-blue-dark underline decoration-brand-blue/30 underline-offset-4"
              >
                Gọi {supportPhone}
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}

      <CareActionButton
        type="submit"
        leadingIcon={<PaperPlaneTilt aria-hidden="true" size={19} weight="bold" />}
        trailingIcon={<ArrowRight aria-hidden="true" size={16} weight="bold" />}
        loading={submitting}
        loadingLabel="Đang gửi yêu cầu"
        disabled={submitDisabled}
        className="w-full sm:w-fit"
      >
        Gửi yêu cầu đặt lịch
      </CareActionButton>
    </form>
  );
}
