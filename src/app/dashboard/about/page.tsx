"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, UserCircle, Briefcase, Mail, Phone, Image as ImageIcon, Layout } from "lucide-react";
import { useForm } from "react-hook-form";

interface AboutData {
  content: string;
  image?: string;
  email?: string;
  role?: string;
  phone?: string;
}

export default function AboutDashboard() {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm<AboutData>();

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch("/api/about");
      const data = await res.json();
      if (data) reset(data);
    } catch (err) {
      console.error("Failed to fetch about data", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: AboutData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) alert("About section updated successfully!");
    } catch (err) {
      console.error("Failed to update about", err);
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
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
        
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 ring-1 ring-emerald-500/20">
            <UserCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-sans">About Section</h2>
            <p className="text-sm text-white/40">Manage your profile bio and contact details.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
               Your Biography
            </label>
            <textarea
              {...register("content", { required: true })}
              rows={8}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-emerald-500/50 transition-all font-medium text-lg leading-relaxed resize-none"
              placeholder="Tell your story..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                  <Briefcase className="w-3 h-3" /> Professional Role
                </label>
                <input
                  {...register("role")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Public Email
                </label>
                <input
                  {...register("email")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
                  placeholder="e.g. hello@example.com"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                  <Phone className="w-3 h-3" /> Phone Number (Optional)
                </label>
                <input
                  {...register("phone")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
                  placeholder="e.g. +1 234 567 890"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                  <ImageIcon className="w-3 h-3" /> Profile Image URL
                </label>
                <input
                  {...register("image")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-500/50 transition-all font-mono text-sm"
                  placeholder="/images/profile.png"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 bg-white text-black font-bold h-14 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/10 min-w-[200px]"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Update About Section
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
