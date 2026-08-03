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
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    desktopImage: ArticleImage;
    mobileImage: ArticleImage;
  };
  why: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    images: ArticleImage[];
    caption: string;
  };
  servicesSection: {
    eyebrow: string;
    title: string;
    titleAccent: string;
  };
  equipmentSection: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    image: ArticleImage;
    caption: string;
  };
  reviewsSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  articlesSection: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    linkLabel: string;
  };
  bookingCta: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    image: ArticleImage;
  };
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
    id: "minh-chau",
    name: "Minh Châu",
    avatar: "/images/reviews/minh-chau-avatar.png",
    sourceUrl: "https://share.google/OaxxFo6xOG6AjS5ww",
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
  hero: {
    eyebrow: "Chăm từ điều bé chưa thể nói",
    title: "Hiểu đúng.",
    titleAccent: "Chăm bé tốt hơn.",
    description:
      "Pet One đồng hành cùng bạn nhận ra những thay đổi nhỏ trong sức khỏe và hành vi của thú cưng, để mỗi quyết định chăm sóc đều rõ ràng và kịp thời.",
    ctaLabel: "Đặt lịch khám",
    ctaHref: "/lien-he#dat-lich",
    desktopImage: {
      src: "/images/pet-one-hero-panorama.webp",
      alt: "Ảnh minh hoạ bác sĩ thú y đang kiểm tra nhẹ nhàng cho chó và mèo",
      focalPoint: "50% 50%",
      placeholder: false,
    },
    mobileImage: {
      src: "/images/pet-one-hero.png",
      alt: "Ảnh minh hoạ bác sĩ thú y đang kiểm tra nhẹ nhàng cho chó và mèo",
      focalPoint: "54% 46%",
      placeholder: false,
    },
  },
  why: {
    eyebrow: "Top những lí do chọn Pet One",
    title: "Rõ điều đang làm,",
    titleAccent: "nhẹ nhàng với từng bé",
    description:
      "Một trải nghiệm chăm sóc được xây dựng để người nuôi hiểu, thú cưng bớt căng thẳng và kế hoạch theo dõi dễ tiếp tục.",
    images: [
      {
        src: "/images/clinic/pet-one-general-exam-cat.jpg",
        alt: "Bác sĩ Pet One kiểm tra nhẹ nhàng cho một chú mèo",
        focalPoint: "50% 44%",
        placeholder: false,
      },
      {
        src: "/images/clinic/pet-one-team-records.jpg",
        alt: "Đội ngũ Pet One ghi nhận và đối chiếu thông tin trong phòng khám",
        focalPoint: "50% 42%",
        placeholder: false,
      },
      {
        src: "/images/clinic/pet-one-general-exam-dog.jpg",
        alt: "Đội ngũ Pet One kiểm tra sức khỏe cho một chú chó",
        focalPoint: "50% 42%",
        placeholder: false,
      },
      {
        src: "/images/clinic/pet-one-lab-microscope.jpg",
        alt: "Kỹ thuật viên Pet One quan sát mẫu xét nghiệm qua kính hiển vi",
        focalPoint: "50% 46%",
        placeholder: false,
      },
    ],
    caption:
      "Hình ảnh thực tế trong quá trình thăm khám và hỗ trợ chẩn đoán tại Pet One.",
  },
  servicesSection: {
    eyebrow: "Những chăm sóc thường bắt đầu từ đây",
    title: "Dịch vụ không bắt đầu bằng một chỉ định.",
    titleAccent: "Nó bắt đầu bằng điều bạn nhận thấy.",
  },
  equipmentSection: {
    eyebrow: "Không gian chăm sóc",
    title: "Thiết bị chỉ có ý nghĩa khi trả lời",
    titleAccent: "một câu hỏi lâm sàng rõ ràng.",
    image: {
      src: "/images/clinic/pet-one-ultrasound-team.jpg",
      alt: "Đội ngũ Pet One thực hiện siêu âm hỗ trợ đánh giá sức khỏe cho thú cưng",
      focalPoint: "50% 52%",
      placeholder: false,
    },
    caption: "Hình ảnh thực tế trong quá trình siêu âm tại Pet One.",
  },
  reviewsSection: {
    eyebrow: "Trải nghiệm thực tế",
    title: "Khách hàng Pet One",
    description:
      "Những chia sẻ được dẫn trực tiếp từ Google Review sau khi khách hàng trải nghiệm dịch vụ tại Pet One.",
  },
  articlesSection: {
    eyebrow: "Cẩm nang Pet One",
    title: "Đọc để nhận ra sớm hơn.",
    titleAccent: "Chuẩn bị bình tĩnh hơn.",
    linkLabel: "Xem thêm bài viết",
  },
  bookingCta: {
    eyebrow: "Khi bạn đã sẵn sàng kể điều mình quan sát",
    title: "Cùng Pet One nhìn rõ bước tiếp theo.",
    description:
      "Gửi thông tin trước để phòng khám chuẩn bị cuộc trao đổi phù hợp với tình trạng và mức độ hợp tác của bé.",
    ctaLabel: "Đặt lịch khám",
    ctaHref: "/lien-he#dat-lich",
    image: {
      src: "/images/clinic/pet-one-general-exam-dog.jpg",
      alt: "Đội ngũ Pet One kiểm tra sức khỏe tổng quát cho một chú chó",
      focalPoint: "50% 44%",
      placeholder: false,
    },
  },
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
    src: "/images/clinic/pet-one-general-exam-dog.jpg",
    alt: "Đội ngũ Pet One kiểm tra nhẹ nhàng cho một chú chó",
    focalPoint: "50% 42%",
    placeholder: false,
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
    id: "minh-chau",
    author: "Minh Châu",
    rating: 5,
    quote:
      "Đưa 2 bé con đi tắm rửa sạch sẽ sẵn tiện chích ngừa luôn. Giá tiêm bên shop rẻ hơn thị trường á nói chung ok. Anh chị nvien dthg",
    reviewedLabel: "1 năm trước",
    sourceUrl: heroReviewers[1].sourceUrl,
    avatar: {
      src: heroReviewers[1].avatar,
      alt: "Ảnh đại diện của Minh Châu",
    },
    image: {
      src: "/images/reviews/minh-chau.jpg",
      alt: "Thú cưng của Minh Châu tại Pet One",
      focalPoint: "50% 48%",
      placeholder: false,
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
      src: "/images/clinic/pet-one-general-exam-dog.jpg",
      alt: "Đội ngũ Pet One kiểm tra sức khỏe tổng quát cho chó",
      focalPoint: "50% 42%",
      placeholder: false,
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
      src: "/images/clinic/pet-one-general-exam-cat.jpg",
      alt: "Bác sĩ Pet One nhẹ nhàng thăm khám cho một chú mèo",
      focalPoint: "50% 44%",
      placeholder: false,
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
      src: "/images/clinic/pet-one-ultrasound-care.jpg",
      alt: "Đội ngũ Pet One thực hiện siêu âm cho thú cưng",
      focalPoint: "50% 48%",
      placeholder: false,
    },
    verified: true,
    order: 5,
  },
  {
    id: "ngan-le",
    author: "Ngân Lê",
    rating: 5,
    quote:
      "Phòng khám sạch sẽ, các bác sĩ tư vấn tận tình vậy còn chăm sóc và chữa cho bé chó nhà em khỏi bệnh. Nói chung là không có điểm chê(ykr)",
    reviewedLabel: "1 năm trước",
    sourceUrl: "https://share.google/dIW4lozKYpmwLkfro",
    avatar: {
      src: "/images/reviews/ngan-le-avatar.png",
      alt: "Ảnh đại diện của Ngân Lê",
    },
    image: {
      src: "/images/reviews/ngan-le.jpg",
      alt: "Bé cún của Ngân Lê sau khi được chăm sóc",
      focalPoint: "50% 48%",
      placeholder: false,
    },
    verified: true,
    order: 6,
  },
  {
    id: "kha-tran",
    author: "Kha Trần",
    rating: 5,
    quote:
      "Hôm nay đưa bé mèo đến tiêm ngừa và nhân viên ở đây nhiệt tình lắm nha, dịch vụ cũng ok nữa 5 sao nè",
    reviewedLabel: "1 năm trước",
    sourceUrl: "https://share.google/OD5J0XXtkNoIePH2L",
    avatar: {
      src: "/images/reviews/kha-tran-avatar.png",
      alt: "Ảnh đại diện của Kha Trần",
    },
    image: {
      src: "/images/reviews/kha-tran.jpg",
      alt: "Bé mèo của Kha Trần trong lần đến tiêm ngừa",
      focalPoint: "52% 52%",
      placeholder: false,
    },
    verified: true,
    order: 7,
  },
  {
    id: "tuyet-anh-kieu-thi",
    author: "Tuyet Anh Kieu Thi",
    rating: 5,
    quote:
      "Anh chị bác sĩ ở đây siêu tận tình, chăm bé nhà mình tốt lắm nè. Recommend mọi người đến gửi gắm bé nhà mình nha",
    reviewedLabel: "1 năm trước",
    sourceUrl: "https://share.google/k9BApKq9TSswZn0r7",
    avatar: {
      src: "/images/reviews/tuyet-anh-kieu-thi-avatar.png",
      alt: "Ảnh đại diện của Tuyet Anh Kieu Thi",
    },
    image: {
      src: "/images/reviews/tuyet-anh-kieu-thi.jpg",
      alt: "Bé cún của Tuyet Anh Kieu Thi tại Pet One",
      focalPoint: "42% 62%",
      placeholder: false,
    },
    verified: true,
    order: 8,
  },
  {
    id: "tien-nguyen",
    author: "Tiên Nguyễn",
    rating: 5,
    quote:
      "Phòng khám đã chữa lành chân gãy lìa cho con mình và hết sức tạo điều kiện để mình có thể chữa cho con. Giờ bé đã chạy nhảy bình trường lại được rồi. Mãi iu Pet One 🥹",
    reviewedLabel: "11 tháng trước",
    sourceUrl: "https://share.google/ja1cSp4sgPS8Tde8X",
    avatar: {
      src: "/images/reviews/tien-nguyen-avatar.png",
      alt: "Ảnh đại diện của Tiên Nguyễn",
    },
    image: {
      src: "/images/reviews/tien-nguyen.jpg",
      alt: "Bé mèo của Tiên Nguyễn sau khi hồi phục",
      focalPoint: "50% 58%",
      placeholder: false,
    },
    verified: true,
    order: 9,
  },
  {
    id: "hai-nhu-nguyen",
    author: "Hải Như Nguyễn",
    rating: 5,
    quote:
      "Nhân viên nhiệt tình, dễ thương, thường xuyên nhắc lịch tái chủng cho mấy bé. Hai đứa nhà mình đứa nào cũng cho qua đây",
    reviewedLabel: "1 năm trước",
    sourceUrl: "https://share.google/kCUGOTGzcPTJn3DOh",
    avatar: {
      src: "/images/reviews/hai-nhu-nguyen-avatar.png",
      alt: "Ảnh đại diện của Hải Như Nguyễn",
    },
    image: {
      src: "/images/reviews/hai-nhu-nguyen.jpg",
      alt: "Hai bé của Hải Như Nguyễn trong lần đến Pet One",
      focalPoint: "50% 46%",
      placeholder: false,
    },
    verified: true,
    order: 10,
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
