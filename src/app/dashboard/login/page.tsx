"use client";

import { useTransition, useState } from "react";
import { loginDashboard } from "@/app/actions/dashboardAuth";
import { Lock } from "lucide-react";
import { BorderBeam } from "@/components/magicui/BorderBeam";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await loginDashboard(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <main className="min-h-screen bg-bg relative flex flex-col justify-center px-6 py-20">
      <div className="absolute top-0 w-[50vw] h-[50vw] rounded-full bg-gradient-radial from-accent/5 to-transparent blur-3xl mix-blend-screen pointer-events-none" />

      <div className="w-full max-w-[380px] mx-auto relative z-10">
        <div className="w-full bg-[#0A0A0B] border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
          <BorderBeam duration={10} borderWidth={1} colorFrom="#ffffff" colorTo="transparent" className="opacity-30 absolute inset-0 rounded-3xl pointer-events-none" />

          <div className="flex flex-col items-center mb-8 relative z-20">
            <div className="w-12 h-12 bg-surface-2 border border-white/5 rounded-2xl flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-text-mid" />
            </div>
            <h1 className="text-xl font-body font-bold text-text-high text-center">
              Restricted Area
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-20">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-text-mid uppercase tracking-widest pl-1">
                Admin Password
              </label>
              <input
                type="password"
                name="password"
                required
                disabled={isPending}
                placeholder="••••••••••"
                className="w-full bg-surface-2/50 border border-border text-text-high rounded-xl px-4 py-3 placeholder:text-text-low focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-mono"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 font-body text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-text-high text-bg hover:bg-text-mid py-3 rounded-xl font-bold uppercase text-[0.8rem] tracking-wider transition-colors disabled:opacity-50 mt-2"
            >
              {isPending ? "Authenticating..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
