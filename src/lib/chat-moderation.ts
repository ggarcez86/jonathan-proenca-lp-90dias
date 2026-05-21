// === MODERAÇÃO DO CHAT ===
// Filtro de palavrões (PT-BR), rate limiting e validação.

const BLOCKED_WORDS = [
  // Palavrões e ofensas comuns em PT-BR
  "porra", "caralho", "foda", "fodase", "foda-se", "fodasse",
  "puta", "putaria", "arrombado", "arrombada", "cuzão", "cuzao",
  "viado", "viada", "vagabundo", "vagabunda",
  "merda", "bosta", "cu ", " cu", "buceta", "piroca", "pau no cu",
  "filha da puta", "filho da puta", "fdp", "pqp", "vsf", "vtnc",
  "desgraça", "desgraçado", "desgraçada", "otário", "otaria",
  "imbecil", "idiota", "retardado", "retardada", "burro", "burra",
  // Spam / golpe
  "compre agora", "ganhe dinheiro", "renda extra", "clique aqui",
  "link na bio", "sigam", "segue", "t.me/", "bit.ly/",
];

/**
 * Verifica se a mensagem contém palavras bloqueadas.
 * Retorna true se a mensagem é LIMPA, false se contém palavrão.
 */
export function isMessageClean(message: string): boolean {
  const normalized = message
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^a-z0-9\s/.:]/g, " "); // Substitui caracteres especiais por espaço

  return !BLOCKED_WORDS.some((word) => {
    const normalizedWord = word
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return normalized.includes(normalizedWord);
  });
}

/**
 * Valida o tamanho da mensagem.
 */
export function isValidMessage(message: string): { valid: boolean; error?: string } {
  const trimmed = message.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: "Mensagem vazia." };
  }
  if (trimmed.length > 280) {
    return { valid: false, error: "Mensagem muito longa (máx. 280 caracteres)." };
  }
  if (trimmed.length < 2) {
    return { valid: false, error: "Mensagem muito curta." };
  }
  return { valid: true };
}

/**
 * Valida o nickname do autor.
 */
export function isValidNickname(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: "Digite seu nome." };
  }
  if (trimmed.length > 30) {
    return { valid: false, error: "Nome muito longo (máx. 30 caracteres)." };
  }
  if (trimmed.length < 2) {
    return { valid: false, error: "Nome muito curto." };
  }
  return { valid: true };
}

// === RATE LIMITING (Client-Side) ===
const RATE_LIMIT_MS = 3000; // 3 segundos entre mensagens
let lastMessageTime = 0;

/**
 * Verifica se o usuário pode enviar uma mensagem (rate limit).
 * Retorna true se pode enviar, false se está em cooldown.
 */
export function canSendMessage(): { allowed: boolean; waitMs?: number } {
  const now = Date.now();
  const elapsed = now - lastMessageTime;

  if (elapsed < RATE_LIMIT_MS) {
    return { allowed: false, waitMs: RATE_LIMIT_MS - elapsed };
  }
  return { allowed: true };
}

/**
 * Registra o envio de uma mensagem (para rate limiting).
 */
export function markMessageSent() {
  lastMessageTime = Date.now();
}
