import type { ArticleImage } from "@/content/site";

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

export type SiteSettings = {
  name: string;
  tagline: string;
  title: string;
  description: string;
  footerDescription: string;
  footerDisclaimer: string;
  logo?: ArticleImage;
  phone: string;
  email: string;
  address: string;
  openingHours: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  zaloUrl: string;
};

export const fallbackSiteSettings: SiteSettings = {
  name: siteConfig.name,
  tagline: "Veterinary Care",
  title: siteConfig.title,
  description: siteConfig.description,
  footerDescription:
    "Pet One giúp người nuôi hiểu rõ tình trạng của bé và biết điều gì cần làm tiếp theo.",
  footerDisclaimer:
    "Nội dung chăm sóc có tính tham khảo, không thay thế chẩn đoán trực tiếp.",
  logo: {
    src: "/brand/pet-one-source.jpg",
    alt: "Pet One Veterinary Care",
    focalPoint: "38% 50%",
  },
  phone: siteConfig.phone,
  email: siteConfig.email,
  address: siteConfig.address,
  openingHours: siteConfig.openingHours,
  googleMapsUrl: siteConfig.googleMapsUrl,
  googleMapsEmbedUrl: siteConfig.googleMapsEmbedUrl,
  facebookUrl: siteConfig.facebookUrl,
  instagramUrl: siteConfig.instagramUrl,
  zaloUrl: siteConfig.zaloUrl,
};

export type ClinicContactDetails = Pick<
  SiteSettings,
  "phone" | "email" | "address" | "openingHours" | "googleMapsUrl"
>;

export function getPhoneHref(phone = siteConfig.phone) {
  if (!phone) {
    return "/lien-he";
  }

  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function getContactHref(value: string) {
  return value || "/lien-he";
}
