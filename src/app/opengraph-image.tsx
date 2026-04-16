import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Como Ser Promovido em 90 Dias · Webinário Gratuito';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0A0A0B 0%, #141417 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Subtle golden glow */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(201,169,97,0.25), transparent 70%)',
          }}
        />

        {/* Small label */}
        <div style={{ color: '#C9A961', fontSize: 24, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}>
          Webinário Gratuito
        </div>

        {/* Headline */}
        <div style={{ color: '#F4F4F5', fontSize: 96, fontFamily: 'serif', lineHeight: 1.05, fontWeight: 400, marginBottom: 32 }}>
          Como Ser Promovido<br />em 90 Dias
        </div>

        {/* Author */}
        <div style={{ color: '#A1A1AA', fontSize: 28 }}>
          com Jonathan Proença
        </div>
      </div>
    ),
    size
  );
}
