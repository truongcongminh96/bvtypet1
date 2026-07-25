import {
  ArrowRight,
  CalendarDots,
  CheckCircle,
  Heart,
  PawPrint,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { ArticleGrid } from "@/components/home/article-grid";
import { CareProcess } from "@/components/home/care-process";
import { HeroVisual } from "@/components/home/hero-visual";
import { ServiceBento } from "@/components/home/service-bento";
import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { getArticles, getServices } from "@/sanity/content";

export default async function HomePage() {
  const [services, articles] = await Promise.all([
    getServices(),
    getArticles(),
  ]);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="medical-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="shell relative grid min-h-[calc(100svh-4.75rem)] items-center gap-14 py-14 lg:grid-cols-[0.86fr_1.14fr] lg:py-16">
          <div className="max-w-[36rem]">
            <p className="mb-5 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-medical-blue">
              <PawPrint size={17} weight="fill" />
              Chăm sóc thú y có giải thích
            </p>
            <h1 className="display-title text-deep-navy">
              Hiểu rõ hơn.
              <span className="block text-medical-blue">Chăm bé tốt hơn.</span>
            </h1>
            <p className="body-large mt-6 max-w-[33rem] text-muted-ink">
              Pet One tạo một hành trình khám nhẹ nhàng, nơi mỗi bước đều được
              giải thích rõ để bạn tự tin đồng hành cùng thú cưng.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/lien-he#dat-lich">
                <CalendarDots size={20} weight="bold" />
                Đặt lịch khám
              </ButtonLink>
              <ButtonLink href="/lien-he" variant="secondary">
                <Phone size={19} weight="bold" />
                Gọi phòng khám
              </ButtonLink>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="border-y border-line bg-ice">
        <div className="shell grid gap-6 py-7 md:grid-cols-3">
          {[
            {
              icon: Heart,
              title: "Nhẹ nhàng với từng bé",
              text: "Tiếp cận phù hợp với cảm xúc và mức độ hợp tác.",
            },
            {
              icon: CheckCircle,
              title: "Rõ ràng với người nuôi",
              text: "Giải thích mục tiêu trước khi đề xuất bước tiếp theo.",
            },
            {
              icon: PawPrint,
              title: "Theo dõi liền mạch",
              text: "Tóm tắt điều cần quan sát sau khi trở về nhà.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-medical-blue text-white">
                <item.icon size={22} weight="duotone" />
              </span>
              <div>
                <h2 className="font-display text-sm font-extrabold text-deep-navy">
                  {item.title}
                </h2>
                <p className="mt-1 text-xs leading-5 text-muted-ink">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="shell">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              label="Dịch vụ tại Pet One"
              title="Đúng bước cần thiết, vào đúng thời điểm"
              description="Mỗi dịch vụ bắt đầu từ một câu hỏi cụ thể về sức khỏe của bé, không phải một danh sách chỉ định có sẵn."
            />
            <Link
              href="/dich-vu"
              className={buttonStyles({ variant: "ghost", className: "self-start" })}
            >
              Xem tất cả dịch vụ
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
          <ServiceBento items={services} />
        </div>
      </section>

      <section className="section-space overflow-hidden bg-ice">
        <div className="shell grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem_5rem_2rem_2rem] shadow-[0_30px_70px_rgba(8,45,70,0.18)]">
              <Image
                src="/images/pet-one-care.png"
                alt="Bác sĩ thú y đang trấn an một chú chó nhỏ trong buổi khám"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-clinical-white/90 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.13em] text-muted-ink backdrop-blur-md">
                Hình ảnh minh hoạ
              </span>
            </div>
            <div className="absolute -right-7 -top-7 hidden size-32 rounded-full border-[22px] border-medical-blue/16 md:block" />
          </div>
          <div>
            <SectionHeading
              label="Đội ngũ Pet One"
              title="Chuyên môn đi cùng cách giao tiếp dễ hiểu"
              description="Một buổi khám tốt không chỉ có đánh giá chuyên môn. Người nuôi cần hiểu điều gì đang xảy ra, vì sao một bước được đề xuất và sẽ theo dõi thế nào sau đó."
            />
            <ul className="mt-8 grid gap-4">
              {[
                "Tôn trọng nhịp thích nghi của từng thú cưng",
                "Trao đổi lựa chọn chăm sóc bằng ngôn ngữ gần gũi",
                "Không sử dụng hồ sơ bác sĩ hoặc thành tích chưa được xác minh",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-ink">
                  <CheckCircle
                    size={21}
                    weight="fill"
                    className="mt-0.5 shrink-0 text-medical-blue"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/bac-si" variant="ghost" className="mt-8">
              Tìm hiểu cách chúng tôi chăm sóc
              <ArrowRight size={18} weight="bold" />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="shell">
          <SectionHeading
            label="Một hành trình rõ ràng"
            title="Từ điều bạn quan sát đến kế hoạch theo dõi"
            description="Quy trình được thiết kế để người nuôi luôn biết mình đang ở bước nào và cần chuẩn bị gì tiếp theo."
          />
          <CareProcess />
        </div>
      </section>

      <section className="section-space bg-deep-navy text-clinical-white">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#72c1ff]">
              Không gian khám
            </p>
            <h2 className="section-title mt-4 max-w-2xl text-clinical-white">
              Sáng, gọn và giảm bớt những tín hiệu gây căng thẳng
            </h2>
            <p className="body-large mt-5 max-w-xl text-clinical-white/70">
              Khu vực thăm khám được định hướng theo sự riêng tư, vệ sinh và
              khả năng di chuyển an toàn cho thú cưng.
            </p>
            <p className="mt-6 text-sm text-clinical-white/55">
              Hình ảnh hiện tại là minh hoạ định hướng. Sẽ thay bằng ảnh cơ sở
              thực tế trước khi xuất bản chính thức.
            </p>
          </div>
          <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem_2rem_5rem_2rem]">
            <Image
              src="/images/pet-one-clinic.png"
              alt="Phòng chẩn đoán thú y hiện đại với tông màu xanh và trắng"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="shell">
          <SectionHeading
            label="Cẩm nang chăm bé"
            title="Thông tin ngắn gọn để bạn quan sát tốt hơn mỗi ngày"
            description="Nội dung mang tính tham khảo và không thay thế đánh giá trực tiếp của bác sĩ thú y."
          />
          <ArticleGrid items={articles} />
        </div>
      </section>

      <section className="pb-[clamp(4.5rem,8vw,8rem)]">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-medical-blue px-6 py-12 text-white shadow-[0_28px_70px_rgba(11,111,194,0.24)] sm:px-10 lg:px-16 lg:py-16">
            <div className="relative z-10 max-w-2xl">
              <h2 className="section-title text-white">
                Có một thay đổi nhỏ khiến bạn chưa yên tâm?
              </h2>
              <p className="body-large mt-5 text-white/78">
                Gửi thông tin trước để Pet One hiểu tình trạng của bé và chuẩn
                bị cuộc trao đổi phù hợp hơn.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/lien-he#dat-lich"
                  variant="dark"
                  className="bg-white text-deep-navy hover:bg-white/90"
                >
                  Đặt lịch khám
                </ButtonLink>
                <ButtonLink
                  href="/lien-he"
                  variant="secondary"
                  className="border border-white/18"
                >
                  Gọi phòng khám
                </ButtonLink>
              </div>
            </div>
            <div className="absolute -bottom-24 -right-10 size-80 rounded-full border-[52px] border-white/10" />
          </div>
        </div>
      </section>
    </>
  );
}
