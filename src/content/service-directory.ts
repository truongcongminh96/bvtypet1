import type { ServiceGroup } from "@/content/site";

export type ServiceDirectoryItem = {
  slug: string;
  label: string;
  description: string;
  tag: string;
};

export type ServicePanelImage = {
  src: string;
  alt: string;
  placeholder: boolean;
  focalPoint?: string;
};

export type ServiceDirectoryGroup = {
  id: ServiceGroup;
  label: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  tone: "white" | "blue" | "warm";
  layout: "media-left" | "media-right";
  collage: {
    variant: "mosaic" | "feature-stack" | "portrait-stack" | "placeholder-pair";
    images: ServicePanelImage[];
  };
  cta: {
    label: string;
    href?: string;
    tone: "blue" | "warm";
  };
  items: ServiceDirectoryItem[];
  unavailableMessage?: string;
};

export const serviceDirectoryGroups: ServiceDirectoryGroup[] = [
  {
    id: "kham-chua-benh",
    label: "Khám chữa bệnh",
    eyebrow: "Chăm sóc sức khỏe",
    subtitle: "Chăm sóc rõ ràng từ kiểm tra đến theo dõi",
    description:
      "Khám, phòng ngừa và bổ sung dữ liệu cần thiết để bác sĩ đánh giá tình trạng của bé.",
    tone: "warm",
    layout: "media-left",
    collage: {
      variant: "mosaic",
      images: [
        {
          src: "/images/services/kham-tong-quat.png",
          alt: "Bác sĩ thú y kiểm tra sức khỏe tổng quát cho một chú chó",
          placeholder: true,
        },
        {
          src: "/images/services/tiem-phong.png",
          alt: "Bác sĩ thú y thực hiện tiêm phòng cho một chú mèo",
          placeholder: true,
        },
        {
          src: "/images/services/chan-doan-hinh-anh.png",
          alt: "Bác sĩ thú y thực hiện chẩn đoán hình ảnh cho thú cưng",
          placeholder: true,
        },
        {
          src: "/images/services/xet-nghiem.png",
          alt: "Kỹ thuật viên thú y chuẩn bị mẫu xét nghiệm",
          placeholder: true,
        },
      ],
    },
    cta: {
      label: "Đặt lịch khám",
      href: "/lien-he#dat-lich",
      tone: "blue",
    },
    items: [
      {
        slug: "kham-tong-quat",
        label: "Khám sức khỏe tổng quát",
        description:
          "Phù hợp khi bé thay đổi ăn uống, vận động, hành vi hoặc đến lịch kiểm tra định kỳ.",
        tag: "Khám định kỳ",
      },
      {
        slug: "tiem-phong",
        label: "Tiêm phòng và phòng ngừa",
        description:
          "Rà soát và xây dựng lịch phòng ngừa theo độ tuổi, môi trường sống và thể trạng.",
        tag: "Phòng ngừa",
      },
      {
        slug: "noi-khoa",
        label: "Nội khoa thú y",
        description:
          "Đánh giá các thay đổi về tiêu hóa, hô hấp, da, tiết niệu và sức khỏe toàn thân.",
        tag: "Khám chuyên khoa",
      },
      {
        slug: "chan-doan-hinh-anh",
        label: "Chẩn đoán hình ảnh",
        description:
          "Hỗ trợ bác sĩ quan sát rõ hơn tình trạng bên trong khi cần thêm dữ liệu.",
        tag: "Hỗ trợ chẩn đoán",
      },
      {
        slug: "xet-nghiem",
        label: "Xét nghiệm hỗ trợ",
        description:
          "Bổ sung dữ liệu để trả lời câu hỏi cụ thể trong quá trình thăm khám và theo dõi.",
        tag: "Dữ liệu lâm sàng",
      },
      {
        slug: "cham-soc-rang-mieng",
        label: "Chăm sóc răng miệng",
        description:
          "Kiểm tra răng, nướu, hơi thở và hướng dẫn thói quen vệ sinh phù hợp tại nhà.",
        tag: "Răng và nướu",
      },
    ],
  },
  {
    id: "phau-thuat",
    label: "Phẫu thuật",
    eyebrow: "Can thiệp & hồi phục",
    subtitle: "Chuẩn bị kỹ lưỡng, theo dõi liền mạch",
    description:
      "Đánh giá, chuẩn bị và theo dõi rõ ràng trước–sau mỗi can thiệp.",
    tone: "white",
    layout: "media-right",
    collage: {
      variant: "feature-stack",
      images: [
        {
          src: "/images/services/services-treatment-concept.png",
          alt: "Bác sĩ thú y trao đổi kế hoạch chăm sóc trước và sau can thiệp",
          placeholder: true,
        },
        {
          src: "/images/pet-one-care.png",
          alt: "Bác sĩ thú y tiếp cận nhẹ nhàng với thú cưng",
          placeholder: true,
          focalPoint: "50% 35%",
        },
        {
          src: "/images/pet-one-clinic.png",
          alt: "Không gian phòng khám thú y sáng và gọn gàng",
          placeholder: true,
        },
      ],
    },
    cta: {
      label: "Xem dịch vụ ngoại khoa",
      href: "/dich-vu/ngoai-khoa",
      tone: "warm",
    },
    items: [
      {
        slug: "ngoai-khoa",
        label: "Ngoại khoa thú y",
        description:
          "Trao đổi mục tiêu can thiệp, bước chuẩn bị và những điều cần theo dõi trong giai đoạn hồi phục.",
        tag: "Trước & sau can thiệp",
      },
    ],
  },
  {
    id: "spa-grooming",
    label: "Spa / Grooming",
    eyebrow: "Da lông & vệ sinh",
    subtitle: "Nhẹ nhàng theo nhịp riêng của từng bé",
    description:
      "Chăm sóc da lông và vệ sinh theo thể trạng, tính cách của từng bé.",
    tone: "blue",
    layout: "media-left",
    collage: {
      variant: "portrait-stack",
      images: [
        {
          src: "/images/services/services-daily-care-concept.png",
          alt: "Nhân viên chăm sóc da lông nhẹ nhàng cho thú cưng",
          placeholder: true,
          focalPoint: "50% 40%",
        },
        {
          src: "/images/pet-one-care.png",
          alt: "Thú cưng được chăm sóc trong không gian bình tĩnh",
          placeholder: true,
          focalPoint: "50% 38%",
        },
        {
          src: "/images/services/services-hero-concept.png",
          alt: "Bác sĩ thú y lắng nghe người nuôi bên cạnh thú cưng",
          placeholder: true,
          focalPoint: "50% 42%",
        },
      ],
    },
    cta: {
      label: "Xem dịch vụ Spa và Grooming",
      href: "/dich-vu/spa-grooming",
      tone: "blue",
    },
    items: [
      {
        slug: "spa-grooming",
        label: "Spa và Grooming",
        description:
          "Tắm, vệ sinh và chăm sóc da lông với quy trình điều chỉnh theo mức độ hợp tác của bé.",
        tag: "Da lông & vệ sinh",
      },
    ],
  },
  {
    id: "pet-shop",
    label: "Pet Shop",
    eyebrow: "Chăm sóc mỗi ngày",
    subtitle: "Những lựa chọn phù hợp đang được hoàn thiện",
    description:
      "Sản phẩm chăm sóc dành cho nhu cầu hằng ngày của thú cưng.",
    tone: "warm",
    layout: "media-right",
    collage: {
      variant: "placeholder-pair",
      images: [
        {
          src: "/images/pet-one-hero.png",
          alt: "Hình ảnh định hướng thú cưng trong không gian chăm sóc",
          placeholder: true,
          focalPoint: "50% 38%",
        },
        {
          src: "/images/services/services-foundation-concept.png",
          alt: "Hình ảnh định hướng buổi chăm sóc cùng người nuôi",
          placeholder: true,
          focalPoint: "50% 42%",
        },
      ],
    },
    cta: {
      label: "Sắp cập nhật",
      tone: "warm",
    },
    items: [],
    unavailableMessage:
      "Danh mục Pet Shop đang được PetOne hoàn thiện và xác minh trước khi giới thiệu.",
  },
];

export const serviceDirectoryBySlug = new Map(
  serviceDirectoryGroups.flatMap((group) =>
    group.items.map((item) => [item.slug, item] as const),
  ),
);
