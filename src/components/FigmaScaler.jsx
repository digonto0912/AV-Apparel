"use client";

import { useEffect } from "react";

const MOBILE_BREAKPOINT = 991;

export default function FigmaScaler({ baseWidth }) {
  useEffect(() => {
    const page = document.getElementById("figmaPage");
    if (!page) return;

    function applyScale() {
      const vw = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );

      if (vw <= MOBILE_BREAKPOINT) {
        // Disable JS scaling on mobile — CSS handles the layout natively
        page.style.transform = "";
        page.style.transformOrigin = "";
        document.body.style.height = "";
      } else {
        // Scale proportionally at every viewport width —
        // exactly like browser zoom: 1920px design fills 100% of the screen.
        const scale = vw / baseWidth;
        page.style.transform = `scale(${scale})`;
        page.style.transformOrigin = "top left";
        // Correct body height so the page scrolls at the scaled size
        document.body.style.height = page.scrollHeight * scale + "px";
      }
    }

    window.addEventListener("resize", applyScale);
    applyScale();

    return () => {
      window.removeEventListener("resize", applyScale);
    };
  }, [baseWidth]);

  return null;
}
