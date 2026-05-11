/**
 * Meta Conversions API (CAPI) — Server-side event dispatcher
 *
 * Responsável por:
 * 1. Normalizar e hashear dados PII (SHA-256) conforme padrão Meta
 * 2. Montar o payload no formato Graph API v21.0
 * 3. Disparar eventos server-side para deduplicação com o Pixel
 *
 * Ref: https://developers.facebook.com/docs/marketing-api/conversions-api
 */

import { createHash } from "crypto";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface MetaUserData {
  /** E-mail (será normalizado e hashado) */
  email: string;
  /** Telefone no formato (XX) XXXXX-XXXX ou apenas dígitos */
  phone: string;
  /** Nome completo (será splitado em fn/ln, normalizado e hashado) */
  fullName: string;
  /** IP do cliente extraído dos headers */
  clientIpAddress: string;
  /** User-Agent do cliente extraído dos headers */
  clientUserAgent: string;
  /** Facebook Browser ID cookie (_fbp) — NÃO hashear */
  fbp?: string;
  /** Facebook Click ID cookie (_fbc) — NÃO hashear */
  fbc?: string;
  /** ID interno do lead (Supabase) — será hashado como external_id */
  externalId?: string;
}

interface MetaEventPayload {
  eventName: "Lead" | "PageView";
  eventId: string;
  eventSourceUrl: string;
  userData: MetaUserData;
}

// ─────────────────────────────────────────────
// HASHING & NORMALIZATION
// ─────────────────────────────────────────────

/**
 * Normaliza e aplica SHA-256 em um valor PII conforme regras da Meta:
 * - lowercase
 * - trim whitespace
 * - retorna hash hexadecimal
 */
function hashSHA256(value: string): string {
  const normalized = value.toLowerCase().trim();
  return createHash("sha256").update(normalized).digest("hex");
}

/**
 * Normaliza telefone para formato E.164 (Brasil = +55)
 * Input: "(11) 98765-4321" ou "11987654321"
 * Output: "+5511987654321"
 */
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  // Se já tem código do país (13 dígitos = 55 + DDD + número)
  if (digits.length === 13 && digits.startsWith("55")) {
    return `+${digits}`;
  }

  // Padrão brasileiro: DDD (2) + número (8 ou 9) = 10 ou 11 dígitos
  if (digits.length === 10 || digits.length === 11) {
    return `+55${digits}`;
  }

  // Fallback: tenta com prefixo +55
  return `+55${digits}`;
}

/**
 * Separa nome completo em first_name e last_name
 */
function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ") || "";
  return { firstName, lastName };
}

// ─────────────────────────────────────────────
// CAPI DISPATCHER
// ─────────────────────────────────────────────

const META_API_VERSION = "v21.0";

export async function sendMetaEvent(payload: MetaEventPayload): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn(
      "[Meta CAPI] ⚠️ PIXEL_ID ou ACCESS_TOKEN não configurados. Evento ignorado."
    );
    return;
  }

  const { eventName, eventId, eventSourceUrl, userData } = payload;
  const { firstName, lastName } = splitName(userData.fullName);

  // Monta o user_data com hashing obrigatório para PII
  const userDataPayload: Record<string, any> = {
    client_ip_address: userData.clientIpAddress,
    client_user_agent: userData.clientUserAgent,
  };

  // PII só é incluído se preenchido (PageView não tem PII)
  if (userData.email) {
    userDataPayload.em = [hashSHA256(userData.email)];
  }
  if (userData.phone) {
    const normalizedPhone = normalizePhone(userData.phone);
    userDataPayload.ph = [hashSHA256(normalizedPhone.replace("+", ""))];
  }
  if (firstName) {
    userDataPayload.fn = [hashSHA256(firstName)];
  }

  // Adiciona last name apenas se existir
  if (lastName) {
    userDataPayload.ln = [hashSHA256(lastName)];
  }

  // fbp e fbc NÃO devem ser hashados (são tokens de sessão)
  if (userData.fbp) {
    userDataPayload.fbp = userData.fbp;
  }
  if (userData.fbc) {
    userDataPayload.fbc = userData.fbc;
  }

  // external_id — identificador top-tier para EMQ (hashado)
  if (userData.externalId) {
    userDataPayload.external_id = [hashSHA256(userData.externalId)];
  }

  const eventPayload: Record<string, any> = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: eventSourceUrl,
        action_source: "website",
        user_data: userDataPayload,
      },
    ],
  };

  // Código de teste — aparece na aba "Test Events" do Events Manager
  const testCode = process.env.META_TEST_EVENT_CODE;
  if (testCode) {
    eventPayload.test_event_code = testCode;
  }

  const url = `https://graph.facebook.com/${META_API_VERSION}/${pixelId}/events?access_token=${accessToken}`;

  // ── LOG VERBOSE PARA DEBUG ──
  console.log(`\n[Meta CAPI] 🚀 Disparando "${eventName}"...`);
  console.log(`[Meta CAPI]    event_id: ${eventId}`);
  console.log(`[Meta CAPI]    event_source_url: ${eventSourceUrl}`);
  console.log(`[Meta CAPI]    user_data keys: ${Object.keys(userDataPayload).join(", ")}`);
  if (testCode) console.log(`[Meta CAPI]    test_event_code: ${testCode}`);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `[Meta CAPI] ❌ Erro HTTP ${response.status}:`,
        errorBody
      );
    } else {
      const result = await response.json();
      console.log(
        `[Meta CAPI] ✅ "${eventName}" — events_received: ${result.events_received}`,
        result.messages?.length ? `| warnings: ${JSON.stringify(result.messages)}` : "| sem warnings"
      );
    }
  } catch (err) {
    console.error("[Meta CAPI] ❌ Falha ao disparar evento:", err);
  }
}
