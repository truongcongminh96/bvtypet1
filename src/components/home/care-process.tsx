import { ScrollTimeline } from "@/components/motion/scroll-timeline";
import { careSteps } from "@/content/site";

export function CareProcess() {
  return <ScrollTimeline steps={careSteps} />;
}
