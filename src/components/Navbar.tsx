"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Navbar() {
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const st = ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: '80px top',
      onLeave: () => {
        logoRef.current?.classList.replace('sz-hero', 'sz-scroll');
      },
      onEnterBack: () => {
        logoRef.current?.classList.replace('sz-scroll', 'sz-hero');
      },
    });

    const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/\\|~';

    function scramble(el: HTMLElement, original: string, dur = 700) {
      if ((el as any)._scrambleTimer) clearInterval((el as any)._scrambleTimer);
      const totalFrames = Math.ceil(dur / 48);
      let it = 0;
      (el as any)._scrambleTimer = setInterval(() => {
        el.textContent = original
          .split('')
          .map((c, i) => {
            if (c === ' ') return ' ';
            if (i < Math.floor(it / (totalFrames / original.length))) return c;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('');
        if (++it >= totalFrames) {
          el.textContent = original;
          clearInterval((el as any)._scrambleTimer);
        }
      }, 48);
    }

    const scrambleEls = document.querySelectorAll<HTMLElement>('[data-scramble]');
    const scrambleHandlers: { el: HTMLElement; fn: () => void }[] = [];

    scrambleEls.forEach((el) => {
      const orig = el.getAttribute('data-scramble') || el.textContent || '';
      const fn = () => scramble(el, orig, 680);
      el.addEventListener('mouseenter', fn);
      scrambleHandlers.push({ el, fn });
    });

    const safinEl = document.querySelector<HTMLElement>('.nl-safin');
    let safinFn: () => void;
    if (safinEl) {
      safinFn = () => scramble(safinEl, "SHARIYER", 600);
      safinEl.addEventListener('mouseenter', safinFn);
    }

    return () => {
      st.kill();
      scrambleHandlers.forEach(({ el, fn }) => el.removeEventListener('mouseenter', fn));
      if (safinEl && safinFn) safinEl.removeEventListener('mouseenter', safinFn);
    };
  }, []);

  return (
    <nav
      id="nav"
      className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-[clamp(20px,4vw,64px)] h-[80px] bg-transparent"
    >
      <a
        href="#hero"
        id="nav-logo"
        ref={logoRef}
        className="sz-hero flex flex-col leading-none origin-top-left transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] no-underline decoration-transparent"
      >
        <span
          className="nl-safin font-display font-bold text-[26px] tracking-[0.08em] text-white"
          data-scramble="SHARIYER"
        >
          SHARIYER
        </span>
        <span className="nl-rahman font-mono text-[10px] tracking-[0.32em] text-white/[0.38] uppercase mt-[3px]">
          SHAZAN
        </span>
      </a>
      <div id="nav-right" className="flex items-center gap-8">
        <a
          href="#works"
          className="nav-btn font-mono text-[12px] tracking-[0.22em] uppercase text-white py-1.5 relative link-underline no-underline"
          data-scramble="Works"
        >
          Works
        </a>
        <a
          href="#about"
          className="nav-btn font-mono text-[12px] tracking-[0.22em] uppercase text-white py-1.5 relative link-underline no-underline"
          data-scramble="Know me"
        >
          Know me
        </a>
      </div>
    </nav>
  );
}
