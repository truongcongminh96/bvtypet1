import type { Service } from "@/content/site";

export type HomeServicePresentation = {
  variant: "featured-photo" | "featured-notes" | "standard-record";
  suitability: string;
  observationTags: string[];
  observationNotes?: string[];
  actionLabel: string;
  image?: {
    src: string;
    alt: string;
    placeholder: boolean;
  };
};

export const featuredHomeServiceSlugs = [
  "tiem-phong",
  "kham-tong-quat",
  "ngoai-khoa",
] as const;

type FeaturedHomeServiceSlug = (typeof featuredHomeServiceSlugs)[number];

const featuredHomeServiceLabels: Record<FeaturedHomeServiceSlug, string> = {
  "tiem-phong": "Tiêm phòng",
  "kham-tong-quat": "Khám bệnh tổng quát",
  "ngoai-khoa": "Phẫu thuật",
};

export type FeaturedHomeService = {
  service: Service;
  displayTitle: string;
};

export function partitionHomeServices(
  items: Service[],
  fallbackItems: Service[] = [],
): {
  featured: FeaturedHomeService[];
  remaining: Service[];
} {
  const catalog = new Map(
    [...fallbackItems, ...items].map((service) => [service.slug, service]),
  );
  const featured = featuredHomeServiceSlugs.flatMap((slug) => {
    const service = catalog.get(slug);

    return service
      ? [{ service, displayTitle: featuredHomeServiceLabels[slug] }]
      : [];
  });
  const featuredSlugs = new Set(
    featured.map(({ service }) => service.slug),
  );

  return {
    featured,
    remaining: items.filter((service) => !featuredSlugs.has(service.slug)),
  };
}

export const homeServicePresentation = {
  "kham-tong-quat": {
    variant: "featured-photo",
    suitability: "Khi bé thay đổi ăn uống, vận động hoặc hành vi chưa rõ nguyên nhân.",
    observationTags: ["Ăn ít", "Mệt hơn", "Ít vận động"],
    actionLabel: "Xem quy trình khám",
    image: {
      src: "/images/clinic/pet-one-general-exam-dog.jpg",
      alt: "Đội ngũ Pet One kiểm tra sức khỏe cho một chú chó",
      placeholder: false,
    },
  },
  "tiem-phong": {
    variant: "featured-notes",
    suitability: "Khi cần rà soát mũi tiêm và kế hoạch phòng ngừa phù hợp.",
    observationTags: ["Lịch sử tiêm", "Độ tuổi", "Thể trạng"],
    observationNotes: [
      "Rà soát lịch sử tiêm phòng",
      "Trao đổi tình trạng hiện tại",
      "Hướng dẫn theo dõi sau tiêm",
    ],
    actionLabel: "Xem kế hoạch phòng ngừa",
  },
  "noi-khoa": {
    variant: "standard-record",
    suitability: "Khi có thay đổi liên quan đến tiêu hoá, hô hấp, da hoặc tiết niệu.",
    observationTags: ["Tiêu hoá", "Hô hấp", "Da", "Tiết niệu"],
    actionLabel: "Xem nội khoa",
  },
  "ngoai-khoa": {
    variant: "standard-record",
    suitability: "Khi cần đánh giá trước can thiệp và chuẩn bị kế hoạch theo dõi.",
    observationTags: ["Trước can thiệp", "Chuẩn bị", "Hồi phục"],
    actionLabel: "Xem ngoại khoa",
  },
  "spa-grooming": {
    variant: "standard-record",
    suitability: "Khi da lông cần chăm sóc hoặc xuất hiện thay đổi cần được ghi nhận.",
    observationTags: ["Da lông", "Vệ sinh", "Mức độ hợp tác"],
    actionLabel: "Xem Spa & Grooming",
  },
} satisfies Record<string, HomeServicePresentation>;
