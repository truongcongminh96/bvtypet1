import { StudioClient } from "@/components/sanity/studio-client";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="grid min-h-screen place-items-center bg-ice p-6">
        <div className="surface-card max-w-xl rounded-3xl p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-medical-blue">
            Pet One Content Studio
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-deep-navy">
            Sanity chưa được kết nối
          </h1>
          <p className="mt-4 leading-7 text-muted-ink">
            Thêm NEXT_PUBLIC_SANITY_PROJECT_ID và
            NEXT_PUBLIC_SANITY_DATASET vào biến môi trường. Website vẫn đang
            dùng nội dung dự phòng an toàn trong mã nguồn.
          </p>
        </div>
      </main>
    );
  }

  return <StudioClient />;
}
