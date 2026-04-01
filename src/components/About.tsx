"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Skill {
  name: string;
  category: string;
}

interface AboutData {
  content: string;
  image: string | null;
  role: string | null;
  email: string | null;
  phone: string | null;
}

export default function About({ aboutData, skills }: { aboutData: AboutData | null, skills: Skill[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  // Group skills by category
  const categories = ["Frontend", "Backend", "Infrastructure", "Tools"];
  const groupedSkills = categories.reduce((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat).map((s) => s.name);
    return acc;
  }, {} as Record<string, string[]>);

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
  }, [skills]);

  return (
    <section id="about" ref={sectionRef} className="section px-[clamp(20px,4vw,64px)] py-[clamp(80px,12vh,140px)] border-t border-white/[0.07]">
      <p className="s-label font-mono text-[11px] tracking-[0.32em] text-white/[0.26] uppercase flex items-center gap-3 mb-14">
        <span className="block w-7 h-px bg-white/[0.18]"></span>
        <span className="text-white/[0.18] mr-1.5">03</span> Know me
      </p>

      <div className="about-grid grid grid-cols-1 md:grid-cols-2 gap-[clamp(40px,6vw,100px)] items-start">
        <div className="about-sticky md:sticky md:top-[100px] reveal">
          <div className="about-photo aspect-[4/5] overflow-hidden bg-white/[0.04] border border-white/[0.07] relative flex items-center justify-center max-w-[360px] md:max-w-none group">
            <img src={aboutData?.image || "/images/shazan.jpg"} alt="Shariyer Shazan" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-0"></div>
            <div className="about-photo-lbl absolute bottom-[18px] left-[18px] font-mono text-[10px] tracking-[0.22em] text-white/[0.8] uppercase flex items-center gap-2 z-10">
              <span className="block w-px h-3.5 bg-white/[0.6]"></span>
              Shariyer Shazan — {aboutData?.role || "Developer"}
            </div>
          </div>
        </div>

        <div>
          <h2 className="about-h2 font-display font-bold text-[clamp(40px,5.5vw,88px)] leading-[1.1] tracking-[-0.01em] text-white mb-[30px] reveal">
            I Build<br/>
            <span className="text-white/[0.16]">Things</span><br/>
            That Work
          </h2>

          <div className="about-p text-[13.5px] leading-[1.9] text-white/[0.46] mb-[18px] max-w-[520px] reveal rd1 whitespace-pre-wrap">
            {aboutData?.content || "Based in Dhaka, Bangladesh, I'm a full-stack developer with a sharp focus on clean architecture and performant interfaces."}
          </div>

          <div className="skills-grid mt-11 grid grid-cols-2 max-sm:grid-cols-1 gap-px bg-white/[0.07] border border-white/[0.07] reveal rd4">
            {categories.map((cat) => (
              <div key={cat} className="sk-cell bg-black p-[18px_20px]">
                <p className="sk-cat font-mono text-[10px] tracking-[0.28em] text-white/[0.25] uppercase mb-2.5">{cat}</p>
                <p className="sk-list text-[12.5px] text-white/[0.5] leading-[2.1]">
                  {groupedSkills[cat]?.join(" / ") || "—"}
                </p>
              </div>
            ))}
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
