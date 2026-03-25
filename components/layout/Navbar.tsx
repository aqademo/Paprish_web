"use client";

import { RetailHeader } from "@/components/layout/RetailHeader";

export function Navbar() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] paprish-navbar-root"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <div className="pointer-events-auto paprish-navbar-inner">
        <RetailHeader />
      </div>
    </div>
  );
}
