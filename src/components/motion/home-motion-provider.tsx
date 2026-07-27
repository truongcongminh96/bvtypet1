"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const HomeMotionContext = createContext({
  distance: 28,
  isMobile: false,
  supportsInView: true,
});

export function useHomeMotionPreferences() {
  return useContext(HomeMotionContext);
}

const mobileQuery = "(max-width: 767px)";

function subscribeToViewport(callback: () => void) {
  const mediaQuery = window.matchMedia(mobileQuery);
  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

function getMobileSnapshot() {
  return window.matchMedia(mobileQuery).matches;
}

function subscribeToBrowserCapability() {
  return () => {};
}

function getInViewSupportSnapshot() {
  return "IntersectionObserver" in window;
}

export function HomeMotionProvider({ children }: { children: ReactNode }) {
  const isMobile = useSyncExternalStore(
    subscribeToViewport,
    getMobileSnapshot,
    () => false,
  );
  const supportsInView = useSyncExternalStore(
    subscribeToBrowserCapability,
    getInViewSupportSnapshot,
    () => true,
  );
  const distance = isMobile ? 18 : 28;

  const preferences = useMemo(
    () => ({ distance, isMobile, supportsInView }),
    [distance, isMobile, supportsInView],
  );

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <HomeMotionContext.Provider value={preferences}>
          <style>{`
            @media (prefers-reduced-motion: reduce) {
              [data-motion-reveal],
              [data-motion-progress] {
                opacity: 1 !important;
                transform: none !important;
                clip-path: none !important;
                transition: none !important;
              }
            }
          `}</style>
          <noscript>
            <style>{`
              [data-motion-reveal],
              [data-motion-progress] {
                opacity: 1 !important;
                transform: none !important;
                clip-path: none !important;
              }
              [data-motion-progress-number] {
                color: #ffffff !important;
              }
            `}</style>
          </noscript>
          {children}
        </HomeMotionContext.Provider>
      </MotionConfig>
    </LazyMotion>
  );
}
