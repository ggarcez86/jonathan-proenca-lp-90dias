import { z } from "zod";

export const captureFormSchema = z.object({
  name: z.string().min(2, "Por favor, digite seu nome completo"),
  email: z.string().email("Formato de e-mail inválido. Exemplo: voce@empresa.com.br"),
  whatsapp: z.string().min(14, "WhatsApp inválido. Inclua o DDD. Exemplo: (11) 98765-4321")
});

export type CaptureFormPayload = z.infer<typeof captureFormSchema>;
