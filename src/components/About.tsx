"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
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

      const counters = sectionRef.current.querySelectorAll<HTMLElement>('[data-count]');
      counters.forEach((el) => {
        const end = parseInt(el.dataset.count || '0');
        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const counterObj = { val: 0 };
            gsap.to(counterObj, {
              val: end,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = Math.floor(counterObj.val) + '+';
              },
              onComplete: () => {
                el.textContent = end + '+';
              },
            });
          },
        });
        stList.push(st);
      });
    }

    return () => {
      stList.forEach(st => st.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section px-[clamp(20px,4vw,64px)] py-[clamp(80px,12vh,140px)] border-t border-white/[0.07]">
      <p className="s-label font-mono text-[11px] tracking-[0.32em] text-white/[0.26] uppercase flex items-center gap-3 mb-14">
        <span className="block w-7 h-px bg-white/[0.18]"></span>
        <span className="text-white/[0.18] mr-1.5">03</span> Know me
      </p>

      <div className="about-grid grid grid-cols-1 md:grid-cols-2 gap-[clamp(40px,6vw,100px)] items-start">
        <div className="about-sticky md:sticky md:top-[100px] reveal">
          <div className="about-photo aspect-[4/5] overflow-hidden bg-white/[0.04] border border-white/[0.07] relative flex items-center justify-center max-w-[360px] md:max-w-none group">
            <img src="/images/shazan.jpg" alt="Safin Rahman" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-0"></div>
            <div className="about-photo-lbl absolute bottom-[18px] left-[18px] font-mono text-[10px] tracking-[0.22em] text-white/[0.8] uppercase flex items-center gap-2 z-10">
              <span className="block w-px h-3.5 bg-white/[0.6]"></span>
              Safin Rahman — Developer
            </div>
          </div>
        </div>

        <div>
          <h2 className="about-h2 font-display font-bold text-[clamp(40px,5.5vw,88px)] leading-[1.1] tracking-[-0.01em] text-white mb-[30px] reveal">
            I Build<br/>
            <span className="text-white/[0.16]">Things</span><br/>
            That Work
          </h2>

          <p className="about-p text-[13.5px] leading-[1.9] text-white/[0.46] mb-[18px] max-w-[520px] reveal rd1">
            Based in <strong className="text-white/[0.78] font-medium">Dhaka, Bangladesh</strong>, I'm a full-stack developer
            with a sharp focus on clean architecture and performant interfaces. I treat code the way a craftsman treats
            their tools — with care, intentionality and constant refinement.
          </p>

          <p className="about-p text-[13.5px] leading-[1.9] text-white/[0.46] mb-[18px] max-w-[520px] reveal rd2">
            I work across the full stack: from <strong className="text-white/[0.78] font-medium">Frontend
            design</strong> to local or cloud based backend. I care equally about the code nobody sees and the user
            experience.
          </p>

          <p className="about-p text-[13.5px] leading-[1.9] text-white/[0.46] mb-[18px] max-w-[520px] reveal rd3">
            Currently open to <strong className="text-white/[0.78] font-medium">freelance projects</strong> and select full-time
            opportunities.
          </p>

          <div className="skills-grid mt-11 grid grid-cols-2 max-sm:grid-cols-1 gap-px bg-white/[0.07] border border-white/[0.07] reveal rd4">
            <div className="sk-cell bg-black p-[18px_20px]">
              <p className="sk-cat font-mono text-[10px] tracking-[0.28em] text-white/[0.25] uppercase mb-2.5">Frontend</p>
              <p className="sk-list text-[12.5px] text-white/[0.5] leading-[2.1]">React / Next.js<br/>TypeScript<br/>CSS / Tailwind<br/>Framer Motion</p>
            </div>
            <div className="sk-cell bg-black p-[18px_20px]">
              <p className="sk-cat font-mono text-[10px] tracking-[0.28em] text-white/[0.25] uppercase mb-2.5">Backend</p>
              <p className="sk-list text-[12.5px] text-white/[0.5] leading-[2.1]">Node.js / Express<br/>Python<br/>SQL<br/>MongoDB</p>
            </div>
            <div className="sk-cell bg-black p-[18px_20px]">
              <p className="sk-cat font-mono text-[10px] tracking-[0.28em] text-white/[0.25] uppercase mb-2.5">Infrastructure</p>
              <p className="sk-list text-[12.5px] text-white/[0.5] leading-[2.1]">GitHub<br/>Netlify<br/>Vercel<br/>Firebase</p>
            </div>
            <div className="sk-cell bg-black p-[18px_20px]">
              <p className="sk-cat font-mono text-[10px] tracking-[0.28em] text-white/[0.25] uppercase mb-2.5">Tools</p>
              <p className="sk-list text-[12.5px] text-white/[0.5] leading-[2.1]">Figma<br/>VS Code<br/>Antigravity<br/>Codex</p>
            </div>
          </div>

          <div className="stats-row mt-11 flex gap-[clamp(24px,4vw,56px)] flex-wrap reveal">
            <div className="stat flex flex-col gap-1">
              <span className="stat-n font-display text-[clamp(36px,4vw,60px)] tracking-[-0.01em] text-white leading-none" data-count="12">0</span>
              <span className="stat-l font-mono text-[10px] tracking-[0.22em] text-white/[0.28] uppercase">Projects Shipped</span>
            </div>
            <div className="stat flex flex-col gap-1">
              <span className="stat-n font-display text-[clamp(36px,4vw,60px)] tracking-[-0.01em] text-white leading-none" data-count="3">0</span>
              <span className="stat-l font-mono text-[10px] tracking-[0.22em] text-white/[0.28] uppercase">Years Building</span>
            </div>
            <div className="stat flex flex-col gap-1">
              <span className="stat-n font-display text-[clamp(36px,4vw,60px)] tracking-[-0.01em] text-white leading-none">&infin;</span>
              <span className="stat-l font-mono text-[10px] tracking-[0.22em] text-white/[0.28] uppercase">Coffee Consumed</span>
            </div>
            <div className="stat flex items-center mt-4 md:mt-0 md:ml-6">
              <a href="https://drive.google.com/file/d/1s9oqiYls6k0kfy2h9a8nPwgoskraql8J/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="mag-btn relative overflow-hidden group no-underline !text-white !border-[#2952A3] hover:!border-[#3a70db] !px-6 !py-3 rounded-[3px] bg-[#2952A3]/10" data-scramble="Resume">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Resume
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
