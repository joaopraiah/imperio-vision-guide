import { motion, useScroll, useSpring, useTransform, type MotionProps } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Word-by-word entrance for display headings.
 *
 * The intersection trigger lives on the outer, unclipped `motion.span` and
 * propagates to each word via variants. Individual words can't carry their
 * own `whileInView`: they start translated out of their own overflow-hidden
 * clip box, so the IntersectionObserver \u2014 which clips the target's rect by
 * every ancestor's overflow \u2014 permanently reads 0% visible on them and the
 * animation never fires.
 */
export function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%", opacity: 0 }, visible: { y: "0%", opacity: 1 } }}
            transition={{ duration: 0.9, delay: delay + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Subtle parallax wrapper driven by scroll position.
 *
 * A `y` translate alone would slide a `size-full` child (typically an
 * `object-cover` image) right off the edge of its box, uncovering a gap.
 * When `cover` is true (the default — use it for images), the moving layer
 * is scaled up a bit more than the translate range and the box always
 * clips (`overflow-hidden`), so it never runs out of image to show. Pass
 * `cover={false}` for non-image content (e.g. a text card) that should
 * just get the subtle translate wobble without scaling or clipping.
 */
export function Parallax({
  children,
  distance = 60,
  cover = true,
  className,
}: {
  children: ReactNode;
  distance?: number;
  cover?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 80, damping: 20, mass: 0.4 });
  const scale = cover ? 1 + (distance / 60) * 0.4 : 1;
  return (
    <div ref={ref} className={cn(cover && "overflow-hidden", className)}>
      <motion.div style={{ y, scale }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

export function Magnetic({ children, ...rest }: { children: ReactNode } & MotionProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Ambient drifting rings used behind dark sections for quiet depth/motion. */
export function FloatingRings({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute size-64", className)} aria-hidden="true">
      <motion.div
        className="absolute inset-0 rounded-full border border-gold/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-0 m-10 rounded-full border border-gold/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-0 -m-4 rounded-full bg-gold/10 blur-3xl"
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gold"
      aria-hidden
    />
  );
}
