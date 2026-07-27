export const siteConfig = {
  name: "Pet One",
  title: "Pet One | Chăm sóc thú y rõ ràng và tận tâm",
  description:
    "Không gian thú y thân thiện, quy trình rõ ràng và kế hoạch chăm sóc phù hợp cho từng thú cưng.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: process.env.NEXT_PUBLIC_CLINIC_PHONE?.trim() ?? "",
  email: process.env.NEXT_PUBLIC_CLINIC_EMAIL?.trim() ?? "",
  address: process.env.NEXT_PUBLIC_CLINIC_ADDRESS?.trim() ?? "",
  openingHours: process.env.NEXT_PUBLIC_CLINIC_HOURS?.trim() ?? "",
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() ?? "",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ?? "",
  zaloUrl: process.env.NEXT_PUBLIC_ZALO_URL?.trim() ?? "",
} as const;

export type ClinicContactDetails = Pick<
  typeof siteConfig,
  "phone" | "email" | "address" | "openingHours"
>;

export const clinicContactDetails: ClinicContactDetails = {
  phone: siteConfig.phone,
  email: siteConfig.email,
  address: siteConfig.address,
  openingHours: siteConfig.openingHours,
};

export function getPhoneHref() {
  if (!siteConfig.phone) {
    return "/lien-he";
  }

  return `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;
}

export function getContactHref(value: string) {
  return value || "/lien-he";
}
