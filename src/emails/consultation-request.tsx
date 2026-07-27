import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "@react-email/components";

import type { ConsultationInput } from "@/lib/consultation-schema";

export function ConsultationRequestEmail({ request }: { request: ConsultationInput }) {
  return (
    <Html lang="vi">
      <Head />
      <Preview>Yêu cầu tư vấn mới từ {request.name}</Preview>
      <Body style={{ backgroundColor: "#f4f8fa", fontFamily: "Arial, sans-serif", padding: "24px" }}>
        <Container style={{ backgroundColor: "#ffffff", borderRadius: "18px", padding: "28px" }}>
          <Heading style={{ color: "#102e3a", fontSize: "24px" }}>Yêu cầu tư vấn Pet One</Heading>
          <Section>
            <Text><strong>Người liên hệ:</strong> {request.name}</Text>
            <Text><strong>Số điện thoại:</strong> {request.phone}</Text>
            <Text><strong>Nhu cầu:</strong> {request.service}</Text>
            {request.note ? <Text><strong>Ghi chú:</strong> {request.note}</Text> : null}
          </Section>
          <Hr />
          <Text style={{ color: "#526b75", fontSize: "12px" }}>Mã yêu cầu: {request.submissionId}</Text>
        </Container>
      </Body>
    </Html>
  );
}
