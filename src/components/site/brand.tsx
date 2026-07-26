import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Pet One, về trang chủ"
      className="inline-flex items-center gap-3"
    >
      <span className="relative block size-12 shrink-0 overflow-hidden rounded-full border border-border-strong bg-white">
        <Image
          src="/brand/pet-one-source.jpg"
          alt=""
          width={78}
          height={63}
          className="absolute left-[-15px] top-0 h-[63px] w-[78px] max-w-none"
          priority
        />
      </span>
      <span className={cn("leading-none", compact && "sr-only sm:not-sr-only")}>
        <span className="block text-[1.2rem] font-semibold tracking-[-0.025em] text-deep-navy">
          Pet One
        </span>
        <span className="mt-1 block text-[0.68rem] font-medium tracking-[0.02em] text-brand-blue-dark">
          Veterinary Care
        </span>
      </span>
    </Link>
  );
}
