import {
  articles as fallbackArticles,
  doctors as fallbackDoctors,
  services as fallbackServices,
} from "@/content/site";
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

const servicesQuery = `*[_type == "service"] | order(order asc) {
  "slug": slug.current,
  title,
  shortTitle,
  summary,
  description,
  points,
  accent
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
  image {
    "src": asset->url,
    alt
  }
}`;

const homeServiceSlugs = [
  "kham-tong-quat",
  "tiem-phong",
  "noi-khoa",
  "ngoai-khoa",
  "spa-grooming",
] as const;

export async function getServices(): Promise<Service[]> {
  if (!isSanityConfigured) {
    return fallbackServices;
  }

  try {
    const data = await sanityClient.fetch<Service[]>(
      servicesQuery,
      {},
      { next: { revalidate: 300 } },
    );

    return data.length > 0 ? data : fallbackServices;
  } catch {
    return fallbackServices;
  }
}

export async function getHomeServices(): Promise<Service[]> {
  const services = await getServices();
  const servicesBySlug = new Map(
    [...fallbackServices, ...services].map((service) => [service.slug, service]),
  );

  return homeServiceSlugs.flatMap((slug) => {
    const service = servicesBySlug.get(slug);
    return service ? [service] : [];
  });
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
