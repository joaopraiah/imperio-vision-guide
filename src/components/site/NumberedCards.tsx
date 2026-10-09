import { m as motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import atendimento from "@/assets/atendimento.webp";
import visagismo from "@/assets/visagismo.webp";
import ajuste from "@/assets/mood-homem-oculos.webp";
import sustentabilidade from "@/assets/sustentabilidade.webp";
import { DIFERENCIAIS } from "@/lib/site-data";
import { RevealWords } from "./motion-primitives";

const IMAGES = [atendimento, visagismo, ajuste, sustentabilidade];

function Card({ i, titulo, texto }: { i: number; titulo: string; texto: string }) {
  return (
    <article className="group flex w-[78vw] shrink-0 snap-start flex-col bg-[#f1f0ee] p-3 sm:w-[22rem] lg:w-[24rem]">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={IMAGES[i % IMAGES.length]}
          alt={titulo}
          loading="lazy"
          decoding="async"
          className="size-full object-cover grayscale-[35%] transition-[filter,transform] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>
      <div className="px-3 pb-5 pt-6">
        <h3 className="text-2xl font-light tracking-[-0.01em] text-ink">
          <span className="mr-2 text-steel">{String(i + 1).padStart(2, "0")}</span>
          {titulo}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">{texto}</p>
      </div>
    </article>
  );
}

/**
 * "Por que as pessoas voltam" em cards numerados (01, 02…), no formato das
 * telas de app da referência. No desktop a seção prende na tela e os cards
 * deslizam na horizontal conforme o scroll vertical; no celular vira um
 * carrossel nativo com snap, sem JS de scroll.
 */
export function NumberedCards() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const el = track.current;
    const row = inner.current;
    if (!el || !row) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      // no celular o carrossel é nativo (overflow-x), sem deslocamento por scroll
      if (!desktop.matches) return setDistance(0);
      const pad = parseFloat(getComputedStyle(el).paddingLeft);
      setDistance(Math.max(0, row.scrollWidth + pad * 2 - el.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    desktop.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      desktop.removeEventListener("change", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);

  return (
    <section ref={section} className="relative bg-background lg:h-[220vh]">
      <div className="flex flex-col justify-center overflow-hidden py-20 md:py-28 lg:sticky lg:top-0 lg:h-svh lg:py-0">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <span className="text-[0.68rem] uppercase tracking-[0.22em] text-forest">
            Diferenciais
          </span>
          <h2 className="mt-4 max-w-2xl text-balance text-3xl font-light uppercase leading-[1.05] text-ink sm:text-4xl md:text-5xl">
            <RevealWords text="Por que as pessoas voltam." />
          </h2>
        </div>
        <div
          ref={track}
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-8 lg:snap-none lg:overflow-visible lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
        >
          <motion.div ref={inner} style={{ x }} className="flex gap-4 lg:gap-6">
            {DIFERENCIAIS.map((d, i) => (
              <Card key={d.titulo} i={i} titulo={d.titulo} texto={d.texto} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
