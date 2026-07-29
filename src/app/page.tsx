import { ArticleGrid } from "@/components/home/article-grid";
import { BookingCta } from "@/components/home/booking-cta";
import { ClinicEnvironment } from "@/components/home/clinic-environment";
import { CustomerReviews } from "@/components/home/customer-reviews";
import { HomeHero } from "@/components/home/home-hero";
import { ServiceGrid } from "@/components/home/service-grid";
import { WhyPetOne } from "@/components/home/why-pet-one";
import { HomeMotionProvider } from "@/components/motion/home-motion-provider";
import {
  getArticles,
  getCustomerReviews,
  getEquipment,
  getHomePageSettings,
  getHomeServices,
} from "@/sanity/content";

export default async function HomePage() {
  const [services, articles, equipment, reviews, settings] = await Promise.all([
    getHomeServices(),
    getArticles(),
    getEquipment(),
    getCustomerReviews(),
    getHomePageSettings(),
  ]);

  return (
    <HomeMotionProvider>
      <div className="overflow-x-clip">
        <HomeHero settings={settings} />
        <WhyPetOne settings={settings} />
        <ServiceGrid items={services} />
        <ClinicEnvironment items={equipment} />
        <CustomerReviews
          items={reviews}
          rating={settings.rating}
          reviewCount={settings.reviewCount}
        />
        <ArticleGrid items={articles} />
        <BookingCta />
      </div>
    </HomeMotionProvider>
  );
}
