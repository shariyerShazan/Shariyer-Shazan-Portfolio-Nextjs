"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const nameSpansRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Only run once
    const STATS = ['Initialising', 'Loading assets', 'Compiling', 'Mounting', 'Ready'];
    const counter = { val: 0 };
    
    if (!loaderRef.current) return;

    gsap.to(counter, {
      val: 100,
      duration: 2.5,
      ease: 'power3.inOut',
      onUpdate: () => {
        const v = Math.floor(counter.val);
        if (numRef.current) numRef.current.textContent = String(v);
        if (progRef.current) progRef.current.style.width = v + '%';
        if (statRef.current) statRef.current.textContent = STATS[Math.floor((v / 100) * (STATS.length - 1))];

        nameSpansRef.current.forEach((s, i) => {
          if (!s) return;
          const threshold = (i / nameSpansRef.current.length) * 100;
          if (v >= threshold) {
            const lp = Math.min((v - threshold) / (100 / nameSpansRef.current.length), 1);
            s.style.color = `rgba(255,255,255,${(0.08 + lp * 0.92).toFixed(3)})`;
          }
        });
      },
      onComplete: () => {
        if (numRef.current) numRef.current.textContent = '100';
        if (statRef.current) statRef.current.textContent = 'Ready';
        nameSpansRef.current.forEach((s) => {
          if (s) s.style.color = 'rgba(255,255,255,1)';
        });
        if (progRef.current) progRef.current.style.width = '100%';

        gsap.to(loaderRef.current, {
          y: '-100%',
          duration: 0.9,
          ease: 'power4.inOut',
          delay: 0.38,
          onStart: () => {
            const site = document.getElementById('site');
            if (site) site.classList.add('in');
          },
          onComplete: () => {
            if (loaderRef.current) loaderRef.current.style.display = 'none';
          },
        });
      },
    });
  }, []);

  return (
    <div
      id="loader"
      ref={loaderRef}
      style={{ position: 'fixed', inset: 0, background: '#060606', zIndex: 9100, overflow: 'hidden', pointerEvents: 'all' }}
    >
      <div
        id="ld-ticks"
        aria-hidden="true"
        style={{ position: 'absolute', left: 'clamp(22px,5vw,80px)', top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2em 0', pointerEvents: 'none' }}
      >
        {[...Array(9)].map((_, i) => (
          <div key={i} className="ld-t"></div>
        ))}
      </div>
      <div
        id="ld-name"
        aria-hidden="true"
        style={{ position: 'absolute', top: 0, left: 0, fontFamily: "'MetrikTrial','Impact',sans-serif", fontSize: 'clamp(72px,16.67vw,260px)', lineHeight: 0.82, letterSpacing: '-.01em', padding: '.06em .07em', userSelect: 'none', whiteSpace: 'nowrap' }}
      >
        {['S', 'H', 'A', 'Z', 'A' , 'N'].map((char, i) => (
          <span
            key={i}
            ref={(el) => { nameSpansRef.current[i] = el; }}
            style={{ display: 'inline-block', color: 'rgba(255, 255, 255, 0.08)', willChange: 'color' }}
          >
            {char}
          </span>
        ))}
      </div>
      <div
        id="ld-status"
        ref={statRef}
        style={{ position: 'absolute', bottom: 'clamp(80px,12vw,160px)', left: 'clamp(22px,5vw,80px)', fontFamily: "'DM Mono',monospace", fontSize: '9px', letterSpacing: '.28em', color: 'rgba(255,255,255,.22)', textTransform: 'uppercase' }}
      >
        Initialising
      </div>
      <div
        id="ld-num"
        ref={numRef}
        style={{ position: 'absolute', bottom: 0, right: 0, fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(72px,16.67vw,260px)', lineHeight: 0.82, letterSpacing: '-.01em', color: 'rgba(255,255,255,.92)', padding: '.06em .07em', textAlign: 'right', userSelect: 'none' }}
      >
        0
      </div>
      <div
        id="ld-prog"
        ref={progRef}
        style={{ position: 'absolute', bottom: 0, left: 0, height: '1px', width: '0%', background: 'rgba(255,255,255,.2)', transition: 'width .08s linear' }}
      ></div>
    </div>
  );
}
