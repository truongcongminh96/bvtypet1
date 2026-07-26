export type ServicesPageMedia = {
  src: string;
  alt: string;
  placeholder: boolean;
};

export type ServiceChapterTone = "white" | "blue" | "warm";
export type ServiceChapterLayout = "media-left" | "media-right";
export type ServiceChapterMediaStyle =
  | "foundation"
  | "treatment"
  | "diagnostics"
  | "daily";

export type ServiceChapterDefinition = {
  id: string;
  label: string;
  title: string;
  description: string;
  serviceSlugs: string[];
  layout: ServiceChapterLayout;
  tone: ServiceChapterTone;
  mediaStyle: ServiceChapterMediaStyle;
  media: ServicesPageMedia;
  careNote: string;
  actionLabel: string;
};

export type ServiceRowPresentation = {
  observation: string;
  actionLabel: string;
};

export const serviceConceptMedia: Record<string, ServicesPageMedia> = {
  "kham-tong-quat": {
    src: "/images/services/kham-tong-quat.png",
    alt: "Bác sĩ thú y kiểm tra sức khỏe tổng quát cho một chú chó cùng người nuôi",
    placeholder: true,
  },
  "tiem-phong": {
    src: "/images/services/tiem-phong.png",
    alt: "Bác sĩ thú y tiêm phòng cho một chú mèo đang được giữ nhẹ nhàng trong khăn",
    placeholder: true,
  },
  "cham-soc-rang-mieng": {
    src: "/images/services/cham-soc-rang-mieng.png",
    alt: "Bác sĩ thú y kiểm tra răng miệng nhẹ nhàng cho một chú chó nhỏ",
    placeholder: true,
  },
  "xet-nghiem": {
    src: "/images/services/xet-nghiem.png",
    alt: "Kỹ thuật viên thú y chuẩn bị mẫu xét nghiệm trong phòng lab sạch và sáng",
    placeholder: true,
  },
  "chan-doan-hinh-anh": {
    src: "/images/services/chan-doan-hinh-anh.png",
    alt: "Bác sĩ thú y thực hiện siêu âm bụng cho một chú chó bình tĩnh",
    placeholder: true,
  },
};

export const servicesHero = {
  eyebrow: "Dịch vụ tại PetOne",
  title: "Chăm sóc đúng nhu cầu của từng bé",
  description:
    "Từ kiểm tra định kỳ đến điều trị và theo dõi, mỗi dịch vụ tại PetOne đều bắt đầu từ điều bạn đang quan sát ở bé.",
  image: {
    src: "/images/services/services-hero-concept.png",
    alt: "Bác sĩ thú y lắng nghe người nuôi bên cạnh một chú chó bình tĩnh trong phòng khám sáng",
    placeholder: true,
  },
  careNotes: [
    "Kiểm tra định kỳ",
    "Thay đổi hành vi",
    "Theo dõi sau khám",
  ],
} satisfies {
  eyebrow: string;
  title: string;
  description: string;
  image: ServicesPageMedia;
  careNotes: string[];
};

export const serviceChapters: ServiceChapterDefinition[] = [
  {
    id: "cham-soc-nen-tang",
    label: "Chăm sóc nền tảng",
    title: "Theo dõi sức khỏe từ những điều quen thuộc",
    description:
      "Những bước cần thiết để theo dõi sức khỏe lâu dài và phát hiện thay đổi sớm.",
    serviceSlugs: [
      "kham-tong-quat",
      "tiem-phong",
      "cham-soc-rang-mieng",
    ],
    layout: "media-left",
    tone: "white",
    mediaStyle: "foundation",
    media: {
      src: "/images/services/services-foundation-concept.png",
      alt: "Bác sĩ thú y nhẹ nhàng kiểm tra sức khỏe định kỳ cho thú cưng cùng người nuôi",
      placeholder: true,
    },
    careNote: "Ăn uống và sinh hoạt",
    actionLabel: "Đặt lịch chăm sóc nền tảng",
  },
  {
    id: "dieu-tri-chuyen-sau",
    label: "Điều trị chuyên sâu",
    title: "Ưu tiên điều cần đánh giá trước",
    description:
      "Đánh giá và xử lý những tình trạng cần theo dõi hoặc can thiệp chuyên sâu.",
    serviceSlugs: ["noi-khoa", "ngoai-khoa"],
    layout: "media-right",
    tone: "warm",
    mediaStyle: "treatment",
    media: {
      src: "/images/services/services-treatment-concept.png",
      alt: "Bác sĩ thú y trao đổi kế hoạch đánh giá với người nuôi bên cạnh thú cưng",
      placeholder: true,
    },
    careNote: "Diễn tiến và thể trạng",
    actionLabel: "Trao đổi với PetOne",
  },
  {
    id: "chan-doan-ho-tro",
    label: "Chẩn đoán hỗ trợ",
    title: "Thêm dữ liệu khi dấu hiệu chưa đủ rõ",
    description:
      "Bổ sung dữ liệu cần thiết để bác sĩ hiểu rõ hơn tình trạng bên trong.",
    serviceSlugs: ["xet-nghiem", "chan-doan-hinh-anh"],
    layout: "media-left",
    tone: "blue",
    mediaStyle: "diagnostics",
    media: {
      src: "/images/services/services-diagnostics-concept.png",
      alt: "Bác sĩ thú y giải thích thông tin chẩn đoán cho người nuôi gần một thú cưng bình tĩnh",
      placeholder: true,
    },
    careNote: "Dấu hiệu bên trong",
    actionLabel: "Gửi yêu cầu tư vấn",
  },
  {
    id: "cham-soc-thuong-ngay",
    label: "Chăm sóc thường ngày",
    title: "Da lông sạch khỏe, theo nhịp riêng của bé",
    description:
      "Chăm sóc da lông và vệ sinh phù hợp với thể trạng và tính cách của từng bé.",
    serviceSlugs: ["spa-grooming"],
    layout: "media-right",
    tone: "white",
    mediaStyle: "daily",
    media: {
      src: "/images/services/services-daily-care-concept.png",
      alt: "Nhân viên chăm sóc da lông nhẹ nhàng cho thú cưng trong không gian sạch và sáng",
      placeholder: true,
    },
    careNote: "Da lông và mức độ hợp tác",
    actionLabel: "Đặt lịch Spa và Grooming",
  },
];

export const serviceRowPresentation: Record<
  string,
  ServiceRowPresentation
> = {
  "kham-tong-quat": {
    observation: "Ăn uống, vận động hoặc hành vi thay đổi",
    actionLabel: "Xem quy trình khám tổng quát",
  },
  "tiem-phong": {
    observation: "Cần rà soát lịch tiêm và kế hoạch phòng ngừa",
    actionLabel: "Xem dịch vụ tiêm phòng",
  },
  "cham-soc-rang-mieng": {
    observation: "Hơi thở, răng nướu hoặc cách ăn thay đổi",
    actionLabel: "Xem chăm sóc răng miệng",
  },
  "noi-khoa": {
    observation: "Tiêu hoá, hô hấp, da hoặc tiết niệu thay đổi",
    actionLabel: "Xem dịch vụ nội khoa",
  },
  "ngoai-khoa": {
    observation: "Cần đánh giá trước can thiệp và theo dõi hồi phục",
    actionLabel: "Xem dịch vụ ngoại khoa",
  },
  "xet-nghiem": {
    observation: "Cần thêm dữ liệu để trả lời một câu hỏi cụ thể",
    actionLabel: "Xem xét nghiệm hỗ trợ",
  },
  "chan-doan-hinh-anh": {
    observation: "Cần quan sát rõ hơn tình trạng bên trong",
    actionLabel: "Xem chẩn đoán hình ảnh",
  },
  "spa-grooming": {
    observation: "Da lông cần vệ sinh hoặc có thay đổi cần ghi nhận",
    actionLabel: "Xem Spa và Grooming",
  },
};

export const fallbackServiceChapter = {
  id: "dich-vu-khac",
  label: "Dịch vụ khác",
  title: "Thêm lựa chọn chăm sóc tại PetOne",
  description:
    "Các dịch vụ mới được hiển thị tại đây để bạn vẫn có thể xem đầy đủ thông tin từ PetOne.",
};
