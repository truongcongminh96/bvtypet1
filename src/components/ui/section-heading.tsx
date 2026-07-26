import { cn } from "@/lib/cn";

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {label ? (
        <p className="mb-4 text-sm font-semibold tracking-[-0.01em] text-medical-blue">
          {label}
        </p>
      ) : null}
      <h2 className="section-title text-deep-navy">{title}</h2>
      {description ? (
        <p className="body-large mt-5 max-w-2xl text-muted-ink">
          {description}
        </p>
      ) : null}
    </div>
  );
}
