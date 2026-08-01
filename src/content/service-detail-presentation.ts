import type { Service } from "@/content/site";

export type ServiceDetailIconKey =
  | "listen"
  | "observe"
  | "examine"
  | "explain"
  | "plan"
  | "follow-up"
  | "care";

export type ServiceDetailMedia = {
  src: string;
  alt: string;
  placeholder: boolean;
};

export type ServiceVisitStep = {
  id: string;
  iconKey: ServiceDetailIconKey;
  title: string;
  description: string;
  note?: string;
};

export type ServiceDetailPresentation = {
  eyebrow: string;
  heroDescription: string;
  careNotes: string[];
  relevanceItems: string[];
  preparationItems: string[];
  visitSteps: ServiceVisitStep[];
  afterVisitItems: string[];
  outcomeItems: string[];
  images: {
    hero: ServiceDetailMedia;
    process: ServiceDetailMedia;
    detail: ServiceDetailMedia;
  };
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  relatedServiceSlugs: string[];
};

const sharedDetailImage = {
  src: "/images/pet-one-clinic.png",
  alt: "Hình ảnh minh hoạ không gian trao đổi và chăm sóc thú y sáng, gọn gàng",
  placeholder: true,
} satisfies ServiceDetailMedia;

const sharedProcessImage = {
  src: "/images/pet-one-care.png",
  alt: "Hình ảnh minh hoạ bác sĩ thú y tương tác nhẹ nhàng với thú cưng",
  placeholder: true,
} satisfies ServiceDetailMedia;

export const serviceDetailPresentation: Record<
  string,
  ServiceDetailPresentation
> = {
  "kham-tong-quat": {
    eyebrow: "Khám và theo dõi sức khỏe",
    heroDescription:
      "Khi bé thay đổi ăn uống, vận động, hành vi hoặc đến lịch kiểm tra định kỳ.",
    careNotes: ["Ăn uống", "Vận động", "Hành vi"],
    relevanceItems: [
      "Bé ăn ít hơn hoặc thay đổi thói quen ăn uống",
      "Bé ít vận động, ngủ nhiều hoặc phản ứng khác thường",
      "Xuất hiện dấu hiệu chưa rõ nguyên nhân",
      "Đến thời điểm kiểm tra sức khỏe định kỳ",
      "Bạn muốn trao đổi nhiều thay đổi cùng lúc với bác sĩ",
    ],
    preparationItems: [
      "Ghi lại thời điểm bắt đầu xuất hiện thay đổi",
      "Ghi chú thay đổi trong ăn uống, vận động và hành vi",
      "Liệt kê thuốc hoặc sản phẩm bé đang sử dụng",
      "Mang theo hồ sơ cũ nếu có",
      "Ghi lại điều bạn đang lo lắng nhất",
    ],
    visitSteps: [
      {
        id: "listen",
        iconKey: "listen",
        title: "Bạn kể điều đã thấy",
        description:
          "Những thay đổi nhỏ trong sinh hoạt giúp bác sĩ hiểu bối cảnh trước khi kiểm tra.",
      },
      {
        id: "examine",
        iconKey: "examine",
        title: "Bác sĩ kiểm tra thể trạng",
        description:
          "Buổi khám tập trung vào dấu hiệu cần ưu tiên và đối chiếu với thông tin bạn cung cấp.",
      },
      {
        id: "explain",
        iconKey: "explain",
        title: "Mỗi bước đều được giải thích",
        description:
          "Bạn được biết bác sĩ đang kiểm tra điều gì và vì sao bước tiếp theo có thể cần thiết.",
      },
      {
        id: "plan",
        iconKey: "plan",
        title: "Cùng thống nhất cách theo dõi",
        description:
          "Hướng chăm sóc được trao đổi dựa trên kết quả khám và tình trạng thực tế của bé.",
      },
    ],
    afterVisitItems: [
      "Xem lại hướng dẫn chăm sóc đã được trao đổi",
      "Theo dõi những thay đổi bác sĩ đã lưu ý",
      "Liên hệ lại khi xuất hiện dấu hiệu được dặn dò",
      "Tái khám theo lịch nếu bác sĩ đề xuất",
    ],
    outcomeItems: [
      "Dấu hiệu nào đang được ưu tiên đánh giá",
      "Vì sao một bước kiểm tra được đề xuất",
      "Điều gì cần tiếp tục quan sát tại nhà",
      "Khi nào nên liên hệ lại với PetOne",
    ],
    images: {
      hero: {
        src: "/images/clinic/pet-one-general-exam-dog.jpg",
        alt: "Đội ngũ Pet One kiểm tra sức khỏe tổng quát cho một chú chó",
        placeholder: false,
      },
      process: {
        src: "/images/clinic/pet-one-general-exam-cat.jpg",
        alt: "Bác sĩ Pet One quan sát và kiểm tra nhẹ nhàng cho một chú mèo",
        placeholder: false,
      },
      detail: {
        src: "/images/clinic/pet-one-team-records.jpg",
        alt: "Đội ngũ Pet One ghi nhận và đối chiếu thông tin trong buổi khám",
        placeholder: false,
      },
    },
    relatedServiceSlugs: ["noi-khoa", "tiem-phong"],
  },
  "tiem-phong": {
    eyebrow: "Phòng ngừa theo từng giai đoạn",
    heroDescription:
      "Khi cần rà soát lịch tiêm và kế hoạch phòng ngừa theo độ tuổi, môi trường sống và thể trạng.",
    careNotes: ["Lịch sử tiêm", "Độ tuổi", "Thể trạng"],
    relevanceItems: [
      "Bạn chưa rõ lịch sử tiêm phòng của bé",
      "Bé đang bước sang một giai đoạn phát triển mới",
      "Môi trường sống hoặc thói quen sinh hoạt thay đổi",
      "Đến thời điểm cần rà soát kế hoạch phòng ngừa",
    ],
    preparationItems: [
      "Mang theo sổ hoặc thông tin tiêm phòng cũ nếu có",
      "Ghi lại thuốc và sản phẩm bé đang sử dụng",
      "Cho PetOne biết những thay đổi sức khỏe gần đây",
      "Ghi lại điều bạn muốn hỏi về kế hoạch phòng ngừa",
    ],
    visitSteps: [
      {
        id: "history",
        iconKey: "listen",
        title: "Rà soát lịch sử tiêm",
        description:
          "Bác sĩ đối chiếu thông tin đã có và những mốc chưa được xác nhận rõ.",
      },
      {
        id: "condition",
        iconKey: "examine",
        title: "Đánh giá tình trạng hiện tại",
        description:
          "Thể trạng của bé được xem xét trước khi trao đổi bước phòng ngừa phù hợp.",
      },
      {
        id: "schedule",
        iconKey: "plan",
        title: "Trao đổi kế hoạch",
        description:
          "Bạn được giải thích về mốc tiếp theo dựa trên thông tin đã được kiểm tra.",
      },
      {
        id: "follow-up",
        iconKey: "follow-up",
        title: "Hướng dẫn theo dõi",
        description:
          "PetOne nhắc lại điều cần quan sát và cách liên hệ nếu bạn còn băn khoăn.",
      },
    ],
    afterVisitItems: [
      "Lưu lại thông tin và mốc phòng ngừa đã trao đổi",
      "Theo dõi bé theo hướng dẫn của bác sĩ",
      "Liên hệ khi có dấu hiệu đã được lưu ý",
      "Xác nhận lịch tiếp theo nếu phù hợp",
    ],
    outcomeItems: [
      "Lịch sử nào đã được xác nhận",
      "Vì sao thời điểm hiện tại được cân nhắc",
      "Điều gì cần quan sát sau buổi khám",
      "Mốc nào cần tiếp tục theo dõi",
    ],
    images: {
      hero: {
        src: "/images/services/tiem-phong.png",
        alt: "Hình ảnh minh hoạ bác sĩ thú y thực hiện tiêm phòng cho một chú mèo",
        placeholder: true,
      },
      process: {
        src: "/images/pet-one-hero.png",
        alt: "Hình ảnh minh hoạ buổi trao đổi chăm sóc giữa bác sĩ, người nuôi và thú cưng",
        placeholder: true,
      },
      detail: sharedProcessImage,
    },
    relatedServiceSlugs: ["kham-tong-quat", "cham-soc-rang-mieng"],
  },
  "noi-khoa": {
    eyebrow: "Đánh giá thay đổi sức khỏe",
    heroDescription:
      "Khi bé có thay đổi về tiêu hoá, hô hấp, da, tiết niệu hoặc sức khỏe toàn thân.",
    careNotes: ["Diễn tiến", "Thói quen", "Thể trạng"],
    relevanceItems: [
      "Ăn uống hoặc tiêu hoá thay đổi",
      "Hô hấp hoặc mức độ vận động khác thường",
      "Da lông hoặc thói quen vệ sinh thay đổi",
      "Dấu hiệu kéo dài hoặc xuất hiện lặp lại",
      "Bạn cần nối nhiều dấu hiệu chưa rõ nguyên nhân",
    ],
    preparationItems: [
      "Ghi thời điểm và tần suất xuất hiện dấu hiệu",
      "Ghi lại thay đổi trong ăn uống, uống nước và vệ sinh",
      "Chuẩn bị video hoặc hình ảnh nếu bạn đã ghi lại được",
      "Liệt kê thuốc và sản phẩm bé đang sử dụng",
      "Mang theo kết quả khám cũ nếu có",
    ],
    visitSteps: [
      {
        id: "history",
        iconKey: "listen",
        title: "Ghi nhận triệu chứng và diễn tiến",
        description:
          "Bác sĩ bắt đầu từ thời điểm, tần suất và hoàn cảnh xuất hiện thay đổi.",
      },
      {
        id: "priority",
        iconKey: "observe",
        title: "Xác định điều cần ưu tiên",
        description:
          "Các dấu hiệu được kết nối để chọn phần cần đánh giá trước trong buổi khám.",
      },
      {
        id: "examine",
        iconKey: "examine",
        title: "Khám theo hệ cơ quan liên quan",
        description:
          "Bác sĩ kiểm tra dựa trên thông tin thực tế thay vì áp dụng một quy trình giống nhau cho mọi bé.",
      },
      {
        id: "plan",
        iconKey: "plan",
        title: "Trao đổi hướng chăm sóc",
        description:
          "Bước tiếp theo và cách theo dõi tại nhà được giải thích bằng ngôn ngữ dễ hiểu.",
      },
    ],
    afterVisitItems: [
      "Thực hiện hướng dẫn chăm sóc đã được trao đổi",
      "Ghi lại diễn tiến của dấu hiệu cần theo dõi",
      "Liên hệ lại khi tình trạng thay đổi so với hướng dẫn",
      "Tái khám khi bác sĩ đề xuất",
    ],
    outcomeItems: [
      "Nhóm dấu hiệu nào cần được ưu tiên",
      "Thông tin nào còn cần theo dõi thêm",
      "Mục tiêu của bước kiểm tra tiếp theo",
      "Cách cập nhật diễn tiến cho PetOne",
    ],
    images: {
      hero: {
        src: "/images/clinic/pet-one-general-exam-cat.jpg",
        alt: "Bác sĩ Pet One kiểm tra nhẹ nhàng cho một chú mèo",
        placeholder: false,
      },
      process: {
        src: "/images/clinic/pet-one-general-exam-dog.jpg",
        alt: "Đội ngũ Pet One đánh giá thể trạng cho một chú chó",
        placeholder: false,
      },
      detail: {
        src: "/images/clinic/pet-one-team-records.jpg",
        alt: "Đội ngũ Pet One đối chiếu thông tin hỗ trợ đánh giá sức khỏe",
        placeholder: false,
      },
    },
    relatedServiceSlugs: ["kham-tong-quat", "xet-nghiem"],
  },
  "ngoai-khoa": {
    eyebrow: "Đánh giá trước và sau can thiệp",
    heroDescription:
      "Khi bé cần được đánh giá trước can thiệp hoặc theo dõi trong giai đoạn hồi phục.",
    careNotes: ["Chuẩn bị", "Mục tiêu", "Theo dõi"],
    relevanceItems: [
      "Bác sĩ đề xuất đánh giá khả năng can thiệp",
      "Bạn cần hiểu rõ mục tiêu và các bước chuẩn bị",
      "Bé đang cần được theo dõi sau một can thiệp",
      "Bạn có hồ sơ cũ cần được bác sĩ đối chiếu",
    ],
    preparationItems: [
      "Mang theo hồ sơ, đơn thuốc và kết quả cũ nếu có",
      "Liệt kê thuốc hoặc sản phẩm bé đang sử dụng",
      "Ghi lại những thay đổi gần đây của bé",
      "Chuẩn bị các câu hỏi về quá trình chăm sóc",
      "Chỉ thực hiện chuẩn bị chuyên môn theo hướng dẫn trực tiếp của PetOne",
    ],
    visitSteps: [
      {
        id: "review",
        iconKey: "listen",
        title: "Rà soát thông tin hiện có",
        description:
          "Bác sĩ xem lại tình trạng, hồ sơ liên quan và điều bạn đang lo lắng nhất.",
      },
      {
        id: "evaluate",
        iconKey: "examine",
        title: "Đánh giá trước can thiệp",
        description:
          "Mục tiêu là xác định thông tin cần thiết trước khi trao đổi lựa chọn tiếp theo.",
      },
      {
        id: "explain",
        iconKey: "explain",
        title: "Giải thích quy trình và lưu ý",
        description:
          "Bạn được biết lý do, mục tiêu và những điều cần chuẩn bị theo trường hợp cụ thể.",
      },
      {
        id: "follow-up",
        iconKey: "follow-up",
        title: "Lập kế hoạch theo dõi",
        description:
          "Hướng chăm sóc và các dấu hiệu cần liên hệ lại được tóm tắt rõ ràng.",
      },
    ],
    afterVisitItems: [
      "Làm theo hướng dẫn chăm sóc dành riêng cho bé",
      "Theo dõi các dấu hiệu bác sĩ đã lưu ý",
      "Giữ thông tin liên hệ của PetOne dễ tìm",
      "Đưa bé tái khám theo lịch nếu được đề xuất",
    ],
    outcomeItems: [
      "Mục tiêu của việc đánh giá hoặc can thiệp",
      "Những bước chuẩn bị nào áp dụng cho bé",
      "Điều gì cần theo dõi trong giai đoạn hồi phục",
      "Khi nào cần cập nhật tình trạng cho PetOne",
    ],
    images: {
      hero: {
        src: "/images/services/services-treatment-concept.png",
        alt: "Hình ảnh minh hoạ không gian trao đổi trước một kế hoạch chăm sóc chuyên sâu",
        placeholder: true,
      },
      process: sharedProcessImage,
      detail: sharedDetailImage,
    },
    relatedServiceSlugs: ["noi-khoa", "xet-nghiem"],
  },
  "spa-grooming": {
    eyebrow: "Chăm sóc da lông thường ngày",
    heroDescription:
      "Khi da lông cần được vệ sinh, chăm sóc hoặc có thay đổi cần được ghi nhận.",
    careNotes: ["Da lông", "Vệ sinh", "Mức độ hợp tác"],
    relevanceItems: [
      "Da lông cần được vệ sinh và chăm sóc định kỳ",
      "Bạn nhận thấy thay đổi về lông hoặc mùi",
      "Bé khó hợp tác khi chăm sóc tại nhà",
      "Bạn muốn nhân viên ghi nhận thay đổi cần theo dõi",
    ],
    preparationItems: [
      "Cho PetOne biết tình trạng da lông gần đây",
      "Ghi lại sản phẩm chăm sóc bé đang sử dụng",
      "Chia sẻ phản ứng của bé khi được chạm hoặc chải lông",
      "Báo trước những vùng bé thường khó chịu",
    ],
    visitSteps: [
      {
        id: "listen",
        iconKey: "listen",
        title: "Trao đổi tình trạng da lông",
        description:
          "Nhân viên ghi nhận điều bạn quan sát và thói quen chăm sóc hiện tại.",
      },
      {
        id: "observe",
        iconKey: "observe",
        title: "Quan sát trước khi bắt đầu",
        description:
          "Tình trạng da lông và mức độ hợp tác của bé được xem xét trước khi chọn cách chăm sóc.",
      },
      {
        id: "care",
        iconKey: "care",
        title: "Điều chỉnh theo từng bé",
        description:
          "Quy trình được thực hiện theo khả năng hợp tác và tình trạng thực tế tại thời điểm chăm sóc.",
      },
      {
        id: "report",
        iconKey: "follow-up",
        title: "Ghi nhận điều cần theo dõi",
        description:
          "PetOne báo lại nếu quan sát thấy thay đổi nên được trao đổi thêm với bác sĩ.",
      },
    ],
    afterVisitItems: [
      "Duy trì hướng chăm sóc da lông đã được trao đổi",
      "Quan sát phản ứng và mức độ thoải mái của bé",
      "Theo dõi những vùng da lông được lưu ý",
      "Liên hệ nếu bạn nhận thấy thay đổi mới",
    ],
    outcomeItems: [
      "Tình trạng da lông được ghi nhận ra sao",
      "Cách chăm sóc nào phù hợp với mức độ hợp tác",
      "Điều gì cần tiếp tục quan sát tại nhà",
      "Khi nào nên trao đổi thêm với bác sĩ",
    ],
    images: {
      hero: {
        src: "/images/services/services-daily-care-concept.png",
        alt: "Hình ảnh minh hoạ một thú cưng trong không gian chăm sóc sáng và nhẹ nhàng",
        placeholder: true,
      },
      process: sharedProcessImage,
      detail: sharedDetailImage,
    },
    relatedServiceSlugs: ["kham-tong-quat", "cham-soc-rang-mieng"],
  },
  "chan-doan-hinh-anh": {
    eyebrow: "Bổ sung dữ liệu quan sát",
    heroDescription:
      "Khi bác sĩ cần quan sát rõ hơn tình trạng bên trong để trao đổi bước chăm sóc tiếp theo.",
    careNotes: ["Mục tiêu", "Hình ảnh", "Giải thích"],
    relevanceItems: [
      "Bác sĩ cần thêm thông tin để đánh giá tình trạng",
      "Một dấu hiệu cần được quan sát rõ hơn",
      "Kết quả cần được đối chiếu với triệu chứng và tiền sử",
      "Bạn cần hiểu mục tiêu của một chỉ định hình ảnh",
    ],
    preparationItems: [
      "Mang theo hồ sơ và kết quả cũ nếu có",
      "Ghi lại triệu chứng và diễn tiến gần đây",
      "Liệt kê thuốc hoặc sản phẩm bé đang sử dụng",
      "Xác nhận hướng dẫn chuẩn bị trực tiếp với PetOne",
    ],
    visitSteps: [
      {
        id: "purpose",
        iconKey: "explain",
        title: "Giải thích mục tiêu",
        description:
          "Bác sĩ trao đổi câu hỏi cần được làm rõ trước khi thực hiện.",
      },
      {
        id: "prepare",
        iconKey: "care",
        title: "Giúp bé ổn định",
        description:
          "Việc sắp xếp và hỗ trợ được điều chỉnh để hạn chế căng thẳng không cần thiết.",
      },
      {
        id: "observe",
        iconKey: "observe",
        title: "Ghi nhận dữ liệu hình ảnh",
        description:
          "Thông tin thu được được đặt trong bối cảnh triệu chứng và kết quả khám của bé.",
      },
      {
        id: "next",
        iconKey: "plan",
        title: "Trao đổi bước tiếp theo",
        description:
          "Bác sĩ giải thích ý nghĩa của thông tin và điều cần tiếp tục theo dõi.",
      },
    ],
    afterVisitItems: [
      "Lưu lại phần giải thích và kết quả được cung cấp",
      "Tiếp tục theo dõi dấu hiệu liên quan",
      "Thực hiện bước tiếp theo nếu đã được trao đổi",
      "Liên hệ khi có thay đổi so với hướng dẫn",
    ],
    outcomeItems: [
      "Câu hỏi nào đang cần được làm rõ",
      "Thông tin hình ảnh được hiểu trong bối cảnh nào",
      "Vì sao một bước tiếp theo được đề xuất",
      "Điều gì cần tiếp tục theo dõi",
    ],
    images: {
      hero: {
        src: "/images/clinic/pet-one-ultrasound-team.jpg",
        alt: "Đội ngũ Pet One thực hiện siêu âm cho thú cưng",
        placeholder: false,
      },
      process: {
        src: "/images/clinic/pet-one-ultrasound-console.jpg",
        alt: "Bác sĩ Pet One theo dõi hình ảnh trên thiết bị siêu âm",
        placeholder: false,
      },
      detail: {
        src: "/images/clinic/pet-one-ultrasound-screen.jpg",
        alt: "Màn hình siêu âm hỗ trợ bác sĩ quan sát tình trạng bên trong",
        placeholder: false,
      },
    },
    relatedServiceSlugs: ["xet-nghiem", "noi-khoa"],
  },
  "xet-nghiem": {
    eyebrow: "Dữ liệu hỗ trợ đánh giá",
    heroDescription:
      "Khi bác sĩ cần thêm dữ liệu để trả lời một câu hỏi cụ thể về tình trạng của bé.",
    careNotes: ["Câu hỏi", "Mẫu", "Kết quả"],
    relevanceItems: [
      "Bác sĩ cần thêm dữ liệu sau khi khám",
      "Một dấu hiệu cần được kiểm tra trong bối cảnh cụ thể",
      "Kết quả cũ cần được đối chiếu với diễn tiến mới",
      "Bạn cần hiểu rõ lý do của một đề xuất xét nghiệm",
    ],
    preparationItems: [
      "Mang theo kết quả xét nghiệm cũ nếu có",
      "Ghi lại thuốc và sản phẩm bé đang sử dụng",
      "Cho PetOne biết những thay đổi gần đây",
      "Xác nhận trực tiếp nếu có hướng dẫn chuẩn bị riêng",
    ],
    visitSteps: [
      {
        id: "question",
        iconKey: "explain",
        title: "Xác định câu hỏi cần trả lời",
        description:
          "Mỗi đề xuất cần gắn với một mục tiêu rõ ràng trong quá trình đánh giá.",
      },
      {
        id: "prepare",
        iconKey: "care",
        title: "Trao đổi trước khi lấy mẫu",
        description:
          "Bạn được hướng dẫn những điều áp dụng cho trường hợp cụ thể của bé.",
      },
      {
        id: "context",
        iconKey: "observe",
        title: "Đọc kết quả theo ngữ cảnh",
        description:
          "Kết quả được xem cùng triệu chứng, tiền sử và thông tin khám hiện tại.",
      },
      {
        id: "plan",
        iconKey: "plan",
        title: "Giải thích bước tiếp theo",
        description:
          "Bác sĩ trao đổi ý nghĩa, giới hạn và điều cần tiếp tục theo dõi.",
      },
    ],
    afterVisitItems: [
      "Lưu lại kết quả và phần giải thích đi kèm",
      "Theo dõi dấu hiệu liên quan theo hướng dẫn",
      "Không tự diễn giải kết quả tách khỏi bối cảnh khám",
      "Liên hệ nếu bạn cần làm rõ bước tiếp theo",
    ],
    outcomeItems: [
      "Xét nghiệm đang nhằm trả lời câu hỏi nào",
      "Kết quả có ý nghĩa trong bối cảnh nào",
      "Giới hạn nào cần được hiểu rõ",
      "Bước theo dõi nào có thể được cân nhắc",
    ],
    images: {
      hero: {
        src: "/images/clinic/pet-one-lab-microscope.jpg",
        alt: "Kỹ thuật viên Pet One quan sát mẫu xét nghiệm qua kính hiển vi",
        placeholder: false,
      },
      process: {
        src: "/images/clinic/pet-one-lab-pipette.jpg",
        alt: "Kỹ thuật viên Pet One chuẩn bị mẫu bằng micropipette",
        placeholder: false,
      },
      detail: {
        src: "/images/clinic/pet-one-lab-analyzer.jpg",
        alt: "Kỹ thuật viên Pet One vận hành thiết bị phân tích mẫu",
        placeholder: false,
      },
    },
    relatedServiceSlugs: ["chan-doan-hinh-anh", "noi-khoa"],
  },
  "cham-soc-rang-mieng": {
    eyebrow: "Theo dõi răng nướu",
    heroDescription:
      "Khi hơi thở, răng nướu hoặc cách ăn của bé thay đổi và cần được kiểm tra.",
    careNotes: ["Hơi thở", "Răng nướu", "Cách ăn"],
    relevanceItems: [
      "Hơi thở thay đổi rõ so với bình thường",
      "Bé thay đổi cách nhai hoặc chọn thức ăn",
      "Bạn nhận thấy thay đổi quanh răng và nướu",
      "Bạn cần hướng dẫn chăm sóc răng miệng tại nhà",
      "Đến thời điểm cần kiểm tra định kỳ",
    ],
    preparationItems: [
      "Ghi lại thời điểm bắt đầu xuất hiện thay đổi",
      "Cho PetOne biết cách ăn gần đây của bé",
      "Liệt kê sản phẩm chăm sóc răng miệng đang sử dụng",
      "Mang theo hồ sơ cũ nếu có",
      "Ghi lại mức độ hợp tác của bé khi chăm sóc tại nhà",
    ],
    visitSteps: [
      {
        id: "listen",
        iconKey: "listen",
        title: "Trao đổi thay đổi bạn nhận thấy",
        description:
          "Cách ăn, hơi thở và thói quen chăm sóc giúp bác sĩ hiểu bối cảnh.",
      },
      {
        id: "examine",
        iconKey: "examine",
        title: "Kiểm tra răng và nướu",
        description:
          "Bác sĩ quan sát tình trạng hiện tại và ưu tiên điều cần giải thích trước.",
      },
      {
        id: "explain",
        iconKey: "explain",
        title: "Giải thích lựa chọn chăm sóc",
        description:
          "Bạn được biết mục tiêu của từng bước và điều nào phù hợp với tình trạng hiện tại.",
      },
      {
        id: "home-care",
        iconKey: "care",
        title: "Hướng dẫn chăm sóc tại nhà",
        description:
          "Cách theo dõi được điều chỉnh theo mức độ hợp tác và thói quen của bé.",
      },
    ],
    afterVisitItems: [
      "Duy trì hướng chăm sóc đã được trao đổi",
      "Theo dõi thay đổi trong cách ăn và hơi thở",
      "Không ép bé khi chưa quen với thao tác chăm sóc",
      "Liên hệ lại khi có dấu hiệu được bác sĩ lưu ý",
    ],
    outcomeItems: [
      "Tình trạng răng nướu hiện tại được ghi nhận ra sao",
      "Mục tiêu của lựa chọn chăm sóc được đề xuất",
      "Cách giúp bé làm quen với chăm sóc tại nhà",
      "Điều gì cần tiếp tục theo dõi",
    ],
    images: {
      hero: {
        src: "/images/services/cham-soc-rang-mieng.png",
        alt: "Hình ảnh minh hoạ bác sĩ thú y kiểm tra răng miệng cho một chú chó nhỏ",
        placeholder: true,
      },
      process: sharedProcessImage,
      detail: sharedDetailImage,
    },
    relatedServiceSlugs: ["kham-tong-quat", "spa-grooming"],
  },
  "pet-hotel": {
    eyebrow: "Lưu trú & chăm sóc hằng ngày",
    heroDescription:
      "Khi bạn cần một nơi lưu trú có lịch chăm sóc rõ ràng và phù hợp với thói quen riêng của bé.",
    careNotes: ["Ăn uống", "Thói quen", "Theo dõi"],
    relevanceItems: [
      "Bạn cần gửi bé trong ngày hoặc qua đêm",
      "Bé có lịch ăn, nghỉ ngơi hoặc vận động riêng",
      "Bé cần dùng sản phẩm chăm sóc theo hướng dẫn đã có",
      "Bạn muốn thống nhất trước cách cập nhật tình trạng của bé",
    ],
    preparationItems: [
      "Ghi lại lịch ăn, khẩu phần và thói quen uống nước",
      "Chuẩn bị thức ăn hoặc vật dụng quen thuộc nếu cần",
      "Cho PetOne biết tính cách và điều khiến bé dễ căng thẳng",
      "Liệt kê sản phẩm hoặc hướng dẫn chăm sóc đang áp dụng",
      "Cung cấp thông tin liên hệ trong thời gian bé lưu trú",
    ],
    visitSteps: [
      {
        id: "routine",
        iconKey: "listen",
        title: "Ghi nhận nhịp sinh hoạt",
        description:
          "PetOne trao đổi lịch ăn, nghỉ ngơi, vận động và những lưu ý riêng trước khi nhận bé.",
      },
      {
        id: "settle",
        iconKey: "care",
        title: "Giúp bé làm quen",
        description:
          "Không gian và cách tiếp cận được điều chỉnh để bé có thời gian thích nghi.",
      },
      {
        id: "care",
        iconKey: "observe",
        title: "Chăm sóc theo lịch đã thống nhất",
        description:
          "Các mốc ăn uống, nghỉ ngơi và vận động được theo dõi theo thông tin người nuôi cung cấp.",
      },
      {
        id: "update",
        iconKey: "follow-up",
        title: "Cập nhật khi cần",
        description:
          "PetOne liên hệ khi có thay đổi đáng chú ý hoặc cần làm rõ cách chăm sóc.",
      },
    ],
    afterVisitItems: [
      "Nhận lại các ghi chú cần thiết về thời gian lưu trú",
      "Tiếp tục lịch sinh hoạt quen thuộc khi bé về nhà",
      "Theo dõi cách ăn uống, nghỉ ngơi và tương tác của bé",
      "Liên hệ lại nếu bạn cần làm rõ thông tin",
    ],
    outcomeItems: [
      "Lịch chăm sóc nào đã được thống nhất",
      "Bé thích nghi với không gian lưu trú ra sao",
      "Có thay đổi nào đáng chú ý trong thời gian lưu trú",
      "Điều gì nên tiếp tục theo dõi khi về nhà",
    ],
    images: {
      hero: {
        src: "/images/pet-one-clinic.png",
        alt: "Hình ảnh minh hoạ không gian trong nhà sáng và gọn gàng dành cho thú cưng lưu trú",
        placeholder: true,
      },
      process: sharedProcessImage,
      detail: sharedDetailImage,
    },
    relatedServiceSlugs: ["spa-grooming", "kham-tong-quat"],
  },
};

const fallbackPreparationItems = [
  "Ghi lại thời điểm bắt đầu xuất hiện thay đổi",
  "Liệt kê thuốc hoặc sản phẩm bé đang sử dụng",
  "Mang theo hồ sơ cũ nếu có",
  "Ghi lại điều bạn đang lo lắng nhất",
];

export function getServiceDetailPresentation(
  service: Service,
): ServiceDetailPresentation {
  const presentation = serviceDetailPresentation[service.slug];

  if (presentation) {
    return presentation;
  }

  return {
    eyebrow: "Chăm sóc tại PetOne",
    heroDescription: service.summary,
    careNotes: [
      "Điều bạn quan sát",
      "Điều cần ưu tiên",
      "Theo dõi sau khám",
    ],
    relevanceItems: [service.summary],
    preparationItems: fallbackPreparationItems,
    visitSteps: service.points.map((point, index) => ({
      id: `${service.slug}-${index + 1}`,
      iconKey: index === 0 ? "listen" : index === 1 ? "examine" : "plan",
      title: point,
      description:
        "Bác sĩ sẽ giải thích mục tiêu và điều cần lưu ý dựa trên tình trạng thực tế của bé.",
    })),
    afterVisitItems: [
      "Xem lại hướng dẫn đã được trao đổi",
      "Theo dõi những thay đổi bác sĩ đã lưu ý",
      "Liên hệ lại khi bạn cần làm rõ thông tin",
      "Tái khám theo lịch nếu được đề xuất",
    ],
    outcomeItems: [
      "Điều gì đang được ưu tiên đánh giá",
      "Vì sao một bước được đề xuất",
      "Điều gì cần theo dõi tại nhà",
      "Khi nào nên liên hệ lại",
    ],
    images: {
      hero: {
        src: "/images/services/services-hero-concept.png",
        alt: `Hình ảnh minh hoạ cho dịch vụ ${service.title}`,
        placeholder: true,
      },
      process: sharedProcessImage,
      detail: sharedDetailImage,
    },
    relatedServiceSlugs: [],
  };
}
