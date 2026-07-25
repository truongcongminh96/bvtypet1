import { careSteps } from "@/content/site";

export function CareProcess() {
  return (
    <ol className="mt-12 grid gap-0 lg:grid-cols-4">
      {careSteps.map((step, index) => (
        <li
          key={step.number}
          className="relative border-l border-line pb-9 pl-7 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pt-8"
        >
          <span className="absolute -left-[0.42rem] top-0 size-3 rounded-full bg-medical-blue ring-4 ring-ice lg:-top-[0.42rem] lg:left-0" />
          <div className="lg:pr-7">
            <span className="font-display text-xs font-extrabold tracking-[0.16em] text-medical-blue">
              {step.number}
            </span>
            <h3 className="mt-3 font-display text-xl font-extrabold text-deep-navy">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-ink">
              {step.description}
            </p>
          </div>
          {index < careSteps.length - 1 ? null : (
            <span className="absolute bottom-0 left-[-0.42rem] size-3 rounded-full bg-care-red ring-4 ring-ice lg:-right-0 lg:-top-[0.42rem] lg:left-auto" />
          )}
        </li>
      ))}
    </ol>
  );
}
