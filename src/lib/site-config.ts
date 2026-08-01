const clinicDefaults = {
  phone: "0964 402 602",
  address: "329 Tân Hương, Phú Thọ Hòa, Hồ Chí Minh",
  openingHours: "Thứ Hai–Chủ Nhật: 08:00–20:00",
  googleMapsUrl: "https://maps.app.goo.gl/MPnJZTfC9wyFNQ9f7",
  googleMapsEmbedUrl:
    "https://maps.google.com/maps?cid=16726709539771933563&hl=vi&output=embed",
  facebookUrl:
    "https://www.facebook.com/pktypetonebinhtan/?locale=vi_VN",
} as const;

export const siteConfig = {
  name: "Pet One",
  title: "Pet One | Chăm sóc thú y rõ ràng và tận tâm",
  description:
    "Không gian thú y thân thiện, quy trình rõ ràng và kế hoạch chăm sóc phù hợp cho từng thú cưng.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone:
    process.env.NEXT_PUBLIC_CLINIC_PHONE?.trim() || clinicDefaults.phone,
  email: process.env.NEXT_PUBLIC_CLINIC_EMAIL?.trim() ?? "",
  address:
    process.env.NEXT_PUBLIC_CLINIC_ADDRESS?.trim() || clinicDefaults.address,
  openingHours:
    process.env.NEXT_PUBLIC_CLINIC_HOURS?.trim() ||
    clinicDefaults.openingHours,
  googleMapsUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL?.trim() ||
    clinicDefaults.googleMapsUrl,
  googleMapsEmbedUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL?.trim() ||
    clinicDefaults.googleMapsEmbedUrl,
  facebookUrl:
    process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() || clinicDefaults.facebookUrl,
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ?? "",
  zaloUrl: process.env.NEXT_PUBLIC_ZALO_URL?.trim() ?? "",
} as const;

export const footerClinicAddresses = [
  {
    address: "329 Tân Hương",
    mapUrl: siteConfig.googleMapsUrl,
  },
  {
    address: "201 đường số 7",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=201%20%C4%91%C6%B0%E1%BB%9Dng%20s%E1%BB%91%207%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh",
  },
  {
    address: "430 Lũy Bán Bích",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=430%20L%C5%A9y%20B%C3%A1n%20B%C3%ADch%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh",
  },
] as const;

export type ClinicContactDetails = Pick<
  typeof siteConfig,
  "phone" | "email" | "address" | "openingHours" | "googleMapsUrl"
>;

export const clinicContactDetails: ClinicContactDetails = {
  phone: siteConfig.phone,
  email: siteConfig.email,
  address: siteConfig.address,
  openingHours: siteConfig.openingHours,
  googleMapsUrl: siteConfig.googleMapsUrl,
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
