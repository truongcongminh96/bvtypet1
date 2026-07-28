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
import { isSanityConfigured } from "@/sanity/env";
import { onlyVerified } from "@/lib/verified-content";

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
    src: "/images/services/kham-tong-quat.png",
    alt: "Bác sĩ thú y kiểm tra sức khỏe tổng quát cho một chú chó",
    placeholder: true,
  },
  "tiem-phong": {
    src: "/images/services/tiem-phong.png",
    alt: "Bác sĩ thú y tiêm phòng nhẹ nhàng cho một chú mèo",
    placeholder: true,
  },
  "noi-khoa": {
    src: "/images/services/services-diagnostics-concept.png",
    alt: "Bác sĩ trao đổi kế hoạch đánh giá sức khỏe thú cưng",
    placeholder: true,
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
  "chan-doan-hinh-anh": {
    src: "/images/services/chan-doan-hinh-anh.png",
    alt: "Thiết bị chẩn đoán hình ảnh trong phòng khám thú y",
    placeholder: true,
  },
  "xet-nghiem": {
    src: "/images/services/xet-nghiem.png",
    alt: "Bác sĩ thực hiện xét nghiệm hỗ trợ đánh giá sức khỏe thú cưng",
    placeholder: true,
  },
  "cham-soc-rang-mieng": {
    src: "/images/services/cham-soc-rang-mieng.png",
    alt: "Bác sĩ kiểm tra sức khỏe răng miệng cho thú cưng",
    placeholder: true,
  },
};

function normalizeServiceImage(image?: SanityImage): ArticleImage | undefined {
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
      : service.slug === "ngoai-khoa"
        ? "phau-thuat"
        : "kham-chua-benh");

  return {
    ...service,
    group,
    cardImage: service.cardImage ?? fallbackServiceImages[service.slug],
  };
}

export async function getServices(): Promise<Service[]> {
  if (!isSanityConfigured) {
    return fallbackServices.map(withServicePresentation);
  }

  try {
    const data = await sanityClient.fetch<SanityService[]>(
      servicesQuery,
      {},
      { next: { revalidate: 300 } },
    );

    if (data.length === 0) {
      return fallbackServices.map(withServicePresentation);
    }

    return data.map((service) =>
      withServicePresentation({
        ...service,
        cardImage: normalizeServiceImage(service.cardImage),
      }),
    );
  } catch {
    return fallbackServices.map(withServicePresentation);
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
      { next: { revalidate: 300 } },
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
      { next: { revalidate: 300 } },
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

const reviewsQuery = `*[_type == "customerReview" && verificationStatus == "verified"] | order(order asc)[0...6] {
  "id": _id,
  author,
  rating,
  quote,
  reviewedAt,
  sourceUrl,
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

async function fetchVerifiedList<T extends { verified: boolean }>(
  query: string,
  fallback: T[],
): Promise<T[]> {
  if (!isSanityConfigured) return onlyVerified(fallback);
  try {
    const data = await sanityClient.fetch<T[]>(query, {}, { next: { revalidate: 300 } });
    return onlyVerified(data.length > 0 ? data : fallback);
  } catch {
    return onlyVerified(fallback);
  }
}

export function getEquipment(): Promise<Equipment[]> {
  return fetchVerifiedList(equipmentQuery, fallbackEquipment);
}

export function getCustomerReviews(): Promise<CustomerReview[]> {
  return fetchVerifiedList(reviewsQuery, fallbackReviews);
}

export function getClinicLocations(): Promise<ClinicLocation[]> {
  return fetchVerifiedList(locationsQuery, fallbackLocations);
}

export async function getAboutPage(): Promise<AboutPageContent> {
  if (!isSanityConfigured) return fallbackAboutPage;
  try {
    const data = await sanityClient.fetch<AboutPageContent | null>(
      aboutPageQuery,
      {},
      { next: { revalidate: 300 } },
    );
    return data ?? fallbackAboutPage;
  } catch {
    return fallbackAboutPage;
  }
}

export async function getHomePageSettings(): Promise<HomePageSettings> {
  if (!isSanityConfigured) return fallbackHomePageSettings;
  try {
    const data = await sanityClient.fetch<HomePageSettings | null>(
      homePageSettingsQuery,
      {},
      { next: { revalidate: 300 } },
    );
    return {
      ...fallbackHomePageSettings,
      ...data,
      reasons:
        data?.reasons && data.reasons.length > 0
          ? data.reasons.slice(0, 6)
          : fallbackHomePageSettings.reasons,
      metrics: (data?.metrics ?? []).filter((metric) => metric.verified).slice(0, 3),
    };
  } catch {
    return fallbackHomePageSettings;
  }
}
