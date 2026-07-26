import {
  ChatCircleDots,
  Phone,
} from "@phosphor-icons/react/dist/ssr";

import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { CareActionLink } from "@/components/ui/button";
import { getPhoneHref, siteConfig } from "@/lib/site-config";

export function ServicesCta() {
  return (
    <section className="bg-background pb-[clamp(4rem,8vw,7rem)] pt-8 sm:pt-12">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[18px_36px_36px_36px] border border-white/10 bg-text-primary px-6 py-10 text-surface shadow-[0_28px_70px_rgba(16,46,58,0.18)] sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-2/5 bg-[radial-gradient(circle_at_70%_30%,rgba(22,132,214,0.22),transparent_66%)]"
          />
          <MotionGroup className="relative max-w-3xl" amount={0.12}>
            <MotionItem>
              <h2 className="font-display text-[clamp(2.55rem,5vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-surface text-balance">
                Bạn chưa cần biết tên dịch vụ.
              </h2>
            </MotionItem>
            <MotionItem>
              <p className="mt-5 max-w-2xl text-base leading-7 text-surface/75 sm:text-lg sm:leading-8">
                Chỉ cần kể PetOne điều bạn đang quan sát. Chúng tôi sẽ hướng dẫn bước chuẩn bị phù hợp.
              </p>
            </MotionItem>
            <MotionItem>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <CareActionLink
                  href="/lien-he#dat-lich"
                  leadingIcon={<ChatCircleDots size={19} weight="duotone" />}
                  className="w-full sm:w-auto"
                >
                  Gửi yêu cầu tư vấn
                </CareActionLink>
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
              </div>
            </MotionItem>
          </MotionGroup>
        </div>
      </div>
    </section>
  );
}
