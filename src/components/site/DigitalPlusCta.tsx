import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useId, useState } from "react";
import { ArrowUpRight, Droplets, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { STORES } from "@/lib/site-data";
import { BtnLink } from "./ui-bits";
import { OrbitRing } from "./DigitalPlusKit";
import { Reveal } from "./motion-primitives";

const SPECS = [
  { icon: Layers, label: "18 camadas", className: "left-0 top-6 sm:-left-4" },
  { icon: ShieldCheck, label: "Anti luz azul", className: "right-0 top-1/4 sm:-right-6" },
  { icon: Droplets, label: "Hidrofóbica", className: "bottom-16 left-0 sm:-left-8" },
  { icon: Sparkles, label: "Quase invisível", className: "bottom-2 right-2 sm:right-0" },
];

/** Frase do "diagnóstico" conforme as horas de tela — tom leve, de conversa. */
function verdict(h: number) {
  if (h <= 3) return "Uso leve. Mas proteção nunca é demais 😉";
  if (h <= 7) return "Rotina conectada. Você é exatamente o público da Digital+.";
  if (h <= 11) return "Nível maratona. Seus olhos estão pedindo um upgrade.";
  return "Modo hardcore ativado. Digital+ é urgência, não luxo.";
}

function waLink(base: string, h: number) {
  const msg = `Oi! Passo umas ${h}h por dia na frente de telas e quero conhecer a lente Digital+ 👓`;
  return `${base}?text=${encodeURIComponent(msg)}`;
}

/** Contador que "rola" até o valor novo, como num painel digital. */
function RollingNumber({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => Math.round(v).toLocaleString("pt-BR"));
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [mv, value]);
  return <motion.span>{text}</motion.span>;
}

/** Lente em "HUD": foto macro recortada em círculo, anel orbitando, mira e
 * uma linha de varredura — a leitura tecnológica que a seção pede. */
function LensHud({ src }: { src: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <OrbitRing
        text="PROTEÇÃO ATIVA · DIGITAL+ · 18 CAMADAS · "
        size={300}
        duration={26}
        className="absolute inset-0 size-full text-dp-blue-soft/70"
      />
      <div className="absolute inset-[9%] rounded-full border border-dashed border-dp-blue/40" />
      <div className="absolute inset-[15%] overflow-hidden rounded-full border border-dp-blue/50 shadow-[0_0_80px_-10px] shadow-dp-blue/70">
        <img src={src} alt="" aria-hidden="true" className="size-full object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_30%,var(--dp-bg)_95%)]" />
        <motion.div
          className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-dp-blue-soft/35 to-transparent"
          animate={{ top: ["-20%", "100%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
        />
        {/* mira */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-dp-blue-soft/20" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-dp-blue-soft/20" />
      </div>
      {SPECS.map((s, i) => (
        <motion.span
          key={s.label}
          className={`absolute inline-flex items-center gap-2 border border-dp-blue/40 bg-dp-bg/80 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-dp-ink backdrop-blur ${s.className}`}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <s.icon className="size-3.5 text-dp-blue-soft" />
          {s.label}
        </motion.span>
      ))}
    </div>
  );
}

/**
 * CTA final da Digital+: quebra o padrão editorial da página com uma leitura
 * mais tech/jovem — grade em perspectiva, lente em HUD e um "medidor de tela"
 * interativo que já leva as horas informadas na mensagem do WhatsApp.
 */
export function DigitalPlusCta({ lensSrc }: { lensSrc: string }) {
  const [hours, setHours] = useState(8);
  const sliderId = useId();
  const pct = ((hours - 1) / 15) * 100;

  return (
    <section className="relative isolate overflow-hidden border-t border-dp-blue/20 bg-dp-bg px-5 py-24 sm:px-8 md:py-32">
      {/* grade em perspectiva que "anda" em direção ao leitor */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] [perspective:600px]"
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-x-[-50%] bottom-0 h-[160%] origin-bottom [transform:rotateX(62deg)] [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--dp-blue)_30%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--dp-blue)_30%,transparent)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_top,black_20%,transparent_85%)]"
          animate={{ backgroundPositionY: ["0px", "56px"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-dp-blue/25 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2.5 border border-dp-blue/40 bg-dp-blue/10 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-dp-blue-soft">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-dp-blue-soft opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-dp-blue-soft" />
              </span>
              Modo proteção · on
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl md:text-6xl">
              Sua tela não desliga.
              <br />
              <span className="bg-gradient-to-r from-dp-blue-soft via-white to-dp-blue bg-clip-text text-transparent">
                Sua proteção também não.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 border border-dp-blue/25 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-7">
              <label htmlFor={sliderId} className="block text-sm text-dp-ink/80">
                Quantas horas por dia você passa em telas?
              </label>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl font-bold tabular-nums tracking-tight text-dp-ink">
                  {hours}h
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-dp-ink/50">
                  {hours >= 16 ? "ou mais / dia" : "por dia"}
                </span>
              </div>
              <input
                id={sliderId}
                type="range"
                min={1}
                max={16}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="range-dp mt-5 h-1.5 w-full cursor-pointer appearance-none rounded-full"
                style={{
                  background: `linear-gradient(to right, var(--dp-blue) ${pct}%, color-mix(in oklab, var(--dp-ink) 15%, transparent) ${pct}%)`,
                }}
              />
              <p className="mt-6 text-pretty text-sm leading-relaxed text-dp-ink/75">
                São{" "}
                <strong className="font-display text-lg font-bold text-dp-blue-soft">
                  <RollingNumber value={hours * 365} /> horas
                </strong>{" "}
                por ano de luz azul direto nos seus olhos.
              </p>
              <motion.p
                key={verdict(hours)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-dp-ink/55"
              >
                {verdict(hours)}
              </motion.p>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-3">
              {STORES.map((s) => (
                <a
                  key={s.id}
                  href={waLink(s.whatsapp, hours)}
                  target="_blank"
                  rel="noreferrer"
                  className="shimmer group inline-flex items-center gap-2 bg-dp-blue px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_0_40px_-6px] shadow-dp-blue/80 transition-all duration-300 hover:-translate-y-0.5 hover:bg-dp-blue-soft hover:text-dp-bg"
                >
                  <span className="relative">Chamar {s.cidade}</span>
                  <ArrowUpRight className="relative size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
              <BtnLink to="/servicos" variant="dpGhost">
                Ver outros serviços
              </BtnLink>
            </div>
            <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-dp-ink/45">
              A mensagem já vai com as suas horas de tela — é só enviar.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <LensHud src={lensSrc} />
        </Reveal>
      </div>
    </section>
  );
}
