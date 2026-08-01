import type {
  ArticleCategorySlug,
  ArticleJourneyStage,
} from "@/content/site";

export const guideCategories: Array<{
  slug: "all" | ArticleCategorySlug;
  label: string;
}> = [
  { slug: "all", label: "Tất cả" },
  { slug: "suc-khoe-hang-ngay", label: "Sức khỏe hằng ngày" },
  { slug: "di-kham-cung-be", label: "Đi khám cùng bé" },
  { slug: "cham-soc-du-phong", label: "Chăm sóc dự phòng" },
  { slug: "dinh-duong", label: "Dinh dưỡng" },
  { slug: "da-long-ve-sinh", label: "Da lông & vệ sinh" },
];

export const guideCategoryLabels = Object.fromEntries(
  guideCategories
    .filter((category) => category.slug !== "all")
    .map((category) => [category.slug, category.label]),
) as Record<ArticleCategorySlug, string>;

export const guideJourneyStages: Array<{
  id: ArticleJourneyStage;
  title: string;
  description: string;
  topics: string[];
}> = [
  {
    id: "notice",
    title: "Nhận ra thay đổi",
    description:
      "Bắt đầu từ những khác biệt nhỏ trong nhịp sinh hoạt quen thuộc của bé.",
    topics: ["Ăn uống", "Ngủ nghỉ", "Vận động", "Hành vi", "Vệ sinh"],
  },
  {
    id: "prepare",
    title: "Chuẩn bị khi cần khám",
    description:
      "Gom những thông tin giúp buổi trao đổi với bác sĩ rõ ràng và nhẹ nhàng hơn.",
    topics: [
      "Ghi triệu chứng",
      "Quay video",
      "Mang hồ sơ",
      "Lồng vận chuyển",
      "Giảm căng thẳng",
    ],
  },
  {
    id: "continue",
    title: "Theo dõi sau khám",
    description:
      "Tiếp tục ghi nhận tại nhà để việc chăm sóc không bị ngắt quãng.",
    topics: [
      "Dùng thuốc",
      "Chế độ ăn",
      "Chăm sóc răng",
      "Da lông",
      "Liên hệ lại",
    ],
  },
];

export const guideHeroMedia = [
  {
    src: "/images/services/services-foundation-concept.png",
    alt: "Ảnh minh hoạ bác sĩ thú y quan sát sức khỏe của thú cưng",
    focalPoint: "50% 48%",
  },
  {
    src: "/images/services/services-daily-care-concept.png",
    alt: "Ảnh minh hoạ hoạt động chăm sóc da lông cho thú cưng",
    focalPoint: "50% 48%",
  },
  {
    src: "/images/services/services-treatment-concept.png",
    alt: "Ảnh minh hoạ bác sĩ trao đổi thông tin chăm sóc với người nuôi",
    focalPoint: "52% 50%",
  },
] as const;
