"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Loader2, Code2, Cpu, Wrench, Globe } from "lucide-react";
import { useForm } from "react-hook-form";

interface Skill {
  id: string;
  name: string;
  category: string;
  level?: string;
  icon?: string;
}

interface SkillFormData {
  name: string;
  category: string;
  level: string;
  icon: string;
}

const categories = ["Frontend", "Backend", "Infrastructure", "Tools", "Design"];

const categoryIcons: Record<string, any> = {
  Frontend: Code2,
  Backend: Cpu,
  Infrastructure: Globe,
  Tools: Wrench,
  Design: Cpu, // fallback
};

export default function SkillsDashboard() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset } = useForm<SkillFormData>();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      console.error("Failed to fetch skills", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: SkillFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        fetchSkills();
        reset();
      }
    } catch (err) {
      console.error("Failed to save skill", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSkills(skills.filter((s) => s.id !== id));
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
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5 text-emerald-500" />
          Add New Skill
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Skill Name</label>
            <input
              {...register("name", { required: true })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20 transition-all font-medium"
              placeholder="e.g. Next.js"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Category</label>
            <select
              {...register("category", { required: true })}
              className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20 transition-all text-white/80"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Proficiency Level</label>
            <input
              {...register("level")}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20 transition-all"
              placeholder="e.g. Expert"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-black font-bold h-[50px] rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            Add Skill
          </button>
        </form>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat);
          if (catSkills.length === 0) return null;
          const Icon = categoryIcons[cat] || Code2;

          return (
            <section key={cat} className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {cat}
              </h3>
              <div className="bg-[#0f0f0f] border border-white/5 rounded-xl divide-y divide-white/5 overflow-hidden">
                {catSkills.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-4 group hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <div>
                        <span className="font-bold text-white/90">{s.name}</span>
                        {s.level && <span className="ml-3 text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded leading-none">{s.level}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-2 h-9 w-9 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
