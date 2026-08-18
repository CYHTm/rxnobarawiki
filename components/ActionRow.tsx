interface ActionRowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  status?: string;
}

export function ActionRow({ id, title, children, status }: ActionRowProps) {
  return (
    <article id={`action-${id}`} className="action-panel scroll-mt-28 rounded-[1.75rem] border border-white/[0.09] bg-[#191b22] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.16)] sm:p-8 lg:p-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h3 className="max-w-2xl text-xl font-semibold leading-tight tracking-[-0.025em] text-white sm:text-2xl">{title}</h3>
        {status && (
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-cyan-100">{status}</span>
        )}
      </div>
      <div className="guide-copy mt-5 text-[1rem] leading-[1.8] text-zinc-300">{children}</div>
    </article>
  );
}
