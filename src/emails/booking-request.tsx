import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import type { BookingInput } from "@/lib/booking-schema";

export function BookingRequestEmail({ booking }: { booking: BookingInput }) {
  return (
    <Html lang="vi">
      <Head />
      <Preview>
        Yêu cầu đặt lịch mới cho {booking.petName} từ {booking.ownerName}
      </Preview>
      <Body
        style={{
          backgroundColor: "#eff7fb",
          fontFamily: "Arial, sans-serif",
          padding: "24px 12px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "18px",
            margin: "0 auto",
            maxWidth: "600px",
            padding: "30px",
          }}
        >
          <Text
            style={{
              color: "#0b6fc2",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "1.4px",
              textTransform: "uppercase",
            }}
          >
            Pet One · Yêu cầu đặt lịch
          </Text>
          <Heading
            style={{
              color: "#082d46",
              fontSize: "28px",
              lineHeight: 1.2,
              margin: "10px 0 20px",
            }}
          >
            Thông tin của {booking.petName}
          </Heading>
          <Section>
            <Text style={labelStyle}>Người liên hệ</Text>
            <Text style={valueStyle}>{booking.ownerName}</Text>
            <Text style={labelStyle}>Điện thoại</Text>
            <Text style={valueStyle}>{booking.phone}</Text>
            {booking.email ? (
              <>
                <Text style={labelStyle}>Email</Text>
                <Text style={valueStyle}>{booking.email}</Text>
              </>
            ) : null}
          </Section>
          <Hr style={{ borderColor: "#d6e7f0", margin: "24px 0" }} />
          <Section>
            <Text style={labelStyle}>Thú cưng</Text>
            <Text style={valueStyle}>
              {booking.petName} · {booking.petType}
            </Text>
            <Text style={labelStyle}>Thời gian mong muốn</Text>
            <Text style={valueStyle}>
              {booking.preferredDate || "Chưa chọn ngày"} ·{" "}
              {booking.preferredTime}
            </Text>
            <Text style={labelStyle}>Điều người nuôi đang lo lắng</Text>
            <Text style={{ ...valueStyle, whiteSpace: "pre-wrap" }}>
              {booking.concern}
            </Text>
          </Section>
          <Hr style={{ borderColor: "#d6e7f0", margin: "24px 0" }} />
          <Text style={{ color: "#657782", fontSize: "12px", lineHeight: 1.6 }}>
            Mã yêu cầu: {booking.submissionId}. Vui lòng liên hệ lại với người
            nuôi để xác nhận. Đây chưa phải lịch hẹn đã được chốt.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const labelStyle = {
  color: "#657782",
  fontSize: "12px",
  fontWeight: 700,
  margin: "16px 0 4px",
  textTransform: "uppercase" as const,
};

const valueStyle = {
  color: "#162630",
  fontSize: "15px",
  lineHeight: 1.6,
  margin: 0,
};
