"use client";

import { useEffect, useRef, useState, FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AboutData {
  email: string | null;
  phone: string | null;
}

export default function Contact({ aboutData }: { aboutData: AboutData | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const email = aboutData?.email || "safinr.gg@gmail.com";
  const phone = aboutData?.phone || "+8801782213173";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        const d = await res.json();
        setErrorMsg(d.error || "Failed to send. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

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

      const scrambleEls = sectionRef.current.querySelectorAll<HTMLElement>('[data-scramble]');
      const handlers: { el: HTMLElement, enter: () => void }[] = [];
      const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/\\|~';

      scrambleEls.forEach((el) => {
        const origText = el.getAttribute('data-scramble') || el.textContent || '';
        const textNodes = Array.from(el.childNodes).filter(n => n.nodeType === Node.TEXT_NODE && n.textContent?.trim());
        const targetNode = textNodes[0];

        const enter = () => {
          if ((el as any)._scrambleTimer) clearInterval((el as any)._scrambleTimer);
          const totalFrames = Math.ceil(700 / 48);
          let it = 0;
          (el as any)._scrambleTimer = setInterval(() => {
            const newText = origText.split('').map((c, i) => {
              if (c === ' ') return ' ';
              if (i < Math.floor(it / (totalFrames / origText.length))) return c;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }).join('');
            if (targetNode) targetNode.textContent = newText;
            else el.textContent = newText;
            if (++it >= totalFrames) {
              if (targetNode) targetNode.textContent = origText;
              else el.textContent = origText;
              clearInterval((el as any)._scrambleTimer);
            }
          }, 48);
        };
        el.addEventListener('mouseenter', enter);
        handlers.push({ el, enter });
      });

      (sectionRef.current as any)._cleanup = () => {
        handlers.forEach(h => h.el.removeEventListener('mouseenter', h.enter));
      };
    }

    return () => {
      stList.forEach(st => st.kill());
      if (sectionRef.current && (sectionRef.current as any)._cleanup) {
        (sectionRef.current as any)._cleanup();
      }
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="border-t border-white/[0.07] pt-[clamp(80px,12vh,160px)] pb-20 px-[clamp(20px,4vw,64px)]">
      <p className="s-label font-mono text-[11px] tracking-[0.32em] text-white/[0.26] uppercase flex items-center gap-3 mb-14">
        <span className="block w-7 h-px bg-white/[0.18]"></span>
        <span className="text-white/[0.18] mr-1.5">04</span> Get In Touch
      </p>

      <div className="contact-big font-display font-bold text-[clamp(52px,10.5vw,158px)] leading-[0.86] tracking-[-0.01em] text-white/[0.07] mb-[60px] transition-colors duration-[600ms] hover:text-white/[0.12] reveal">
        Let&apos;s Build<br/>
        <span className="text-white/[0.72]">Something</span><br/>
        Together
      </div>

      <div className="contact-row flex items-start justify-between flex-wrap gap-12">
        {/* Links */}
        <div className="c-links flex flex-col gap-3.5 reveal">
          <a href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="c-link font-mono text-[10.5px] tracking-[0.2em] text-white/[0.45] uppercase inline-flex items-center gap-3 transition-colors duration-300 relative pb-[2px] hover:text-white no-underline" data-scramble={phone}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            WhatsApp
          </a>
          <a href="https://github.com/SafinRweb" target="_blank" rel="noopener noreferrer" className="c-link font-mono text-[10.5px] tracking-[0.2em] text-white/[0.45] uppercase inline-flex items-center gap-3 transition-colors duration-300 relative pb-[2px] hover:text-white no-underline" data-scramble="github.com/SafinRweb">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M5.5 1a4.5 4.5 0 00-1.42 8.77c.22.04.3-.1.3-.21v-.76c-1.24.27-1.5-.6-1.5-.6a1.18 1.18 0 00-.5-.65c-.4-.28.03-.27.03-.27a.94.94 0 01.68.46.95.95 0 001.3.37.94.94 0 01.28-.59c-1-.11-2.04-.5-2.04-2.21a1.73 1.73 0 01.46-1.2 1.6 1.6 0 01.04-1.18s.37-.12 1.23.46a4.24 4.24 0 012.24 0c.86-.58 1.23-.46 1.23-.46a1.6 1.6 0 01.05 1.18 1.73 1.73 0 01.45 1.2c0 1.72-1.05 2.1-2.05 2.2a1.06 1.06 0 01.3.83v1.22c0 .12.08.26.3.22A4.5 4.5 0 005.5 1z" stroke="currentColor" strokeWidth=".6" fill="none" />
            </svg>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/shariyershazan/" target="_blank" rel="noopener noreferrer" className="c-link font-mono text-[10.5px] tracking-[0.2em] text-white/[0.45] uppercase inline-flex items-center gap-3 transition-colors duration-300 relative pb-[2px] hover:text-white no-underline" data-scramble="linkedin.com/in/shariyershazan/">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <rect x=".5" y=".5" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth=".8" />
              <path d="M2.5 4.5v4M2.5 2.5v.5M4.5 8.5V6a1.5 1.5 0 013 0v2.5M4.5 4.5v4" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" />
            </svg>
            LinkedIn
          </a>

          <a href={`mailto:${email}`} className="c-email font-display text-[clamp(18px,2.5vw,38px)] text-white/[0.6] transition-colors duration-300 hover:text-white reveal rd2 no-underline mt-4" data-scramble={email + " →"}>
            {email} &rarr;
          </a>
        </div>

        {/* Contact Form */}
        <div className="flex-1 min-w-[280px] max-w-[460px] reveal rd2">
          {status === "success" ? (
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-sm p-8 text-center">
              <p className="font-mono text-[11px] tracking-[0.28em] text-white/50 uppercase mb-2">Message Sent</p>
              <p className="text-white/70 text-[13px]">Thank you! I&apos;ll get back to you soon.</p>
              <button onClick={() => setStatus("idle")} className="mt-5 font-mono text-[10px] tracking-[0.24em] uppercase text-white/30 hover:text-white/60 transition-colors">
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.08] rounded-sm p-6">
              <p className="font-mono text-[10px] tracking-[0.28em] text-white/30 uppercase mb-5">Send a Message</p>

              {status === "error" && (
                <div className="mb-4 px-3 py-2.5 bg-red-500/10 border border-red-500/20 rounded-sm">
                  <p className="font-mono text-[11px] text-red-400">{errorMsg}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.24em] text-white/25 uppercase mb-1.5">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.07] rounded-sm px-3 py-2.5 text-[13px] text-white outline-none focus:border-white/20 transition-all placeholder-white/15"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.24em] text-white/25 uppercase mb-1.5">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.07] rounded-sm px-3 py-2.5 text-[13px] text-white outline-none focus:border-white/20 transition-all placeholder-white/15"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.24em] text-white/25 uppercase mb-1.5">Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.07] rounded-sm px-3 py-2.5 text-[13px] text-white outline-none focus:border-white/20 transition-all resize-none placeholder-white/15"
                    placeholder="Tell me about your project..."
                  />
                </div>
              </div>

              <button
                id="contact-submit"
                type="submit"
                disabled={status === "sending"}
                className="mt-5 w-full font-mono text-[11px] tracking-[0.24em] uppercase py-3 bg-white/[0.07] border border-white/[0.12] text-white/70 rounded-sm hover:bg-white/[0.1] hover:text-white hover:border-white/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send Message →"}
              </button>
            </form>
          )}
        </div>
      </div>

      <footer className="mt-20 pt-[22px] border-t border-white/[0.07] flex justify-between items-center flex-wrap gap-3.5 text-white/[0.18] font-mono text-[10px] tracking-[0.18em] uppercase">
        <span className="foot-t">&copy; {new Date().getFullYear()} Shariyer Shazan</span>
        <span className="foot-t">Designed &amp; Developed by Shazan</span>
        <span className="foot-t">Dhaka, Bangladesh</span>
      </footer>
    </section>
  );
}
