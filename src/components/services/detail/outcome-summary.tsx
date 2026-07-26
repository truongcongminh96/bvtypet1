import {
  CalendarCheck,
  HouseLine,
} from "@phosphor-icons/react/dist/ssr";

import { CareActionLink } from "@/components/ui/button";

export function OutcomeSummary({
  afterVisitItems,
  outcomeItems,
}: {
  afterVisitItems: string[];
  outcomeItems: string[];
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
      <div>
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 items-center justify-center rounded-[9px_14px_14px_14px] border border-brand-blue/20 bg-surface text-brand-blue-dark">
            <HouseLine aria-hidden="true" size={22} weight="duotone" />
          </span>
          <h3 className="text-xl font-semibold text-text-primary">
            Điều cần tiếp tục tại nhà
          </h3>
        </div>
        <ol className="mt-6 border-t border-border-strong">
          {afterVisitItems.map((item, index) => (
            <li
              key={item}
              className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-border py-4 text-sm leading-7 text-text-secondary"
            >
              <span className="text-xs font-semibold tabular-nums text-brand-blue-dark">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item}
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-[12px_28px_28px_28px] border border-border bg-surface p-6 shadow-[0_16px_40px_rgba(16,46,58,0.06)] sm:p-8">
        <h3 className="font-display text-[clamp(2rem,3.3vw,3rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-text-primary text-balance">
          Sau buổi khám, bạn sẽ hiểu rõ hơn điều gì?
        </h3>
        <ul className="mt-7 grid gap-x-8 sm:grid-cols-2">
          {outcomeItems.map((item, index) => (
            <li
              key={item}
              className="border-t border-border py-4 text-sm leading-7 text-text-secondary"
            >
              <span className="mb-2 block text-xs font-semibold tabular-nums text-brand-blue-dark">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-7 border-t border-border pt-6">
          <p className="max-w-lg text-sm leading-7 text-text-secondary">
            Nếu bạn vẫn còn điều chưa rõ, hãy kể PetOne điều bạn đang quan sát trước khi đặt lịch.
          </p>
          <CareActionLink
            href="/lien-he#dat-lich"
            leadingIcon={<CalendarCheck size={19} weight="duotone" />}
            className="mt-5 w-full sm:w-auto"
          >
            Đặt lịch khám
          </CareActionLink>
        </div>
      </div>
    </div>
  );
}
