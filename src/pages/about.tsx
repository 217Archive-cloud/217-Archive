import { motion } from "framer-motion";
import { useMemo } from "react";
import { Link } from "wouter";
import { about, hero, footer } from "@/content";
import { Instagram, Mail, Bookmark } from "lucide-react";

// ─── Shared animation wrapper ─────────────────────────────────
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// ─── Star field (same as home) ────────────────────────────────
const GlobalStars = () => {
  const dots = useMemo(() =>
    Array.from({ length: 70 }, (_, i) => {
      const rand = Math.random();
      const size = rand < 0.7 ? 1 : rand < 0.9 ? 1.5 : 2;
      const baseOp = parseFloat((size === 1 ? 0.06 + Math.random() * 0.14 : 0.1 + Math.random() * 0.2).toFixed(3));
      return { id: i, x: Math.random() * 100, y: Math.random() * 100, size, baseOp,
        twinkles: Math.random() < 0.25, duration: parseFloat((5 + Math.random() * 9).toFixed(1)),
        delay: parseFloat((Math.random() * 14).toFixed(1)) };
    }), []);

  const sparkles = useMemo(() =>
    Array.from({ length: 9 }, (_, i) => ({
      id: i, x: parseFloat((5 + Math.random() * 90).toFixed(2)), y: parseFloat((5 + Math.random() * 88).toFixed(2)),
      size: parseFloat((8 + Math.random() * 10).toFixed(1)), baseOp: parseFloat((0.22 + Math.random() * 0.32).toFixed(2)),
      twinkles: Math.random() < 0.5, duration: parseFloat((4 + Math.random() * 7).toFixed(1)),
      delay: parseFloat((Math.random() * 10).toFixed(1)),
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }} aria-hidden="true">
      {dots.map((s) => (
        <div key={`dot-${s.id}`} className={s.twinkles ? "star-twinkle" : ""}
          style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.size}px`, height: `${s.size}px`, borderRadius: "50%",
            backgroundColor: "hsl(44, 45%, 88%)", opacity: s.baseOp,
            ["--star-op" as string]: s.baseOp, animationDuration: `${s.duration}s`, animationDelay: `${s.delay}s` }} />
      ))}
      {sparkles.map((s) => (
        <span key={`spark-${s.id}`} className={s.twinkles ? "star-twinkle" : ""}
          style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
            transform: "translate(-50%, -50%)", fontSize: `${s.size}px`, lineHeight: 1,
            color: "hsl(44, 65%, 80%)", opacity: s.baseOp, ["--star-op" as string]: s.baseOp,
            textShadow: `0 0 ${s.size * 0.6}px hsl(44, 80%, 70%), 0 0 ${s.size * 1.2}px hsl(44, 70%, 55%)`,
            userSelect: "none", animationDuration: `${s.duration}s`, animationDelay: `${s.delay}s`, fontFamily: "serif" }}>
          ✦
        </span>
      ))}
    </div>
  );
};

// ─── About nav ────────────────────────────────────────────────
const Nav = () => (
  <motion.nav
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2, delay: 0.5 }}
    className="fixed top-0 left-0 right-0 z-40"
  >
    <div className="px-8 md:px-10 h-[72px] flex items-center justify-between">
      <Link href="/" className="font-serif text-base text-foreground/70 tracking-wider hover:text-foreground/90 transition-colors duration-700">
        <span className="font-extralight">2:17 </span>
        <span className="italic text-primary/55 font-thin">AM</span>
      </Link>
      <Link href="/" className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 hover:text-foreground/65 transition-colors duration-500 font-light">
        ← archive
      </Link>
    </div>
  </motion.nav>
);

// ─── Social links ─────────────────────────────────────────────
const SocialLinks = () => (
  <div className="fixed bottom-7 right-7 hidden md:flex items-center gap-4 pointer-events-auto" style={{ zIndex: 38 }}>
    {footer.links.slice(0, 3).map((link, i) => {
      const Icon = i === 0 ? Instagram : i === 1 ? Bookmark : Mail;
      return (
        <a key={link.id} href={link.href} className="text-muted-foreground/28 hover:text-primary/65 transition-colors duration-500" aria-label={link.label}>
          <Icon size={14} strokeWidth={1.2} />
        </a>
      );
    })}
  </div>
);

// ─── About page ───────────────────────────────────────────────
export default function About() {
  return (
    <div className="min-h-screen bg-grain overflow-x-hidden">
      <GlobalStars />
      <SocialLinks />
      <Nav />

      <main className="min-h-[100dvh] flex flex-col items-center justify-center px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-black pointer-events-none z-0" />

        <div className="relative z-10 max-w-lg mx-auto text-center">

          {/* Author name */}
          <FadeIn delay={0.4}>
            <p className="font-serif italic text-6xl md:text-7xl font-thin text-foreground/80 mb-12">
              {hero.author}
            </p>
          </FadeIn>

          {/* Ornament */}
          <FadeIn delay={0.8}>
            <div className="flex items-center justify-center gap-5 mb-16">
              <div className="h-px w-14 bg-primary/18" />
              <span className="text-primary/32 text-[10px]">✦</span>
              <div className="h-px w-14 bg-primary/18" />
            </div>
          </FadeIn>

          {/* Body paragraphs */}
          {about.paragraphs.map((para, i) => (
            <FadeIn key={i} delay={1.0 + i * 0.35}>
              <p className="font-serif text-lg md:text-xl leading-[2] text-foreground/55 font-light mb-10">
                {para}
              </p>
            </FadeIn>
          ))}

          {/* Closing statement */}
          <FadeIn delay={1.7}>
            <div className="mt-16 mb-6">
              <div className="h-px w-8 bg-primary/15 mx-auto mb-14" />
              <p className="font-serif italic text-2xl md:text-3xl leading-[1.8] text-foreground/65 font-thin whitespace-pre-line">
                {about.closing}
              </p>
            </div>
          </FadeIn>

          {/* Back to archive */}
          <FadeIn delay={2.2}>
            <div className="mt-20">
              <Link href="/" className="text-[9px] tracking-[0.45em] uppercase text-muted-foreground/28 hover:text-primary/55 transition-colors duration-500 font-light">
                enter the archive
              </Link>
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  );
}
