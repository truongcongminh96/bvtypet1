import { createReadStream, existsSync } from "node:fs";
import { basename, resolve } from "node:path";

import { getCliClient } from "sanity/cli";

import {
  fallbackAboutPage,
  fallbackEquipment,
  fallbackHomePageSettings,
  fallbackLocations,
  fallbackReviews,
} from "../src/content/experience";
import { featuredHomeServiceSlugs } from "../src/content/home-service-presentation";
import {
  articles,
  doctors,
  services,
  type ArticleContentBlock,
  type ArticleImage,
  type Service,
  type VerifiedDoctor,
} from "../src/content/site";
import { fallbackSiteSettings } from "../src/lib/site-config";

const client = getCliClient({ apiVersion: "2026-07-25" });
const uploadedImages = new Map<string, SanityImageValue>();

type SanityImageValue = {
  _type: "image";
  _key?: string;
  asset: { _type: "reference"; _ref: string };
  alt: string;
  placeholder?: boolean;
  hotspot?: {
    _type: "sanity.imageHotspot";
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

type MigrationDocument = {
  _id: string;
  _type: string;
  [key: string]: unknown;
};

const serviceImages: Record<string, ArticleImage> = {
  "kham-tong-quat": {
    src: "/images/clinic/pet-one-general-exam-dog.jpg",
    alt: "Đội ngũ Pet One kiểm tra sức khỏe tổng quát cho một chú chó",
    focalPoint: "50% 42%",
  },
  "tiem-phong": {
    src: "/images/services/tiem-phong.png",
    alt: "Bác sĩ thú y tiêm phòng nhẹ nhàng cho một chú mèo",
  },
  "noi-khoa": {
    src: "/images/clinic/pet-one-general-exam-cat.jpg",
    alt: "Bác sĩ Pet One kiểm tra nhẹ nhàng cho một chú mèo",
    focalPoint: "50% 44%",
  },
  "ngoai-khoa": {
    src: "/images/services/services-treatment-concept.png",
    alt: "Bác sĩ trao đổi kế hoạch chăm sóc trước và sau can thiệp",
  },
  "spa-grooming": {
    src: "/images/services/services-daily-care-concept.png",
    alt: "Nhân viên chăm sóc da lông cho thú cưng",
  },
  "pet-hotel": {
    src: "/images/pet-one-clinic.png",
    alt: "Không gian trong nhà sáng và gọn gàng dành cho thú cưng lưu trú",
  },
  "chan-doan-hinh-anh": {
    src: "/images/clinic/pet-one-ultrasound-team.jpg",
    alt: "Đội ngũ Pet One thực hiện siêu âm hỗ trợ chẩn đoán",
    focalPoint: "50% 52%",
  },
  "xet-nghiem": {
    src: "/images/clinic/pet-one-lab-microscope.jpg",
    alt: "Kỹ thuật viên Pet One quan sát mẫu xét nghiệm qua kính hiển vi",
    focalPoint: "50% 46%",
  },
  "cham-soc-rang-mieng": {
    src: "/images/services/cham-soc-rang-mieng.png",
    alt: "Bác sĩ kiểm tra sức khỏe răng miệng cho thú cưng",
  },
};

function key(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function documentId(type: string, value: string) {
  return `${type}-${value}`;
}

function parseFocalPoint(value?: string) {
  const match = value?.match(/^(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/);
  if (!match) return undefined;

  return {
    _type: "sanity.imageHotspot" as const,
    x: Number(match[1]) / 100,
    y: Number(match[2]) / 100,
    height: 1,
    width: 1,
  };
}

async function uploadImage(
  image: ArticleImage,
  options: { arrayKey?: string; includePlaceholder?: boolean } = {},
): Promise<SanityImageValue> {
  const cached = uploadedImages.get(image.src);
  if (cached) {
    return options.arrayKey ? { ...cached, _key: options.arrayKey } : cached;
  }

  if (!image.src.startsWith("/")) {
    throw new Error(`Expected a local image path, received ${image.src}`);
  }

  const filePath = resolve(process.cwd(), "public", image.src.slice(1));
  if (!existsSync(filePath)) {
    throw new Error(`Missing image file: ${filePath}`);
  }

  process.stdout.write(`Uploading ${image.src}... `);
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: basename(filePath),
  });
  process.stdout.write(`${asset._id}\n`);

  const value: SanityImageValue = {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: image.alt,
    hotspot: parseFocalPoint(image.focalPoint),
    ...(options.includePlaceholder
      ? { placeholder: image.placeholder ?? false }
      : {}),
  };

  uploadedImages.set(image.src, value);
  return options.arrayKey ? { ...value, _key: options.arrayKey } : value;
}

function serviceGroup(service: Service) {
  if (service.group) return service.group;
  if (service.slug === "spa-grooming") return "spa-grooming";
  if (service.slug === "pet-hotel") return "pet-hotel";
  if (service.slug === "ngoai-khoa") return "phau-thuat";
  return "kham-chua-benh";
}

async function migrateArticleBlock(
  block: ArticleContentBlock,
  index: number,
) {
  if (block._type === "imageWithCaption") {
    return {
      ...block,
      _key: key(`block-${index}-${block.caption ?? "image"}`),
      image: await uploadImage(block.image, { includePlaceholder: true }),
    };
  }

  return {
    ...block,
    _key: key(`block-${index}-${"id" in block ? block.id ?? block._type : block._type}`),
  };
}

async function buildHomePageDocument() {
  const fallback = fallbackHomePageSettings;

  return {
    _id: "homePageSettings",
    _type: "homePageSettings",
    hero: {
      ...fallback.hero,
      desktopImage: await uploadImage(fallback.hero.desktopImage),
      mobileImage: await uploadImage(fallback.hero.mobileImage),
    },
    why: {
      ...fallback.why,
      images: await Promise.all(
        fallback.why.images.map((image, index) =>
          uploadImage(image, { arrayKey: `why-${index + 1}` }),
        ),
      ),
    },
    servicesSection: fallback.servicesSection,
    equipmentSection: {
      ...fallback.equipmentSection,
      image: await uploadImage(fallback.equipmentSection.image),
    },
    reviewsSection: fallback.reviewsSection,
    articlesSection: fallback.articlesSection,
    bookingCta: {
      ...fallback.bookingCta,
      image: await uploadImage(fallback.bookingCta.image),
    },
    rating: fallback.rating,
    reviewCount: fallback.reviewCount,
    googleMapsUrl: fallback.googleMapsUrl,
    reasons: fallback.reasons.map((reason, index) => ({
      ...reason,
      _key: `reason-${index + 1}`,
    })),
    metrics: fallback.metrics.map((metric, index) => ({
      ...metric,
      _key: `metric-${index + 1}`,
      verificationStatus: metric.verified ? "verified" : "draft",
    })),
  };
}

async function buildDocuments(): Promise<MigrationDocument[]> {
  const featuredOrder = new Map<string, number>(
    featuredHomeServiceSlugs.map((slug, index) => [slug, index + 1]),
  );

  const serviceDocuments = await Promise.all(
    services.map(async (service, index) => ({
      _id: documentId("service", service.slug),
      _type: "service",
      slug: { _type: "slug", current: service.slug },
      title: service.title,
      shortTitle: service.shortTitle,
      summary: service.summary,
      description: service.description,
      points: service.points,
      accent: service.accent,
      group: serviceGroup(service),
      cardImage: await uploadImage(serviceImages[service.slug]),
      featuredOnHome: featuredOrder.has(service.slug),
      homeOrder: featuredOrder.get(service.slug) ?? index + 10,
      order: index + 1,
    })),
  );

  const articleDocuments = await Promise.all(
    articles.map(async (article) => ({
      _id: documentId("article", article.slug),
      _type: "article",
      slug: { _type: "slug", current: article.slug },
      title: article.title,
      excerpt: article.excerpt,
      lead: article.lead,
      category: article.category,
      journeyStage: article.journeyStage,
      readingTime: article.readingTime,
      publishedAt: article.publishedAt,
      coverImage: await uploadImage(article.coverImage, {
        includePlaceholder: true,
      }),
      thumbnailImage: await uploadImage(
        article.thumbnailImage ?? article.coverImage,
        { includePlaceholder: true },
      ),
      contentBlocks: await Promise.all(
        article.contentBlocks.map(migrateArticleBlock),
      ),
      disclaimer: article.disclaimer,
      relatedArticles: article.relatedArticleSlugs.map((slug) => ({
        _key: key(`related-${slug}`),
        _type: "reference",
        _ref: documentId("article", slug),
      })),
      featured: article.featured,
      tags: article.tags,
    })),
  );

  const reviewDocuments = await Promise.all(
    fallbackReviews.map(async (review) => ({
      _id: documentId("customerReview", review.id),
      _type: "customerReview",
      author: review.author,
      rating: review.rating,
      quote: review.quote,
      reviewedAt: review.reviewedAt,
      reviewedLabel: review.reviewedLabel,
      sourceUrl: review.sourceUrl,
      avatar: review.avatar ? await uploadImage(review.avatar) : undefined,
      image: review.image ? await uploadImage(review.image) : undefined,
      verificationStatus: review.verified ? "verified" : "draft",
      order: review.order,
    })),
  );

  const verifiedDoctors = doctors.filter(
    (doctor): doctor is VerifiedDoctor => doctor.status === "verified",
  );
  const doctorDocuments = await Promise.all(
    verifiedDoctors.map(async (doctor, index) => ({
      _id: documentId("doctor", doctor.slug),
      _type: "doctor",
      slug: { _type: "slug", current: doctor.slug },
      name: doctor.name,
      position: doctor.position,
      specialty: doctor.specialty,
      yearsOfExperience: doctor.yearsOfExperience,
      schedule: doctor.schedule,
      biography: doctor.biography,
      credentials: doctor.credentials,
      journey: doctor.journey?.map((item, journeyIndex) => ({
        ...item,
        _key: `journey-${journeyIndex + 1}`,
      })),
      image: doctor.image ? await uploadImage(doctor.image) : undefined,
      verificationStatus: "verified",
      order: index + 1,
    })),
  );

  const equipmentDocuments = await Promise.all(
    fallbackEquipment.map(async (equipment) => ({
      _id: documentId("equipment", equipment.id),
      _type: "equipment",
      name: equipment.name,
      summary: equipment.summary,
      supports: equipment.supports,
      image: equipment.image
        ? await uploadImage(equipment.image)
        : undefined,
      verificationStatus: equipment.verified ? "verified" : "draft",
      order: equipment.order,
    })),
  );

  const locationDocuments = fallbackLocations.map((location) => ({
    _id: documentId("clinicLocation", location.id),
    _type: "clinicLocation",
    name: location.name,
    address: location.address,
    phone: location.phone,
    email: location.email,
    openingHours: location.openingHours,
    mapUrl: location.mapUrl,
    mapEmbedUrl: location.mapEmbedUrl,
    verificationStatus: location.verified ? "verified" : "draft",
    order: location.order,
  }));

  const aboutPageDocument = {
    _id: "aboutPage",
    _type: "aboutPage",
    eyebrow: fallbackAboutPage.eyebrow,
    title: fallbackAboutPage.title,
    description: fallbackAboutPage.description,
    storyTitle: fallbackAboutPage.storyTitle,
    story: fallbackAboutPage.story,
    image: fallbackAboutPage.image
      ? await uploadImage(fallbackAboutPage.image)
      : undefined,
    principles: fallbackAboutPage.principles.map((principle, index) => ({
      ...principle,
      _key: `principle-${index + 1}`,
    })),
  };

  const siteSettingsDocument = {
    _id: "siteSettings",
    _type: "siteSettings",
    ...fallbackSiteSettings,
    logo: fallbackSiteSettings.logo
      ? await uploadImage(fallbackSiteSettings.logo)
      : undefined,
  };

  return [
    siteSettingsDocument,
    await buildHomePageDocument(),
    aboutPageDocument,
    ...serviceDocuments,
    ...articleDocuments,
    ...doctorDocuments,
    ...equipmentDocuments,
    ...reviewDocuments,
    ...locationDocuments,
  ];
}

async function main() {
  const documents = await buildDocuments();
  const legacyDocumentIds = [
    ...services.map((service) => `service.${service.slug}`),
    ...articles.map((article) => `article.${article.slug}`),
    ...fallbackReviews.map((review) => `customerReview.${review.id}`),
    ...fallbackLocations.map((location) => `clinicLocation.${location.id}`),
    ...doctors.flatMap((doctor) =>
      doctor.status === "verified" ? [`doctor.${doctor.slug}`] : [],
    ),
    ...fallbackEquipment.map((equipment) => `equipment.${equipment.id}`),
  ];
  let transaction = client.transaction();

  for (const document of documents) {
    transaction = transaction.createIfNotExists(document);
  }

  for (const legacyId of legacyDocumentIds) {
    transaction = transaction.delete(legacyId);
  }

  const result = await transaction.commit({ visibility: "sync" });
  const counts = documents.reduce<Record<string, number>>((summary, document) => {
    summary[document._type] = (summary[document._type] ?? 0) + 1;
    return summary;
  }, {});

  console.log("\nMigration complete.");
  console.log(`Transaction: ${result.transactionId}`);
  console.table(counts);
  console.log(`Uploaded/reused image paths: ${uploadedImages.size}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
