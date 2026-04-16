# Integration Patterns

Padrões completos para as integrações mais comuns em capture pages. Cada padrão inclui setup, código-exemplo e troubleshooting.

---

## Google Sheets (via Service Account)

**Quando usar:** Cliente quer ver leads em tempo real sem painel customizado. Melhor para volumes baixos-médios (< 10k leads/mês).

### Setup

**1. Criar projeto no Google Cloud Console**
- Acesse console.cloud.google.com
- Criar novo projeto (ou usar existente)
- Ativar "Google Sheets API"

**2. Criar Service Account**
- IAM & Admin → Service Accounts → Create Service Account
- Nome: `capture-page-sheets-writer`
- Role: não precisa atribuir role no projeto
- Criar chave JSON e baixar

**3. Criar planilha e compartilhar**
- Criar nova planilha no Google Sheets
- Copiar o Sheet ID da URL: `docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
- Compartilhar com o email do service account (ex: `capture-page-sheets-writer@projeto.iam.gserviceaccount.com`) com permissão de **Editor**

**4. Preparar cabeçalhos da planilha**
Na primeira linha, adicionar: `timestamp | name | email | whatsapp | source | user_agent`

**5. Configurar env vars no projeto**
```bash
# .env.local
GOOGLE_SERVICE_ACCOUNT_EMAIL="capture-page-sheets-writer@projeto.iam.gserviceaccount.com"
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n[chave]\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID="1AbC..."
```

**IMPORTANTE:** No `.env.local`, a chave privada precisa ter as quebras de linha escapadas como `\n`. No deploy (Vercel), adicionar exatamente como veio do JSON.

### Implementação (Next.js 15 Server Action)

```typescript
// src/lib/google-sheets.ts
import { google } from 'googleapis';

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function appendToSheet(values: (string | number)[]) {
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!A:F',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [values],
    },
  });

  return response.data;
}
```

```typescript
// src/app/actions/submitCapture.ts
'use server';

import { z } from 'zod';
import { appendToSheet } from '@/lib/google-sheets';
import { headers } from 'next/headers';

const CaptureSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  whatsapp: z.string().min(10).max(20),
});

export async function submitCapture(
  data: z.infer<typeof CaptureSchema>
): Promise<{ success: boolean; error?: string; redirectUrl?: string }> {
  const parseResult = CaptureSchema.safeParse(data);
  if (!parseResult.success) {
    return { success: false, error: 'Dados inválidos' };
  }

  try {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') ?? '';
    const referer = headersList.get('referer') ?? '';

    await appendToSheet([
      new Date().toISOString(),
      data.name,
      data.email,
      data.whatsapp,
      referer,
      userAgent,
    ]);

    return {
      success: true,
      redirectUrl: process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL ?? '/obrigado',
    };
  } catch (error) {
    console.error('[submitCapture] Sheet error:', error);
    // Fallback: ainda retorna sucesso para o usuário, mas loga para recuperação manual
    console.error('[submitCapture] Lead perdido — salvar manualmente:', data);
    return {
      success: true,
      redirectUrl: '/obrigado',
      // Usuário não sabe da falha, mas sua equipe precisa monitorar os logs
    };
  }
}
```

### Client form using the action

```typescript
// src/components/CaptureForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { submitCapture } from '@/app/actions/submitCapture';

const FormSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  whatsapp: z.string().min(10, 'WhatsApp inválido'),
});

type FormData = z.infer<typeof FormSchema>;

export function CaptureForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const form = useForm<FormData>({ resolver: zodResolver(FormSchema) });

  async function onSubmit(data: FormData) {
    setStatus('loading');
    const result = await submitCapture(data);
    if (result.success) {
      setStatus('success');
      if (result.redirectUrl) {
        setTimeout(() => { window.location.href = result.redirectUrl! }, 1500);
      }
    } else {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return <SuccessState />;
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* fields */}
    </form>
  );
}
```

### Troubleshooting

| Problema | Causa | Fix |
|---|---|---|
| "The caller does not have permission" | Service account não tem acesso à planilha | Compartilhar a planilha com o email do service account |
| "Unable to parse range: Sheet1!A:F" | Nome da aba diferente | Ajustar `range` para o nome real da aba ou renomear para "Sheet1" |
| Erro de chave privada | `\n` não foi escapado | Garantir que env var preserva quebras de linha (JSON string com `\\n`) |
| Limite de requests | Cota Sheets API excedida (100/min) | Implementar fila ou migrar para Supabase |

---

## Supabase (alternativa quando volume cresce)

**Quando usar:** Volume > 10k leads/mês, ou cliente já usa Supabase em outros projetos, ou precisa consultar/segmentar os leads via query.

### Setup simplificado
1. Criar projeto no supabase.com
2. Criar tabela `captures` com colunas: id, created_at, name, email, whatsapp, source, user_agent
3. Configurar RLS (Row Level Security) — inserts permitidos via anon key, selects via service role
4. Copiar URL e anon key para env vars

### Server Action
```typescript
'use server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function submitCapture(data) {
  const { error } = await supabase.from('captures').insert([data]);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
```

---

## Webhook (n8n / Zapier / custom)

**Quando usar:** Já existe fluxo de automação que precisa processar o lead além de só armazenar.

### Padrão Server Action

```typescript
'use server';

export async function submitCapture(data) {
  const response = await fetch(process.env.WEBHOOK_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.WEBHOOK_SECRET}`,
    },
    body: JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    return { success: false, error: 'Falha ao processar' };
  }

  return { success: true };
}
```

### Trade-offs
- **Pró:** Flexível, permite workflows complexos (Sheet + email + WhatsApp + Slack de uma vez)
- **Contra:** Dependência de serviço externo (uptime do n8n/Zapier afeta conversão)

---

## Email Services (ConvertKit, ActiveCampaign, Mailchimp)

**Quando usar:** Cliente já tem lista no serviço e quer que o lead entre direto na automação de email.

### Padrão geral
1. Obter API key do serviço
2. Obter ID da lista/form/tag que o lead deve entrar
3. Server Action chama a API com `email` e metadata

**Exemplo ConvertKit:**
```typescript
await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    api_key: process.env.CONVERTKIT_API_KEY,
    email: data.email,
    first_name: data.name,
    fields: { whatsapp: data.whatsapp },
  }),
});
```

### Padrão híbrido (recomendado)

Muitos projetos querem tanto Google Sheets (visibilidade rápida) quanto um serviço de email (automação). Fazer os dois em paralelo:

```typescript
export async function submitCapture(data) {
  const [sheetResult, emailResult] = await Promise.allSettled([
    appendToSheet([...data]),
    addToConvertKit(data),
  ]);

  // Ambos falharem = erro
  if (sheetResult.status === 'rejected' && emailResult.status === 'rejected') {
    return { success: false, error: 'Não conseguimos processar sua inscrição' };
  }

  // Um falhar é OK — registrar em log para reconciliação posterior
  if (sheetResult.status === 'rejected') console.error('Sheet fail:', sheetResult.reason);
  if (emailResult.status === 'rejected') console.error('CK fail:', emailResult.reason);

  return { success: true };
}
```

---

## Regras universais de integração

1. **Validate server-side too.** Nunca confie na validação client-side.
2. **Never expose API keys in client code.** Server Actions ou API routes, sempre.
3. **Timeout everything.** Default para `fetch` não tem timeout — adicionar AbortController com 8s.
4. **Log failures.** Mesmo quando retorna sucesso ao usuário, logar falhas internamente para recuperação manual.
5. **Rate limit.** Em produção, rate limit por IP (10 submits/min é generoso). Middleware do Next.js ou Upstash Ratelimit.
6. **Honeypot field.** Campo oculto que bots preenchem — se estiver preenchido, rejeitar silenciosamente.

### Honeypot example

```tsx
<input
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  style={{ position: 'absolute', left: '-9999px' }}
  aria-hidden="true"
/>
```

```typescript
// Server
if (data.website) {
  return { success: true }; // finge sucesso para bot
}
```
