"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {
  CaretDown,
  List,
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { serviceGroups } from "@/content/experience";
import { Brand } from "@/components/site/brand";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const navigation = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/cam-nang", label: "Cẩm nang" },
  { href: "/bac-si", label: "Bác sĩ" },
  { href: "/lien-he", label: "Liên hệ" },
];

function SearchDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Tìm kiếm"
          className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-text-primary transition-colors hover:border-brand-blue/40 hover:bg-brand-blue-soft"
        >
          <MagnifyingGlass aria-hidden="true" size={20} weight="bold" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-text-primary/35 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-[18vh] z-[100] w-[min(92vw,42rem)] -translate-x-1/2 rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[0_30px_90px_rgba(16,46,58,0.22)] outline-none sm:p-8">
          <div className="flex items-center justify-between gap-5">
            <div>
              <Dialog.Title className="font-display text-3xl font-semibold text-text-primary">
                Tìm tại Pet One
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-text-secondary">
                Tìm trong dịch vụ và cẩm nang chăm bé.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Đóng tìm kiếm"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
              >
                <X aria-hidden="true" size={21} />
              </button>
            </Dialog.Close>
          </div>
          <form action="/tim-kiem" className="mt-6 flex gap-2">
            <label htmlFor="site-search" className="sr-only">
              Từ khóa tìm kiếm
            </label>
            <input
              id="site-search"
              name="q"
              type="search"
              required
              autoFocus
              placeholder="Ví dụ: tiêm phòng, chăm sóc răng..."
              className="min-h-12 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-border bg-background px-4 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-brand-blue"
            />
            <button className={buttonStyles({ className: "min-h-12 px-5" })}>
              Tìm
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function Header() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-border/85 bg-surface/94 backdrop-blur-lg">
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <Brand />

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Chính">
          {navigation.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-brand-blue-soft hover:text-text-primary",
                isActive(item.href) && "bg-brand-blue-soft text-brand-blue-dark",
              )}
            >
              {item.label}
            </Link>
          ))}

          <div className="group relative">
            <Link
              href="/dich-vu"
              aria-current={isActive("/dich-vu") ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-brand-blue-soft hover:text-text-primary",
                isActive("/dich-vu") && "bg-brand-blue-soft text-brand-blue-dark",
              )}
            >
              Dịch vụ
              <CaretDown aria-hidden="true" size={14} weight="bold" />
            </Link>
            <div className="invisible absolute left-1/2 top-full w-[42rem] -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="grid grid-cols-2 gap-2 rounded-[var(--radius-lg)] border border-border bg-surface p-4 shadow-[0_24px_64px_rgba(16,46,58,0.14)]">
                {serviceGroups.map((group) => (
                  <Link
                    key={group.id}
                    href={`/dich-vu#${group.id}`}
                    className="rounded-[var(--radius-md)] p-4 transition-colors hover:bg-surface-soft"
                  >
                    <span className="text-sm font-semibold text-text-primary">
                      {group.label}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-text-secondary">
                      {group.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navigation.slice(2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-brand-blue-soft hover:text-text-primary",
                isActive(item.href) && "bg-brand-blue-soft text-brand-blue-dark",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <SearchDialog />
          <Link
            href="/lien-he#dat-lich"
            className={buttonStyles({ className: "min-h-11" })}
          >
            Đặt lịch khám
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <SearchDialog />
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-surface text-text-primary"
                aria-label="Mở menu"
              >
                <List aria-hidden="true" size={25} weight="bold" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[70] bg-text-primary/24 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-[80] w-[min(88vw,23rem)] overflow-y-auto border-l border-border bg-surface p-5 shadow-[0_24px_70px_rgba(16,46,58,0.16)] outline-none">
                <div className="flex items-center justify-between">
                  <Dialog.Title asChild><Brand compact /></Dialog.Title>
                  <Dialog.Close asChild>
                    <button type="button" aria-label="Đóng menu" className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] border border-border">
                      <X aria-hidden="true" size={23} />
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">
                  Điều hướng tới các trang của Pet One
                </Dialog.Description>
                <nav className="mt-8 grid gap-1" aria-label="Di động">
                  {navigation.slice(0, 2).map((item) => (
                    <Dialog.Close asChild key={item.href}>
                      <Link href={item.href} className="rounded-[var(--radius-sm)] px-4 py-3 text-base font-semibold text-text-primary hover:bg-surface-soft">
                        {item.label}
                      </Link>
                    </Dialog.Close>
                  ))}
                  <p className="mt-3 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                    Dịch vụ
                  </p>
                  {serviceGroups.map((group) => (
                    <Dialog.Close asChild key={group.id}>
                      <Link href={`/dich-vu#${group.id}`} className="rounded-[var(--radius-sm)] px-4 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-soft">
                        {group.label}
                      </Link>
                    </Dialog.Close>
                  ))}
                  {navigation.slice(2).map((item) => (
                    <Dialog.Close asChild key={item.href}>
                      <Link href={item.href} className="rounded-[var(--radius-sm)] px-4 py-3 text-base font-semibold text-text-primary hover:bg-surface-soft">
                        {item.label}
                      </Link>
                    </Dialog.Close>
                  ))}
                </nav>
                <Dialog.Close asChild>
                  <Link href="/lien-he#dat-lich" className={buttonStyles({ className: "mt-7 w-full" })}>
                    Đặt lịch khám
                  </Link>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
