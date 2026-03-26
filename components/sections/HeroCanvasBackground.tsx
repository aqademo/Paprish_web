"use client";

import { useEffect, useRef } from "react";

const HERO_VIDEO = "/imagesvideos/12351606_3840_2160_30fps.mp4";
const HERO_POSTER = "/imagesvideos/vibrant-colors-spices-row-generated-by-ai.jpg";

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
 * iOS draws the native play overlay on visible <video>. Decode in a 1×1 off-screen
 * muted video and mirror frames to <canvas> — users see motion without the play button.
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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let playBurst: ReturnType<typeof setInterval> | undefined;
    let burstTimeout: ReturnType<typeof setTimeout> | undefined;

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
      if (w && h && video.readyState >= 2) {
        drawCover(video, ctx, w, h);
      }
    };

    const loop = () => {
      if (video.paused || mq.matches) {
        raf = 0;
        return;
      }
      paint();
      raf = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (raf) return;
      raf = requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
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
        stopLoop();
        paint();
        return;
      }

      try {
        await video.play();
      } catch {
        /* iOS may defer; burst retry */
      }

      playBurst = setInterval(() => {
        if (video.paused) void video.play().catch(() => {});
        else if (playBurst) {
          clearInterval(playBurst);
          playBurst = undefined;
        }
      }, 200);
      burstTimeout = setTimeout(() => {
        if (playBurst) {
          clearInterval(playBurst);
          playBurst = undefined;
        }
        burstTimeout = undefined;
      }, 8000);
    };

    const onPlaying = () => startLoop();
    const onPause = () => stopLoop();

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      paint();
    });
    ro.observe(box);

    const onLoaded = () => void armAndPlay();
    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("canplay", onLoaded);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);

    const onVis = () => {
      if (!document.hidden) void armAndPlay();
    };
    document.addEventListener("visibilitychange", onVis);

    const onMqChange = () => void armAndPlay();
    mq.addEventListener("change", onMqChange);

    void armAndPlay();

    return () => {
      if (playBurst) clearInterval(playBurst);
      if (burstTimeout) clearTimeout(burstTimeout);
      stopLoop();
      ro.disconnect();
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("canplay", onLoaded);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener("change", onMqChange);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0" style={{ position: "absolute", inset: 0 }}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_POSTER})` }}
        aria-hidden
      />
      <video
        ref={videoRef}
        src={`${HERO_VIDEO}#t=0.001`}
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
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/70 via-transparent to-black/40" />
    </div>
  );
}
