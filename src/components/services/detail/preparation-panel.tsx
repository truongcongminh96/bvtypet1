import {
  CalendarCheck,
  CheckCircle,
  NotePencil,
} from "@phosphor-icons/react/dist/ssr";

import { CareActionLink } from "@/components/ui/button";

export function PreparationPanel({ items }: { items: string[] }) {
  return (
    <aside
      aria-labelledby="preparation-panel-title"
      className="rounded-[12px_28px_28px_28px] border border-brand-blue/15 bg-brand-blue-soft/65 p-5 shadow-[0_14px_34px_rgba(16,46,58,0.055)] sm:p-7"
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[9px_14px_14px_14px] border border-brand-blue/20 bg-surface text-brand-blue-dark">
          <NotePencil aria-hidden="true" size={22} weight="duotone" />
        </span>
        <div>
          <h3
            id="preparation-panel-title"
            className="text-xl font-semibold leading-7 text-text-primary"
          >
            Chuẩn bị trước khi đến
          </h3>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Một vài ghi chú ngắn giúp buổi trao đổi đi thẳng vào điều bạn quan tâm.
          </p>
        </div>
      </div>

      <ul className="mt-6 grid gap-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-6 text-text-secondary">
            <CheckCircle
              aria-hidden="true"
              size={19}
              weight="duotone"
              className="mt-0.5 shrink-0 text-brand-blue-dark"
            />
            {item}
          </li>
        ))}
      </ul>

      <p className="mt-6 border-t border-brand-blue/15 pt-5 text-xs leading-6 text-text-secondary">
        Nếu dịch vụ cần chuẩn bị riêng, PetOne sẽ xác nhận trực tiếp trước buổi hẹn.
      </p>
      <CareActionLink
        href="/lien-he#dat-lich"
        leadingIcon={<CalendarCheck size={19} weight="duotone" />}
        className="mt-5 w-full"
      >
        Đặt lịch khám
      </CareActionLink>
    </aside>
  );
}
