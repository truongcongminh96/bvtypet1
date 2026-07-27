import {
  ChatCircleDots,
  Phone,
} from "@phosphor-icons/react/dist/ssr";

import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import { getPhoneHref, siteConfig } from "@/lib/site-config";

export function ServicesCta() {
  return (
    <section className="bg-background py-8 sm:py-10">
      <div className="shell">
        <div className="rounded-[16px_28px_28px_28px] border border-brand-blue/15 bg-brand-blue-soft/65 px-6 py-5 sm:px-8 sm:py-6 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-10">
          <MotionGroup className="max-w-2xl" amount={0.1} stagger={0.07}>
            <MotionItem>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue-dark">
                PetOne hỗ trợ bạn
              </p>
            </MotionItem>
            <MotionItem>
              <h2 className="mt-2 font-display text-[clamp(2.05rem,3.2vw,2.7rem)] font-semibold leading-[1.02] tracking-[-0.015em] text-text-primary">
                Không chắc nên chọn dịch vụ nào?
              </h2>
            </MotionItem>
            <MotionItem>
              <p className="mt-3 max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
                Chỉ cần kể PetOne điều bạn đang quan sát. Chúng tôi sẽ hướng dẫn bước phù hợp.
              </p>
            </MotionItem>
          </MotionGroup>
          <MotionGroup
            className="mt-6 flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-0"
            amount={0.1}
            stagger={0.07}
          >
            <MotionItem>
                <CareActionLink
                  href="/lien-he#dat-lich"
                  leadingIcon={<ChatCircleDots size={19} weight="duotone" />}
                  className="w-full sm:w-auto"
                >
                  Đặt lịch khám
                </CareActionLink>
            </MotionItem>
            <MotionItem>
                {siteConfig.phone ? (
                  <CareActionLink
                    href={getPhoneHref()}
                    variant="secondary"
                    leadingIcon={<Phone size={18} weight="fill" />}
                    className="w-full sm:w-auto"
                  >
                    Gọi phòng khám
                  </CareActionLink>
                ) : null}
            </MotionItem>
          </MotionGroup>
        </div>
      </div>
    </section>
  );
}
