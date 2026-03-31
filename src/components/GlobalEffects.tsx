"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GlobalEffects() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = -200, my = -200;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + "px";
        cursorRef.current.style.top = my + "px";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    // GSAP ring follow with lerp
    const tick = () => {
      if (ringRef.current) {
        const rx = parseFloat(ringRef.current.style.left || "-200") || -200;
        const ry = parseFloat(ringRef.current.style.top || "-200") || -200;
        ringRef.current.style.left = rx + (mx - rx) * 0.11 + "px";
        ringRef.current.style.top = ry + (my - ry) * 0.11 + "px";
      }
    };
    gsap.ticker.add(tick);

    // Set up hover effects for interactive elements using event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const expandable = target.closest("a, button, [role=button], .work-item, .proc-item");
      if (expandable) {
        ringRef.current?.classList.add("cur-expand");
        cursorRef.current?.classList.add("cur-dot-expand");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const expandable = target.closest("a, button, [role=button], .work-item, .proc-item");
      if (expandable) {
        ringRef.current?.classList.remove("cur-expand");
        cursorRef.current?.classList.remove("cur-dot-expand");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div id="cur" ref={cursorRef}></div>
      <div id="cur-r" ref={ringRef}></div>

      {/* Noise Overlay */}
      <div id="noise"></div>
      <div id="scanline" aria-hidden="true"></div>
    </>
  );
}
