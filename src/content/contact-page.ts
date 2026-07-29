export const contactPageContent = {
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
        actionLabel: "Xem Google Maps",
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
} as const;
