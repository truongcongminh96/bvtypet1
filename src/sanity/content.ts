import {
  articles as fallbackArticles,
  doctors as fallbackDoctors,
  services as fallbackServices,
} from "@/content/site";
import {
  fallbackAboutPage,
  fallbackEquipment,
  fallbackHomePageSettings,
  fallbackLocations,
  fallbackReviews,
  type AboutPageContent,
  type ClinicLocation,
  type CustomerReview,
  type Equipment,
  type HomePageSettings,
} from "@/content/experience";
import type {
  Article,
  ArticleCategorySlug,
  ArticleContentBlock,
  ArticleImage,
  ArticleJourneyStage,
  Doctor,
  Service,
  VerifiedDoctor,
} from "@/content/site";
import { sanityClient } from "@/sanity/client";
import { sanityFetchOptions } from "@/sanity/cache";
import { isSanityConfigured } from "@/sanity/env";
import { onlyVerified } from "@/lib/verified-content";
import {
  fallbackSiteSettings,
  type SiteSettings,
} from "@/lib/site-config";

const servicesQuery = `*[_type == "service"] | order(order asc) {
  "slug": slug.current,
  title,
  shortTitle,
  summary,
  description,
  points,
  accent,
  group,
  featuredOnHome,
  homeOrder,
  cardImage {
    "src": asset->url,
    alt,
    hotspot
  }
}`;

const articlesQuery = `*[_type == "article"] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  excerpt,
  category,
  journeyStage,
  lead,
  readingTime,
  readTime,
  publishedAt,
  coverImage {
    "src": asset->url,
    alt,
    placeholder,
    hotspot
  },
  thumbnailImage {
    "src": asset->url,
    alt,
    placeholder,
    hotspot
  },
  image {
    "src": asset->url,
    alt,
    placeholder,
    hotspot
  },
  intro,
  sections[]{title, body},
  contentBlocks[]{
    _type,
    id,
    title,
    description,
    paragraphs,
    items,
    body,
    quote,
    attribution,
    caption,
    image {
      "src": asset->url,
      alt,
      placeholder,
      hotspot
    }
  },
  disclaimer,
  reviewedBy->{name, position, verificationStatus},
  "relatedArticleSlugs": relatedArticles[]->slug.current,
  featured,
  tags
}`;

type SanityImage = {
  src?: string;
  alt?: string;
  placeholder?: boolean;
  hotspot?: { x?: number; y?: number };
};

type SanityService = Omit<Service, "cardImage"> & {
  cardImage?: SanityImage;
};

type SanityArticle = {
  slug?: string;
  title?: string;
  excerpt?: string;
  category?: string;
  journeyStage?: string;
  lead?: string;
  readingTime?: number;
  readTime?: string;
  publishedAt?: string;
  coverImage?: SanityImage;
  thumbnailImage?: SanityImage;
  image?: SanityImage;
  intro?: string;
  sections?: Array<{ title?: string; body?: string }>;
  contentBlocks?: ArticleContentBlock[];
  disclaimer?: string;
  reviewedBy?: {
    name?: string;
    position?: string;
    verificationStatus?: string;
  };
  relatedArticleSlugs?: string[];
  featured?: boolean;
  tags?: string[];
};

const categoryAliases: Record<string, ArticleCategorySlug> = {
  "suc-khoe-hang-ngay": "suc-khoe-hang-ngay",
  "Sức khỏe hằng ngày": "suc-khoe-hang-ngay",
  "di-kham-cung-be": "di-kham-cung-be",
  "Đi khám cùng bé": "di-kham-cung-be",
  "cham-soc-du-phong": "cham-soc-du-phong",
  "Chăm sóc dự phòng": "cham-soc-du-phong",
  "dinh-duong": "dinh-duong",
  "Dinh dưỡng": "dinh-duong",
  "da-long-ve-sinh": "da-long-ve-sinh",
  "Da lông & vệ sinh": "da-long-ve-sinh",
};

function getFocalPoint(image?: SanityImage) {
  if (image?.hotspot?.x == null || image.hotspot.y == null) {
    return undefined;
  }

  return `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%`;
}

function normalizeImage(
  image: SanityImage | undefined,
  fallback: ArticleImage,
): ArticleImage {
  if (!image?.src || !image.alt) {
    return fallback;
  }

  return {
    src: image.src,
    alt: image.alt,
    focalPoint: getFocalPoint(image),
    placeholder: image.placeholder ?? false,
  };
}

function createAnchorId(value: string, index: number) {
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return normalized || `phan-${index + 1}`;
}

function normalizeLegacySections(
  sections: SanityArticle["sections"],
): ArticleContentBlock[] {
  return (sections ?? []).flatMap((section, index) => {
    if (!section.title || !section.body) {
      return [];
    }

    return [
      {
        _type: "section" as const,
        id: createAnchorId(section.title, index),
        title: section.title,
        paragraphs: [section.body],
      },
    ];
  });
}

function normalizeJourneyStage(
  value: string | undefined,
  category: ArticleCategorySlug,
): ArticleJourneyStage {
  if (value === "notice" || value === "prepare" || value === "continue") {
    return value;
  }

  if (category === "di-kham-cung-be") {
    return "prepare";
  }

  if (category === "cham-soc-du-phong") {
    return "continue";
  }

  return "notice";
}

function normalizeArticle(record: SanityArticle): Article | null {
  if (
    !record.slug ||
    !record.title ||
    !record.excerpt ||
    !record.publishedAt ||
    !record.category
  ) {
    return null;
  }

  const category = categoryAliases[record.category];
  if (!category) {
    return null;
  }

  const fallback = fallbackArticles.find(
    (article) => article.slug === record.slug,
  );
  const fallbackImage =
    fallback?.coverImage ?? fallbackArticles[0].coverImage;
  const coverImage = normalizeImage(
    record.coverImage ?? record.image,
    fallbackImage,
  );
  const legacyBlocks = normalizeLegacySections(record.sections);
  const contentBlocks =
    record.contentBlocks && record.contentBlocks.length > 0
      ? record.contentBlocks
      : fallback?.contentBlocks ?? legacyBlocks;

  if (contentBlocks.length === 0) {
    return null;
  }

  const legacyReadingTime = Number.parseInt(record.readTime ?? "", 10);
  const readingTime =
    record.readingTime ??
    (Number.isFinite(legacyReadingTime) ? legacyReadingTime : undefined) ??
    fallback?.readingTime ??
    1;

  return {
    slug: record.slug,
    title: record.title,
    excerpt: record.excerpt,
    lead: record.lead ?? record.intro ?? fallback?.lead ?? record.excerpt,
    category,
    journeyStage: normalizeJourneyStage(record.journeyStage, category),
    readingTime: Number.isFinite(readingTime) ? readingTime : 1,
    publishedAt: record.publishedAt,
    coverImage,
    thumbnailImage: record.thumbnailImage
      ? normalizeImage(record.thumbnailImage, coverImage)
      : fallback?.thumbnailImage ?? coverImage,
    contentBlocks,
    disclaimer:
      record.disclaimer ??
      fallback?.disclaimer ??
      "Nội dung nhằm hỗ trợ quan sát và không thay thế đánh giá trực tiếp của bác sĩ thú y.",
    reviewedBy:
      record.reviewedBy?.verificationStatus === "verified" &&
      record.reviewedBy.name
        ? {
            verified: true,
            name: record.reviewedBy.name,
            position: record.reviewedBy.position,
          }
        : undefined,
    relatedArticleSlugs:
      record.relatedArticleSlugs ?? fallback?.relatedArticleSlugs ?? [],
    featured: record.featured ?? fallback?.featured ?? false,
    tags: record.tags ?? fallback?.tags ?? [],
  };
}

const doctorsQuery = `*[_type == "doctor" && verificationStatus == "verified"] | order(order asc) {
  "status": "verified",
  "slug": slug.current,
  name,
  position,
  specialty,
  yearsOfExperience,
  schedule,
  biography,
  credentials,
  journey[]{year, title, description},
  image {
    "src": asset->url,
    alt
  }
}`;

const fallbackServiceImages: Record<string, ArticleImage> = {
  "kham-tong-quat": {
    src: "/images/clinic/pet-one-general-exam-dog.jpg",
    alt: "Đội ngũ Pet One kiểm tra sức khỏe tổng quát cho một chú chó",
    focalPoint: "50% 42%",
    placeholder: false,
  },
  "tiem-phong": {
    src: "/images/services/tiem-phong.png",
    alt: "Bác sĩ thú y tiêm phòng nhẹ nhàng cho một chú mèo",
    placeholder: true,
  },
  "noi-khoa": {
    src: "/images/clinic/pet-one-general-exam-cat.jpg",
    alt: "Bác sĩ Pet One kiểm tra nhẹ nhàng cho một chú mèo",
    focalPoint: "50% 44%",
    placeholder: false,
  },
  "ngoai-khoa": {
    src: "/images/services/services-treatment-concept.png",
    alt: "Bác sĩ trao đổi kế hoạch chăm sóc trước và sau can thiệp",
    placeholder: true,
  },
  "spa-grooming": {
    src: "/images/services/services-daily-care-concept.png",
    alt: "Nhân viên chăm sóc da lông cho thú cưng",
    placeholder: true,
  },
  "pet-hotel": {
    src: "/images/pet-one-clinic.png",
    alt: "Không gian trong nhà sáng và gọn gàng dành cho thú cưng lưu trú",
    placeholder: true,
  },
  "chan-doan-hinh-anh": {
    src: "/images/clinic/pet-one-ultrasound-team.jpg",
    alt: "Đội ngũ Pet One thực hiện siêu âm hỗ trợ chẩn đoán",
    focalPoint: "50% 52%",
    placeholder: false,
  },
  "xet-nghiem": {
    src: "/images/clinic/pet-one-lab-microscope.jpg",
    alt: "Kỹ thuật viên Pet One quan sát mẫu xét nghiệm qua kính hiển vi",
    focalPoint: "50% 46%",
    placeholder: false,
  },
  "cham-soc-rang-mieng": {
    src: "/images/services/cham-soc-rang-mieng.png",
    alt: "Bác sĩ kiểm tra sức khỏe răng miệng cho thú cưng",
    placeholder: true,
  },
};

function normalizeOptionalImage(image?: SanityImage): ArticleImage | undefined {
  if (!image?.src || !image.alt) {
    return undefined;
  }

  return {
    src: image.src,
    alt: image.alt,
    focalPoint: getFocalPoint(image),
    placeholder: image.placeholder ?? false,
  };
}

function withServicePresentation(service: Service): Service {
  const group =
    service.group ??
    (service.slug === "spa-grooming"
      ? "spa-grooming"
      : service.slug === "pet-hotel"
        ? "pet-hotel"
      : service.slug === "ngoai-khoa"
        ? "phau-thuat"
        : "kham-chua-benh");

  return {
    ...service,
    group,
    cardImage: service.cardImage ?? fallbackServiceImages[service.slug],
  };
}

export function resolveServices(servicesFromSanity: Service[]): Service[] {
  const resolvedSanity = servicesFromSanity.map(withServicePresentation);
  const sanitySlugs = new Set(
    resolvedSanity.map((service) => service.slug),
  );
  const missingFallbacks = fallbackServices
    .filter((service) => !sanitySlugs.has(service.slug))
    .map(withServicePresentation);

  return [...resolvedSanity, ...missingFallbacks];
}

export async function getServices(): Promise<Service[]> {
  if (!isSanityConfigured) {
    return resolveServices([]);
  }

  try {
    const data = await sanityClient.fetch<SanityService[]>(
      servicesQuery,
      {},
      sanityFetchOptions,
    );

    return resolveServices(
      data.map((service) => ({
        ...service,
        cardImage: normalizeOptionalImage(service.cardImage),
      })),
    );
  } catch {
    return resolveServices([]);
  }
}

export async function getHomeServices(): Promise<Service[]> {
  const sanityServices = await getServices();
  const combined = [...sanityServices, ...fallbackServices.map(withServicePresentation)];
  const deduped = Array.from(
    new Map(combined.map((service) => [service.slug, service])).values(),
  );
  const featured = deduped
    .filter((service) => service.featuredOnHome)
    .sort(
      (a, b) =>
        (a.homeOrder ?? Number.MAX_SAFE_INTEGER) -
        (b.homeOrder ?? Number.MAX_SAFE_INTEGER),
    );
  const featuredSlugs = new Set(featured.map((service) => service.slug));
  const remaining = deduped.filter(
    (service) => !featuredSlugs.has(service.slug),
  );

  return [...featured, ...remaining].slice(0, 8);
}

export async function getArticles(): Promise<Article[]> {
  if (!isSanityConfigured) {
    return fallbackArticles;
  }

  try {
    const data = await sanityClient.fetch<SanityArticle[]>(
      articlesQuery,
      {},
      sanityFetchOptions,
    );

    const normalizedArticles = data.flatMap((record) => {
      const article = normalizeArticle(record);
      return article ? [article] : [];
    });

    return normalizedArticles.length > 0
      ? normalizedArticles
      : fallbackArticles;
  } catch {
    return fallbackArticles;
  }
}

export async function getDoctors(): Promise<Doctor[]> {
  if (!isSanityConfigured) {
    return fallbackDoctors;
  }

  try {
    const data = await sanityClient.fetch<VerifiedDoctor[]>(
      doctorsQuery,
      {},
      sanityFetchOptions,
    );

    return data.length > 0 ? data : fallbackDoctors;
  } catch {
    return fallbackDoctors;
  }
}

export async function getDoctor(slug: string): Promise<VerifiedDoctor | null> {
  const doctors = await getDoctors();
  const doctor = doctors.find(
    (item): item is VerifiedDoctor =>
      item.status === "verified" && item.slug === slug,
  );
  return doctor ?? null;
}

const equipmentQuery = `*[_type == "equipment" && verificationStatus == "verified"] | order(order asc)[0...4] {
  "id": _id,
  name,
  summary,
  supports,
  "verified": true,
  order,
  image { "src": asset->url, alt, hotspot }
}`;

const reviewsQuery = `*[_type == "customerReview" && verificationStatus == "verified"] | order(order asc)[0...10] {
  "id": _id,
  author,
  rating,
  quote,
  reviewedAt,
  reviewedLabel,
  sourceUrl,
  avatar {
    "src": asset->url,
    alt,
    hotspot
  },
  image {
    "src": asset->url,
    alt,
    hotspot
  },
  "verified": true,
  order
}`;

const locationsQuery = `*[_type == "clinicLocation" && verificationStatus == "verified"] | order(order asc)[0...3] {
  "id": _id,
  name,
  address,
  phone,
  email,
  openingHours,
  mapUrl,
  mapEmbedUrl,
  "verified": true,
  order
}`;

const aboutPageQuery = `*[_type == "aboutPage"][0] {
  eyebrow,
  title,
  description,
  storyTitle,
  story,
  principles[]{title, description},
  image { "src": asset->url, alt, hotspot }
}`;

const homePageSettingsQuery = `*[_type == "homePageSettings"][0] {
  hero {
    eyebrow,
    title,
    titleAccent,
    description,
    ctaLabel,
    ctaHref,
    desktopImage { "src": asset->url, alt, hotspot },
    mobileImage { "src": asset->url, alt, hotspot }
  },
  why {
    eyebrow,
    title,
    titleAccent,
    description,
    images[]{ "src": asset->url, alt, hotspot },
    caption
  },
  servicesSection { eyebrow, title, titleAccent },
  equipmentSection {
    eyebrow,
    title,
    titleAccent,
    image { "src": asset->url, alt, hotspot },
    caption
  },
  reviewsSection { eyebrow, title, description },
  articlesSection { eyebrow, title, titleAccent, linkLabel },
  bookingCta {
    eyebrow,
    title,
    description,
    ctaLabel,
    ctaHref,
    image { "src": asset->url, alt, hotspot }
  },
  rating,
  reviewCount,
  googleMapsUrl,
  reasons[]{title, description},
  metrics[]{
    value,
    label,
    detail,
    "verified": verificationStatus == "verified"
  }
}`;

const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
  name,
  tagline,
  title,
  description,
  footerDescription,
  footerDisclaimer,
  logo { "src": asset->url, alt, hotspot },
  phone,
  email,
  address,
  openingHours,
  googleMapsUrl,
  googleMapsEmbedUrl,
  facebookUrl,
  instagramUrl,
  zaloUrl
}`;

type SanityHomePageSettings = {
  rating?: number;
  reviewCount?: number;
  googleMapsUrl?: string;
  hero?: Partial<Omit<HomePageSettings["hero"], "desktopImage" | "mobileImage">> & {
    desktopImage?: SanityImage;
    mobileImage?: SanityImage;
  };
  why?: Partial<Omit<HomePageSettings["why"], "images">> & {
    images?: SanityImage[];
  };
  servicesSection?: Partial<HomePageSettings["servicesSection"]>;
  equipmentSection?: Partial<Omit<HomePageSettings["equipmentSection"], "image">> & {
    image?: SanityImage;
  };
  reviewsSection?: Partial<HomePageSettings["reviewsSection"]>;
  articlesSection?: Partial<HomePageSettings["articlesSection"]>;
  bookingCta?: Partial<Omit<HomePageSettings["bookingCta"], "image">> & {
    image?: SanityImage;
  };
  reasons?: HomePageSettings["reasons"];
  metrics?: HomePageSettings["metrics"];
};

type SanityEquipment = Omit<Equipment, "image"> & {
  image?: SanityImage;
};

type SanityCustomerReview = Omit<CustomerReview, "avatar" | "image"> & {
  avatar?: SanityImage;
  image?: SanityImage;
};

type SanityAboutPage = Omit<AboutPageContent, "image"> & {
  image?: SanityImage;
};

type SanitySiteSettings = Partial<Omit<SiteSettings, "logo">> & {
  logo?: SanityImage;
};

export function resolveSiteSettings(
  data?: SanitySiteSettings | null,
): SiteSettings {
  return {
    ...fallbackSiteSettings,
    ...data,
    logo: normalizeImage(data?.logo, fallbackSiteSettings.logo!),
  };
}

export function resolveHomePageSettings(
  data?: SanityHomePageSettings | null,
): HomePageSettings {
  const fallback = fallbackHomePageSettings;

  return {
    ...fallback,
    rating: data?.rating ?? fallback.rating,
    reviewCount: data?.reviewCount ?? fallback.reviewCount,
    googleMapsUrl: data?.googleMapsUrl ?? fallback.googleMapsUrl,
    hero: {
      ...fallback.hero,
      ...data?.hero,
      desktopImage: normalizeImage(
        data?.hero?.desktopImage,
        fallback.hero.desktopImage,
      ),
      mobileImage: normalizeImage(
        data?.hero?.mobileImage,
        fallback.hero.mobileImage,
      ),
    },
    why: {
      ...fallback.why,
      ...data?.why,
      images: fallback.why.images.map((fallbackImage, index) =>
        normalizeImage(data?.why?.images?.[index], fallbackImage),
      ),
    },
    servicesSection: {
      ...fallback.servicesSection,
      ...data?.servicesSection,
    },
    equipmentSection: {
      ...fallback.equipmentSection,
      ...data?.equipmentSection,
      image: normalizeImage(
        data?.equipmentSection?.image,
        fallback.equipmentSection.image,
      ),
    },
    reviewsSection: {
      ...fallback.reviewsSection,
      ...data?.reviewsSection,
    },
    articlesSection: {
      ...fallback.articlesSection,
      ...data?.articlesSection,
    },
    bookingCta: {
      ...fallback.bookingCta,
      ...data?.bookingCta,
      image: normalizeImage(
        data?.bookingCta?.image,
        fallback.bookingCta.image,
      ),
    },
    reasons:
      data?.reasons && data.reasons.length > 0
        ? data.reasons.slice(0, 6)
        : fallback.reasons,
    metrics: (data?.metrics ?? [])
      .filter((metric) => metric.verified)
      .slice(0, 3),
  };
}

async function fetchVerifiedList<T extends { verified: boolean }>(
  query: string,
  fallback: T[],
): Promise<T[]> {
  if (!isSanityConfigured) return onlyVerified(fallback);
  try {
    const data = await sanityClient.fetch<T[]>(query, {}, sanityFetchOptions);
    return onlyVerified(data.length > 0 ? data : fallback);
  } catch {
    return onlyVerified(fallback);
  }
}

export function getEquipment(): Promise<Equipment[]> {
  if (!isSanityConfigured) return Promise.resolve(onlyVerified(fallbackEquipment));

  return sanityClient
    .fetch<SanityEquipment[]>(equipmentQuery, {}, sanityFetchOptions)
    .then((data) =>
      onlyVerified(
        (data.length > 0 ? data : fallbackEquipment).map((item) => ({
          ...item,
          image:
            "image" in item
              ? normalizeOptionalImage(item.image as SanityImage | undefined)
              : undefined,
        })),
      ),
    )
    .catch(() => onlyVerified(fallbackEquipment));
}

export function getCustomerReviews(): Promise<CustomerReview[]> {
  if (!isSanityConfigured) return Promise.resolve(onlyVerified(fallbackReviews));

  return sanityClient
    .fetch<SanityCustomerReview[]>(reviewsQuery, {}, sanityFetchOptions)
    .then((data) =>
      onlyVerified(
        (data.length > 0 ? data : fallbackReviews).map((item) => ({
          ...item,
          avatar:
            "avatar" in item
              ? normalizeOptionalImage(
                  item.avatar as SanityImage | undefined,
                )
              : undefined,
          image:
            "image" in item
              ? normalizeOptionalImage(item.image as SanityImage | undefined)
              : undefined,
        })),
      ),
    )
    .catch(() => onlyVerified(fallbackReviews));
}

export function getClinicLocations(): Promise<ClinicLocation[]> {
  return fetchVerifiedList(locationsQuery, fallbackLocations);
}

export async function getAboutPage(): Promise<AboutPageContent> {
  if (!isSanityConfigured) return fallbackAboutPage;
  try {
    const data = await sanityClient.fetch<SanityAboutPage | null>(
      aboutPageQuery,
      {},
      sanityFetchOptions,
    );
    return data
      ? { ...data, image: normalizeOptionalImage(data.image) }
      : fallbackAboutPage;
  } catch {
    return fallbackAboutPage;
  }
}

export async function getHomePageSettings(): Promise<HomePageSettings> {
  if (!isSanityConfigured) return fallbackHomePageSettings;
  try {
    const data = await sanityClient.fetch<SanityHomePageSettings | null>(
      homePageSettingsQuery,
      {},
      sanityFetchOptions,
    );
    return resolveHomePageSettings(data);
  } catch {
    return fallbackHomePageSettings;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return fallbackSiteSettings;
  try {
    const data = await sanityClient.fetch<SanitySiteSettings | null>(
      siteSettingsQuery,
      {},
      sanityFetchOptions,
    );
    return resolveSiteSettings(data);
  } catch {
    return fallbackSiteSettings;
  }
}
