"use client";

import { CaretDown } from "@phosphor-icons/react";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";

import { serviceDirectoryGroups } from "@/content/service-directory";
import { cn } from "@/lib/cn";

export function ServiceMegaMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        open &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (open && event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => firstLinkRef.current?.focus());
    }
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (
      event.relatedTarget &&
      !event.currentTarget.contains(event.relatedTarget as Node)
    ) {
      setOpen(false);
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-flex min-h-11 items-center rounded-full transition-colors hover:bg-brand-blue-soft",
        active && "bg-brand-blue-soft",
      )}
      onBlur={handleBlur}
    >
      <Link
        href="/dich-vu"
        aria-current={active ? "page" : undefined}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "inline-flex min-h-11 items-center py-2.5 pr-0.5 pl-3 text-[0.8rem] font-semibold text-text-secondary transition-colors hover:text-text-primary xl:pr-1 xl:pl-4 xl:text-sm",
          active && "text-brand-blue-dark",
        )}
      >
        Dịch vụ
      </Link>
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? "Đóng menu dịch vụ" : "Mở menu dịch vụ"}
        aria-expanded={open}
        aria-controls="service-mega-menu"
        aria-haspopup="true"
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-text-primary xl:size-10",
          active && "text-brand-blue-dark",
        )}
      >
        <CaretDown
          aria-hidden="true"
          size={14}
          weight="bold"
          className={cn(
            "transition-transform duration-200 motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        id="service-mega-menu"
        aria-hidden={!open}
        className={cn(
          "fixed left-1/2 top-[4.5rem] z-50 w-[min(calc(100vw-2rem),76rem)] -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-200",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0",
        )}
      >
        <div className="rounded-[14px_28px_28px_28px] border border-border bg-surface p-5 shadow-[0_24px_64px_rgba(16,46,58,0.14)]">
          <div className="grid grid-cols-4 gap-5">
            {serviceDirectoryGroups.map((group, groupIndex) => (
              <section
                key={group.id}
                aria-labelledby={`mega-${group.id}`}
                className="min-w-0 border-r border-border pr-5 last:border-r-0 last:pr-0"
              >
                <Link
                  ref={groupIndex === 0 ? firstLinkRef : undefined}
                  id={`mega-${group.id}`}
                  href={`/dich-vu#${group.id}`}
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-10 items-center text-sm font-semibold text-text-primary hover:text-brand-blue-dark"
                >
                  {group.label}
                </Link>
                <p className="min-h-10 text-xs leading-5 text-text-secondary">
                  {group.description}
                </p>
                {group.items.length > 0 ? (
                  <ul className="mt-3 border-t border-border pt-2">
                    {group.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/dich-vu/${item.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex min-h-9 items-center rounded-lg px-2 text-xs font-medium leading-5 text-text-secondary transition-colors hover:bg-brand-blue-soft hover:text-brand-blue-dark"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 border-t border-border pt-3 text-xs font-semibold text-text-muted">
                    Sắp cập nhật
                  </p>
                )}
              </section>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-end border-t border-border pt-3">
            <Link
              href="/dich-vu"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-10 items-center text-sm font-semibold text-brand-blue-dark hover:underline hover:underline-offset-4"
            >
              Xem tất cả dịch vụ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
