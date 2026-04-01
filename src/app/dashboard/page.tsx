"use client";

import {
  Briefcase,
  Code2,
  GraduationCap,
  ChevronRight,
  Plus,
  ArrowUpRight,
  LayoutGrid,
  Zap,
  Settings,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  UserCircle,
  ImageIcon,
  Globe,
  PlusCircle,
  Activity,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardPage({ stats }: { stats: any }) {
  const cards = [
    {
      name: "Projects",
      count: stats?.projectsCount || 0,
      href: "/dashboard/projects",
      icon: LayoutGrid,
    },
    {
      name: "Skills",
      count: stats?.skillsCount || 0,
      href: "/dashboard/skills",
      icon: Code2,
    },
    {
      name: "Experience",
      count: stats?.experienceCount || 0,
      href: "/dashboard/experience",
      icon: Briefcase,
    },
    {
      name: "Education",
      count: stats?.educationCount || 0,
      href: "/dashboard/education",
      icon: GraduationCap,
    },
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      {/* --- PREMIUM HEADER --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-white tracking-tighter leading-none">
            System <span className="text-zinc-600">Overview</span>
          </h1>
          <p className="text-zinc-500 text-lg font-medium max-w-2xl leading-relaxed">
            Welcome to the command center. All systems are operational and performing optimally.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-8 py-4 bg-zinc-900/50 border border-white/[0.05] text-zinc-300 text-[14px] font-bold rounded-2xl hover:bg-white/5 hover:text-white transition-all duration-300"
          >
            <span>Production Site</span>
            <Globe className="size-4" />
          </Link>
          <Link
            href="/dashboard/projects"
            className="flex items-center gap-3 px-8 py-4 bg-brand text-white text-[14px] font-bold rounded-2xl hover:bg-brand/90 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_8px_20px_rgba(234,40,90,0.25)]"
          >
            <PlusCircle className="size-4" />
            <span>Deploy Project</span>
          </Link>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card) => (
          <Link
            key={card.name}
            href={card.href}
            className="group relative block"
          >
            <div className="p-10 bg-zinc-900/30 border border-white/[0.05] rounded-[2.5rem] hover:bg-zinc-900/50 hover:border-brand/30 transition-all duration-500 shadow-2xl">
              <div className="flex justify-between items-start mb-12">
                <div className="size-14 bg-zinc-950 border border-white/5 rounded-2xl flex items-center justify-center text-zinc-600 group-hover:text-brand group-hover:border-brand/20 transition-all duration-300">
                  <card.icon className="size-6" strokeWidth={1.5} />
                </div>
                <div className="size-8 rounded-full border border-white/5 flex items-center justify-center text-zinc-800 group-hover:text-white group-hover:border-white/10 transition-all">
                  <ArrowRight className="size-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[11px] font-extrabold text-zinc-600 uppercase tracking-[0.25em]">
                  {card.name} Index
                </p>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-6xl font-black text-white tracking-tighter leading-none">
                    {card.count.toString().padStart(2, '0')}
                  </h2>
                  <div className="size-2 bg-brand rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* --- CORE SECTIONS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Priority Ops */}
        <section className="lg:col-span-8 space-y-10">
          <div className="flex items-center gap-6 px-2">
            <div className="size-2 bg-brand rounded-full" />
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Priority Operations
            </h3>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/dashboard/projects"
              className="group p-12 bg-zinc-900/20 border border-white/[0.03] rounded-[3rem] hover:bg-zinc-900/40 hover:border-brand/20 transition-all duration-500"
            >
              <div className="flex flex-col gap-20">
                <div className="size-16 bg-brand/5 border border-brand/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Sparkles className="size-8 text-brand" strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <h4 className="text-3xl font-extrabold text-white tracking-tight">
                    Showcase Builder
                  </h4>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    Architect and publish your next technical masterpiece.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/skills"
              className="group p-12 bg-zinc-900/20 border border-white/[0.03] rounded-[3rem] hover:bg-zinc-900/40 hover:border-brand/20 transition-all duration-500"
            >
              <div className="flex flex-col gap-20">
                <div className="size-16 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:text-brand transition-all duration-500">
                  <Zap className="size-8" strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <h4 className="text-3xl font-extrabold text-white tracking-tight">
                    Stack Manager
                  </h4>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    Synchronize your expertise with the latest frameworks.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Content Modules */}
        <section className="lg:col-span-4 space-y-10">
          <div className="flex items-center gap-6 px-2">
            <div className="size-2 bg-zinc-800 rounded-full" />
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Content Hub
            </h3>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>

          <div className="bg-zinc-900/20 border border-white/[0.03] rounded-[3.5rem] p-4 flex flex-col gap-3 shadow-2xl">
            {[
              {
                name: "Identity Settings",
                href: "/dashboard/hero",
                icon: Terminal,
                desc: "Hero & Branding"
              },
              {
                name: "Narrative Engine",
                href: "/dashboard/about",
                icon: UserCircle,
                desc: "Bio & Journey"
              },
              { 
                name: "Global Controls", 
                href: "#", 
                icon: Settings,
                desc: "System Preferences"
              },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center justify-between p-7 hover:bg-white/5 rounded-[2.5rem] transition-all duration-300 group"
              >
                <div className="flex items-center gap-5">
                  <div className="size-12 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center text-zinc-600 group-hover:text-brand group-hover:border-brand/20 transition-all">
                    <item.icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-400 group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest mt-1">
                      {item.desc}
                    </span>
                  </div>
                </div>
                <ChevronRight className="size-5 text-zinc-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* --- FOOTER STATUS --- */}
      <footer className="pt-16 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-10">
        <div className="flex items-center gap-10 text-[11px] font-extrabold text-zinc-600 uppercase tracking-[0.3em]">
          <div className="flex items-center gap-3">
            <div className="size-2 bg-brand rounded-full shadow-[0_0_10px_rgba(234,40,90,0.6)]" />
            <span>Encryption Active</span>
          </div>
          <span className="hidden sm:inline text-zinc-800">/</span>
          <div className="flex items-center gap-3">
            <Activity className="size-3 text-zinc-700" />
            <span>Authorized: Shariyer Shazan</span>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <p className="text-[11px] font-extrabold text-zinc-700 uppercase tracking-widest">
            © 2026 Secured Architecture
          </p>
          <div className="size-12 bg-zinc-900 border border-white/5 rounded-2xl flex items-center justify-center text-zinc-600 shadow-xl">
            <ShieldCheck className="size-6" strokeWidth={1.5} />
          </div>
        </div>
      </footer>
    </div>
  );
}
