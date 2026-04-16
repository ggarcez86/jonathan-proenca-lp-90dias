# Critical Code Snippets

Starting points for the details where execution quality matters most. Adapt to the chosen family and the project's stack. Do NOT paste blindly.

---

## 1. Font loading (Google Fonts via CSS)

### Dark AI-forward stack
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
:root {
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-body: 'Geist', -apple-system, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;
}
```

### Editorial stack
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Inter+Tight:wght@400;500&display=swap" rel="stylesheet">
```

```css
:root {
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Inter Tight', -apple-system, sans-serif;
}
```

### Luxury Clean stack
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```

```css
:root {
  --font-display: 'Cormorant Garamond', Garamond, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
}
```

**Note:** Free alternatives chosen above. For paying projects, Fraunces/Cormorant can be upgraded to PP Editorial New / GT Sectra / Canela (commercial licenses required).

---

## 2. Color tokens (CSS variables) — Dark AI-forward

```css
:root {
  /* Surfaces */
  --bg: #0A0A0B;
  --surface-1: #141417;
  --surface-2: #1E1F24;
  --border: #2A2B32;
  --border-strong: #3A3B42;

  /* Text ladder */
  --text-high: #F4F4F5;
  --text-mid: #A1A1AA;
  --text-low: #52525B;

  /* Accent (pick ONE and commit) */
  --accent: #C9A961;          /* warm gold — executive */
  --accent-fg: #0A0A0B;       /* foreground on accent bg */
  --accent-subtle: rgba(201, 169, 97, 0.1);
  --accent-border: rgba(201, 169, 97, 0.3);

  /* Spacing scale (non-uniform) */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  --space-section: 10rem;     /* generous between sections */
  --space-section-tight: 5rem;
}
```

---

## 3. Hero — Dark AI-forward with form

```tsx
<section className="relative min-h-screen bg-bg text-text-high overflow-hidden">
  {/* Subtle gradient mesh — atmosphere, not decoration */}
  <div className="absolute inset-0 opacity-40 pointer-events-none"
       style={{
         background: 'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(201,169,97,0.15), transparent 70%)'
       }} />

  <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 grid lg:grid-cols-[3fr_2fr] gap-16">
    {/* Left: text */}
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-text-mid mb-8">
        Workshop · Novembro 18 · Online
      </p>

      <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-tight mb-8">
        O método que leva executivos à <em className="text-accent not-italic font-normal">próxima cadeira</em>
      </h1>

      <p className="text-lg text-text-mid max-w-xl leading-relaxed mb-4">
        Uma sessão de 90 minutos para profissionais sênior que pararam de ser promovidos.
      </p>
    </div>

    {/* Right: form */}
    <div className="bg-surface-1 border border-border rounded-lg p-8 lg:self-center">
      <p className="text-xs uppercase tracking-[0.2em] text-text-mid mb-6">
        Inscrição · Vagas limitadas
      </p>
      {/* form fields here — see form snippet */}
    </div>
  </div>
</section>
```

---

## 4. Form — Dark AI-forward

```tsx
<form className="space-y-5">
  <div>
    <label className="block text-xs uppercase tracking-[0.15em] text-text-mid mb-2">
      Nome completo
    </label>
    <input
      type="text"
      className="w-full bg-surface-2 border border-border rounded-md px-4 py-3 text-text-high
                 focus:border-accent focus:outline-none transition-colors"
    />
  </div>

  <div>
    <label className="block text-xs uppercase tracking-[0.15em] text-text-mid mb-2">
      E-mail profissional
    </label>
    <input
      type="email"
      className="w-full bg-surface-2 border border-border rounded-md px-4 py-3 text-text-high
                 focus:border-accent focus:outline-none transition-colors"
    />
  </div>

  <div>
    <label className="block text-xs uppercase tracking-[0.15em] text-text-mid mb-2">
      Cargo atual
    </label>
    <select className="w-full bg-surface-2 border border-border rounded-md px-4 py-3 text-text-high
                       focus:border-accent focus:outline-none transition-colors">
      <option>Selecione</option>
      <option>Diretor(a)</option>
      <option>Gerente Sênior</option>
      <option>C-Level</option>
      <option>Coordenador(a)</option>
    </select>
  </div>

  <button
    type="submit"
    className="w-full bg-accent text-accent-fg font-medium py-3.5 rounded-md
               hover:brightness-110 transition-all
               active:scale-[0.99]"
  >
    Garantir minha vaga
  </button>

  <p className="text-xs text-text-low text-center pt-2">
    Você receberá a confirmação em até 60 segundos
  </p>
</form>
```

---

## 5. Motion — orchestrated hero reveal (Framer Motion)

```tsx
import { motion } from 'framer-motion';

// Parent orchestration
const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

// Child reveal — beyond fade-in-up
const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

<motion.div variants={container} initial="hidden" animate="visible">
  <motion.p variants={item}>Label</motion.p>
  <motion.h1 variants={item}>Headline</motion.h1>
  <motion.p variants={item}>Subhead</motion.p>
</motion.div>
```

---

## 6. Motion — CSS-only alternative (for HTML/Vanilla)

```css
@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(24px);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.reveal {
  opacity: 0;
  animation: reveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.reveal-1 { animation-delay: 0.1s; }
.reveal-2 { animation-delay: 0.2s; }
.reveal-3 { animation-delay: 0.3s; }
.reveal-4 { animation-delay: 0.45s; }
```

---

## 7. Magnetic cursor on CTA (Dark AI-forward signature move)

```tsx
import { useRef, useState } from 'react';

function MagneticButton({ children, ...props }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.2, y: y * 0.2 });
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      className="transition-transform duration-200 ease-out bg-accent text-accent-fg px-8 py-4 rounded-md"
      {...props}
    >
      {children}
    </button>
  );
}
```

Use ONCE per page — on the primary hero CTA. Overuse kills the effect.

---

## 8. Navigation — sticky with backdrop blur

```tsx
<nav className="sticky top-0 z-50 bg-bg/70 backdrop-blur-md border-b border-transparent
                transition-colors data-[scrolled=true]:border-border">
  <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
    <a href="/" className="font-display text-xl">Expert Name</a>

    <div className="hidden md:flex items-center gap-8 text-sm text-text-mid">
      <a href="#method" className="hover:text-text-high transition-colors">Método</a>
      <a href="#about" className="hover:text-text-high transition-colors">Sobre</a>
      <a href="#form" className="bg-surface-2 border border-border px-4 py-2 rounded-md text-text-high hover:border-accent transition-colors">
        Garantir vaga
      </a>
    </div>
  </div>
</nav>
```

Add scrolled state via IntersectionObserver or scroll listener.

---

## 9. Bento feature grid — varied sizes

```tsx
<div className="grid grid-cols-1 md:grid-cols-6 gap-4 max-w-6xl mx-auto">
  {/* Hero card — spans 4 cols */}
  <div className="md:col-span-4 bg-surface-1 border border-border rounded-lg p-8 min-h-[280px]">
    <h3 className="font-display text-3xl mb-3">Pilar principal</h3>
    <p className="text-text-mid">...</p>
  </div>

  {/* Compact — 2 cols */}
  <div className="md:col-span-2 bg-surface-1 border border-border rounded-lg p-6">
    <h3 className="font-display text-xl mb-2">Pilar 2</h3>
    <p className="text-text-mid text-sm">...</p>
  </div>

  {/* Compact — 2 cols */}
  <div className="md:col-span-2 bg-surface-1 border border-border rounded-lg p-6">
    <h3 className="font-display text-xl mb-2">Pilar 3</h3>
    <p className="text-text-mid text-sm">...</p>
  </div>

  {/* Medium — 4 cols */}
  <div className="md:col-span-4 bg-surface-1 border border-border rounded-lg p-8">
    <h3 className="font-display text-2xl mb-3">Pilar 4</h3>
    <p className="text-text-mid">...</p>
  </div>
</div>
```

Varied sizes signal intent. Identical 3-col grids don't.

---

## 10. Tailwind config — Dark AI-forward custom

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0B',
        'surface-1': '#141417',
        'surface-2': '#1E1F24',
        border: '#2A2B32',
        'text-high': '#F4F4F5',
        'text-mid': '#A1A1AA',
        'text-low': '#52525B',
        accent: '#C9A961',
        'accent-fg': '#0A0A0B',
      },
      fontFamily: {
        display: ['Instrument Serif', 'Georgia', 'serif'],
        body: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      letterSpacing: {
        'widest': '0.25em',
        'extra': '0.35em',
      },
    },
  },
};
```

---

## Using these snippets

- These are **calibration points**, not a kit. Adapt to the chosen family.
- If generating for Lovable consumption: paste snippets into the initial prompt so Lovable starts correctly. Lovable's defaults are the anti-patterns this skill fights.
- If working in Claude Code directly: use these as references while building component-by-component.
- Always run the self-audit (`references/self-audit.md`) before showing the user.
