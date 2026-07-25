export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  points: string[];
  accent: "blue" | "red" | "navy" | "ice";
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
};

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
];

export const articles: Article[] = [
  {
    slug: "dau-hieu-thu-cung-can-di-kham",
    title: "Những thay đổi nhỏ cho thấy thú cưng nên được đi khám",
    excerpt:
      "Ăn ít, ngủ nhiều hay thay đổi thói quen vệ sinh đều có thể là tín hiệu cần quan sát kỹ hơn.",
    category: "Sức khỏe hằng ngày",
    readTime: "4 phút đọc",
    publishedAt: "2026-07-18",
    intro:
      "Người nuôi thường là người nhận ra thay đổi đầu tiên. Việc ghi lại thời điểm, tần suất và hoàn cảnh xuất hiện giúp buổi trao đổi với bác sĩ hiệu quả hơn.",
    sections: [
      {
        title: "Thay đổi trong ăn uống và sinh hoạt",
        body: "Nếu thú cưng ăn ít hơn bình thường, uống nước nhiều bất thường, khó nằm yên hoặc ít tương tác, bạn nên ghi lại trong một đến hai ngày và liên hệ phòng khám để được hướng dẫn.",
      },
      {
        title: "Quan sát cách di chuyển và hô hấp",
        body: "Đi khập khiễng, ngại nhảy, thở nhanh khi đang nghỉ hoặc tư thế lạ đều là dữ liệu hữu ích. Không tự dùng thuốc của người cho thú cưng khi chưa có tư vấn chuyên môn.",
      },
      {
        title: "Chuẩn bị trước khi liên hệ",
        body: "Bạn có thể quay video ngắn, chụp lại thức ăn hoặc chất thải bất thường và ghi danh sách thuốc đang dùng. Những thông tin này giúp bác sĩ định hướng bước tiếp theo rõ hơn.",
      },
    ],
  },
  {
    slug: "chuan-bi-truoc-buoi-kham",
    title: "Chuẩn bị gì để buổi khám của thú cưng nhẹ nhàng hơn?",
    excerpt:
      "Một chiếc lồng quen mùi, vài ghi chú ngắn và tâm lý bình tĩnh có thể tạo khác biệt lớn.",
    category: "Đi khám cùng bé",
    readTime: "3 phút đọc",
    publishedAt: "2026-07-11",
    intro:
      "Một buổi khám ít căng thẳng bắt đầu từ trước khi rời nhà. Chuẩn bị đúng giúp thú cưng an tâm hơn và bác sĩ có đủ thông tin để đánh giá.",
    sections: [
      {
        title: "Mang theo những gì quen thuộc",
        body: "Dùng lồng vận chuyển chắc chắn với mèo và dây dắt phù hợp với chó. Một tấm khăn hoặc món đồ có mùi quen thuộc có thể giúp bé bình tĩnh hơn.",
      },
      {
        title: "Ghi lại điều bạn đang lo lắng",
        body: "Hãy ghi thời điểm triệu chứng bắt đầu, tần suất, chế độ ăn gần đây và các sản phẩm đang sử dụng. Danh sách ngắn nhưng cụ thể sẽ hữu ích hơn việc cố nhớ tại phòng khám.",
      },
      {
        title: "Hỏi trước nếu cần nhịn ăn",
        body: "Không phải buổi khám nào cũng cần nhịn ăn. Hãy xác nhận với phòng khám trước khi thay đổi bữa ăn hoặc lịch dùng thuốc của thú cưng.",
      },
    ],
  },
  {
    slug: "cham-soc-rang-mieng-tai-nha",
    title: "Bắt đầu chăm sóc răng miệng tại nhà theo cách dễ chịu",
    excerpt:
      "Đi chậm, chọn dụng cụ phù hợp và biến việc làm sạch răng thành một thói quen tích cực.",
    category: "Chăm sóc dự phòng",
    readTime: "5 phút đọc",
    publishedAt: "2026-07-04",
    intro:
      "Thói quen tốt không cần bắt đầu bằng một buổi chải răng hoàn hảo. Mục tiêu đầu tiên là giúp thú cưng cảm thấy an toàn khi bạn chạm quanh vùng miệng.",
    sections: [
      {
        title: "Làm quen từng bước",
        body: "Bắt đầu bằng việc chạm nhẹ quanh má và môi trong vài giây, sau đó thưởng cho bé. Khi thú cưng đã quen, bạn mới tăng dần thời gian và đưa dụng cụ vào.",
      },
      {
        title: "Chỉ dùng sản phẩm dành cho thú cưng",
        body: "Kem đánh răng của người không phù hợp để thú cưng nuốt. Hãy chọn sản phẩm chuyên dụng và hỏi bác sĩ nếu bé có tiền sử dị ứng hoặc bệnh lý răng miệng.",
      },
      {
        title: "Nhận biết lúc cần được kiểm tra",
        body: "Hơi thở thay đổi rõ, chảy nước dãi, nhai một bên, bỏ thức ăn cứng hoặc nướu chảy máu là những dấu hiệu nên trao đổi sớm với phòng khám.",
      },
    ],
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
    title: "Đánh giá",
    description:
      "Bác sĩ kiểm tra thể trạng và giải thích mục tiêu của từng bước đánh giá cần thiết.",
  },
  {
    number: "03",
    title: "Cùng quyết định",
    description:
      "Hướng chăm sóc được trao đổi rõ ràng để bạn hiểu lựa chọn, ưu tiên và cách theo dõi tại nhà.",
  },
  {
    number: "04",
    title: "Theo dõi",
    description:
      "Những mốc cần chú ý sau buổi khám được tóm tắt để việc chăm sóc không bị đứt quãng.",
  },
];
