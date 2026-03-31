"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Project {
  index: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  even?: boolean;
}

const projects: Project[] = [
  {
    index: '01 / 04',
    category: 'SaaS',
    title: 'fls.tv<br/>Football Streaming Platform',
    description: 'A premium, modern web application designed to deliver an immersive and cinematic football tracking and streaming experience. Built with performance and aesthetics in mind, it provides real-time match data, chronological upcoming schedules, and a dedicated distraction-free viewing environment.',
    tags: ['Next.js 14', 'React 19', 'Framer Motion', 'Tailwind CSS v3', 'TypeScript', 'Vercel', 'Lucide React'],
    image: '/images/fls.tv.png',
    link: 'https://flstv.vercel.app/',
  },
  {
    index: '02 / 04',
    category: 'Frontend & UI Design',
    title: 'spylt<br/>Animated Milk Drink Brand Website',
    description: 'Spylt is a fully animated and visually engaging website built for a fictional milk drink brand, showcasing their unique flavors with motion-rich transitions and smooth UI.',
    tags: ['React', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
    image: '/images/spylt.png',
    link: 'https://spylt.netlify.app/',
    even: true,
  },
  {
    index: '03 / 04',
    category: 'Full Stack & SaaS',
    title: 'Escrims<br/>Esports Tournament Platform',
    description: 'A modern, full-featured esports tournament management platform built with React, TypeScript, and Firebase. Create tournaments, manage brackets, track standings, and share live streams — all in one place.',
    tags: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS','Cloud Firestore','React Router','Vercel'],
    image: '/images/escrims.png',
    link: 'https://escrims.vercel.app/',
  },
  {
    index: '04 / 04',
    category: 'MERN Stack',
    title: 'Prescripto<br/>A online doctor appointment platform',
    description: 'Prescripto is a modern online doctor appointment platform designed to connect patients with healthcare professionals seamlessly. The goal is to provide a smooth and responsive user experience for booking and managing appointments.',
    tags: ['React', 'TypeScript', 'MongoDB', 'Express', 'Node.js', 'Tailwind CSS','Vercel'],
    image: '/images/prescripto.png',
    link: 'https://prescripto-med.vercel.app/',
    even: true,
  },
];

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const stList: ScrollTrigger[] = [];
    
    if (sectionRef.current) {
      const items = sectionRef.current.querySelectorAll<HTMLElement>('.work-item.reveal');
      items.forEach((el) => {
        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            el.classList.add('in');

            el.querySelectorAll<HTMLElement>('[data-scramble]').forEach((child) => {
              const orig = child.getAttribute('data-scramble') || '';
              const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/\\|~';
              const totalFrames = Math.ceil(700 / 48);
              let it = 0;
              const timer = setInterval(() => {
                child.textContent = orig
                  .split('')
                  .map((c, i) => {
                    if (c === ' ') return ' ';
                    if (i < Math.floor(it / (totalFrames / orig.length))) return c;
                    return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                  })
                  .join('');
                if (++it >= totalFrames) {
                  child.textContent = orig;
                  clearInterval(timer);
                }
              }, 48);
            });
          },
        });
        stList.push(st);
      });

      const thumbs = sectionRef.current.querySelectorAll<HTMLElement>('.work-thumb');
      thumbs.forEach((thumb) => {
        const img = thumb.querySelector('.parallax-img') as HTMLElement | null;
        if (!img) return;

        const onMouseMove = (e: MouseEvent) => {
          const rect = thumb.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(img, {
            x: x * -15,   
            y: y * -15,
            duration: 0.8,
            ease: 'power2.out'
          });
        };

        const onMouseLeave = () => {
          gsap.to(img, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: 'power2.out'
          });
        };

        thumb.addEventListener('mousemove', onMouseMove);
        thumb.addEventListener('mouseleave', onMouseLeave);

        (thumb as any)._cleanup = () => {
          thumb.removeEventListener('mousemove', onMouseMove);
          thumb.removeEventListener('mouseleave', onMouseLeave);
        };
      });
    }

    return () => {
      stList.forEach((st) => st.kill());
      if (sectionRef.current) {
        sectionRef.current.querySelectorAll<HTMLElement>('.work-thumb').forEach((thumb) => {
          if ((thumb as any)._cleanup) (thumb as any)._cleanup();
        });
      }
    };
  }, []);

  return (
    <section id="works" ref={sectionRef} className="section px-[clamp(20px,4vw,64px)] py-[clamp(80px,12vh,140px)] border-t border-white/[0.07]">
      <p className="s-label font-mono text-[11px] tracking-[0.32em] text-white/[0.26] uppercase flex items-center gap-3 mb-14">
        <span className="block w-7 h-px bg-white/[0.18]"></span>
        <span className="text-white/[0.18] mr-1.5">01</span> Selected Works
      </p>

      <div className="work-grid">
        {projects.map((project, idx) => (
          <article
            key={idx}
            className={`work-item grid border-b border-white/[0.07] py-[clamp(32px,5vw,64px)] overflow-hidden relative cursor-none reveal ${project.even ? 'even' : ''} ${idx === 0 ? 'border-t border-white/[0.07]' : ''} ${idx > 0 ? `rd${idx}` : ''}`}
            data-delay={idx * 0.1}
          >
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="work-thumb aspect-[16/10] overflow-hidden relative block no-underline group/thumb">
              <div className="work-thumb-in w-full h-full flex items-center justify-center relative transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] bg-[#0d0d0d]">
                <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none transition-colors duration-500 group-hover/thumb:bg-black/30"></div>
                <div className="absolute inset-0 opacity-[0.25] pointer-events-none z-10 mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')" }}></div>
                
                <span className="w-idx absolute top-6 left-6 font-mono text-[10px] tracking-[0.2em] text-white/[0.4] z-20 transition-colors duration-500 group-hover/thumb:text-white/[0.8]">{project.index}</span>
                <div className="w-full h-full p-[clamp(30px,6vw,90px)] relative z-0 flex items-center justify-center">
                  <img src={project.image} alt="Project Preview" className="parallax-img w-full h-full object-contain scale-[1.05]" />
                </div>
                
                <span className="w-view absolute bottom-6 right-6 font-mono text-[10px] tracking-[0.18em] uppercase flex items-center gap-2 text-transparent transition-colors duration-[400ms] z-20 group-hover/thumb:text-white/[0.65]" data-scramble="Visit Website">Visit Website</span>
              </div>
            </a>
            <div className="work-info px-[clamp(24px,4vw,56px)] flex flex-col justify-center">
              <p className="w-cat font-mono text-[11px] tracking-[0.28em] text-white/[0.28] uppercase mb-3.5">{project.category}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="no-underline inline-block group/title">
                <h2 className="w-title font-display font-bold text-[clamp(32px,4.5vw,68px)] tracking-[-0.01em] leading-[0.9] text-white mb-[18px] transition-colors duration-300 group-hover/title:text-white/[0.75]" dangerouslySetInnerHTML={{ __html: project.title }}>
                </h2>
              </a>
              <p className="w-desc text-[13px] text-white/[0.36] leading-[1.85] max-w-[320px] mb-[26px]">{project.description}</p>
              <div className="w-tags flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="w-tag font-mono text-[10px] tracking-[0.15em] text-white/[0.38] uppercase border border-white/[0.1] px-2.5 py-[5px] rounded-[1px] transition-all duration-300">{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
