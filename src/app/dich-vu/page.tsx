import type { Metadata } from "next";

import { HomeMotionProvider } from "@/components/motion/home-motion-provider";
import { EditorialServicePanel } from "@/components/services/editorial-service-panel";
import { ServicesCta } from "@/components/services/services-cta";
import { ServicesHero } from "@/components/services/services-hero";
import { serviceDirectoryGroups } from "@/content/service-directory";
import { getServices } from "@/sanity/content";

export const metadata: Metadata = {
  title: "Dịch vụ thú y",
  description:
    "Tìm hiểu các dịch vụ khám chữa bệnh, chăm sóc, lưu trú Pet Hotel và phẫu thuật tại Pet One.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <HomeMotionProvider>
      <ServicesHero />
      {serviceDirectoryGroups.map((group) => (
        <EditorialServicePanel
          key={group.id}
          group={group}
          services={services}
        />
      ))}
      <ServicesCta />
    </HomeMotionProvider>
  );
}
