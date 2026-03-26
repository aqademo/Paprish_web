import type { Metadata } from "next";
import { Dancing_Script, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { CRITICAL_SHELL_CSS } from "@/lib/critical-shell-css";
import { HERO_BG_POSTER, HERO_BG_VIDEO } from "@/lib/site-media";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const script = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paprish | Pure, Authentic Spices",
  description:
    "From farm to table — 100% natural spices from Tamil Nadu. Premium quality for homes and export.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, poppins.variable, script.variable, "font-sans")}
      style={{ backgroundColor: "#000000" }}
    >
      <head>
        <link rel="preload" href={HERO_BG_VIDEO} as="video" type="video/mp4" />
        <link rel="preload" href={HERO_BG_POSTER} as="image" />
      </head>
      {/* Inline shell: runs even if the main webpack CSS chunk fails (stale .next / dev HMR). */}
      <body
        className="font-sans antialiased"
        style={{
          backgroundColor: "#000000",
          color: "#f5f5f5",
          margin: 0,
          minHeight: "100vh",
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: CRITICAL_SHELL_CSS,
          }}
        />
        {children}
      </body>
    </html>
  );
}
