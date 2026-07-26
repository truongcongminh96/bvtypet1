export const contactPageContent = {
  hero: {
    eyebrow: "Bắt đầu từ điều bạn quan sát được",
    title: "Kể PetOne điều bạn đang quan sát",
    description:
      "Gửi trước một vài thông tin để phòng khám chuẩn bị cuộc trao đổi phù hợp hơn.",
    expectation:
      "Lịch hẹn chỉ được xác nhận sau khi PetOne liên hệ lại.",
    image: {
      src: "/images/pet-one-care.png",
      alt: "Hình ảnh minh họa bác sĩ thú y trao đổi cùng người nuôi trong lúc quan sát một chú chó",
      focalPoint: "52% 46%",
      placeholder: true,
    },
    careNotes: [
      "Ăn ít hơn",
      "Ngủ nhiều hơn",
      "Đi lại khác thường",
      "Thuốc đang dùng",
    ],
  },
  contact: {
    title: "Liên hệ theo cách phù hợp với bạn",
    description:
      "Nếu cần trao đổi nhanh, bạn có thể dùng các kênh chính thức bên dưới.",
    unavailableNote:
      "Thông tin liên hệ chính thức đang được cập nhật. PetOne sẽ chỉ hiển thị dữ liệu đã được xác minh.",
    channels: {
      phone: {
        title: "Gọi trực tiếp",
        description: "Khi bạn cần trao đổi nhanh với phòng khám.",
        actionLabel: "Gọi ngay",
      },
      email: {
        title: "Email",
        description: "Phù hợp khi bạn muốn gửi thông tin bằng văn bản.",
        actionLabel: "Gửi email",
      },
      address: {
        title: "Địa chỉ",
        description: "Kiểm tra vị trí trước khi đưa bé đến phòng khám.",
      },
      openingHours: {
        title: "Giờ tiếp nhận",
        description: "Tham khảo trước khi chọn ngày và khung thời gian.",
      },
    },
  },
  form: {
    title: "Yêu cầu đặt lịch",
    description:
      "Kể PetOne điều bạn đang quan sát. Chúng tôi sẽ liên hệ lại để xác nhận thời gian phù hợp.",
    requiredNote: "Các mục có dấu * là bắt buộc.",
  },
  expectation: {
    title: "Sau khi bạn gửi yêu cầu",
    description:
      "Yêu cầu này giúp PetOne chuẩn bị cuộc trao đổi. Đây chưa phải lịch hẹn đã được xác nhận.",
    steps: [
      {
        title: "PetOne kiểm tra thông tin",
        description: "Phòng khám xem lại điều bạn đã quan sát và thời gian mong muốn.",
      },
      {
        title: "Phòng khám liên hệ lại",
        description: "PetOne trao đổi thêm nếu cần làm rõ thông tin trước buổi khám.",
      },
      {
        title: "Hai bên thống nhất lịch",
        description: "Lịch chỉ được xác nhận sau khi thời gian phù hợp đã được thống nhất.",
      },
    ],
  },
} as const;
