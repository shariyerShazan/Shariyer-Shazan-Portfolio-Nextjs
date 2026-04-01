"use client";

import { useEffect, useState, FormEvent } from "react";
import { Plus, Trash2, ExternalLink, Globe as Github, Loader2, Edit2, X, Check, GitBranch } from "lucide-react";
import { useForm } from "react-hook-form";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string | null;
  liveLink: string | null;
  repoLink: string | null;
  tags: string[];
}

interface ProjectFormData {
  title: string;
  description: string;
  image: string;
  liveLink: string;
  repoLink: string;
  tags: string; // comma separated
}

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm<ProjectFormData>();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    const payload = {
      ...data,
      tags: data.tags.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchProjects();
        reset();
        setEditingId(null);
      }
    } catch (err) {
      console.error("Failed to save project", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setValue("title", p.title);
    setValue("description", p.description);
    setValue("image", p.image || "");
    setValue("liveLink", p.liveLink || "");
    setValue("repoLink", p.repoLink || "");
    setValue("tags", (p.tags || []).join(", "));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Form Section */}
      <section className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          {editingId ? <Edit2 className="w-5 h-5 text-yellow-500" /> : <Plus className="w-5 h-5 text-blue-500" />}
          {editingId ? "Edit Project" : "Add New Project"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Project Title</label>
              <input
                {...register("title", { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20 transition-all"
                placeholder="e.g. My Awesome Portfolio"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Description</label>
              <textarea
                {...register("description", { required: true })}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20 transition-all resize-none"
                placeholder="Describe your project..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Tags (comma-separated)</label>
              <input
                {...register("tags")}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20 transition-all"
                placeholder="Next.js, Tailwind, GSAP"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Image URL</label>
              <input
                {...register("image")}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20 transition-all"
                placeholder="/images/project.png"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Live Demo Link</label>
              <input
                {...register("liveLink")}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20 transition-all"
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Repository Link</label>
              <input
                {...register("repoLink")}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/20 transition-all"
                placeholder="https://github.com/shariyer/project"
              />
            </div>

            <div className="flex gap-3 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-white text-black font-bold py-3 rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : editingId ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {editingId ? "Update Project" : "Create Project"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => { setEditingId(null); reset(); }}
                  className="px-6 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </section>

      {/* List Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-3">
          All Projects
          <span className="text-xs font-normal px-2 py-1 bg-white/5 rounded text-white/40 uppercase tracking-widest leading-none">
            {projects.length} Total
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden group hover:border-white/20 transition-all">
              {p.image && (
                <div className="aspect-video w-full overflow-hidden border-b border-white/10 relative">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-lg leading-tight mb-1">{p.title}</h3>
                  <p className="text-sm text-white/40 line-clamp-2">{p.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-white/5 rounded text-white/40">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(p)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-white/60 hover:text-red-500"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-1">
                    {p.repoLink && <a href={p.repoLink} target="_blank" className="p-2 text-white/40 hover:text-white"><GitBranch className="w-4 h-4" /></a>}
                    {p.liveLink && <a href={p.liveLink} target="_blank" className="p-2 text-white/40 hover:text-white"><ExternalLink className="w-4 h-4" /></a>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
