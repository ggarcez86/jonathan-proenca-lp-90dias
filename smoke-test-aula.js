const fs = require('fs');
const dotenv = require('dotenv');

try {
  const envFile = fs.readFileSync('.env.local');
  const env = dotenv.parse(envFile);

  console.log('=== SMOKE TEST: CONFIGURAÇÕES DA AULA ===\n');

  const startStr = env.NEXT_PUBLIC_WEBINAR_START;
  const endStr = env.NEXT_PUBLIC_WEBINAR_END;
  const ctaSeconds = Number(env.NEXT_PUBLIC_CTA_APPEAR_SECONDS);

  const start = new Date(startStr);
  const end = new Date(endStr);
  const now = new Date();

  console.log('1. PARSE DE DATAS:');
  console.log('  - Início:', startStr, '-> Válido?', !isNaN(start.getTime()));
  console.log('  - Fim:', endStr, '-> Válido?', !isNaN(end.getTime()));
  
  console.log('\n2. ESTADO ATUAL:');
  console.log('  - Hora atual:', now.toISOString());
  if (now < start) console.log('  - Resultado: PRE (Sala de Espera)');
  else if (now >= start && now <= end) console.log('  - Resultado: LIVE (Ao Vivo)');
  else console.log('  - Resultado: POST (Encerrado)');

  console.log('\n3. TIMING DO PITCH:');
  const hours = Math.floor(ctaSeconds / 3600);
  const minutes = Math.floor((ctaSeconds % 3600) / 60);
  const seconds = ctaSeconds % 60;
  console.log('  - Segundos configurados:', ctaSeconds);
  console.log(`  - O botão aparecerá exatamente em: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  
  if (ctaSeconds === 4070) {
    console.log('  - ✅ STATUS: Match perfeito com o momento do pitch!');
  } else {
    console.log('  - ❌ STATUS: Erro no momento do pitch!');
  }
} catch (err) {
  console.error('Erro ao ler .env.local', err);
}
