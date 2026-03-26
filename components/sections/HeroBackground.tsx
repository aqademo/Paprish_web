import type { CSSProperties } from "react";

const HERO_VIDEO = "/imagesvideos/12351606_3840_2160_30fps.mp4";

const videoStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

/**
 * Server-rendered video so the first HTML response includes muted + playsinline.
 * Client-only trees hydrate late on mobile Safari, which often shows the play overlay
 * until the user taps — server HTML fixes that.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0" style={{ position: "absolute", inset: 0 }}>
      <video
        id="hero-bg-video"
        className="hero-bg-video pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={videoStyle}
        src={`${HERO_VIDEO}#t=0.001`}
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
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
    </div>
  );
}
