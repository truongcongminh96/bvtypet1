import { PawPrint } from "@phosphor-icons/react/dist/ssr";

import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="grid min-h-[70svh] place-items-center px-4 py-20">
      <div className="max-w-xl text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-ice text-medical-blue">
          <PawPrint size={32} weight="duotone" />
        </span>
        <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-medical-blue">
          Không tìm thấy trang
        </p>
        <h1 className="section-title mt-4 text-deep-navy">
          Có vẻ dấu chân này dẫn sang một lối khác
        </h1>
        <p className="mt-5 leading-7 text-muted-ink">
          Nội dung có thể đã được đổi đường dẫn hoặc chưa được xuất bản.
        </p>
        <ButtonLink href="/" className="mt-8">
          Về trang chủ
        </ButtonLink>
      </div>
    </section>
  );
}
