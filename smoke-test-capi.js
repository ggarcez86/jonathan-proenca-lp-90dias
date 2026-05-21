/**
 * Smoke test direto — PageView + Lead com domínio correto
 */
const crypto = require("crypto");

const PIXEL_ID = "2693023294413469";
const ACCESS_TOKEN = "EAA9vdOPJg5wBRaAt5AeaGIF53dqK5XcK7qQgo7OS51CC9oxZB7lGlGREmTUPJGxNzgLkCT9SGiZCQL9oeQFZCuEmeaTIRZBK0QNmlRoNSTvxZANWCXpztdoLM5cfSvC0d7Uj3UevJXmveozUKunLXk6RdO2kRmxiCLnx7bIFxczQY9vIeMPuQTopDOQe3JvFP2gZDZD";
const TEST_EVENT_CODE = "TEST15727";
const DOMAIN = "https://webinario.ligaexecutiva.com.br";

function hashSHA256(value) {
  return crypto.createHash("sha256").update(value.toLowerCase().trim()).digest("hex");
}

async function fireEvent(eventName, extraUserData = {}) {
  const eventId = crypto.randomUUID();

  const userData = {
    client_ip_address: "189.40.100.50",
    client_user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    ...extraUserData,
  };

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: DOMAIN,
        action_source: "website",
        user_data: userData,
      },
    ],
    test_event_code: TEST_EVENT_CODE,
  };

  const url = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

  console.log(`\n🚀 Disparando evento "${eventName}"...`);
  console.log(`   event_id: ${eventId}`);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = await res.json();

  if (res.ok) {
    console.log(`✅ ${eventName} — events_received: ${body.events_received}`);
    if (body.messages?.length) {
      console.log("   ⚠️ Warnings:", JSON.stringify(body.messages, null, 2));
    }
  } else {
    console.log(`❌ ERRO ${res.status}:`, JSON.stringify(body, null, 2));
  }

  return body;
}

async function main() {
  console.log("═══════════════════════════════════════");
  console.log("  META CAPI SMOKE TEST — " + DOMAIN);
  console.log("  test_event_code: " + TEST_EVENT_CODE);
  console.log("═══════════════════════════════════════");

  // 1. PageView (sem PII — apenas IP + UA)
  await fireEvent("PageView");

  // Pequena pausa entre eventos
  await new Promise(r => setTimeout(r, 1000));

  // 2. Lead (com PII completo)
  await fireEvent("Lead", {
    em: [hashSHA256("teste.pageview@gmail.com")],
    ph: [hashSHA256("5511988887777")],
    fn: [hashSHA256("teste")],
    ln: [hashSHA256("pageview capi")],
    external_id: [hashSHA256("test-uuid-12345")],
  });

  console.log("\n✅ Smoke test completo! Confira a aba Test Events no Events Manager.");
}

main();
