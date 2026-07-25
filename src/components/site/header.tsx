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

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-clinical-white/88 backdrop-blur-xl">
      <div className="shell flex h-[4.75rem] items-center justify-between gap-6">
        <Brand />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Chính">
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
                    "text-deep-navy after:absolute after:inset-x-0 after:-bottom-[1.38rem] after:h-0.5 after:bg-medical-blue",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/lien-he"
            className={buttonStyles({ variant: "secondary", className: "min-h-11" })}
          >
            <Phone size={18} weight="bold" />
            Gọi phòng khám
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
              className="inline-flex size-11 items-center justify-center rounded-[14px] border border-line bg-clinical-white text-deep-navy lg:hidden"
              aria-label="Mở menu"
            >
              <List size={25} weight="bold" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-[70] bg-deep-navy/42 backdrop-blur-sm data-[state=open]:animate-in" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-[80] w-[min(88vw,24rem)] border-l border-line bg-clinical-white p-5 shadow-2xl outline-none">
              <div className="flex items-center justify-between">
                <Dialog.Title asChild>
                  <Brand compact />
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Đóng menu"
                    className="inline-flex size-11 items-center justify-center rounded-[14px] border border-line text-deep-navy"
                  >
                    <X size={23} weight="bold" />
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Description className="sr-only">
                Điều hướng tới các trang của Pet One
              </Dialog.Description>

              <nav className="mt-10 grid gap-2" aria-label="Di động">
                {navigation.map((item) => (
                  <Dialog.Close asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-2xl px-4 py-4 font-display text-xl font-bold text-deep-navy",
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
              <div className="mt-8 grid gap-3">
                <Dialog.Close asChild>
                  <Link href="/lien-he#dat-lich" className={buttonStyles({})}>
                    Đặt lịch khám
                  </Link>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Link
                    href="/lien-he"
                    className={buttonStyles({ variant: "secondary" })}
                  >
                    <Phone size={18} weight="bold" />
                    Gọi phòng khám
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
