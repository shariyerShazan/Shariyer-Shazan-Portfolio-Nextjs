"use client";

import { useEffect, useState } from 'react';

export default function BottomBar() {
  const [timeStr, setTimeStr] = useState('00:00:00');

  useEffect(() => {
    function tickClock() {
      const utc = Date.now() + new Date().getTimezoneOffset() * 60000;
      const bd = new Date(utc + 6 * 3600000);
      const p2 = (n: number) => String(n).padStart(2, '0');
      setTimeStr(p2(bd.getHours()) + ':' + p2(bd.getMinutes()) + ':' + p2(bd.getSeconds()));
    }
    
    tickClock();
    const interval = setInterval(tickClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    const orig = "Contact";
    const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/\\|~';
    
    if ((el as any)._scrambleTimer) clearInterval((el as any)._scrambleTimer);
    const totalFrames = Math.ceil(700 / 48);
    let it = 0;
    (el as any)._scrambleTimer = setInterval(() => {
      el.textContent = orig
        .split('')
        .map((c, i) => {
          if (c === ' ') return ' ';
          if (i < Math.floor(it / (totalFrames / orig.length))) return c;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');
      if (++it >= totalFrames) {
        el.textContent = orig;
        clearInterval((el as any)._scrambleTimer);
      }
    }, 48);
  };

  return (
    <div
      id="bbar"
      className="fixed bottom-0 left-0 right-0 z-[500] flex items-center justify-between px-[clamp(20px,4vw,64px)] h-[44px] bg-transparent"
    >
      <span className="bb bbc font-mono text-[10px] tracking-[0.18em] uppercase text-white whitespace-nowrap">Estd. 2026</span>
      <span className="bb font-mono text-[10px] tracking-[0.18em] uppercase text-white whitespace-nowrap">
        Bangladesh &nbsp;&mdash;&nbsp; <span>{timeStr}</span>
      </span>
      <span className="bb font-mono text-[10px] tracking-[0.18em] uppercase text-white whitespace-nowrap max-sm:hidden">EN</span>
      <span
        className="bb font-mono text-[10px] tracking-[0.18em] uppercase text-accent whitespace-nowrap transition-colors duration-200 hover:text-[#87c1ff]"
        id="bb-con"
        role="button"
        tabIndex={0}
        onClick={scrollToContact}
        onMouseEnter={handleMouseEnter}
      >
        Contact
      </span>
    </div>
  );
}
