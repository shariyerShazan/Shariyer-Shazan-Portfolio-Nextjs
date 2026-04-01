"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Loader2, Briefcase, Calendar, MapPin, Check, X } from "lucide-react";
import { useForm } from "react-hook-form";

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
}

interface ExperienceFormData {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export default function ExperienceDashboard() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm<ExperienceFormData>();
  const isCurrent = watch("isCurrent");

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/experiences");
      const data = await res.json();
      setExperiences(data || []);
    } catch (err) {
      console.error("Failed to fetch experiences", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ExperienceFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        fetchExperiences();
        reset();
      }
    } catch (err) {
      console.error("Failed to save experience", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/experiences/${id}`, { method: "DELETE" });
      if (res.ok) {
        setExperiences(experiences.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete", err);
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
    <div className="space-y-12">
      <section className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5 text-blue-500" />
          Add Work Experience
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Company Name</label>
              <input
                {...register("company", { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20"
                placeholder="e.g. Google"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Job Role</label>
              <input
                {...register("role", { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20"
                placeholder="e.g. Senior Frontend Engineer"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Description</label>
              <textarea
                {...register("description")}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20 resize-none"
                placeholder="What did you do there?"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Start Date</label>
                <input
                  {...register("startDate", { required: true })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20"
                  placeholder="e.g. Jan 2021"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">End Date</label>
                <input
                  {...register("endDate")}
                  disabled={isCurrent}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                  placeholder="e.g. Present"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="isCurrent"
                {...register("isCurrent")}
                className="w-5 h-5 rounded border-white/10 bg-white/5 focus:ring-0 text-blue-500 transition-all cursor-pointer"
              />
              <label htmlFor="isCurrent" className="text-sm font-medium text-white/80 cursor-pointer">I am currently working here</label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black font-bold h-[55px] rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              Save Experience
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-3">
          Timeline
          <span className="text-xs font-normal px-2 py-1 bg-white/5 rounded text-white/40 uppercase tracking-widest">
            {experiences.length} Positions
          </span>
        </h2>

        <div className="space-y-4 relative before:absolute before:left-8 before:top-4 before:bottom-4 before:w-px before:bg-white/5">
          {experiences.map((exp) => (
            <div key={exp.id} className="group relative pl-16 py-4 bg-[#0f0f0f]/30 border border-transparent hover:border-white/5 hover:bg-[#0f0f0f] rounded-2xl transition-all duration-300">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-white/10 group-hover:border-blue-500 group-hover:scale-125 transition-all z-10" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-white/90">{exp.role}</h3>
                    {exp.isCurrent && <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">Current</span>}
                  </div>
                  <div className="flex items-center gap-4 text-sm font-medium text-white/40">
                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-blue-500" /> {exp.company}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {exp.startDate} — {exp.isCurrent ? "Present" : exp.endDate}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(exp.id)}
                  className="self-start p-2.5 bg-red-500/5 hover:bg-red-500 text-red-500/60 hover:text-white rounded-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
