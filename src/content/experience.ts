import type { ArticleImage } from "@/content/site";
import { siteConfig } from "@/lib/site-config";

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
  reviewedLabel?: string;
  sourceUrl: string;
  avatar?: ArticleImage;
  image?: ArticleImage;
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
  metrics: Array<{
    value: string;
    label: string;
    detail?: string;
    verified: boolean;
  }>;
};

export type HeroReviewer = {
  id: string;
  name: string;
  avatar: string;
  sourceUrl: string;
};

export const heroReviewers: HeroReviewer[] = [
  {
    id: "thi-quynh-chi-phung",
    name: "Thi Quynh Chi Phung",
    avatar: "/images/reviews/thi-quynh-chi-phung.jpg",
    sourceUrl:
      "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChZDSUhNMG9nS0VJQ0FnSUR1MGRyRVJ3EAE!2m1!1s0x0:0xe82135b45b3e637b!3m1!1s2@1:CIHM0ogKEICAgIDu0drERw%7C%7C?hl=en-GB&source=sh/x/kp/local/m1/0&kgs=243e973f9995bd55&utm_source=sh/x/kp/local/m1/0",
  },
  {
    id: "quynh-chi-phung",
    name: "Quynh Chi Phung",
    avatar: "/images/reviews/quynh-chi-phung.jpg",
    sourceUrl: "https://share.google/q57mkVSRrg28pmmpD",
  },
  {
    id: "duy-h-tong",
    name: "Duy H. Tong",
    avatar: "/images/reviews/duy-h-tong.jpg",
    sourceUrl: "https://share.google/8wWllK781ONoRc6KB",
  },
  {
    id: "huy-bui",
    name: "Huy Bui",
    avatar: "/images/reviews/huy-bui.jpg",
    sourceUrl: "https://share.google/oK3oVArDFz5MstXT2",
  },
  {
    id: "khuyen-nguyen",
    name: "Khuyên Nguyễn",
    avatar: "/images/reviews/khuyen-nguyen.jpg",
    sourceUrl: "https://share.google/49xILjyNOCfuwwHEn",
  },
];

export const fallbackHomePageSettings: HomePageSettings = {
  rating: 4.8,
  reviewCount: 295,
  googleMapsUrl: siteConfig.googleMapsUrl,
  metrics: [],
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
export const fallbackReviews: CustomerReview[] = [
  {
    id: "thi-quynh-chi-phung",
    author: "Thi Quynh Chi Phung",
    rating: 5,
    quote:
      "My experience with this clinic so far is excellent. My puppy was happy all the time she stayed there. The grooming is fitted and the the shampoo using very fragrant. Before curing, we all have consulted by the veterinarian for which medication they will use for our babies and how we cooperated at home to make it better. Very satisfied when come here",
    reviewedLabel: "3 năm trước",
    sourceUrl: heroReviewers[0].sourceUrl,
    avatar: {
      src: heroReviewers[0].avatar,
      alt: "Ảnh đại diện của Thi Quynh Chi Phung",
    },
    image: {
      src: "/images/services/services-daily-care-concept.png",
      alt: "Bác sĩ Pet One chăm sóc chó và mèo tại phòng khám",
      focalPoint: "62% 48%",
      placeholder: true,
    },
    verified: true,
    order: 1,
  },
  {
    id: "quynh-chi-phung",
    author: "Quynh Chi Phung",
    rating: 5,
    quote:
      "The store is super clean and neat, all products have price tags and the veterinarians are all friendly. They are very helpful and welcome. Keep it up!",
    reviewedLabel: "3 năm trước",
    sourceUrl: heroReviewers[1].sourceUrl,
    avatar: {
      src: heroReviewers[1].avatar,
      alt: "Ảnh đại diện của Quynh Chi Phung",
    },
    image: {
      src: "/images/pet-one-clinic.png",
      alt: "Không gian và thiết bị tại phòng khám thú y Pet One",
      focalPoint: "66% 50%",
      placeholder: true,
    },
    verified: true,
    order: 2,
  },
  {
    id: "duy-h-tong",
    author: "Duy H. Tong",
    rating: 5,
    quote: "Good services",
    reviewedLabel: "1 năm trước",
    sourceUrl: heroReviewers[2].sourceUrl,
    avatar: {
      src: heroReviewers[2].avatar,
      alt: "Ảnh đại diện của Duy H. Tong",
    },
    image: {
      src: "/images/services/kham-tong-quat.png",
      alt: "Bác sĩ Pet One kiểm tra sức khỏe tổng quát cho chó",
      focalPoint: "58% 50%",
      placeholder: true,
    },
    verified: true,
    order: 3,
  },
  {
    id: "huy-bui",
    author: "Huy Bui",
    rating: 5,
    quote:
      "Cám ơn các em rất nhiều ! đã dành thời gian chăm sóc và cứu chữa em ! đến giây phút cuối cùng vẫn được chăm sóc tận tình trong vòng tay các chị ! Chúc cơ sở mình luôn phát triển và là điểm đến tin cậy cho các bạn yêu thích thú cưng",
    reviewedLabel: "8 tháng trước",
    sourceUrl: heroReviewers[3].sourceUrl,
    avatar: {
      src: heroReviewers[3].avatar,
      alt: "Ảnh đại diện của Huy Bui",
    },
    image: {
      src: "/images/pet-one-care.png",
      alt: "Bác sĩ Pet One nhẹ nhàng thăm khám cho một chú chó",
      focalPoint: "58% 44%",
      placeholder: true,
    },
    verified: true,
    order: 4,
  },
  {
    id: "khuyen-nguyen",
    author: "Khuyên Nguyễn",
    rating: 5,
    quote:
      "Mình cũng tìm khá nhiều thú y để lựa chọn cho bé Cỏ nhà mình, được cái tắm sạch, thơm lâu. Con mình bị đường ruột điều trị trộm vía bác sĩ mát tay, đây cũng là nơi uy tín để các bạn ghé trải nghiệm và tin tưởng lựa chọn 👏🏻",
    reviewedLabel: "2 tháng trước",
    sourceUrl: heroReviewers[4].sourceUrl,
    avatar: {
      src: heroReviewers[4].avatar,
      alt: "Ảnh đại diện của Khuyên Nguyễn",
    },
    image: {
      src: "/images/services/cham-soc-rang-mieng.png",
      alt: "Đội ngũ Pet One chăm sóc răng miệng cho thú cưng",
      focalPoint: "57% 50%",
      placeholder: true,
    },
    verified: true,
    order: 5,
  },
];
export const fallbackLocations: ClinicLocation[] = [
  {
    id: "pet-one-tan-huong",
    name: "Phòng khám thú y Pet One",
    address: siteConfig.address,
    phone: siteConfig.phone,
    openingHours: siteConfig.openingHours,
    mapUrl: siteConfig.googleMapsUrl,
    mapEmbedUrl: siteConfig.googleMapsEmbedUrl,
    verified: true,
    order: 1,
  },
];
