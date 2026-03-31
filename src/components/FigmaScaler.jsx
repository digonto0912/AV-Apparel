"use client";

import { useEffect } from "react";

export default function FigmaScaler({ baseWidth }) {
  useEffect(() => {
    const page = document.getElementById("figmaPage");
    if (!page) return;

    function applyScale() {
      return;
      // if (!page) return;
      // const vw = Math.max(
      //   document.documentElement.clientWidth,
      //   window.innerWidth || 0
      // );
      // const scale = Math.min(1, vw / baseWidth);
      // page.style.transform = "scale(" + scale + ")";
      // page.style.height = page.scrollHeight / scale + "px";
    }

    window.addEventListener("resize", applyScale);
    applyScale();

    return () => {
      window.removeEventListener("resize", applyScale);
    };
  }, [baseWidth]);

  return null;
}
