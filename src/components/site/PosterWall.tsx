import { m as motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import posterHomem from "@/assets/poster-homem.webp";
import posterProduto from "@/assets/poster-produto.webp";
import posterCasal from "@/assets/poster-casal.webp";
import { Reveal, RevealWords } from "./motion-primitives";

type Poster = {
  img: string;
  alt: string;
  topRight: string;
  titulo: string;
  texto?: string;
  rodape: string;
  /** "center" = peça de produto, título no alto e centralizado */
  layout: "bottom" | "center";
  speed: number;
};

const POSTERS: Poster[] = [
  {
    img: posterHomem,
    alt: "Homem de óculos redondos olhando para cima",
    topRight: "Coleção 2026\nArmações premium",
    titulo: "Estilo,\nsem esforço.",
    texto: "Armações escolhidas pelo formato do seu rosto, não pela vitrine.",
    rodape: "Veja melhor.\nSeja visto.",
    layout: "bottom",
    speed: 60,
  },
  {
    img: posterProduto,
    alt: "Armação preta de acetato flutuando",
    topRight: "Feito para o dia a dia",
    titulo: "Some no rosto.\nAparece no estilo.",
    texto: "Acetato, metal e titânio das melhores marcas, ajustados na loja.",
    rodape: "Menos dúvida.\nMais você.",
    layout: "center",
    speed: -30,
  },
  {
    img: posterCasal,
    alt: "Casal de óculos conversando",
    topRight: "Lentes sob medida\nPara a sua rotina",
    titulo: "Conversas,\nmais nítidas.",
    texto: "Lentes ajustadas à sua rotina, para enxergar quem importa.",
    rodape: "Enxergar bem.\nNaturalmente.",
    layout: "bottom",
    speed: 90,
  },
];

function lines(s: string) {
  return s.split("\n").map((l, i) => (
    <span key={i} className="block">
      {l}
    </span>
  ));
}

function PosterCard({ p, progress, i }: { p: Poster; progress: MotionValue<number>; i: number }) {
  const y = useTransform(progress, [0, 1], [p.speed, -p.speed]);
  const dark = p.layout === "bottom";
  return (
    <motion.div style={{ y }} className={i === 1 ? "md:mt-16" : ""}>
      <Reveal delay={i * 0.12}>
        <Link
          to="/marcas"
          className="group relative block aspect-[2/3] overflow-hidden border-[5px] border-[#2a2828] bg-[#e7e5e1] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-out hover:-translate-y-2"
        >
          <img
            src={p.img}
            alt={p.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
          />
          {dark ? (
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
          ) : null}
          <div className={`relative flex h-full flex-col p-5 ${dark ? "text-white" : "text-ink"}`}>
            <div className="flex items-start justify-between text-[0.55rem] uppercase leading-snug tracking-[0.14em]">
              <span className={dark ? "text-ink/80" : ""}>Ótica Império</span>
              <span className={`text-right ${dark ? "text-ink/80" : ""}`}>{lines(p.topRight)}</span>
            </div>
            {p.layout === "center" ? (
              <h3 className="mt-[18%] text-center text-lg font-normal uppercase leading-tight tracking-[0.02em]">
                {lines(p.titulo)}
              </h3>
            ) : null}
            <div className="mt-auto">
              {p.layout === "bottom" ? (
                <h3 className="text-2xl font-normal uppercase leading-[1.05] tracking-[0.01em]">
                  {lines(p.titulo)}
                </h3>
              ) : null}
              {p.texto ? (
                <p
                  className={`mt-3 max-w-[16rem] text-[0.7rem] leading-relaxed ${p.layout === "center" ? "mx-auto text-center" : ""} ${dark ? "text-white/80" : "text-ink/70"}`}
                >
                  {p.texto}
                </p>
              ) : null}
              <p className="mt-6 text-[0.55rem] uppercase leading-snug tracking-[0.14em]">
                {lines(p.rodape)}
              </p>
            </div>
          </div>
        </Link>
      </Reveal>
    </motion.div>
  );
}

/**
 * Parede de pôsteres: três peças de campanha penduradas sobre uma parede
 * ripada com luz de janela. Cada pôster corre numa velocidade diferente no
 * scroll — a parede ganha profundidade sem nenhuma animação contínua.
 */
export function PosterWall() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const light = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      ref={ref}
      className="cv-auto relative overflow-hidden bg-[#ece9e4] px-5 py-24 sm:px-8 md:py-32"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, #f3f1ed 0 18px, #e4e0da 18px 21px, #ece9e4 21px 36px)",
      }}
    >
      {/* faixas de luz da janela atravessando a parede */}
      <motion.div
        aria-hidden="true"
        style={{ x: light }}
        className="pointer-events-none absolute -inset-y-10 left-0 w-[160%] bg-[repeating-linear-gradient(115deg,transparent_0_120px,rgba(255,255,255,0.55)_120px_220px,transparent_220px_340px)] mix-blend-soft-light"
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl text-balance text-3xl font-light uppercase leading-[1.05] text-ink sm:text-4xl md:text-5xl">
            <RevealWords text="A vitrine, do jeito que ela merece." />
          </h2>
          <Reveal delay={0.1}>
            <Link
              to="/marcas"
              className="link-underline inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.18em] text-ink"
            >
              Ver as marcas <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-3 md:gap-10">
          {POSTERS.map((p, i) => (
            <PosterCard key={p.titulo} p={p} progress={scrollYProgress} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
