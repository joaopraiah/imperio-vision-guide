import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { AlertTriangle, Check, Eye, Lock, RotateCcw } from "lucide-react";
import { STORES } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type Question = {
  id: string;
  titulo: string;
  ajuda: string;
  render?: () => React.ReactNode;
  opcoes: { label: string; correta?: boolean; peso?: number }[];
};

type ModuleId = "perto" | "cromatica" | "astigmatismo";

function DotMosaic({ digit, hue }: { digit: string; hue: number }) {
  const dots = useMemo(() => {
    const list: { x: number; y: number; r: number }[] = [];
    let seed = hue + digit.length * 13;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 900; i++) {
      list.push({ x: rand() * 240, y: rand() * 240, r: 2.2 + rand() * 4.4 });
    }
    return list;
  }, [digit, hue]);

  const maskId = `mask-${digit}-${hue}`;
  return (
    <svg viewBox="0 0 240 240" className="mx-auto size-56 sm:size-64" role="img" aria-label="Mosaico de pontos coloridos">
      <defs>
        <mask id={maskId}>
          <rect width="240" height="240" fill="black" />
          <text
            x="120"
            y="168"
            textAnchor="middle"
            fontSize="180"
            fontFamily="Caviar Dreams, sans-serif"
            fontWeight="700"
            fill="white"
          >
            {digit}
          </text>
        </mask>
      </defs>
      <circle cx="120" cy="120" r="118" fill="oklch(0.93 0.017 88)" />
      {dots.map((d, i) => (
        <circle key={`b-${i}`} cx={d.x} cy={d.y} r={d.r} fill={`hsl(${hue} 34% ${58 + (i % 5) * 4}%)`} />
      ))}
      <g mask={`url(#${maskId})`}>
        {dots.map((d, i) => (
          <circle
            key={`f-${i}`}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={`hsl(${hue + 40} 40% ${52 + (i % 5) * 4}%)`}
          />
        ))}
      </g>
    </svg>
  );
}

function AstigmatismChart({ lines, rotate = 0 }: { lines: number; rotate?: number }) {
  const cx = 120;
  const cy = 120;
  const r = 104;
  const spokes = Array.from({ length: lines }, (_, i) => {
    const angle = (Math.PI * 2 * i) / lines + (rotate * Math.PI) / 180;
    return {
      x2: cx + r * Math.cos(angle),
      y2: cy + r * Math.sin(angle),
    };
  });
  return (
    <svg
      viewBox="0 0 240 240"
      className="mx-auto size-56 sm:size-64"
      role="img"
      aria-label="Gráfico de linhas radiais para teste de astigmatismo"
    >
      <circle cx={cx} cy={cy} r={r + 6} fill="var(--color-background)" stroke="var(--color-border)" />
      {spokes.map((s, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={s.x2}
          y2={s.y2}
          stroke="var(--color-ink)"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      ))}
      <circle cx={cx} cy={cy} r={4} fill="var(--color-gold)" />
    </svg>
  );
}

function ScoreRing({ pct }: { pct: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <motion.div
      className="relative mx-auto size-32 shrink-0 sm:mx-0"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg viewBox="0 0 120 120" className="size-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--color-border)" strokeWidth="4" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - pct) }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <motion.span
        className="absolute inset-0 grid place-items-center text-xl tracking-tight text-ink"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        {Math.round(pct * 100)}%
      </motion.span>
    </motion.div>
  );
}

const MODULES: { id: ModuleId; label: string; intro: string; questions: Question[] }[] = [
  {
    id: "perto",
    label: "Teste de Perto",
    intro: "Letras e textos pensados para avaliar a sua leitura de perto, como ler um rótulo ou uma tela.",
    questions: [
      {
        id: "acuidade-1",
        titulo: "Qual letra você consegue ler com clareza?",
        ajuda: "Fique a cerca de 60 cm da tela, com boa iluminação e sem apertar os olhos.",
        render: () => <span className="text-[5.5rem] leading-none font-bold tracking-widest">E H</span>,
        opcoes: [
          { label: "E H", correta: true },
          { label: "F N" },
          { label: "B M" },
          { label: "Não consigo distinguir" },
        ],
      },
      {
        id: "acuidade-2",
        titulo: "Leia a sequência menor",
        ajuda: "Mantenha a mesma distância. Não aproxime o rosto da tela.",
        render: () => <span className="text-2xl leading-none font-bold tracking-widest">Z V T C</span>,
        opcoes: [
          { label: "Z V T C", correta: true },
          { label: "Z U I G" },
          { label: "S V T G" },
          { label: "Preciso apertar os olhos" },
        ],
      },
      {
        id: "contraste",
        titulo: "Este texto de baixo contraste está legível?",
        ajuda: "Dificuldade com contraste pode aparecer bem antes de outros sinais.",
        render: () => (
          <span className="text-xl leading-relaxed text-muted-foreground/35 sm:text-2xl">
            Enxergar bem também é conforto no dia a dia.
          </span>
        ),
        opcoes: [
          { label: "Sim, leio sem esforço", correta: true },
          { label: "Leio, mas com algum esforço", peso: 0.5 },
          { label: "Muito difícil de ler" },
        ],
      },
      {
        id: "proximidade",
        titulo: "Consegue ler este texto pequeno de perto?",
        ajuda: "Leia a cerca de 35 cm, como leria uma bula ou um rótulo.",
        render: () => (
          <span className="text-[0.7rem] leading-relaxed">
            A escolha do óculos certo começa por entender a sua rotina, a sua profissão e o seu estilo.
          </span>
        ),
        opcoes: [
          { label: "Sim, sem dificuldade", correta: true },
          { label: "Preciso afastar o texto", peso: 0.3 },
          { label: "Não consigo ler" },
        ],
      },
      {
        id: "sintoma",
        titulo: "Com que frequência você sente cansaço visual ou dor de cabeça?",
        ajuda: "Depois de telas, leitura ou direção à noite.",
        opcoes: [
          { label: "Raramente ou nunca", correta: true },
          { label: "Algumas vezes por semana", peso: 0.4 },
          { label: "Quase todos os dias" },
        ],
      },
    ],
  },
  {
    id: "cromatica",
    label: "Teste Cromática",
    intro: "Mosaicos de pontos coloridos, no estilo dos testes de percepção de cores. Apenas orientativo.",
    questions: [
      {
        id: "cores-1",
        titulo: "Qual número aparece no mosaico?",
        ajuda: "Olhe o centro do círculo, sem forçar a vista.",
        render: () => <DotMosaic digit="74" hue={95} />,
        opcoes: [{ label: "74", correta: true }, { label: "21" }, { label: "17" }, { label: "Nenhum número" }],
      },
      {
        id: "cores-2",
        titulo: "E agora, qual número você vê?",
        ajuda: "Se nenhum número for claro, escolha a última opção.",
        render: () => <DotMosaic digit="6" hue={15} />,
        opcoes: [{ label: "6", correta: true }, { label: "8" }, { label: "5" }, { label: "Nenhum número" }],
      },
    ],
  },
  {
    id: "astigmatismo",
    label: "Teste de Astigmatismo",
    intro: "Um gráfico de linhas radiais, parecido com o usado em consultórios para uma triagem simples de astigmatismo.",
    questions: [
      {
        id: "astig-1",
        titulo: "Alguma linha parece mais escura, nítida ou grossa que as outras?",
        ajuda: "Olhe para o centro do gráfico, com os dois olhos abertos.",
        render: () => <AstigmatismChart lines={24} />,
        opcoes: [
          { label: "Não, todas parecem iguais", correta: true },
          { label: "Sim, uma ou duas se destacam", peso: 0 },
          { label: "Não sei dizer com certeza", peso: 0.3 },
        ],
      },
      {
        id: "astig-2",
        titulo: "Cubra um olho de cada vez: as linhas continuam iguais nos dois?",
        ajuda: "Teste primeiro com um olho, depois com o outro.",
        render: () => <AstigmatismChart lines={18} rotate={10} />,
        opcoes: [
          { label: "Sim, iguais nos dois olhos", correta: true },
          { label: "Notei diferença entre os olhos", peso: 0 },
          { label: "Não percebi diferença clara", peso: 0.3 },
        ],
      },
    ],
  },
];

const ALL_QUESTIONS = MODULES.flatMap((m) => m.questions);

type Stage = "inicio" | "instrucoes" | ModuleId | "resultado";

const TABS: { id: Stage; label: string }[] = [
  { id: "inicio", label: "Início" },
  { id: "instrucoes", label: "Instruções" },
  ...MODULES.map((m) => ({ id: m.id as Stage, label: m.label })),
  { id: "resultado", label: "Resultado" },
];

function scoreOf(questions: Question[], answers: Record<string, number>) {
  const answered = questions.filter((q) => answers[q.id] !== undefined);
  const score = answered.reduce((acc, q) => {
    const opt = q.opcoes[answers[q.id]!]!;
    return acc + (opt.correta ? 1 : (opt.peso ?? 0));
  }, 0);
  return { answered: answered.length, total: questions.length, score };
}

export function VisionTest() {
  const [stage, setStage] = useState<Stage>("inicio");
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const overall = scoreOf(ALL_QUESTIONS, answers);
  const completo = overall.answered === overall.total;
  const pct = overall.total > 0 ? overall.score / overall.total : 0;

  const resultado =
    pct >= 0.85
      ? {
          titulo: "Seus resultados não indicaram sinais de dificuldade",
          texto:
            "Você respondeu com facilidade à maior parte dos estímulos. Ainda assim, o exame de rotina continua sendo a única forma segura de acompanhar a sua visão — o recomendado é revisar ao menos uma vez por ano.",
        }
      : pct >= 0.55
        ? {
            titulo: "Alguns sinais merecem uma avaliação presencial",
            texto:
              "Parte das respostas indicou esforço para enxergar ou desconforto visual. Isso pode ter várias causas, e só uma avaliação com profissional pode esclarecer. Nossa equipe pode agendar o seu exame com hora marcada.",
          }
        : {
            titulo: "Vale marcar uma avaliação em breve",
            texto:
              "Suas respostas apontaram dificuldade em vários estímulos. Não é um diagnóstico, mas é um bom motivo para conversar com a nossa equipe e fazer um exame com equipamentos adequados.",
          };

  function answer(question: Question, optIndex: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: optIndex }));
  }

  function reset() {
    setAnswers({});
    setStage("inicio");
  }

  const activeModule = MODULES.find((m) => m.id === stage);

  return (
    <div className="relative overflow-hidden border border-border bg-card">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-gold/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="h-px w-full bg-border">
        <motion.div
          className="h-px bg-gold"
          animate={{ scaleX: overall.total > 0 ? overall.answered / overall.total : 0 }}
          style={{ transformOrigin: "left" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="scrollbar-none flex gap-1 overflow-x-auto border-b border-border px-3 py-3 sm:px-6">
        {TABS.map((t) => {
          const isResultLocked = t.id === "resultado" && !completo;
          return (
            <button
              key={t.id}
              type="button"
              disabled={isResultLocked}
              onClick={() => setStage(t.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 whitespace-nowrap px-3.5 py-2 text-[0.68rem] uppercase tracking-[0.14em] transition-colors",
                stage === t.id
                  ? "bg-ink text-ink-foreground"
                  : isResultLocked
                    ? "cursor-not-allowed text-muted-foreground/40"
                    : "text-muted-foreground hover:text-gold",
              )}
            >
              {isResultLocked ? <Lock className="size-3" /> : null}
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="p-7 sm:p-10">
        <div className="mb-8 flex items-start gap-3 border border-gold/40 bg-gold/10 p-4">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-gold" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Este teste é <strong className="text-ink">educativo e orientativo</strong>. Ele não é um exame,
            não faz diagnóstico e não substitui a avaliação de um profissional na loja.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {stage === "inicio" ? (
            <motion.div
              key="inicio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label-mono">Teste de visão online</span>
              <h3 className="mt-4 text-3xl">Três módulos, um retrato geral da sua visão</h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                O teste é dividido em três partes — perto, percepção de cores e uma triagem simples de
                astigmatismo. Leva menos de 5 minutos e, ao final, você recebe uma orientação sobre os
                próximos passos.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {MODULES.map((m) => (
                  <div key={m.id} className="border border-border bg-background p-5">
                    <p className="text-lg">{m.label}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.intro}</p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStage("instrucoes")}
                className="mt-9 inline-flex items-center gap-2 bg-ink px-7 py-3.5 text-[0.75rem] uppercase tracking-[0.16em] text-ink-foreground transition-colors hover:bg-gold hover:text-ink"
              >
                <Eye className="size-4" /> Ver instruções
              </button>
            </motion.div>
          ) : stage === "instrucoes" ? (
            <motion.div
              key="instrucoes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label-mono">Antes de começar</span>
              <h3 className="mt-4 text-3xl">Como fazer o teste</h3>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {[
                  "Fique a cerca de 60 cm da tela, com o brilho no máximo.",
                  "Prefira um ambiente bem iluminado, sem reflexo na tela.",
                  "Se você usa óculos ou lentes no dia a dia, faça o teste com eles.",
                  "Responda sem apertar os olhos e sem aproximar o rosto.",
                  "Você pode ir e voltar entre os módulos pelas abas acima.",
                ].map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                    className="flex gap-3"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                    {t}
                  </motion.li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setStage("perto")}
                className="mt-9 inline-flex items-center gap-2 bg-ink px-7 py-3.5 text-[0.75rem] uppercase tracking-[0.16em] text-ink-foreground transition-colors hover:bg-gold hover:text-ink"
              >
                <Eye className="size-4" /> Iniciar pelo teste de perto
              </button>
            </motion.div>
          ) : activeModule ? (
            <motion.div
              key={activeModule.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label-mono">{activeModule.label}</span>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{activeModule.intro}</p>

              <div className="mt-8 space-y-10">
                {activeModule.questions.map((q) => (
                  <div key={q.id} className="border-t border-border pt-8 first:border-t-0 first:pt-0">
                    <h4 className="text-xl sm:text-2xl">{q.titulo}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{q.ajuda}</p>

                    {q.render ? (
                      <div className="relative mt-6 grid min-h-40 place-items-center overflow-hidden border border-border bg-background px-6 py-8 text-center">
                        {q.render()}
                      </div>
                    ) : null}

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {q.opcoes.map((o, i) => {
                        const selected = answers[q.id] === i;
                        return (
                          <button
                            key={o.label}
                            type="button"
                            onClick={() => answer(q, i)}
                            className={cn(
                              "group relative flex items-center justify-between overflow-hidden border px-5 py-4 text-left text-sm transition-colors",
                              selected ? "border-gold bg-gold/10 text-ink" : "border-border hover:border-gold",
                            )}
                          >
                            <span className="relative z-10">{o.label}</span>
                            {selected ? <Check className="relative z-10 size-4 text-gold" /> : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                <span className="text-xs text-muted-foreground">
                  {scoreOf(activeModule.questions, answers).answered} de {activeModule.questions.length}{" "}
                  respondidas neste módulo
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const i = MODULES.findIndex((m) => m.id === activeModule.id);
                    const next = MODULES[i + 1];
                    setStage(next ? next.id : "resultado");
                  }}
                  className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-[0.72rem] uppercase tracking-[0.16em] text-ink-foreground transition-colors hover:bg-gold hover:text-ink"
                >
                  {MODULES[MODULES.findIndex((m) => m.id === activeModule.id) + 1]
                    ? "Próximo módulo"
                    : "Ver resultado"}
                </button>
              </div>
            </motion.div>
          ) : completo ? (
            <motion.div
              key="resultado"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label-mono">Resultado orientativo</span>
              <div className="mt-6 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center">
                <ScoreRing pct={pct} />
                <div>
                  <motion.h3
                    className="text-3xl sm:text-4xl"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {resultado.titulo}
                  </motion.h3>
                  <motion.p
                    className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {resultado.texto}
                  </motion.p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {MODULES.map((m) => {
                  const s = scoreOf(m.questions, answers);
                  const modPct = s.total > 0 ? s.score / s.total : 0;
                  return (
                    <div key={m.id} className="border border-border bg-background p-5">
                      <p className="text-sm">{m.label}</p>
                      <div className="mt-3 h-1 w-full bg-border">
                        <motion.div
                          className="h-1 bg-gold"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: modPct }}
                          style={{ transformOrigin: "left" }}
                          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 border border-border bg-background p-6">
                <p className="label-mono">Próximo passo</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Fale com a unidade mais próxima para agendar o seu exame e conversar sobre armações e
                  lentes com a nossa equipe.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {STORES.map((s) => (
                    <a
                      key={s.id}
                      href={s.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-ink px-6 py-3 text-[0.72rem] uppercase tracking-[0.16em] text-ink-foreground transition-colors hover:bg-gold hover:text-ink"
                    >
                      Agendar em {s.cidade}
                    </a>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={reset}
                className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-gold"
              >
                <RotateCcw className="size-3.5" /> Refazer o teste
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="resultado-bloqueado"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="label-mono">Resultado</span>
              <h3 className="mt-4 text-2xl sm:text-3xl">Responda os três módulos para ver o resultado</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Faltam {overall.total - overall.answered} pergunta(s). Use as abas acima para completar o
                teste de perto, o teste cromática e o teste de astigmatismo.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {MODULES.map((m) => {
                  const s = scoreOf(m.questions, answers);
                  const done = s.answered === s.total;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setStage(m.id)}
                      className={cn(
                        "border px-5 py-3 text-xs uppercase tracking-[0.14em] transition-colors",
                        done ? "border-gold/40 bg-gold/10 text-ink" : "border-border hover:border-gold",
                      )}
                    >
                      {m.label} — {s.answered}/{s.total}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
