export default function UrgencyBar() {
  return (
    <div className="hidden sm:flex bg-accent-subtle text-accent text-center py-4 lg:py-3 text-sm lg:text-[0.95rem] font-medium tracking-wide border-b border-accent-border font-body items-center justify-center gap-3">
      <span aria-hidden="true" className="opacity-80 text-sm lg:text-base">⚠</span>
      <span>Vagas limitadas &middot; Webinário gratuito &middot; Apenas para quem garantir o link</span>
    </div>
  );
}
