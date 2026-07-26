import type { Metadata } from "next";
import {
  ChatCircleText,
  Heart,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { PageHero } from "@/components/site/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Đội ngũ bác sĩ",
  description:
    "Tìm hiểu nguyên tắc chuyên môn và cách đội ngũ Pet One giao tiếp trong mỗi buổi chăm sóc.",
};

export default function DoctorsPage() {
  return (
    <>
      <PageHero
        current="Bác sĩ"
        title="Đội ngũ cùng bạn chăm bé bằng sự rõ ràng"
        description="Pet One hướng tới chuyên môn vững, thao tác nhẹ nhàng và trao đổi thẳng thắn để người nuôi luôn hiểu kế hoạch chăm sóc."
      />

      <section className="section-space">
        <div className="shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem_5rem_2rem_2rem]">
            <Image
              src="/images/pet-one-care.png"
              alt="Bác sĩ thú y nhẹ nhàng kiểm tra cho một chú chó nhỏ"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-clinical-white/90 px-3 py-2 text-xs font-medium text-muted-ink backdrop-blur-md">
              Hình ảnh minh hoạ
            </span>
          </div>
          <div>
            <SectionHeading
              label="Nguyên tắc làm việc"
              title="Chuyên môn được thể hiện qua từng quyết định nhỏ"
              description="Một buổi khám không nên khiến người nuôi cảm thấy bị động. Chúng tôi định hướng cuộc trao đổi xoay quanh dữ liệu quan sát được, mục tiêu của từng bước và khả năng theo dõi tại nhà."
            />
            <div className="mt-8 grid gap-4">
              {[
                {
                  icon: Heart,
                  title: "Tiếp cận nhẹ nhàng",
                  text: "Cho thú cưng thời gian làm quen trước khi bắt đầu thao tác.",
                },
                {
                  icon: ChatCircleText,
                  title: "Giải thích dễ hiểu",
                  text: "Làm rõ lý do, lựa chọn và điều cần quan sát tiếp theo.",
                },
                {
                  icon: ShieldCheck,
                  title: "Thông tin được xác minh",
                  text: "Hồ sơ bác sĩ chỉ xuất bản sau khi có dữ liệu chuyên môn chính thức.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="surface-card flex gap-4 rounded-2xl p-5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-ice text-medical-blue">
                    <item.icon size={23} weight="duotone" />
                  </span>
                  <div>
                    <h2 className="font-semibold text-deep-navy">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-muted-ink">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-ice">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[-0.01em] text-medical-blue">
              Hồ sơ chuyên môn
            </p>
            <h2 className="section-title mt-4 text-deep-navy">
              Thông tin bác sĩ đang được hoàn thiện
            </h2>
            <p className="body-large mt-5 text-muted-ink">
              Tên, bằng cấp, lĩnh vực quan tâm và lịch làm việc sẽ được bổ sung
              từ dữ liệu đã xác minh. Website hiện không sử dụng hồ sơ mẫu để
              tránh tạo nhầm lẫn.
            </p>
            <ButtonLink href="/lien-he#dat-lich" className="mt-8">
              Đặt lịch với đội ngũ Pet One
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
