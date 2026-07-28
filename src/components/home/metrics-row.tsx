import type { HomePageSettings } from "@/content/experience";

export function MetricsRow({
  items,
}: {
  items: HomePageSettings["metrics"];
}) {
  const verifiedItems = items.filter((item) => item.verified).slice(0, 3);

  if (verifiedItems.length === 0) return null;

  return (
    <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-text-primary/12 pt-6">
      {verifiedItems.map((item) => (
        <div key={`${item.value}-${item.label}`} className="min-w-[8rem]">
          <dd className="font-display text-4xl font-semibold leading-none text-brand-blue-dark">
            {item.value}
          </dd>
          <dt className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
            {item.label}
          </dt>
          {item.detail ? (
            <p className="mt-1 text-[0.68rem] leading-5 text-text-muted">
              {item.detail}
            </p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
