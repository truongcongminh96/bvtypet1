"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { List, Phone, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Brand } from "@/components/site/brand";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const navigation = [
  { href: "/dich-vu", label: "Dịch vụ" },
  { href: "/bac-si", label: "Bác sĩ" },
  { href: "/cam-nang", label: "Cẩm nang" },
  { href: "/lien-he", label: "Liên hệ" },
];

export function Header({
  phone,
  phoneHref,
}: {
  phone: string;
  phoneHref: string;
}) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/85 bg-surface/94 backdrop-blur-lg">
      <div className="shell flex h-[4.5rem] items-center justify-between gap-5">
        <Brand />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Chính">
          {navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-2 text-sm font-semibold text-muted-ink transition-colors hover:text-deep-navy",
                  active &&
                    "text-deep-navy after:absolute after:inset-x-0 after:-bottom-[1.2rem] after:h-0.5 after:bg-brand-blue",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href={phoneHref}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
          >
            <Phone
              aria-hidden="true"
              size={18}
              weight="bold"
              className="text-brand-red-strong"
            />
            {phone || "Gọi phòng khám"}
          </Link>
          <Link
            href="/lien-he#dat-lich"
            className={buttonStyles({ className: "min-h-11" })}
          >
            Đặt lịch khám
          </Link>
        </div>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] border border-line bg-clinical-white text-deep-navy lg:hidden"
              aria-label="Mở menu"
            >
              <List aria-hidden="true" size={25} weight="bold" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-[70] bg-text-primary/24 backdrop-blur-sm" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-[80] w-[min(88vw,22rem)] overflow-y-auto overscroll-contain border-l border-border bg-surface p-5 shadow-[0_24px_70px_rgba(16,46,58,0.16)] outline-none">
              <div className="flex items-center justify-between">
                <Dialog.Title asChild>
                  <Brand compact />
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Đóng menu"
                    className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] border border-line text-deep-navy"
                  >
                    <X aria-hidden="true" size={23} weight="bold" />
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Description className="sr-only">
                Điều hướng tới các trang của Pet One
              </Dialog.Description>

              <nav className="mt-9 grid gap-1" aria-label="Di động">
                {navigation.map((item) => (
                  <Dialog.Close asChild key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={
                        pathname === item.href ||
                        pathname.startsWith(`${item.href}/`)
                          ? "page"
                          : undefined
                      }
                      className={cn(
                        "rounded-[var(--radius-sm)] px-4 py-3.5 text-base font-semibold text-deep-navy",
                        (pathname === item.href ||
                          pathname.startsWith(`${item.href}/`)) &&
                          "bg-ice text-medical-blue",
                      )}
                    >
                      {item.label}
                    </Link>
                  </Dialog.Close>
                ))}
              </nav>
              <div className="mt-8 grid gap-2 border-t border-border pt-6">
                <Dialog.Close asChild>
                  <Link href="/lien-he#dat-lich" className={buttonStyles({})}>
                    Đặt lịch khám
                  </Link>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Link
                    href={phoneHref}
                    className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
                  >
                    <Phone
                      aria-hidden="true"
                      size={18}
                      weight="bold"
                      className="text-brand-red-strong"
                    />
                    {phone || "Gọi phòng khám"}
                  </Link>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
