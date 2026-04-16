export default function UrgencyBar() {
  return (
    <div className="bg-accent-subtle text-accent text-center py-3 text-sm tracking-wide border-b border-accent-border font-body flex items-center justify-center gap-2">
      <span aria-hidden="true" className="opacity-70 text-xs">⚠</span>
      <span>Vagas limitadas &middot; Webinário gratuito &middot; Apenas para quem garantir o link</span>
    </div>
  );
}
