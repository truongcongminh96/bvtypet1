export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  points: string[];
  accent: "blue" | "red" | "navy" | "ice";
  group?: ServiceGroup;
  cardImage?: ArticleImage;
  featuredOnHome?: boolean;
  homeOrder?: number;
};

export type ServiceGroup =
  | "pet-shop"
  | "pet-hotel"
  | "kham-chua-benh"
  | "spa-grooming"
  | "phau-thuat";

export const articleCategorySlugs = [
  "suc-khoe-hang-ngay",
  "di-kham-cung-be",
  "cham-soc-du-phong",
  "dinh-duong",
  "da-long-ve-sinh",
] as const;

export type ArticleCategorySlug = (typeof articleCategorySlugs)[number];

export type ArticleJourneyStage = "notice" | "prepare" | "continue";

export type ArticleImage = {
  src: string;
  alt: string;
  focalPoint?: string;
  placeholder?: boolean;
};

export type ArticleSectionBlock = {
  _type: "section";
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
};

export type ObservationNoteBlock = {
  _type: "observationNote";
  id?: string;
  title: string;
  description?: string;
  items: string[];
};

export type PreparationChecklistBlock = {
  _type: "preparationChecklist";
  id?: string;
  title: string;
  description?: string;
  items: string[];
};

export type ImportantCalloutBlock = {
  _type: "importantCallout";
  id?: string;
  title?: string;
  body: string;
};

export type PullQuoteBlock = {
  _type: "pullQuote";
  quote: string;
  attribution?: string;
};

export type ArticleImageBlock = {
  _type: "imageWithCaption";
  image: ArticleImage;
  caption?: string;
};

export type ArticleContentBlock =
  | ArticleSectionBlock
  | ObservationNoteBlock
  | PreparationChecklistBlock
  | ImportantCalloutBlock
  | PullQuoteBlock
  | ArticleImageBlock;

export type ArticleReviewer = {
  verified: true;
  name: string;
  position?: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  lead: string;
  category: ArticleCategorySlug;
  journeyStage: ArticleJourneyStage;
  readingTime: number;
  publishedAt: string;
  coverImage: ArticleImage;
  thumbnailImage?: ArticleImage;
  contentBlocks: ArticleContentBlock[];
  disclaimer: string;
  reviewedBy?: ArticleReviewer;
  relatedArticleSlugs: string[];
  featured: boolean;
  tags: string[];
};

type DoctorImage = {
  src: string;
  alt: string;
};

export type VerifiedDoctor = {
  status: "verified";
  slug: string;
  name: string;
  position: string;
  specialty: string;
  yearsOfExperience?: number;
  schedule?: string;
  image?: DoctorImage;
  biography?: string;
  credentials?: string[];
  journey?: Array<{
    year: string;
    title: string;
    description?: string;
  }>;
};

export type DoctorPlaceholder = {
  status: "placeholder";
  id: string;
  title: string;
  message: string;
};

export type Doctor = VerifiedDoctor | DoctorPlaceholder;

export const services: Service[] = [
  {
    slug: "kham-tong-quat",
    title: "Khám sức khỏe tổng quát",
    shortTitle: "Khám tổng quát",
    summary:
      "Đánh giá toàn diện từ biểu hiện bên ngoài đến thói quen sinh hoạt của thú cưng.",
    description:
      "Buổi khám bắt đầu bằng việc lắng nghe những thay đổi bạn quan sát được. Bác sĩ sẽ kiểm tra các chỉ số cơ bản, trao đổi hướng theo dõi và chỉ đề xuất bước tiếp theo khi thật sự cần thiết.",
    points: [
      "Trao đổi triệu chứng và tiền sử",
      "Kiểm tra thể trạng cơ bản",
      "Kế hoạch theo dõi sau buổi khám",
    ],
    accent: "blue",
  },
  {
    slug: "tiem-phong",
    title: "Tiêm phòng và phòng ngừa",
    shortTitle: "Tiêm phòng",
    summary:
      "Lịch phòng ngừa được cân nhắc theo độ tuổi, môi trường sống và thể trạng.",
    description:
      "Không phải thú cưng nào cũng cần một lịch trình giống nhau. Pet One ưu tiên đánh giá tình trạng hiện tại trước khi tư vấn kế hoạch tiêm phòng và nhắc lịch phù hợp.",
    points: [
      "Rà soát lịch sử tiêm phòng",
      "Tư vấn lịch phù hợp từng giai đoạn",
      "Hướng dẫn theo dõi phản ứng sau tiêm",
    ],
    accent: "red",
  },
  {
    slug: "noi-khoa",
    title: "Nội khoa thú y",
    shortTitle: "Nội khoa",
    summary:
      "Đánh giá các thay đổi về tiêu hoá, hô hấp, da, tiết niệu và sức khỏe toàn thân.",
    description:
      "Bác sĩ kết nối triệu chứng, tiền sử và kết quả khám để xác định vấn đề cần ưu tiên. Các bước kiểm tra bổ sung chỉ được trao đổi khi có mục tiêu rõ ràng.",
    points: [
      "Ghi nhận triệu chứng và diễn tiến",
      "Khám lâm sàng theo hệ cơ quan",
      "Tư vấn điều trị và theo dõi tại nhà",
    ],
    accent: "ice",
  },
  {
    slug: "ngoai-khoa",
    title: "Ngoại khoa thú y",
    shortTitle: "Ngoại khoa",
    summary:
      "Tư vấn trước thủ thuật, chuẩn bị an toàn và hướng dẫn chăm sóc sau can thiệp.",
    description:
      "Mỗi đề xuất can thiệp cần đi cùng lý do, mục tiêu và kế hoạch theo dõi. Pet One trao đổi rõ việc chuẩn bị trước thủ thuật và các dấu hiệu cần lưu ý trong giai đoạn hồi phục.",
    points: [
      "Đánh giá trước can thiệp",
      "Trao đổi quy trình và lưu ý",
      "Hướng dẫn chăm sóc sau thủ thuật",
    ],
    accent: "navy",
  },
  {
    slug: "spa-grooming",
    title: "Spa và Grooming",
    shortTitle: "Spa & Grooming",
    summary:
      "Chăm sóc da lông và vệ sinh cơ bản theo thể trạng, tính cách của từng bé.",
    description:
      "Quy trình chăm sóc được điều chỉnh theo mức độ hợp tác và tình trạng da lông hiện tại. Nhân viên sẽ báo lại nếu quan sát thấy thay đổi cần được bác sĩ kiểm tra.",
    points: [
      "Trao đổi tình trạng da lông",
      "Chọn quy trình phù hợp với từng bé",
      "Ghi nhận thay đổi cần theo dõi",
    ],
    accent: "blue",
  },
  {
    slug: "chan-doan-hinh-anh",
    title: "Chẩn đoán hình ảnh",
    shortTitle: "Chẩn đoán",
    summary:
      "Hỗ trợ bác sĩ nhìn rõ hơn tình trạng bên trong bằng quy trình giải thích dễ hiểu.",
    description:
      "Khi cần thêm dữ liệu để đánh giá, bác sĩ sẽ trao đổi mục tiêu của chỉ định, quy trình thực hiện và cách đọc kết quả bằng ngôn ngữ gần gũi với người nuôi.",
    points: [
      "Giải thích mục tiêu trước thực hiện",
      "Hạn chế căng thẳng cho thú cưng",
      "Trao đổi kết quả và bước tiếp theo",
    ],
    accent: "navy",
  },
  {
    slug: "xet-nghiem",
    title: "Xét nghiệm hỗ trợ",
    shortTitle: "Xét nghiệm",
    summary:
      "Bổ sung dữ liệu cần thiết để bác sĩ có cơ sở xây dựng hướng chăm sóc.",
    description:
      "Mỗi xét nghiệm cần trả lời một câu hỏi cụ thể. Pet One hướng tới việc giải thích rõ lý do thực hiện, ý nghĩa của kết quả và giới hạn của từng phương pháp.",
    points: [
      "Chỉ định dựa trên mục tiêu lâm sàng",
      "Giải thích kết quả theo ngữ cảnh",
      "Lưu ý trước và sau khi lấy mẫu",
    ],
    accent: "ice",
  },
  {
    slug: "cham-soc-rang-mieng",
    title: "Chăm sóc răng miệng",
    shortTitle: "Răng miệng",
    summary:
      "Đánh giá sức khỏe răng nướu và xây dựng thói quen chăm sóc tại nhà.",
    description:
      "Sức khỏe răng miệng ảnh hưởng trực tiếp đến sinh hoạt hằng ngày. Bác sĩ sẽ kiểm tra tình trạng hiện tại và hướng dẫn cách chăm sóc phù hợp với mức độ hợp tác của từng bé.",
    points: [
      "Kiểm tra răng, nướu và hơi thở",
      "Tư vấn vệ sinh tại nhà",
      "Theo dõi thay đổi trong ăn uống",
    ],
    accent: "blue",
  },
  {
    slug: "pet-hotel",
    title: "Pet Hotel",
    shortTitle: "Pet Hotel",
    summary:
      "Dịch vụ lưu trú và chăm sóc hằng ngày theo thói quen riêng của từng bé.",
    description:
      "PetOne ghi nhận lịch ăn, vận động, nghỉ ngơi và những lưu ý riêng trước thời gian lưu trú. Việc chăm sóc được sắp xếp theo nhịp sinh hoạt quen thuộc để bé dễ thích nghi hơn.",
    points: [
      "Trao đổi thói quen và lưu ý riêng của bé",
      "Sắp xếp chăm sóc theo lịch sinh hoạt",
      "Cập nhật tình trạng trong thời gian lưu trú",
    ],
    accent: "ice",
    group: "pet-hotel",
  },
];

export const articles: Article[] = [
  {
    slug: "dau-hieu-thu-cung-can-di-kham",
    title: "Những thay đổi nhỏ cho thấy thú cưng nên được đi khám",
    excerpt:
      "Ăn ít, ngủ nhiều hay thay đổi thói quen vệ sinh đều có thể là tín hiệu cần quan sát kỹ hơn.",
    lead:
      "Người nuôi thường là người nhận ra thay đổi đầu tiên. Ghi lại thời điểm, tần suất và hoàn cảnh xuất hiện sẽ giúp buổi trao đổi với bác sĩ rõ ràng hơn.",
    category: "suc-khoe-hang-ngay",
    journeyStage: "notice",
    readingTime: 4,
    publishedAt: "2026-07-18",
    coverImage: {
      src: "/images/pet-one-hero.png",
      alt: "Ảnh minh hoạ bác sĩ thú y quan sát sức khỏe của chó và mèo",
      focalPoint: "52% 48%",
      placeholder: true,
    },
    thumbnailImage: {
      src: "/images/pet-one-hero.png",
      alt: "Ảnh minh hoạ bác sĩ thú y quan sát sức khỏe của chó và mèo",
      focalPoint: "52% 44%",
      placeholder: true,
    },
    contentBlocks: [
      {
        _type: "observationNote",
        id: "ghi-lai-thay-doi",
        title: "Ghi lại điều đã thay đổi",
        description:
          "Một ghi chú ngắn nhưng cụ thể thường hữu ích hơn việc cố nhớ mọi chi tiết khi đến phòng khám.",
        items: [
          "Thời điểm bạn bắt đầu nhận thấy thay đổi",
          "Tần suất xuất hiện và kéo dài bao lâu",
          "Hoàn cảnh xảy ra, chẳng hạn sau khi ăn hoặc khi đang nghỉ",
        ],
      },
      {
        _type: "section",
        id: "an-uong-va-sinh-hoat",
        title: "Thay đổi trong ăn uống và sinh hoạt",
        paragraphs: [
          "Nếu thú cưng ăn ít hơn bình thường, uống nước nhiều bất thường, khó nằm yên hoặc ít tương tác, bạn nên ghi lại những gì đã quan sát và liên hệ phòng khám để được hướng dẫn.",
        ],
      },
      {
        _type: "section",
        id: "di-chuyen-va-ho-hap",
        title: "Quan sát cách di chuyển và hô hấp",
        paragraphs: [
          "Đi khập khiễng, ngại nhảy, thở nhanh khi đang nghỉ hoặc xuất hiện tư thế lạ đều là dữ liệu hữu ích khi bạn trao đổi với bác sĩ.",
        ],
      },
      {
        _type: "importantCallout",
        title: "Lưu ý quan trọng",
        body: "Không tự dùng thuốc của người cho thú cưng khi chưa có tư vấn chuyên môn.",
      },
      {
        _type: "preparationChecklist",
        id: "chuan-bi-truoc-khi-lien-he",
        title: "Chuẩn bị trước khi liên hệ",
        description:
          "Những thông tin sau giúp phòng khám hiểu bối cảnh trước khi hướng dẫn bước tiếp theo.",
        items: [
          "Quay một video ngắn nếu thay đổi liên quan đến di chuyển hoặc hành vi",
          "Chụp lại thức ăn hoặc chất thải bất thường nếu có",
          "Ghi danh sách thuốc và sản phẩm bé đang sử dụng",
        ],
      },
    ],
    disclaimer:
      "Nội dung nhằm hỗ trợ quan sát và không thay thế đánh giá trực tiếp của bác sĩ thú y.",
    relatedArticleSlugs: [
      "chuan-bi-truoc-buoi-kham",
      "cham-soc-rang-mieng-tai-nha",
    ],
    featured: true,
    tags: ["ăn uống", "vận động", "hành vi", "vệ sinh"],
  },
  {
    slug: "chuan-bi-truoc-buoi-kham",
    title: "Chuẩn bị gì để buổi khám của thú cưng nhẹ nhàng hơn?",
    excerpt:
      "Một chiếc lồng quen mùi, vài ghi chú ngắn và tâm lý bình tĩnh có thể tạo khác biệt lớn.",
    lead:
      "Một buổi khám ít căng thẳng bắt đầu từ trước khi rời nhà. Chuẩn bị đúng giúp thú cưng an tâm hơn và bác sĩ có đủ thông tin để đánh giá.",
    category: "di-kham-cung-be",
    journeyStage: "prepare",
    readingTime: 3,
    publishedAt: "2026-07-11",
    coverImage: {
      src: "/images/pet-one-care.png",
      alt: "Ảnh minh hoạ bác sĩ nhẹ nhàng giúp thú cưng làm quen với buổi khám",
      focalPoint: "50% 46%",
      placeholder: true,
    },
    thumbnailImage: {
      src: "/images/pet-one-care.png",
      alt: "Ảnh minh hoạ bác sĩ nhẹ nhàng giúp thú cưng làm quen với buổi khám",
      focalPoint: "54% 44%",
      placeholder: true,
    },
    contentBlocks: [
      {
        _type: "section",
        id: "mang-theo-do-quen-thuoc",
        title: "Mang theo những gì quen thuộc",
        paragraphs: [
          "Dùng lồng vận chuyển chắc chắn với mèo và dây dắt phù hợp với chó. Một tấm khăn hoặc món đồ có mùi quen thuộc có thể giúp bé bình tĩnh hơn.",
        ],
      },
      {
        _type: "observationNote",
        id: "ghi-lai-dieu-dang-lo",
        title: "Ghi lại điều bạn đang lo lắng",
        description:
          "Danh sách ngắn nhưng cụ thể sẽ hữu ích hơn việc cố nhớ mọi chi tiết tại phòng khám.",
        items: [
          "Thời điểm thay đổi bắt đầu và tần suất xuất hiện",
          "Chế độ ăn gần đây",
          "Thuốc và sản phẩm bé đang sử dụng",
        ],
      },
      {
        _type: "preparationChecklist",
        id: "truoc-khi-roi-nha",
        title: "Trước khi rời nhà",
        items: [
          "Chuẩn bị lồng vận chuyển hoặc dây dắt phù hợp",
          "Mang theo hồ sơ cũ nếu có",
          "Lưu video hoặc hình ảnh bạn đã ghi lại",
          "Giữ nhịp chuẩn bị bình tĩnh và quen thuộc với bé",
        ],
      },
      {
        _type: "importantCallout",
        id: "xac-nhan-viec-nhin-an",
        title: "Hỏi trước nếu cần nhịn ăn",
        body: "Không phải buổi khám nào cũng cần nhịn ăn. Hãy xác nhận với phòng khám trước khi thay đổi bữa ăn hoặc lịch dùng thuốc của thú cưng.",
      },
    ],
    disclaimer:
      "Nội dung nhằm hỗ trợ quan sát và không thay thế đánh giá trực tiếp của bác sĩ thú y.",
    relatedArticleSlugs: [
      "dau-hieu-thu-cung-can-di-kham",
      "cham-soc-rang-mieng-tai-nha",
    ],
    featured: false,
    tags: ["lồng vận chuyển", "hồ sơ", "video", "giảm căng thẳng"],
  },
  {
    slug: "cham-soc-rang-mieng-tai-nha",
    title: "Bắt đầu chăm sóc răng miệng tại nhà theo cách dễ chịu",
    excerpt:
      "Đi chậm, chọn dụng cụ phù hợp và biến việc làm sạch răng thành một thói quen tích cực.",
    lead:
      "Thói quen tốt không cần bắt đầu bằng một buổi chải răng hoàn hảo. Mục tiêu đầu tiên là giúp thú cưng cảm thấy an toàn khi bạn chạm quanh vùng miệng.",
    category: "cham-soc-du-phong",
    journeyStage: "continue",
    readingTime: 5,
    publishedAt: "2026-07-04",
    coverImage: {
      src: "/images/pet-one-clinic.png",
      alt: "Ảnh minh hoạ không gian chăm sóc thú y sáng và gọn gàng",
      focalPoint: "58% 50%",
      placeholder: true,
    },
    thumbnailImage: {
      src: "/images/pet-one-clinic.png",
      alt: "Ảnh minh hoạ không gian chăm sóc thú y sáng và gọn gàng",
      focalPoint: "62% 50%",
      placeholder: true,
    },
    contentBlocks: [
      {
        _type: "section",
        id: "lam-quen-tung-buoc",
        title: "Làm quen từng bước",
        paragraphs: [
          "Bắt đầu bằng việc chạm nhẹ quanh má và môi trong vài giây, sau đó thưởng cho bé. Khi thú cưng đã quen, bạn mới tăng dần thời gian và đưa dụng cụ vào.",
        ],
      },
      {
        _type: "preparationChecklist",
        id: "tao-thoi-quen-de-chiu",
        title: "Tạo một thói quen dễ chịu",
        items: [
          "Chọn thời điểm bé đang thư giãn",
          "Bắt đầu trong thời gian ngắn",
          "Tăng dần mức độ tiếp xúc khi bé đã quen",
          "Dừng lại nếu bé trở nên căng thẳng",
        ],
      },
      {
        _type: "importantCallout",
        id: "san-pham-danh-cho-thu-cung",
        title: "Chỉ dùng sản phẩm dành cho thú cưng",
        body: "Kem đánh răng của người không phù hợp để thú cưng nuốt. Hãy chọn sản phẩm chuyên dụng và hỏi bác sĩ nếu bé có tiền sử dị ứng hoặc bệnh lý răng miệng.",
      },
      {
        _type: "observationNote",
        id: "thay-doi-can-ghi-lai",
        title: "Nhận biết lúc cần được kiểm tra",
        description:
          "Ghi lại thay đổi bạn nhìn thấy và trao đổi với phòng khám để được hướng dẫn phù hợp.",
        items: [
          "Hơi thở thay đổi rõ",
          "Chảy nước dãi hoặc nhai một bên",
          "Bỏ thức ăn cứng",
          "Nướu chảy máu",
        ],
      },
    ],
    disclaimer:
      "Nội dung nhằm hỗ trợ quan sát và không thay thế đánh giá trực tiếp của bác sĩ thú y.",
    relatedArticleSlugs: [
      "dau-hieu-thu-cung-can-di-kham",
      "chuan-bi-truoc-buoi-kham",
    ],
    featured: false,
    tags: ["răng miệng", "vệ sinh", "thói quen", "theo dõi tại nhà"],
  },
];

export const careSteps = [
  {
    number: "01",
    title: "Lắng nghe",
    description:
      "Bạn kể lại những thay đổi đã quan sát. Chúng tôi ghi nhận bối cảnh, thói quen và điều bạn đang lo nhất.",
  },
  {
    number: "02",
    title: "Khám và đánh giá",
    description:
      "Bác sĩ kiểm tra thể trạng, đối chiếu tiền sử và xác định dấu hiệu cần ưu tiên.",
  },
  {
    number: "03",
    title: "Chẩn đoán và tư vấn",
    description:
      "Kết quả được giải thích rõ để bạn hiểu lựa chọn và lý do của từng chỉ định.",
  },
  {
    number: "04",
    title: "Điều trị và theo dõi",
    description:
      "Kế hoạch chăm sóc đi cùng hướng dẫn dùng thuốc và các dấu hiệu cần liên hệ lại.",
  },
];

export const homepageTrustMetric = {
  value: null,
  label: "Số liệu đang được xác minh trước khi công bố.",
  placeholder: "Đánh giá từ khách hàng",
} satisfies {
  value: string | null;
  label: string;
  placeholder: string;
};

export const doctors: Doctor[] = [
  {
    status: "placeholder",
    id: "verified-doctor-profiles",
    title: "Hồ sơ bác sĩ đang được cập nhật",
    message:
      "Tên, vị trí, chuyên môn, kinh nghiệm và lịch làm việc sẽ chỉ hiển thị sau khi PetOne xác minh dữ liệu chính thức.",
  },
];
