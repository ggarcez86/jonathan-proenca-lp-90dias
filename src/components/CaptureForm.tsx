"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { captureFormSchema, type CaptureFormPayload } from "@/lib/schemas/captureForm";
import { submitCapture } from "@/app/actions/submitCapture";
import { useRouter } from "next/navigation";
import { BorderBeam } from "@/components/magicui/BorderBeam";

// Utility mask for WhatsApp
const maskWhatsApp = (value: string) => {
  return value
    .replace(/\\D/g, "")
    .slice(0, 11)
    .replace(/(\\d{2})(\\d)/, "($1) $2")
    .replace(/(\\d{5})(\\d)/, "$1-$2");
};

export default function CaptureForm({ variant }: { variant: "hero" | "final" }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CaptureFormPayload & { honey?: string }>({
    resolver: zodResolver(captureFormSchema),
  });

  const onSubmit = async (data: any) => {
    setServerError("");
    const result = await submitCapture(data);
    
    if (result.success) {
      router.push("/obrigado");
    } else {
      setServerError(result.error || "Ocorreu um erro. Tente novamente.");
    }
  };

  // Glassmorphism classes applied gracefully if Hero
  const formWrapperClasses = variant === 'hero' 
    ? 'bg-surface-1/40 backdrop-blur-xl p-6 lg:p-8 border border-white/5 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative z-20 overflow-hidden'
    : 'w-full';

  // Input styles reflecting luxury UI
  const inputClasses = variant === 'hero'
    ? 'w-full bg-black/40 border border-white/10 px-4 py-3 text-text-high text-sm rounded-lg focus:outline-none focus:border-accent focus:bg-black/60 focus:ring-1 focus:ring-accent transition-all font-body placeholder:text-text-low backdrop-blur-md'
    : 'w-full bg-surface-2 border border-border-strong px-4 py-3 text-text-high text-sm rounded-md focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-body placeholder:text-text-low';


  const formContent = (
    <>
      {variant === 'hero' && (
        <div className="absolute top-0 inset-x-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"></div>
      )}

      <div className={`text-center ${variant === 'hero' ? 'mb-6' : 'mb-5'}`}>
        <h3 className="text-xl lg:text-3xl font-display tracking-wide text-text-high">Garanta seu lugar agora</h3>
        <p className="text-[12px] text-text-mid font-body mt-1">(As vagas fecham quando lotar)</p>
      </div>

      {serverError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs p-3 rounded text-center">
          {serverError}
        </div>
      )}

      <input type="text" {...register("honey")} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="space-y-3">
        <div>
          <label className="block text-[10px] font-bold text-text-mid uppercase tracking-[0.2em] mb-2.5 font-body ml-1">Nome completo</label>
          <input 
            type="text" 
            {...register("name")}
            className={inputClasses} 
            placeholder="Seu nome real" 
            disabled={isSubmitting}
          />
          {errors.name && <p className="text-[11px] text-red-400 mt-1.5 ml-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-[10px] font-bold text-text-mid uppercase tracking-[0.2em] mb-2.5 font-body ml-1">Seu melhor e-mail</label>
          <input 
            type="email" 
            {...register("email")}
            className={inputClasses} 
            placeholder="voce@empresa.com.br" 
            disabled={isSubmitting}
          />
          {errors.email ? (
             <p className="text-[11px] text-red-400 mt-1.5 ml-1">{errors.email.message}</p>
          ) : (
             <p className="text-[10px] text-text-low mt-1.5 font-body ml-1">Para enviar o link corporativo da aula.</p>
          )}
        </div>

        <div>
          <label className="block text-[10px] font-bold text-text-mid uppercase tracking-[0.2em] mb-2.5 font-body ml-1">WhatsApp (DDD)</label>
          <input 
            type="tel" 
            {...register("whatsapp")}
            onChange={(e) => {
              const masked = maskWhatsApp(e.target.value);
              setValue("whatsapp", masked, { shouldValidate: true });
            }}
            className={inputClasses} 
            placeholder="(11) 98765-4321"
            disabled={isSubmitting} 
          />
          {errors.whatsapp ? (
             <p className="text-[11px] text-red-400 mt-1.5 ml-1">{errors.whatsapp.message}</p>
          ) : (
             <p className="text-[10px] text-text-low mt-1.5 font-body ml-1">Para o link de acesso exclusivo 1h antes.</p>
          )}
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full mt-6 bg-gradient-to-r from-accent to-accent/90 text-[#0A0A0B] py-3.5 rounded-lg text-sm font-bold uppercase tracking-[0.2em] hover:brightness-110 shadow-[0_0_20px_rgba(201,169,97,0.3)] hover:shadow-[0_0_30px_rgba(201,169,97,0.5)] active:scale-[0.98] transition-all duration-300 font-body flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span>{isSubmitting ? "Processando..." : "Quero minha vaga gratuita"}</span>
        {!isSubmitting && <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>}
      </button>

      <p className="text-[10px] text-center text-text-low mt-4 font-body uppercase tracking-wider font-semibold opacity-70">
        100% gratuito &middot; Sem cartão
      </p>
    </>
  );

  if (variant === 'hero') {
    return (
      <div className="relative w-full">
        <BorderBeam duration={10} borderWidth={2} colorFrom="#C9A961" colorTo="transparent" className="rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.7)] group">
          <motion.form 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`space-y-4 ${formWrapperClasses}`}
            onSubmit={handleSubmit(onSubmit)}
          >
            {formContent}
          </motion.form>
        </BorderBeam>
      </div>
    );
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`space-y-4 ${formWrapperClasses}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {formContent}
    </motion.form>
  );
}
