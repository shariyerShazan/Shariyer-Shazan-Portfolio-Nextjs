"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid credentials. Please try again.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-layout min-h-screen bg-zinc-950 flex items-center justify-center p-6 font-admin selection:bg-brand/30">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(234,40,90,0.05),transparent_50%)] pointer-events-none" />
      
      <div className="w-full max-w-[440px] z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Branding & Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center size-14 bg-zinc-900 border border-white/[0.08] rounded-2xl mb-6 shadow-2xl">
            <ShieldCheck className="size-7 text-brand" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">
            Admin <span className="text-zinc-500">Terminal</span>
          </h1>
          <p className="text-zinc-500 font-medium">
            Authorized access only. Use your credentials to sign in.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/[0.05] p-10 rounded-[2.5rem] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)]">
          {error && (
            <div className="mb-8 px-5 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
              <p className="text-sm text-red-400 font-semibold text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                Email Identity
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail className="size-4 text-zinc-600 group-focus-within:text-brand transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full bg-zinc-950 border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-white placeholder-zinc-700 outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand/40 transition-all font-medium"
                  placeholder="admin@shazan.dev"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                Passphrase
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="size-4 text-zinc-600 group-focus-within:text-brand transition-colors" />
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full bg-zinc-950 border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-white placeholder-zinc-700 outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand/40 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              id="login-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-100 hover:bg-white text-black font-bold py-4.5 rounded-2xl shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4 text-[15px]"
            >
              {loading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-10">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-zinc-600 hover:text-white transition-colors py-2 group font-bold tracking-tight"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
