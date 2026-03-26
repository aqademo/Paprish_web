"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef } from "react";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const HERO_VIDEO = "/imagesvideos/12351606_3840_2160_30fps.mp4";

/** iOS / mobile Safari only allows muted + inline autoplay; must be set before play(). */
function prepareVideoForMobileAutoplay(v: HTMLVideoElement) {
  v.muted = true;
  v.defaultMuted = true;
  v.setAttribute("muted", "");
  v.setAttribute("playsinline", "");
  v.setAttribute("webkit-playsinline", "");
  v.playsInline = true;
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    prepareVideoForMobileAutoplay(v);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const tryPlay = () => {
      if (mq.matches) return;
      prepareVideoForMobileAutoplay(v);
      void v.play().catch(() => {});
    };

    const sync = () => {
      if (mq.matches) {
        v.pause();
      } else {
        tryPlay();
      }
    };

    const onCanPlay = () => tryPlay();
    const onVisibility = () => {
      if (!document.hidden && !mq.matches) tryPlay();
    };

    /** Some mobile browsers defer autoplay until first user gesture; muted play usually works without this. */
    const onFirstTouch = () => {
      tryPlay();
      document.removeEventListener("touchstart", onFirstTouch);
    };

    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("loadeddata", onCanPlay);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("touchstart", onFirstTouch, { passive: true, capture: true });

    sync();
    mq.addEventListener("change", sync);

    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("loadeddata", onCanPlay);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("touchstart", onFirstTouch, { capture: true });
      mq.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden"
      style={{
        position: "relative",
        minHeight: "100svh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ position: "absolute", inset: 0 }}
      >
        <video
          ref={videoRef}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          aria-hidden
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-5 pb-20 pt-36 sm:px-8 sm:pt-40 lg:justify-center lg:px-12 lg:pb-0">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.p
            variants={fadeInUp}
            className="font-display text-xs font-semibold uppercase tracking-[0.4em] text-red-400/90"
          >
            Paprish · Farm to table
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="mt-6 font-display text-[clamp(2.25rem,6vw,4.25rem)] font-bold uppercase leading-[1.02] tracking-tight text-white"
          >
            From Farm to Table
            <br />
            <span className="text-white/90">Pure, Authentic Spices</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg"
          >
            100% natural, no compromise on quality or taste
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/shop"
              className="inline-flex rounded-full border border-white/50 bg-white/10 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-black"
            >
              Shop Now
            </Link>
            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-white/25 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/60"
            >
              WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
