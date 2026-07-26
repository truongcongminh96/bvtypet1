import { ChatCircleDots } from "@phosphor-icons/react/dist/ssr";

import { CareActionLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function CompactCareCta({ className }: { className?: string }) {
  return (
    <aside
      aria-label="Trao đổi với bác sĩ"
      className={cn(
        "rounded-[var(--radius-lg)] border border-brand-blue/18 bg-brand-blue-soft/65 p-5 shadow-[0_12px_30px_rgba(16,46,58,0.06)]",
        className,
      )}
    >
      <span className="inline-flex size-10 items-center justify-center rounded-[var(--radius-sm)] border border-brand-blue/20 bg-surface text-brand-blue-dark">
        <ChatCircleDots aria-hidden="true" size={21} weight="duotone" />
      </span>
      <h2
        className="mt-4 font-display text-2xl font-semibold leading-[1.12] text-text-primary"
      >
        Cần trao đổi với bác sĩ?
      </h2>
      <p className="mt-3 text-sm leading-6 text-text-secondary">
        Gửi PetOne những thay đổi bạn đã quan sát. Chúng tôi sẽ hướng dẫn bước
        tiếp theo phù hợp.
      </p>
      <CareActionLink
        href="/lien-he#dat-lich"
        className="mt-5 w-full"
        leadingIcon={
          <ChatCircleDots aria-hidden="true" size={18} weight="bold" />
        }
      >
        Trao đổi với PetOne
      </CareActionLink>
    </aside>
  );
}
