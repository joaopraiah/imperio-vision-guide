import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import semOculos from "@/assets/retrato-sem-oculos.jpg";
import comOculos from "@/assets/retrato-com-oculos.jpg";

/*
 * As duas fotos são o MESMO retrato (2048×1152): a com óculos foi gerada por
 * retoque só na faixa dos olhos, então todo o resto é idêntico pixel a pixel.
 * Por isso a armação pode "se formar" revelando a segunda foto por máscara,
 * sem trocar o rosto. As coordenadas abaixo estão no espaço da foto e o SVG
 * usa o mesmo viewBox, então o traço cai exatamente sobre a armação real.
 */
const W = 2048;
const H = 1152;
const LENS_L = "M890,345 L1022,345 L1020,410 Q1017,437 990,437 L918,437 Q893,436 891,410 Z";
const LENS_R = "M1070,343 L1205,341 L1203,405 Q1200,437 1172,437 L1098,438 Q1072,437 1071,410 Z";
const FRAME = [
  LENS_L,
  LENS_R,
  "M1022,350 Q1046,342 1070,349",
  "M890,350 L860,346",
  "M1205,346 L1232,340",
];
const CENTER_X = (1061 / W) * 100;
const CENTER_Y = (390 / H) * 100;

const ATRIBUTOS = ["Profissionalismo", "Confiança", "Imagem própria", "Personalidade"];

function Meter({ label, p, i }: { label: string; p: MotionValue<number>; i: number }) {
  const scaleX = useTransform(p, [0.5, 0.86], [0.3 + i * 0.04, 0.92 + (i % 2) * 0.05]);
  return (
    <div>
      <span className="text-[0.7rem] uppercase tracking-[0.18em] text-white/70">{label}</span>
      <div className="mt-2 h-px w-full bg-white/15">
        <motion.div style={{ scaleX }} className="h-px origin-left bg-white" />
      </div>
    </div>
  );
}

export function GlassesForming() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // A mola suaviza o "scrub" e mantém tudo calculado em JS — a aceleração
  // nativa (ScrollTimeline) do motion calculava errado a opacidade dos textos.
  const p = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.0005 });

  // câmera aproxima do rosto enquanto a armação se forma, depois recua
  const scale = useTransform(p, [0, 0.45, 0.85, 1], [1, 1.26, 1.06, 1.02]);
  // 1) medição de visagismo  2) traço da armação  3) armação real se materializa
  const measure = useTransform(p, [0.08, 0.18, 0.4, 0.48], [0, 1, 1, 0]);
  const draw = useTransform(p, [0.18, 0.46], [0, 1]);
  const outline = useTransform(p, [0.18, 0.24, 0.6, 0.7], [0, 1, 1, 0]);
  const reveal = useTransform(p, [0.44, 0.7], [0, 1]);
  const mask = useTransform(reveal, (r) => {
    if (r <= 0) return "linear-gradient(transparent, transparent)";
    const rx = r * 40;
    const ry = r * 62;
    return `radial-gradient(ellipse ${rx}% ${ry}% at ${CENTER_X}% ${CENTER_Y}%, #000 55%, transparent 100%)`;
  });
  const glint = useTransform(p, [0.68, 0.8], [1000, 1420]);
  const glintOpacity = useTransform(p, [0.66, 0.7, 0.78, 0.82], [0, 0.85, 0.85, 0]);

  const beforeOpacity = useTransform(p, [0, 0.06, 0.48, 0.56], [0, 1, 1, 0]);
  const afterOpacity = useTransform(p, [0.58, 0.66], [0, 1]);
  const metersOpacity = useTransform(p, [0.46, 0.56], [0, 1]);
  const hint = useTransform(p, [0, 0.08], [1, 0]);

  return (
    <section
      ref={ref}
      aria-label="A armação certa muda como você é visto"
      className="relative h-[380vh] bg-[#3c3c3c] text-white"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          style={{ scale, transformOrigin: `${CENTER_X}% ${CENTER_Y}%` }}
          className="absolute left-1/2 top-1/2 aspect-[16/9] w-[max(100vw,177.78svh)] -translate-x-1/2 -translate-y-[40%] will-change-transform"
        >
          <img
            src={semOculos}
            alt="Homem sem óculos"
            decoding="async"
            className="absolute inset-0 size-full"
          />
          <motion.img
            src={comOculos}
            alt="O mesmo homem usando uma armação preta"
            decoding="async"
            style={{ maskImage: mask, WebkitMaskImage: mask }}
            className="absolute inset-0 size-full"
          />
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden="true">
            <defs>
              <clipPath id="lentes">
                <path d={LENS_L} />
                <path d={LENS_R} />
              </clipPath>
              <linearGradient id="brilho" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* medição: distância pupilar e largura do rosto */}
            <motion.g style={{ opacity: measure }} stroke="#fff" strokeWidth="1.5" fill="none">
              <line x1="965" y1="300" x2="1125" y2="300" strokeDasharray="6 6" />
              <line x1="965" y1="292" x2="965" y2="308" />
              <line x1="1125" y1="292" x2="1125" y2="308" />
              <circle cx="965" cy="370" r="7" />
              <circle cx="1125" cy="365" r="7" />
              <line x1="965" y1="308" x2="965" y2="360" strokeOpacity="0.4" />
              <line x1="1125" y1="308" x2="1125" y2="355" strokeOpacity="0.4" />
              <line x1="838" y1="520" x2="1262" y2="520" strokeDasharray="6 6" />
              <line x1="838" y1="512" x2="838" y2="528" />
              <line x1="1262" y1="512" x2="1262" y2="528" />
              <text
                x="1045"
                y="285"
                textAnchor="middle"
                fill="#fff"
                stroke="none"
                fontSize="15"
                letterSpacing="3"
              >
                DISTÂNCIA PUPILAR
              </text>
              <text
                x="1050"
                y="550"
                textAnchor="middle"
                fill="#fff"
                stroke="none"
                fontSize="15"
                letterSpacing="3"
              >
                FORMATO DO ROSTO
              </text>
            </motion.g>

            {/* traço da armação sendo desenhado */}
            <motion.g
              style={{ opacity: outline }}
              stroke="#fff"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="[filter:drop-shadow(0_0_6px_rgba(255,255,255,0.8))]"
            >
              {FRAME.map((d) => (
                <motion.path key={d} d={d} style={{ pathLength: draw }} />
              ))}
            </motion.g>

            {/* reflexo passando pelas lentes quando a armação fica pronta */}
            <g clipPath="url(#lentes)">
              <motion.g style={{ x: glint, opacity: glintOpacity }}>
                <rect y="300" width="90" height="200" fill="url(#brilho)" transform="skewX(-20)" />
              </motion.g>
            </g>
          </svg>
        </motion.div>

        {/* degradês para leitura do texto */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2a2929] via-transparent to-transparent md:bg-gradient-to-r md:from-[#2a2929]/80 md:via-transparent md:to-[#2a2929]/80" />

        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-12 sm:px-8 md:flex-row md:items-center md:justify-between md:pb-0">
          <div className="relative min-h-36 w-full max-w-sm md:min-h-56">
            <motion.div
              style={{ opacity: beforeOpacity }}
              className="absolute bottom-0 md:bottom-auto md:top-0"
            >
              <span className="text-[0.68rem] uppercase tracking-[0.22em] text-white/60">
                Sem a armação certa
              </span>
              <h2 className="mt-4 text-3xl font-light uppercase leading-[1.05] tracking-[-0.01em] sm:text-4xl md:text-[2.75rem]">
                Seu rosto conta metade da história.
              </h2>
            </motion.div>
            <motion.div
              style={{ opacity: afterOpacity }}
              className="absolute bottom-0 md:bottom-auto md:top-0"
            >
              <span className="text-[0.68rem] uppercase tracking-[0.22em] text-white/60">
                Com a Ótica Império
              </span>
              <h2 className="mt-4 text-3xl font-light uppercase leading-[1.05] tracking-[-0.01em] sm:text-4xl md:text-[2.75rem]">
                Ele conta a sua.
              </h2>
              <p className="mt-5 hidden max-w-[17rem] text-sm leading-relaxed text-white/70 md:block">
                A armação é a primeira coisa que as pessoas veem em você. Com visagismo, ela passa a
                dizer exatamente o que você quer: competência, presença, estilo próprio.
              </p>
            </motion.div>
          </div>

          <motion.div
            style={{ opacity: metersOpacity }}
            className="mt-8 grid w-full max-w-xs gap-5 md:mt-0"
          >
            <span className="text-[0.68rem] uppercase tracking-[0.22em] text-white/60">
              Como você é percebido
            </span>
            {ATRIBUTOS.map((a, i) => (
              <Meter key={a} label={a} p={p} i={i} />
            ))}
          </motion.div>
        </div>

        <motion.span
          style={{ opacity: hint }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.3em] text-white/60"
        >
          Role para ver a armação se formar
        </motion.span>
      </div>
    </section>
  );
}
