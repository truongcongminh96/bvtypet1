import { Info } from "@phosphor-icons/react/dist/ssr";

import { MotionGroup, MotionItem } from "@/components/motion/reveal";

export function RelevanceList({ items }: { items: string[] }) {
  return (
    <section
      aria-labelledby="service-relevance-title"
      className="bg-background py-[clamp(4rem,7vw,6.5rem)]"
    >
      <MotionGroup className="shell" amount={0.12}>
        <MotionItem>
          <h2
            id="service-relevance-title"
            className="max-w-3xl font-display text-[clamp(2.35rem,4.2vw,4rem)] font-semibold leading-[1.07] tracking-[-0.018em] text-text-primary text-balance"
          >
            Khi nào bạn có thể cân nhắc dịch vụ này?
          </h2>
        </MotionItem>
        <MotionItem>
          <ul className="mt-9 grid border-t border-border-strong md:grid-cols-2 md:gap-x-10">
            {items.map((item) => (
              <li
                key={item}
                className="flex min-h-20 items-start gap-3 border-b border-border py-5 text-sm leading-7 text-text-secondary sm:text-base"
              >
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-px w-6 shrink-0 bg-brand-blue/55"
                />
                {item}
              </li>
            ))}
          </ul>
        </MotionItem>
        <MotionItem>
          <p className="mt-6 flex max-w-3xl items-start gap-3 border-l-2 border-brand-blue/45 bg-brand-blue-soft/55 px-4 py-3 text-xs leading-6 text-text-secondary sm:text-sm">
            <Info
              aria-hidden="true"
              size={19}
              weight="duotone"
              className="mt-0.5 shrink-0 text-brand-blue-dark"
            />
            Nội dung mang tính tham khảo và không thay thế đánh giá trực tiếp của bác sĩ thú y.
          </p>
        </MotionItem>
      </MotionGroup>
    </section>
  );
}
