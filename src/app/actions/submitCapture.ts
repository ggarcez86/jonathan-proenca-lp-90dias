"use server";

import { captureFormSchema } from "@/lib/schemas/captureForm";
import { appendToSheet } from "@/lib/google-sheets";
import { headers } from "next/headers";

export async function submitCapture(formData: any) {
  // Bot protection
  if (formData.honey) {
    return { success: true }; 
  }

  const result = captureFormSchema.safeParse(formData);
  
  if (!result.success) {
    return { success: false, error: "Verifique os dados informados." };
  }

  try {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'unknown';

    const enrichData = {
      ...result.data,
      userAgent
    };

    // 8s timeout controller
    await Promise.race([
      appendToSheet(enrichData),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout atingido")), 8000))
    ]);

  } catch (error) {
    // Log fallback strategy per PRD (don't lose the flow)
    console.error("FALLBACK LOG - Lead recebido mas falhou no Sheets", {
      data: result.data,
      error
    });
  }

  // PRD: "Sempre direcionar para success mesmo se o google sheets falhar"
  return { success: true };
}
