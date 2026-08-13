import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, Eye, RotateCcw } from "lucide-react";
import { STORES } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type Question = {
  id: string;
  kind: "acuidade" | "contraste" | "cores" | "proximidade" | "sintoma";
  titulo: string;
  ajuda: string;
  render?: (key: string) => React.ReactNode;
  opcoes: { label: string; correta?: boolean; peso?: number }[];
};

function DotMosaic({ digit, hue }: { digit: string; hue: number }) {
  const dots = useMemo(() => {
    const list: { x: number; y: number; r: number }[] = [];
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 900; i++) {
      list.push({ x: rand() * 240, y: rand() * 240, r: 2.2 + rand() * 4.4 });
    }
    return list;
  }, []);

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
            fontFamily="Inter, sans-serif"
            fontWeight="700"
            fill="white"
          >
            {digit}
          </text>
        </mask>
      </defs>
      <circle cx="120" cy="120" r="118" fill="oklch(0.93 0.017 88)" />
      <g clipPath="none">
        {dots.map((d, i) => (
          <circle key={`b-${i}`} cx={d.x} cy={d.y} r={d.r} fill={`hsl(${hue} 34% ${58 + (i % 5) * 4}%)`} />
        ))}
      </g>
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

const QUESTIONS: Question[] = [
  {
    id: "acuidade-1",
    kind: "acuidade",
    titulo: "Qual letra você consegue ler com clareza?",
    ajuda: "Fique a cerca de 60 cm da tela, com boa iluminação e sem apertar os olhos.",
    render: () => <span className="font-mono text-[5.5rem] leading-none tracking-widest">E H</span>,
    opcoes: [
      { label: "E H", correta: true },
      { label: "F N" },
      { label: "B M" },
      { label: "Não consigo distinguir" },
    ],
  },
  {
    id: "acuidade-2",
    kind: "acuidade",
    titulo: "E agora, qual sequência aparece?",
    ajuda: "Mantenha a mesma distância. Não aproxime o rosto da tela.",
    render: () => <span className="font-mono text-5xl leading-none tracking-widest">R K D</span>,
    opcoes: [
      { label: "R K D", correta: true },
      { label: "P X O" },
      { label: "R X O" },
      { label: "Não consigo distinguir" },
    ],
  },
  {
    id: "acuidade-3",
    kind: "acuidade",
    titulo: "Leia a sequência menor",
    ajuda: "Se precisar apertar os olhos para enxergar, escolha a última opção.",
    render: () => <span className="font-mono text-2xl leading-none tracking-widest">Z V T C</span>,
    opcoes: [
      { label: "Z V T C", correta: true },
      { label: "Z U I G" },
      { label: "S V T G" },
      { label: "Preciso apertar os olhos" },
    ],
  },
  {
    id: "contraste",
    kind: "contraste",
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
    id: "cores",
    kind: "cores",
    titulo: "Qual número aparece no mosaico?",
    ajuda: "Teste simples de percepção de cores, apenas orientativo.",
    render: () => <DotMosaic digit="74" hue={95} />,
    opcoes: [{ label: "74", correta: true }, { label: "21" }, { label: "17" }, { label: "Nenhum número" }],
  },
  {
    id: "proximidade",
    kind: "proximidade",
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
    kind: "sintoma",
    titulo: "Com que frequência você sente cansaço visual ou dor de cabeça?",
    ajuda: "Depois de telas, leitura ou direção à noite.",
    opcoes: [
      { label: "Raramente ou nunca", correta: true },
      { label: "Algumas vezes por semana", peso: 0.4 },
      { label: "Quase todos os dias" },
    ],
  },
];

export function VisionTest() {
  const [stage, setStage] = useState<"intro" | "quiz" | "result">("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const total = QUESTIONS.length;
  const question = QUESTIONS[index]!;
  const progress = stage === "result" ? 1 : (index + (answers[question.id] !== undefined ? 1 : 0)) / total;

  const score = useMemo(
    () =>
      QUESTIONS.reduce((acc, q) => {
        const chosen = answers[q.id];
        if (chosen === undefined) return acc;
        const opt = q.opcoes[chosen]!;
        return acc + (opt.correta ? 1 : (opt.peso ?? 0));
      }, 0),
    [answers],
  );

  const pct = score / total;
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

  function answer(optIndex: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: optIndex }));
    window.setTimeout(() => {
      if (index + 1 < total) setIndex((i) => i + 1);
      else setStage("result");
    }, 380);
  }

  function reset() {
    setAnswers({});
    setIndex(0);
    setStage("intro");
  }

  return (
    <div className="border border-border bg-card">
      <div className="h-px w-full bg-border">
        <motion.div
          className="h-px bg-gold"
          animate={{ scaleX: progress }}
          style={{ transformOrigin: "left" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
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
          {stage === "intro" ? (
            <motion.div
              key="intro"
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
                  "São 7 perguntas rápidas, leva menos de 3 minutos.",
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
                onClick={() => setStage("quiz")}
                className="mt-9 inline-flex items-center gap-2 bg-ink px-7 py-3.5 text-[0.75rem] uppercase tracking-[0.16em] text-ink-foreground transition-colors hover:bg-gold hover:text-ink"
              >
                <Eye className="size-4" /> Iniciar o teste
              </button>
            </motion.div>
          ) : stage === "quiz" ? (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="label-mono">
                  Pergunta {index + 1} / {total}
                </span>
                {index > 0 ? (
                  <button
                    type="button"
                    onClick={() => setIndex((i) => i - 1)}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold"
                  >
                    <ArrowLeft className="size-3.5" /> Voltar
                  </button>
                ) : null}
              </div>

              <h3 className="mt-4 text-2xl sm:text-3xl">{question.titulo}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{question.ajuda}</p>

              {question.render ? (
                <div className="mt-8 grid min-h-40 place-items-center border border-border bg-background px-6 py-10 text-center">
                  {question.render(question.id)}
                </div>
              ) : null}

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {question.opcoes.map((o, i) => {
                  const selected = answers[question.id] === i;
                  return (
                    <motion.button
                      key={o.label}
                      type="button"
                      onClick={() => answer(i)}
                      whileHover={{ x: 4 }}
                      className={cn(
                        "flex items-center justify-between border px-5 py-4 text-left text-sm transition-colors",
                        selected ? "border-gold bg-gold/10 text-ink" : "border-border hover:border-gold",
                      )}
                    >
                      {o.label}
                      <ArrowRight className="size-4 text-gold" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label-mono">Resultado orientativo</span>
              <h3 className="mt-4 text-3xl sm:text-4xl">{resultado.titulo}</h3>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {resultado.texto}
              </p>

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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
