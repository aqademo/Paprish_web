"use client";

import { useEffect } from "react";

/**
 * Reinforces muted inline autoplay after mount so the native play overlay never wins.
 * Video markup is server-rendered in HeroBackground.
 */
export function HeroVideoClient() {
  useEffect(() => {
    const v = document.getElementById("hero-bg-video") as HTMLVideoElement | null;
    if (!v) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const arm = () => {
      v.muted = true;
      v.defaultMuted = true;
      v.volume = 0;
      v.setAttribute("muted", "");
      v.setAttribute("playsinline", "");
      v.setAttribute("webkit-playsinline", "true");
      v.playsInline = true;
    };

    const tryPlay = () => {
      if (mq.matches) {
        v.pause();
        return;
      }
      arm();
      void v.play().catch(() => {});
    };

    arm();
    tryPlay();

    const onReady = () => tryPlay();
    v.addEventListener("canplay", onReady);
    v.addEventListener("loadeddata", onReady);
    v.addEventListener("loadedmetadata", onReady);

    /** Until `playing` fires, iOS may show the overlay — retry play briefly. */
    let burst: ReturnType<typeof setInterval> | undefined;
    const clearBurst = () => {
      if (burst !== undefined) {
        clearInterval(burst);
        burst = undefined;
      }
    };

    const onPlaying = () => clearBurst();
    v.addEventListener("playing", onPlaying);

    if (!mq.matches) {
      burst = setInterval(() => {
        if (v.paused) tryPlay();
        else clearBurst();
      }, 80);
      setTimeout(clearBurst, 5000);
    }

    const onVis = () => {
      if (!document.hidden) tryPlay();
    };
    document.addEventListener("visibilitychange", onVis);

    mq.addEventListener("change", tryPlay);

    return () => {
      clearBurst();
      v.removeEventListener("canplay", onReady);
      v.removeEventListener("loadeddata", onReady);
      v.removeEventListener("loadedmetadata", onReady);
      v.removeEventListener("playing", onPlaying);
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener("change", tryPlay);
    };
  }, []);

  return null;
}
