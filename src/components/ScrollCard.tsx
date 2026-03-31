"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollCard() {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const rawText = "Building digital systems with precision and purpose. A full-stack developer crafting **high-performance** web experiences and **scalable architectures** — obsessed with every detail, from **pixel-perfect interfaces** to clean, maintainable code that powers the future of the web.";

    if (!containerRef.current) return;
    
    let html = '';
    const parts = rawText.split(/(\*\*[^*]+\*\*)/);

    parts.forEach(part => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const words = part.slice(2, -2).split(' ');
        words.forEach(word => {
          html += `<span class="word accent">${word}</span> `;
        });
      } else {
        const words = part.split(' ').filter(w => w.length > 0);
        words.forEach(word => {
          html += `<span class="word">${word}</span> `;
        });
      }
    });

    containerRef.current.innerHTML = html.trim();
    const wordEls = containerRef.current.querySelectorAll<HTMLElement>('.word');

    const st = ScrollTrigger.create({
      trigger: '.sc-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress;
        const totalWords = wordEls.length;
        const litCount = Math.floor(progress * totalWords);

        wordEls.forEach((el, i) => {
          if (i <= litCount) {
            el.classList.add('lit');
          } else {
            el.classList.remove('lit');
          }
        });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section id="scroll-card" className="relative z-20 bg-black">
      <div className="sc-wrapper relative" style={{ height: '150vh' }}>
        <div className="sc-pinned sticky top-0 min-h-screen flex items-center">
          <div className="w-full px-[clamp(20px,4vw,64px)] py-[clamp(60px,10vh,120px)]">
            <p className="sc-label font-mono text-[10px] tracking-[0.3em] text-white/[0.25] uppercase mb-8 flex items-center gap-3">
              <span className="block w-5 h-px bg-white/[0.15]"></span>
              About
            </p>
            <p id="highlight-text" ref={containerRef} className="font-display text-[clamp(22px,3vw,38px)] leading-[1.45] tracking-[-0.005em] max-w-[720px]">
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
