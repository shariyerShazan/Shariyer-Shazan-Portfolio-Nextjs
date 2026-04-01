"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Image as ImageIcon, Layout, Type, AlignLeft } from "lucide-react";
import { useForm } from "react-hook-form";

interface HeroData {
  heading: string;
  subheading?: string;
  description?: string;
  image?: string;
}

export default function HeroDashboard() {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm<HeroData>();

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await fetch("/api/hero");
      const data = await res.json();
      if (data) reset(data);
    } catch (err) {
      console.error("Failed to fetch hero data", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: HeroData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) alert("Hero section updated successfully!");
    } catch (err) {
      console.error("Failed to update hero", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-blue-500">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
        
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 ring-1 ring-blue-500/20">
            <Layout className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-sans">Hero Section</h2>
            <p className="text-sm text-white/40">The first thing visitors see on your portfolio.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                  <Type className="w-3 h-3" /> Main Heading
                </label>
                <input
                  {...register("heading", { required: true })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 transition-all font-medium text-lg"
                  placeholder="e.g. I build digital products."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                  <AlignLeft className="w-3 h-3" /> Subheading
                </label>
                <input
                  {...register("subheading")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                  placeholder="e.g. Full-Stack Developer & Designer"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                  <ImageIcon className="w-3 h-3" /> Hero Image URL
                </label>
                <input
                  {...register("image")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 transition-all font-mono text-sm"
                  placeholder="/images/hero.png"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                   Description
                </label>
                <textarea
                  {...register("description")}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 transition-all resize-none font-medium"
                  placeholder="Tell a bit about yourself in one or two sentences..."
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 bg-white text-black font-bold h-14 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/10 min-w-[200px]"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
