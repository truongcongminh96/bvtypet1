export function ArticleLead({ children }: { children: string }) {
  return (
    <p className="font-display text-2xl font-medium leading-[1.35] tracking-[-0.01em] text-text-primary sm:text-[1.8rem]">
      {children}
    </p>
  );
}

