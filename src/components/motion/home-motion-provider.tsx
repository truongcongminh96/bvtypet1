"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const HomeMotionContext = createContext({ distance: 26 });

export function useHomeMotionPreferences() {
  return useContext(HomeMotionContext);
}

export function HomeMotionProvider({ children }: { children: ReactNode }) {
  const [distance, setDistance] = useState(26);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateDistance = () => setDistance(mediaQuery.matches ? 16 : 26);

    updateDistance();
    mediaQuery.addEventListener("change", updateDistance);

    return () => mediaQuery.removeEventListener("change", updateDistance);
  }, []);

  const preferences = useMemo(() => ({ distance }), [distance]);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <HomeMotionContext.Provider value={preferences}>
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
