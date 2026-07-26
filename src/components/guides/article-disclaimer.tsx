export function ArticleDisclaimer({ children }: { children: string }) {
  return (
    <aside
      aria-label="Lưu ý về nội dung"
      className="rounded-[var(--radius-md)] border border-border bg-surface px-5 py-4 text-sm leading-7 text-text-secondary shadow-[0_8px_22px_rgba(16,46,58,0.045)]"
    >
      <span className="font-semibold text-text-primary">Lưu ý: </span>
      {children}
    </aside>
  );
}

