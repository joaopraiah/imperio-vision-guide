import { m as motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import cena from "@/assets/digital-plus-streaming.webp";
import { OrbitRing } from "./DigitalPlusKit";

/** caminho da lente: do celular (onde a luz nasce) até os olhos */
const FROM = { x: 0.66, y: 0.6 };
const TO = { x: 0.3, y: 0.42 };
const LENS = 0.5; // diâmetro, em fração da largura da foto
const LAYERS = 18;

/**
 * Teaser da Digital+ na home: uma lente atravessa a cena com o scroll. Fora
 * dela, a luz da tela chega crua (azulada, com brilho); dentro, a mesma cena
 * como a Digital+ entrega. A lente é um recorte que anda por transform, com a
 * foto contra-deslocada dentro dela, sem clip-path animado.
 */
export function DigitalPlusLens() {
  const frame = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: e!.contentRect.width, h: e!.contentRect.height }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.0005 });
  const t = useTransform(p, [0.15, 0.7], [0, 1], { clamp: true });

  const d = size.w * LENS;
  const x = useTransform(t, (v) => (FROM.x + (TO.x - FROM.x) * v) * size.w - d / 2);
  const y = useTransform(t, (v) => (FROM.y + (TO.y - FROM.y) * v) * size.h - d / 2);
  const negX = useTransform(x, (v) => -v);
  const negY = useTransform(y, (v) => -v);
  const blocked = useTransform(t, [0, 1], [0.15, 1]);

  return (
    <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        ref={frame}
        className="relative aspect-[4/5] overflow-hidden border border-dp-blue/20 bg-dp-bg-soft shadow-[0_60px_120px_-50px] shadow-dp-blue/60"
      >
        {/* sem filtro: luz da tela crua */}
        <img
          src={cena}
          alt="Pessoa usando o celular à noite, com a luz azul da tela no rosto"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full scale-[1.02] object-cover blur-[1.5px] brightness-90 saturate-[1.2]"
        />
        <div className="absolute inset-0 bg-[#3058ff]/40 mix-blend-color" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_66%_55%,rgba(143,171,255,0.55),transparent_45%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-dp-bg/70 via-transparent to-dp-bg/30" />

        <span className="absolute left-4 top-4 inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-dp-ink/75">
          <span className="size-1.5 rounded-full bg-dp-blue shadow-[0_0_8px_2px] shadow-dp-blue" />
          Sem filtro
        </span>

        {/* a lente */}
        {size.w > 0 ? (
          <motion.div
            style={{ x, y, width: d, height: d }}
            className="absolute left-0 top-0 will-change-transform"
            aria-hidden="true"
          >
            <OrbitRing
              text="COM DIGITAL+ · 18 CAMADAS · BLOQUEADOR DE ELITE · "
              size={300}
              duration={40}
              className="absolute -inset-[13%] size-[126%] text-dp-ink/70"
            />
            <div className="absolute inset-0 overflow-hidden rounded-full shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
              <motion.img
                src={cena}
                alt=""
                loading="lazy"
                decoding="async"
                style={{ x: negX, y: negY, width: size.w, height: size.h }}
                className="absolute left-0 top-0 max-w-none object-cover brightness-[1.1] contrast-[1.05] saturate-[0.85] sepia-[0.28] will-change-transform"
              />
              <div className="absolute inset-0 bg-[#ffb36b]/15 mix-blend-overlay" />
              {/* vidro: reflexo especular, borda e vinheta */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.35),transparent_28%)]" />
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(244,246,255,0.55),inset_0_0_40px_rgba(5,7,15,0.55)]" />
            </div>
            {/* as 18 camadas, na borda do vidro */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
              {Array.from({ length: LAYERS }).map((_, i) => (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r={50 - i * 0.32}
                  fill="none"
                  stroke={i % 3 === 0 ? "#8fabff" : "#f4f6ff"}
                  strokeOpacity={0.1 + (i % 3 === 0 ? 0.25 : 0.06)}
                  strokeWidth="0.18"
                />
              ))}
            </svg>
          </motion.div>
        ) : null}

        {/* espectro: o trecho azul vai sendo bloqueado com o scroll */}
        <figcaption className="absolute inset-x-4 bottom-4">
          <div className="relative h-1.5 overflow-hidden bg-[linear-gradient(90deg,#6d4bff,#3058ff_22%,#2fb8ff_32%,#7fe08a_48%,#f5e25a_64%,#ff9d4a_80%,#ff5a4a)]">
            <motion.div
              style={{ scaleX: blocked }}
              className="absolute inset-y-0 left-0 w-[30%] origin-left bg-dp-bg/85 [background-image:repeating-linear-gradient(135deg,transparent_0_3px,rgba(143,171,255,0.5)_3px_4px)]"
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[0.58rem] uppercase tracking-[0.18em]">
            <span className="text-dp-blue-soft">Luz azul · bloqueada</span>
            <span className="text-dp-ink/60">Luz visível · passa</span>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}
