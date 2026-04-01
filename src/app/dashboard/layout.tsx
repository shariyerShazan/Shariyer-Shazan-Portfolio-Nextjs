"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Code2,
  GraduationCap,
  UserCircle,
  Image as ImageIcon,
  LogOut,
  ChevronRight,
  Bell,
  Search,
  User,
  Settings,
  HelpCircle,
  Menu,
  X,
  Command,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Hero Section", href: "/dashboard/hero", icon: ImageIcon },
  { name: "About Section", href: "/dashboard/about", icon: UserCircle },
  { name: "Projects", href: "/dashboard/projects", icon: Briefcase },
  { name: "Skills", href: "/dashboard/skills", icon: Code2 },
  { name: "Experience", href: "/dashboard/experience", icon: Briefcase },
  { name: "Education", href: "/dashboard/education", icon: GraduationCap },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const currentRoute = menuItems.find((i) => i.href === pathname);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="admin-layout flex min-h-screen bg-zinc-950 text-zinc-400 font-admin antialiased selection:bg-brand/30">
      {/* --- MOBILE OVERLAY --- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-[300px] bg-zinc-900/50 backdrop-blur-3xl border-r border-white/[0.05] flex flex-col z-[70] transition-transform duration-500 ease-out lg:translate-x-0 lg:static lg:h-screen",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Brand Logo Section */}
        <div className="h-24 flex items-center px-10">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="size-10 bg-brand rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(234,40,90,0.3)] transition-transform group-hover:rotate-6">
              <Command className="size-5" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-tight text-lg leading-none">
                Admin
              </span>
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mt-1.5">
                v4.0 Internal
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-6 py-4 space-y-10 overflow-y-auto">
          <div>
            <p className="px-4 text-[11px] font-extrabold text-zinc-600 uppercase tracking-[0.25em] mb-6">
              Menu
            </p>
            <div className="space-y-1.5">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 relative",
                      isActive
                        ? "bg-white/5 text-white font-semibold"
                        : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.03]",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "size-4.5 transition-colors duration-300",
                        isActive ? "text-brand" : "group-hover:text-zinc-300",
                      )}
                    />
                    <span className="text-[14px]">{item.name}</span>

                    {isActive && (
                      <div className="absolute right-4 size-1.5 bg-brand rounded-full shadow-[0_0_8px_rgba(234,40,90,0.8)]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <p className="px-4 text-[11px] font-extrabold text-zinc-600 uppercase tracking-[0.25em] mb-6">
              Configuration
            </p>
            <div className="space-y-1.5">
              <button className="w-full flex items-center gap-3.5 px-4 py-3.5 text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.03] rounded-2xl transition-all text-[14px]">
                <Settings className="size-4.5" />
                <span>Settings</span>
              </button>
              <button className="w-full flex items-center gap-3.5 px-4 py-3.5 text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.03] rounded-2xl transition-all text-[14px]">
                <HelpCircle className="size-4.5" />
                <span>Documentation</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="flex items-center justify-between w-full p-4 bg-zinc-950/50 hover:bg-red-500/5 border border-white/5 rounded-2xl group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="size-8 bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-600 group-hover:text-red-400 transition-colors">
                <LogOut className="size-4" />
              </div>
              <span className="text-xs font-bold text-zinc-600 group-hover:text-red-400 transition-colors uppercase tracking-wider">
                Log out
              </span>
            </div>
            <ChevronRight className="size-4 text-zinc-800 group-hover:text-red-400/50 transition-colors" />
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Modern Header */}
        <header className="h-24 bg-zinc-950/70 backdrop-blur-2xl border-b border-white/[0.05] flex items-center justify-between px-8 lg:px-12 sticky top-0 z-[50]">
          <div className="flex items-center gap-6">
            <button 
              className="lg:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="size-6" />
            </button>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
                {currentRoute ? (
                  <>
                    <span>Console</span>
                    <ChevronRight className="size-3 text-zinc-800" />
                    <span className="text-brand">{currentRoute.name}</span>
                  </>
                ) : (
                  <span>Dashboard</span>
                )}
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
                {currentRoute?.name || "Overview"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Elegant Search Bar */}
            <div className="hidden md:flex items-center gap-3 px-5 py-2.5 bg-zinc-900/50 border border-white/[0.05] rounded-2xl focus-within:ring-4 focus-within:ring-brand/10 focus-within:border-brand/30 transition-all w-72 group">
              <Search className="size-4 text-zinc-600 group-focus-within:text-brand transition-colors" />
              <input
                type="text"
                placeholder="Search resources..."
                className="bg-transparent border-none outline-none text-[13px] text-zinc-200 placeholder:text-zinc-700 w-full font-medium"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2.5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                <Bell className="size-5" />
                <span className="absolute top-2.5 right-2.5 size-2 bg-brand rounded-full border-2 border-zinc-950 shadow-[0_0_8px_rgba(234,40,90,0.6)]" />
              </button>

              <div className="h-6 w-px bg-white/5 mx-2 hidden sm:block" />

              <div className="flex items-center gap-4 pl-2 group cursor-pointer">
                <div className="hidden lg:flex flex-col items-end">
                  <span className="text-[13px] font-bold text-white leading-none">
                    Shariyer Shazan
                  </span>
                  <span className="text-[9px] font-extrabold text-zinc-600 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                    <span className="size-1.5 bg-brand rounded-full animate-pulse shadow-[0_0_8px_rgba(234,40,90,0.5)]" />
                    Admin Active
                  </span>
                </div>
                <div className="size-10 rounded-xl bg-zinc-900 border border-white/10 p-0.5 shadow-xl group-hover:border-brand/40 transition-colors">
                  <div className="size-full bg-zinc-950 rounded-[9px] flex items-center justify-center overflow-hidden">
                    <User className="size-5 text-zinc-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 p-8 lg:p-12 relative overflow-x-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />

          <div className="max-w-[1400px] mx-auto min-h-full">
            <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
