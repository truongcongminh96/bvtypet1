import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Pet One, về trang chủ"
      className="inline-flex items-center gap-2.5"
    >
      <span className="relative block size-11 shrink-0 overflow-hidden rounded-full border border-line bg-white">
        <Image
          src="/brand/pet-one-source.jpg"
          alt=""
          width={72}
          height={58}
          className="absolute left-[-15px] top-0 h-[58px] w-[72px] max-w-none"
          priority
        />
      </span>
      <span className={cn("leading-none", compact && "sr-only sm:not-sr-only")}>
        <span className="block font-display text-[1.16rem] font-extrabold tracking-[-0.045em] text-deep-navy">
          Pet One
        </span>
        <span className="mt-1 block text-[0.63rem] font-bold uppercase tracking-[0.17em] text-medical-blue">
          Veterinary Care
        </span>
      </span>
    </Link>
  );
}
