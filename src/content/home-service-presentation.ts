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

export const homeServicePresentation = {
  "kham-tong-quat": {
    variant: "featured-photo",
    suitability: "Khi bé thay đổi ăn uống, vận động hoặc hành vi chưa rõ nguyên nhân.",
    observationTags: ["Ăn ít", "Mệt hơn", "Ít vận động"],
    actionLabel: "Xem quy trình khám",
    image: {
      src: "/images/pet-one-hero.png",
      alt: "Ảnh minh hoạ bác sĩ thú y quan sát sức khỏe của chó và mèo",
      placeholder: true,
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
