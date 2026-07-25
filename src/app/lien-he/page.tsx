import type { Metadata } from "next";
import {
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";

import { BookingForm } from "@/components/booking/booking-form";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Liên hệ và đặt lịch",
  description:
    "Gửi yêu cầu đặt lịch khám và thông tin cần chuẩn bị trước khi đến Pet One.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        current="Liên hệ"
        title="Kể cho Pet One điều bạn đang quan sát"
        description="Gửi trước một vài thông tin để phòng khám chuẩn bị cuộc trao đổi phù hợp hơn. Lịch hẹn chỉ được xác nhận sau khi Pet One liên hệ lại."
      />

      <section className="section-space">
        <div className="shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <aside>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-medical-blue">
              Thông tin liên hệ
            </p>
            <h2 className="section-title mt-4 text-deep-navy">
              Chuẩn bị cho một buổi khám nhẹ nhàng hơn
            </h2>
            <p className="mt-5 leading-7 text-muted-ink">
              Hãy ghi lại thời điểm xuất hiện triệu chứng, thay đổi trong ăn
              uống và các sản phẩm thú cưng đang dùng.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                {
                  icon: Phone,
                  title: "Điện thoại",
                  text: "Đang cập nhật số chính thức",
                },
                {
                  icon: EnvelopeSimple,
                  title: "Email",
                  text: "Được cấu hình riêng trên Vercel",
                },
                {
                  icon: MapPin,
                  title: "Địa chỉ",
                  text: "Đang cập nhật vị trí phòng khám",
                },
                {
                  icon: Clock,
                  title: "Giờ tiếp nhận",
                  text: "Đang cập nhật lịch làm việc",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="surface-card flex gap-4 rounded-2xl p-5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-ice text-medical-blue">
                    <item.icon size={22} weight="duotone" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-extrabold text-deep-navy">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-ink">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div
            id="dat-lich"
            className="surface-card scroll-mt-28 rounded-[2rem] p-6 sm:p-9 lg:p-10"
          >
            <h2 className="font-display text-3xl font-extrabold tracking-[-0.045em] text-deep-navy">
              Yêu cầu đặt lịch khám
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-ink">
              Những trường có dấu * là bắt buộc. Không gửi thông tin thanh toán
              hoặc dữ liệu nhạy cảm qua biểu mẫu này.
            </p>
            <div className="mt-8">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
