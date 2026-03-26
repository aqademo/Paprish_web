"use client";

import { useEffect, useRef } from "react";
import { HERO_BG_POSTER, HERO_BG_VIDEO } from "@/lib/site-media";

function drawCover(
  video: HTMLVideoElement,
  ctx: CanvasRenderingContext2D,
  cw: number,
  ch: number
) {
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (!vw || !vh || !cw || !ch) return;
  const scale = Math.max(cw / vw, ch / vh);
  const dw = vw * scale;
  const dh = vh * scale;
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;
  ctx.drawImage(video, 0, 0, vw, vh, dx, dy, dw, dh);
}

/**
 * Off-screen muted video → canvas (no iOS play overlay).
 * Uses requestVideoFrameCallback when available (synced to decode, less CPU than 60fps RAF).
 */
export function HeroCanvasBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = containerRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!box || !video || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let vfcId = 0;
    let playBurst: ReturnType<typeof setInterval> | undefined;
    let burstTimeout: ReturnType<typeof setTimeout> | undefined;
    let paintRaf = 0;
    let armCoalesce = 0;

    const resize = () => {
      const rect = box.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const paint = () => {
      const w = box.clientWidth;
      const h = box.clientHeight;
      if (!w || !h) return;
      if (video.readyState >= 2) {
        drawCover(video, ctx, w, h);
      }
    };

    const schedulePaint = () => {
      if (paintRaf) return;
      paintRaf = requestAnimationFrame(() => {
        paintRaf = 0;
        paint();
      });
    };

    const stopDrawLoop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      if (vfcId && "cancelVideoFrameCallback" in video) {
        video.cancelVideoFrameCallback(vfcId);
        vfcId = 0;
      }
    };

    const rafFallbackLoop = () => {
      if (video.paused || mq.matches) {
        raf = 0;
        return;
      }
      paint();
      raf = requestAnimationFrame(rafFallbackLoop);
    };

    const startDrawLoop = () => {
      stopDrawLoop();
      if (video.paused || mq.matches) return;

      if (typeof video.requestVideoFrameCallback === "function") {
        const onFrame = () => {
          if (video.paused || mq.matches) {
            vfcId = 0;
            return;
          }
          paint();
          vfcId = video.requestVideoFrameCallback(onFrame);
        };
        vfcId = video.requestVideoFrameCallback(onFrame);
      } else {
        raf = requestAnimationFrame(rafFallbackLoop);
      }
    };

    const armAndPlay = async () => {
      if (playBurst) {
        clearInterval(playBurst);
        playBurst = undefined;
      }
      if (burstTimeout) {
        clearTimeout(burstTimeout);
        burstTimeout = undefined;
      }

      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "true");
      video.playsInline = true;

      if (mq.matches) {
        video.pause();
        stopDrawLoop();
        paint();
        return;
      }

      try {
        await video.play();
      } catch {
        /* ignore */
      }

      playBurst = setInterval(() => {
        if (video.paused) void video.play().catch(() => {});
        else if (playBurst) {
          clearInterval(playBurst);
          playBurst = undefined;
        }
      }, 80);
      burstTimeout = setTimeout(() => {
        if (playBurst) {
          clearInterval(playBurst);
          playBurst = undefined;
        }
        burstTimeout = undefined;
      }, 12000);
    };

    /** Coalesce many media events into one armAndPlay per frame (less jank). */
    const scheduleArm = () => {
      if (armCoalesce) return;
      armCoalesce = requestAnimationFrame(() => {
        armCoalesce = 0;
        void armAndPlay();
      });
    };

    const onPlaying = () => startDrawLoop();
    const onPause = () => stopDrawLoop();

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      paint();
    });
    ro.observe(box);

    video.addEventListener("loadedmetadata", scheduleArm);
    video.addEventListener("canplay", scheduleArm);
    video.addEventListener("progress", schedulePaint);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);

    void video.play().catch(() => {});

    const onVis = () => {
      if (!document.hidden) void armAndPlay();
    };
    document.addEventListener("visibilitychange", onVis);

    const onMqChange = () => void armAndPlay();
    mq.addEventListener("change", onMqChange);

    void armAndPlay();

    return () => {
      if (paintRaf) cancelAnimationFrame(paintRaf);
      if (armCoalesce) cancelAnimationFrame(armCoalesce);
      if (playBurst) clearInterval(playBurst);
      if (burstTimeout) clearTimeout(burstTimeout);
      stopDrawLoop();
      ro.disconnect();
      video.removeEventListener("loadedmetadata", scheduleArm);
      video.removeEventListener("canplay", scheduleArm);
      video.removeEventListener("progress", schedulePaint);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener("change", onMqChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ position: "absolute", inset: 0 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG_POSTER})` }}
        aria-hidden
      />
      <video
        ref={videoRef}
        src={HERO_BG_VIDEO}
        className="pointer-events-none"
        style={{
          position: "absolute",
          width: 4,
          height: 4,
          opacity: 0,
          bottom: 0,
          right: 0,
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden
        tabIndex={-1}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] h-full w-full object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/55 via-black/35 to-black/15" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/45 via-transparent to-black/25" />
    </div>
  );
}
