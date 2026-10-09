import { ShieldCheck } from "lucide-react";

/** linhas de luz que saem da tela (azul) e as que atravessam a lente (limpas) */
const BLUE_ROWS = [26, 36, 46, 56, 66, 76];
const CLEAN_ROWS = [41, 51, 61];
const LAYERS = 18;

function Track({
  rows,
  className,
  dot,
  duration,
}: {
  rows: number[];
  className: string;
  dot: string;
  duration: number;
}) {
  return (
    <div className={`absolute inset-y-0 ${className}`}>
      {rows.map((top, r) =>
        [0, 0.5].map((phase) => (
          <div key={`${top}-${phase}`} className="absolute inset-x-0" style={{ top: `${top}%` }}>
            <div className="absolute inset-x-0 h-px bg-current opacity-10" />
            <div
              className="animate-photon absolute inset-x-0 -top-px"
              style={{
                animationDuration: `${duration}s`,
                animationDelay: `${-((r * 0.37 + phase) % 1) * duration}s`,
              }}
            >
              <span className={`absolute left-0 block -translate-x-full rounded-full ${dot}`} />
            </div>
          </div>
        )),
      )}
    </div>
  );
}

/**
 * Teaser da Digital+ na home: a luz azul sai da tela, bate na lente de
 * 18 camadas e só a luz limpa chega aos olhos. Tudo em CSS (transform e
 * opacity), sem JS por frame.
 */
export function BlueLightFilter() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-xl select-none" aria-hidden="true">
      {/* tela */}
      <div className="absolute left-[2%] top-[18%] h-[64%] w-[17%] rounded-[14px] border border-dp-blue/60 bg-gradient-to-b from-dp-blue/45 to-dp-blue/10 p-[6%] shadow-[0_0_70px_-6px] shadow-dp-blue/80">
        <div className="mx-auto h-1 w-1/3 rounded-full bg-dp-ink/40" />
        <div className="mt-[30%] space-y-2">
          <div className="h-1.5 w-full rounded-full bg-dp-ink/35" />
          <div className="h-1.5 w-3/4 rounded-full bg-dp-ink/25" />
          <div className="h-1.5 w-5/6 rounded-full bg-dp-ink/25" />
        </div>
        <div className="absolute inset-x-[12%] bottom-[10%] aspect-square rounded-lg bg-dp-blue/40" />
      </div>

      {/* luz azul da tela até a lente */}
      <Track
        rows={BLUE_ROWS}
        className="left-[20%] w-[28%] text-dp-blue"
        dot="h-[3px] w-10 bg-gradient-to-r from-transparent to-dp-blue-soft shadow-[0_0_12px_2px] shadow-dp-blue"
        duration={1.8}
      />

      {/* lente: 18 camadas */}
      <div className="absolute left-[52%] top-1/2 aspect-[60/200] h-[72%] -translate-x-1/2 -translate-y-1/2">
        <div className="animate-breathe absolute inset-[-40%] rounded-full bg-dp-blue/30 blur-2xl" />
        <svg viewBox="0 0 60 200" className="relative size-full overflow-visible">
          <defs>
            <linearGradient id="dp-lens-glass" x1="0" x2="1">
              <stop offset="0" stopColor="#8fabff" stopOpacity="0.35" />
              <stop offset="0.5" stopColor="#f4f6ff" stopOpacity="0.12" />
              <stop offset="1" stopColor="#8fabff" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <ellipse cx="30" cy="100" rx="24" ry="98" fill="url(#dp-lens-glass)" />
          {Array.from({ length: LAYERS }).map((_, i) => (
            <ellipse
              key={i}
              cx="30"
              cy="100"
              rx={24 - i * 1.25}
              ry={98 - i * 0.6}
              fill="none"
              stroke="#8fabff"
              strokeOpacity={i === 0 ? 0.9 : 0.22}
              strokeWidth={i === 0 ? 1.2 : 0.6}
            />
          ))}
        </svg>
        <div className="absolute inset-x-[10%] inset-y-[1%] overflow-hidden rounded-[50%]">
          <div className="animate-scan absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-transparent via-dp-ink/40 to-transparent [--scan-distance:500%]" />
        </div>
      </div>

      {/* luz limpa: menos raios, sem o azul */}
      <Track
        rows={CLEAN_ROWS}
        className="left-[60%] w-[22%] text-dp-ink"
        dot="h-[2px] w-8 bg-gradient-to-r from-transparent to-dp-ink shadow-[0_0_10px_1px] shadow-white/50"
        duration={2.6}
      />

      {/* olho */}
      <div className="absolute right-[1%] top-1/2 w-[15%] -translate-y-1/2">
        <svg viewBox="0 0 80 48" className="w-full text-dp-ink">
          <path
            d="M2 24 Q40 -8 78 24 Q40 56 2 24 Z"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.8"
            strokeWidth="1.5"
          />
          <circle cx="40" cy="24" r="11" fill="none" stroke="#8fabff" strokeWidth="1.5" />
          <circle cx="40" cy="24" r="5" fill="currentColor" />
          <circle cx="43" cy="21" r="1.6" fill="#05070f" />
        </svg>
      </div>

      {/* legendas */}
      <span className="absolute bottom-[4%] left-[2%] w-[24%] font-mono text-[0.58rem] uppercase leading-snug tracking-[0.16em] text-dp-blue-soft/80">
        Tela · luz azul
      </span>
      <span className="absolute bottom-[4%] left-[52%] -translate-x-1/2 whitespace-nowrap font-mono text-[0.58rem] uppercase tracking-[0.16em] text-dp-blue-soft">
        Digital+ · 18 camadas
      </span>
      <span className="absolute bottom-[4%] right-[1%] text-right font-mono text-[0.58rem] uppercase leading-snug tracking-[0.16em] text-dp-ink/70">
        Seus olhos
      </span>

      <span className="animate-float absolute right-[2%] top-[6%] inline-flex items-center gap-2 border border-dp-blue/40 bg-dp-bg/80 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-dp-ink backdrop-blur">
        <ShieldCheck className="size-3.5 text-dp-blue-soft" />
        Luz azul filtrada
      </span>
    </div>
  );
}
