"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Loader2, GraduationCap, Calendar, BookOpen } from "lucide-react";
import { useForm } from "react-hook-form";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
}

interface EducationFormData {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export default function EducationDashboard() {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset } = useForm<EducationFormData>();

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const res = await fetch("/api/education");
      const data = await res.json();
      setEducationList(data || []);
    } catch (err) {
      console.error("Failed to fetch education", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: EducationFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        fetchEducation();
        reset();
      }
    } catch (err) {
      console.error("Failed to save education", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/education/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEducationList(educationList.filter((e) => e.id !== id));
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
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5 text-purple-500" />
          Add Education
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Institution</label>
              <input
                {...register("institution", { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20"
                placeholder="e.g. Stanford University"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Degree / Certificate</label>
              <input
                {...register("degree", { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20"
                placeholder="e.g. Bachelor of Science"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Field of Study</label>
              <input
                {...register("field")}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20"
                placeholder="e.g. Computer Science"
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
                  placeholder="e.g. 2018"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">End Date</label>
                <input
                  {...register("endDate")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20"
                  placeholder="e.g. 2022"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black font-bold h-[55px] rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2 mt-auto"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              Save Education
            </button>
          </div>
        </form>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {educationList.map((edu) => (
          <div key={edu.id} className="bg-[#0f0f0f] border border-white/5 p-6 rounded-2xl group hover:border-white/10 transition-all flex justify-between items-start">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white/90">{edu.institution}</h3>
                <p className="text-white/40 font-medium flex items-center gap-1.5 leading-none mt-1">
                  <BookOpen className="w-3.5 h-3.5 text-purple-500" /> {edu.degree} {edu.field && `in ${edu.field}`}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors">
                <Calendar className="w-3.5 h-3.5" /> {edu.startDate} — {edu.endDate || "Present"}
              </div>
            </div>

            <button
              onClick={() => handleDelete(edu.id)}
              className="p-2.5 bg-red-500/5 hover:bg-red-500 text-red-500/60 hover:text-white rounded-xl transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
