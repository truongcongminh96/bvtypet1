import { CaretRight, House } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export function PageHero({
  title,
  description,
  current,
}: {
  title: string;
  description: string;
  current: string;
}) {
  return (
    <section className="border-b border-border bg-surface-soft">
      <div className="shell py-16 sm:py-20 lg:py-24">
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex items-center gap-2 text-xs font-semibold text-muted-ink"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-medical-blue"
          >
            <House aria-hidden="true" size={15} weight="fill" />
            Trang chủ
          </Link>
          <CaretRight aria-hidden="true" size={13} />
          <span aria-current="page" className="text-medical-blue">
            {current}
          </span>
        </nav>
        <h1 className="display-title max-w-4xl text-deep-navy">{title}</h1>
        <p className="body-large mt-6 max-w-2xl text-muted-ink">
          {description}
        </p>
      </div>
    </section>
  );
}
