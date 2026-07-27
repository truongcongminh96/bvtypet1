import type { ArticleImage } from "@/content/site";

export type Equipment = {
  id: string;
  name: string;
  summary: string;
  supports: string[];
  image?: ArticleImage;
  verified: boolean;
  order: number;
};

export type CustomerReview = {
  id: string;
  author: string;
  rating: number;
  quote: string;
  reviewedAt?: string;
  sourceUrl: string;
  verified: boolean;
  order: number;
};

export type ClinicLocation = {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  openingHours?: string;
  mapUrl: string;
  mapEmbedUrl?: string;
  verified: boolean;
  order: number;
};

export type AboutPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  storyTitle: string;
  story: string[];
  image?: ArticleImage;
  principles: Array<{ title: string; description: string }>;
};

export type HomePageSettings = {
  rating?: number;
  reviewCount?: number;
  googleMapsUrl?: string;
  reasons: Array<{ title: string; description: string }>;
};

export const fallbackHomePageSettings: HomePageSettings = {
  reasons: [
    {
      title: "Bắt đầu từ điều bạn quan sát",
      description: "Mọi buổi khám bắt đầu bằng việc lắng nghe thay đổi bạn đã thấy ở bé.",
    },
    {
      title: "Giải thích từng quyết định",
      description: "Mỗi bước kiểm tra hoặc điều trị đều đi cùng mục tiêu rõ ràng.",
    },
    {
      title: "Tiếp cận nhẹ nhàng",
      description: "Bé có thời gian làm quen trước khi bắt đầu thao tác cần thiết.",
    },
    {
      title: "Theo dõi không bị ngắt quãng",
      description: "Bạn biết điều cần quan sát và thời điểm nên liên hệ lại.",
    },
    {
      title: "Thông tin được xác minh",
      description: "Hồ sơ, số liệu và cam kết chỉ hiển thị sau khi được kiểm tra.",
    },
    {
      title: "Chăm sóc theo từng bé",
      description: "Kế hoạch được cân nhắc theo thể trạng, tuổi và môi trường sống.",
    },
  ],
};

export const fallbackAboutPage: AboutPageContent = {
  eyebrow: "Về Pet One",
  title: "Một phòng khám giúp bạn hiểu rõ điều gì đang xảy ra với bé",
  description:
    "Pet One hướng tới trải nghiệm thú y bình tĩnh, minh bạch và dễ tiếp tục theo dõi tại nhà.",
  storyTitle: "Chăm sóc rõ ràng bắt đầu từ một cuộc trò chuyện",
  story: [
    "Người nuôi là người nhận ra những thay đổi nhỏ đầu tiên. Vì vậy, Pet One bắt đầu bằng việc lắng nghe điều bạn quan sát được trước khi đề xuất bước tiếp theo.",
    "Chúng tôi trình bày thông tin bằng ngôn ngữ dễ hiểu, ưu tiên thao tác cần thiết và hướng dẫn cụ thể để việc chăm sóc không dừng lại khi bạn rời phòng khám.",
  ],
  image: {
    src: "/images/pet-one-care.png",
    alt: "Bác sĩ thú y nhẹ nhàng trao đổi cùng người nuôi bên cạnh thú cưng",
    placeholder: true,
  },
  principles: [
    {
      title: "Rõ ràng",
      description: "Bạn hiểu mục tiêu, lựa chọn và điều cần theo dõi tiếp theo.",
    },
    {
      title: "Nhẹ nhàng",
      description: "Không gian và thao tác được điều chỉnh theo mức độ hợp tác của bé.",
    },
    {
      title: "Có trách nhiệm",
      description: "Chỉ công bố thông tin chuyên môn đã được xác minh.",
    },
  ],
};

export const fallbackEquipment: Equipment[] = [];
export const fallbackReviews: CustomerReview[] = [];
export const fallbackLocations: ClinicLocation[] = [];
