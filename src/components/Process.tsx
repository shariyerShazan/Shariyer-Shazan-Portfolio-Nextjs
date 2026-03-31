"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
  { num: '01', title: 'Discover & Define', tag: 'Research • Planning' },
  { num: '02', title: 'Architect & Design', tag: 'Systems • Structure' },
  { num: '03', title: 'Build & Engineer', tag: 'Code • Craft' },
  { num: '04', title: 'Ship & Iterate', tag: 'Deploy • Refine' },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const stList: ScrollTrigger[] = [];

    if (sectionRef.current) {
      const reveals = sectionRef.current.querySelectorAll<HTMLElement>('.reveal');
      reveals.forEach((el) => {
        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => el.classList.add('in'),
        });
        stList.push(st);
      });

      const items = sectionRef.current.querySelectorAll<HTMLElement>('.proc-item');
      items.forEach((item) => {
        const xTo = gsap.quickTo(item, 'x', { duration: 0.15, ease: 'power2.out' });
        const yTo = gsap.quickTo(item, 'y', { duration: 0.15, ease: 'power2.out' });

        const onMouseMove = (e: MouseEvent) => {
          const r = item.getBoundingClientRect();
          const dx = (e.clientX - r.left - r.width / 2) * 0.04;
          const dy = (e.clientY - r.top - r.height / 2) * 0.08;
          xTo(dx);
          yTo(dy);
        };

        const onMouseLeave = () => {
          gsap.to(item, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        };

        const onMouseEnter = () => {
          const titleEl = item.querySelector<HTMLElement>('.proc-title');
          if (!titleEl) return;
          const orig = titleEl.getAttribute('data-scramble') || titleEl.textContent || '';
          const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/\\|~';
          if ((titleEl as any)._scrambleTimer) clearInterval((titleEl as any)._scrambleTimer);
          const totalFrames = Math.ceil(600 / 48);
          let it = 0;
          (titleEl as any)._scrambleTimer = setInterval(() => {
            titleEl.textContent = orig
              .split('')
              .map((c, i) => {
                if (c === ' ') return ' ';
                if (i < Math.floor(it / (totalFrames / orig.length))) return c;
                return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              })
              .join('');
            if (++it >= totalFrames) {
              titleEl.textContent = orig;
              clearInterval((titleEl as any)._scrambleTimer);
            }
          }, 48);
        };

        item.addEventListener('mousemove', onMouseMove);
        item.addEventListener('mouseleave', onMouseLeave);
        item.addEventListener('mouseenter', onMouseEnter);

        (item as any)._cleanup = () => {
          item.removeEventListener('mousemove', onMouseMove);
          item.removeEventListener('mouseleave', onMouseLeave);
          item.removeEventListener('mouseenter', onMouseEnter);
        };
      });
    }

    return () => {
      stList.forEach((st) => st.kill());
      if (sectionRef.current) {
        sectionRef.current.querySelectorAll<HTMLElement>('.proc-item').forEach((item) => {
          if ((item as any)._cleanup) (item as any)._cleanup();
        });
      }
    };
  }, []);

  return (
    <section id="process" ref={sectionRef} className="section px-[clamp(20px,4vw,64px)] py-[clamp(80px,12vh,140px)] border-t border-white/[0.07]">
      <p className="s-label font-mono text-[11px] tracking-[0.32em] text-white/[0.26] uppercase flex items-center gap-3 mb-14">
        <span className="block w-7 h-px bg-white/[0.18]"></span>
        <span className="text-white/[0.18] mr-1.5">02</span> How I Work
      </p>

      <div className="process-list flex flex-col">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`proc-item grid items-center py-[clamp(24px,4vw,44px)] border-b border-white/[0.06] overflow-hidden relative reveal ${idx === 0 ? 'border-t border-white/[0.06]' : ''} ${idx > 0 ? `rd${idx}` : ''}`}
            style={{ transition: 'padding-left 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            <span className="proc-n font-display text-[clamp(28px,3vw,48px)] text-white/[0.12] tracking-[-0.01em]">{step.num}</span>
            <span className="proc-title font-display text-[clamp(24px,3vw,46px)] tracking-[-0.01em] text-white/[0.8] transition-colors duration-300" data-scramble={step.title}>{step.title}</span>
            <span className="proc-tag font-mono text-[10px] tracking-[0.2em] text-white/[0.22] uppercase text-right">{step.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
