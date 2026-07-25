export const siteConfig = {
  name: "Pet One",
  title: "Pet One | Chăm sóc thú y rõ ràng và tận tâm",
  description:
    "Không gian thú y thân thiện, quy trình rõ ràng và kế hoạch chăm sóc phù hợp cho từng thú cưng.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: process.env.NEXT_PUBLIC_CLINIC_PHONE?.trim() ?? "",
  email: process.env.BOOKING_EMAIL_TO?.trim() ?? "",
} as const;

export function getPhoneHref() {
  if (!siteConfig.phone) {
    return "/lien-he";
  }

  return `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;
}
