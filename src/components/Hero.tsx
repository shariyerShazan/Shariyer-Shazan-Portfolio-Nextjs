"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Hero() {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.4 });

    tl.to(".hero-tag", {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
    }).to(
      ".scroll-hint",
      {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      },
      "-=0.3",
    );

    gsap.to(".sc-line", {
      opacity: 0.25,
      duration: 1.2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 2.6,
    });
  }, []);

  return (
    <section
      id="hero"
      className="flex flex-col justify-end px-[clamp(20px,4vw,64px)] relative overflow-hidden"
      style={{
        height: "calc(100vh - 44px)",
        minHeight: "560px",
        paddingBottom: "40px",
      }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="w-full h-full object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40"></div>
      </div>

      <div
        className="hero-code absolute top-[clamp(100px,18vh,180px)] right-[clamp(20px,5vw,80px)] font-mono text-[11px] text-white/[0.1] leading-8 text-right pointer-events-none select-none z-10 max-sm:hidden"
        aria-hidden="true"
      >
        const Shazan = {"{"}
        <br />
        &nbsp;&nbsp;role: &quot;Software Engineer&quot;,
        <br />
        &nbsp;&nbsp;location: &quot;BD&quot;,
        <br />
        &nbsp;&nbsp;status: &quot;available&quot;
        <br />
        {"}"}
      </div>

      <p className="hero-tag absolute top-[clamp(100px,18vh,160px)] left-[clamp(20px,4vw,64px)] font-mono text-[11px] max-sm:text-[9px] tracking-[0.3em] max-sm:tracking-[0.2em] text-white/[0.28] uppercase opacity-0 translate-y-3 flex items-center gap-3.5 z-10">
        <span className="block w-7 max-sm:w-4 h-px bg-white/[0.2]"></span>
        <span className="max-sm:hidden">
          Software Engineer &mdash; Dhaka, Bangladesh
        </span>
        <span className="sm:hidden">
          Software Engineer &amp; Eng &mdash; Dhaka
        </span>
      </p>

      <div className="scroll-hint absolute right-[clamp(20px,4vw,64px)] bottom-[60px] flex flex-col items-center gap-2.5 opacity-0 z-10 max-sm:hidden">
        <div className="sc-line w-px h-[60px] bg-gradient-to-b from-white/[0.6] to-transparent"></div>
        <span
          className="sc-lbl font-mono text-[10px] tracking-[0.3em] text-white/[0.45] uppercase font-medium"
          style={{ writingMode: "vertical-lr" }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
