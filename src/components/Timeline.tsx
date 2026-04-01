"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TimelineItem {
  id: string;
  institution?: string;
  company?: string;
  degree?: string;
  role?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
}

export default function Timeline({ 
  experience, 
  education 
}: { 
  experience: TimelineItem[], 
  education: TimelineItem[] 
}) {
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
    }

    return () => {
      stList.forEach(st => st.kill());
    };
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="section px-[clamp(20px,4vw,64px)] py-[clamp(80px,12vh,140px)] border-t border-white/[0.07]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Experience Column */}
        <div className="space-y-12">
          <p className="s-label font-mono text-[11px] tracking-[0.32em] text-white/[0.26] uppercase flex items-center gap-3">
            <span className="block w-7 h-px bg-white/[0.18]"></span>
            Experience
          </p>
          
          <div className="space-y-10 relative before:absolute before:left-0 before:top-4 before:bottom-4 before:w-px before:bg-white/[0.05]">
            {experience.map((item, idx) => (
              <div key={item.id} className={`pl-8 relative reveal rd${idx}`}>
                <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-white/20" />
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/[0.25] uppercase mb-2">
                  {item.startDate} — {item.isCurrent ? "Present" : item.endDate}
                </p>
                <h3 className="font-display text-2xl font-bold text-white mb-1">{item.role}</h3>
                <p className="font-mono text-[11px] tracking-[0.1em] text-white/40 uppercase mb-4">{item.company}</p>
                <p className="text-[13px] leading-relaxed text-white/[0.35] max-w-md">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div className="space-y-12">
          <p className="s-label font-mono text-[11px] tracking-[0.32em] text-white/[0.26] uppercase flex items-center gap-3">
            <span className="block w-7 h-px bg-white/[0.18]"></span>
            Education
          </p>
          
          <div className="space-y-10 relative before:absolute before:left-0 before:top-4 before:bottom-4 before:w-px before:bg-white/[0.05]">
            {education.map((item, idx) => (
              <div key={item.id} className={`pl-8 relative reveal rd${idx}`}>
                <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-white/20" />
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/[0.25] uppercase mb-2">
                  {item.startDate} — {item.endDate || "Present"}
                </p>
                <h3 className="font-display text-2xl font-bold text-white mb-1">{item.degree}</h3>
                <p className="font-mono text-[11px] tracking-[0.1em] text-white/40 uppercase mb-4">{item.institution}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
