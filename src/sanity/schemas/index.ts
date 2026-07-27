import { articleType } from "@/sanity/schemas/article";
import { doctorType } from "@/sanity/schemas/doctor";
import { serviceType } from "@/sanity/schemas/service";
import { aboutPageType } from "@/sanity/schemas/about-page";
import { clinicLocationType } from "@/sanity/schemas/clinic-location";
import { customerReviewType } from "@/sanity/schemas/customer-review";
import { equipmentType } from "@/sanity/schemas/equipment";
import { homePageSettingsType } from "@/sanity/schemas/home-page-settings";

export const schemaTypes = [
  serviceType,
  articleType,
  doctorType,
  clinicLocationType,
  equipmentType,
  customerReviewType,
  aboutPageType,
  homePageSettingsType,
];
