export default function Footer() {
  return (
    <footer className="py-16 px-6 text-center text-text-low text-[11px] sm:text-xs font-body tracking-wider uppercase border-t border-border bg-bg">
      <p>© 2026 Jonathan Proença &middot; Todos os direitos reservados</p>
      <p className="mt-4 flex items-center justify-center gap-4">
        <a href="#" className="hover:text-text-mid transition-colors duration-300">Política de Privacidade</a>
        <span className="opacity-30">&middot;</span>
        <a href="#" className="hover:text-text-mid transition-colors duration-300">Termos de Uso</a>
      </p>
    </footer>
  );
}
