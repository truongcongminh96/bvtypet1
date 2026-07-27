import type { Metadata } from "next";

import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description: "Cách Pet One tiếp nhận và sử dụng thông tin bạn gửi qua website.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        current="Chính sách bảo mật"
        title="Thông tin của bạn được dùng để hỗ trợ đúng yêu cầu"
        description="Pet One chỉ tiếp nhận dữ liệu cần thiết để liên hệ, xác nhận lịch và chuẩn bị cuộc trao đổi."
      />
      <section className="section-space">
        <div className="shell max-w-3xl article-prose">
          <section className="article-section">
            <h2>Thông tin được tiếp nhận</h2>
            <p>Website có thể tiếp nhận họ tên, số điện thoại, email, thông tin cơ bản về thú cưng và nội dung bạn chủ động gửi qua biểu mẫu.</p>
          </section>
          <section className="article-section">
            <h2>Mục đích sử dụng</h2>
            <p>Thông tin được dùng để phản hồi yêu cầu, xác nhận thời gian phù hợp và chuẩn bị nội dung trao đổi với người nuôi.</p>
          </section>
          <section className="article-section">
            <h2>Liên hệ</h2>
            <p>Nếu cần cập nhật hoặc yêu cầu xóa thông tin đã gửi, bạn có thể liên hệ Pet One qua các kênh chính thức trên trang Liên hệ.</p>
          </section>
        </div>
      </section>
    </>
  );
}
