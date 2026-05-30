import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";
import { Link } from "wouter";
import { Search, X, Instagram, Mail, Bookmark, ArrowUpLeft } from "lucide-react";
import {
  hero, sections, footer, featuredPiece,
  type Poem, type Section,
} from "@/content";

// ─── Flat search index — built once at module level ────────────
const searchIndex = sections.flatMap((s) =>
  s.poems.map((p) => ({ ...p, sectionTitle: s.title, sectionId: s.id }))
);

// ─── Animation wrapper ─────────────────────────────────────────
const FadeIn = memo(({
  children, delay = 0, className = "",
}: {
  children: React.ReactNode; delay?: number; className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
));

// ─── Global star field — computed once outside component ───────
const DOTS = Array.from({ length: 70 }, (_, i) => {
  const rand = Math.random();
  const size = rand < 0.7 ? 1 : rand < 0.9 ? 1.5 : 2;
  const baseOp = parseFloat((size === 1 ? 0.06 + Math.random() * 0.14 : 0.1 + Math.random() * 0.2).toFixed(3));
  return { id: i, x: Math.random() * 100, y: Math.random() * 100, size, baseOp,
    twinkles: Math.random() < 0.25, duration: parseFloat((5 + Math.random() * 9).toFixed(1)),
    delay: parseFloat((Math.random() * 14).toFixed(1)) };
});

const SPARKLES = Array.from({ length: 11 }, (_, i) => ({
  id: i, x: parseFloat((5 + Math.random() * 90).toFixed(2)), y: parseFloat((5 + Math.random() * 88).toFixed(2)),
  size: parseFloat((8 + Math.random() * 12).toFixed(1)), baseOp: parseFloat((0.22 + Math.random() * 0.35).toFixed(2)),
  twinkles: Math.random() < 0.55, duration: parseFloat((4 + Math.random() * 7).toFixed(1)),
  delay: parseFloat((Math.random() * 10).toFixed(1)),
}));

const GlobalStars = memo(() => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }} aria-hidden="true">
    {DOTS.map((s) => (
      <div key={`dot-${s.id}`} className={s.twinkles ? "star-twinkle" : ""}
        style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
          width: `${s.size}px`, height: `${s.size}px`, borderRadius: "50%",
          backgroundColor: "hsl(44, 45%, 88%)", opacity: s.baseOp,
          ["--star-op" as string]: s.baseOp, animationDuration: `${s.duration}s`, animationDelay: `${s.delay}s` }} />
    ))}
    {SPARKLES.map((s) => (
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
));

// ─── Vertical scroll indicator ─────────────────────────────────
const ScrollIndicator = memo(({ progress }: { progress: number }) => (
  <div className="fixed left-5 top-0 bottom-0 flex-col items-center pointer-events-none hidden md:flex" style={{ zIndex: 38 }}>
    <div className="flex-1 w-px relative mt-24" style={{ backgroundColor: "hsl(38 63% 90% / 0.07)" }}>
      <div className="absolute top-0 left-0 w-full transition-none"
        style={{ height: `${progress * 100}%`, backgroundColor: "hsl(44 60% 55% / 0.45)" }} />
    </div>
    <div className="flex flex-col items-center gap-3 mb-8">
      <span className="text-[7px] tracking-[0.45em] text-muted-foreground/28 uppercase font-light"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>scroll</span>
      <span className="text-muted-foreground/25 text-[10px]">↓</span>
    </div>
  </div>
));

// ─── Social links ──────────────────────────────────────────────
const SocialLinks = memo(() => (
  <div className="fixed bottom-7 right-7 hidden md:flex items-center gap-4 pointer-events-auto" style={{ zIndex: 38 }}>
    {footer.links.map((link, i) => {
      const Icon = i === 0 ? Instagram : i === 1 ? Bookmark : Mail;
      return (
        <a key={link.id} href={link.href}
          className="text-muted-foreground/28 hover:text-primary/65 transition-colors duration-500" aria-label={link.label}>
          <Icon size={14} strokeWidth={1.2} />
        </a>
      );
    })}
  </div>
));

// ─── Crescent moon ─────────────────────────────────────────────
const Moon = memo(() => (
  <svg className="absolute top-4 right-0 md:right-4 w-60 h-60 md:w-[22rem] md:h-[22rem] pointer-events-none select-none"
    viewBox="0 0 320 320" aria-hidden="true">
    <defs>
      <mask id="crescent">
        <circle cx="160" cy="130" r="115" fill="white" />
        <circle cx="180" cy="122" r="108" fill="black" />
      </mask>
      <radialGradient id="moon-glow" cx="50%" cy="40%" r="55%">
        <stop offset="0%"   stopColor="hsl(44, 80%, 60%)" stopOpacity="0.1"  />
        <stop offset="45%"  stopColor="hsl(44, 70%, 45%)" stopOpacity="0.04" />
        <stop offset="100%" stopColor="hsl(44, 60%, 30%)" stopOpacity="0"    />
      </radialGradient>
    </defs>
    <circle cx="160" cy="130" r="140" fill="url(#moon-glow)" />
    <circle cx="160" cy="130" r="115" fill="hsl(44, 58%, 82%)" mask="url(#crescent)" opacity="0.12" />
    <circle cx="160" cy="130" r="115" fill="none" stroke="hsl(44, 58%, 82%)" strokeWidth="0.5" opacity="0.07" />
  </svg>
));

// ─── Search overlay ────────────────────────────────────────────
const SearchOverlay = memo(({
  onClose,
  onRead,
}: {
  onClose: () => void;
  onRead: (p: Poem & { sectionTitle: string }) => void;
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return searchIndex.filter(
      (p) => p.title.toLowerCase().includes(q) || p.text.toLowerCase().includes(q) || p.sectionTitle.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ backgroundColor: "rgba(5,5,5,0.97)" }}
    >
      <div className="flex-1 flex flex-col items-center justify-start pt-32 px-8 max-w-2xl mx-auto w-full">
        <div className="w-full flex items-center gap-4 border-b border-white/[0.08] pb-4 mb-12">
          <Search size={14} className="text-muted-foreground/35 flex-shrink-0" strokeWidth={1.2} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search poems, titles, chapters…"
            className="flex-1 bg-transparent font-serif text-xl text-foreground/75 placeholder:text-muted-foreground/25 outline-none font-light italic"
          />
          <button onClick={onClose} className="text-muted-foreground/30 hover:text-foreground/60 transition-colors duration-300">
            <X size={16} strokeWidth={1.2} />
          </button>
        </div>

        <div className="w-full space-y-1">
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="font-serif italic text-sm text-muted-foreground/28 text-center mt-8">
              nothing found in the archive.
            </p>
          )}
          {results.map((p) => (
            <button
              key={p.id}
              onClick={() => { onRead(p); onClose(); }}
              className="w-full text-left py-5 px-2 border-b border-white/[0.04] group hover:border-primary/15 transition-colors duration-300"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <p className="text-[9px] font-mono tracking-[0.3em] text-primary/38 uppercase group-hover:text-primary/55 transition-colors">
                  {p.sectionTitle}
                </p>
                <span className="text-muted-foreground/20 text-[8px]">·</span>
                <p className="font-serif italic text-sm text-foreground/42 group-hover:text-foreground/60 transition-colors">
                  {p.title}
                </p>
              </div>
              <p className="font-serif text-base text-foreground/52 font-light leading-relaxed group-hover:text-foreground/70 transition-colors line-clamp-2">
                {p.text}
              </p>
            </button>
          ))}
        </div>

        {query.trim().length < 2 && (
          <p className="font-serif italic text-sm text-muted-foreground/22 mt-8">
            begin typing to search the archive
          </p>
        )}
      </div>
    </motion.div>
  );
});

// ─── Reading mode overlay ──────────────────────────────────────
const ReadingOverlay = memo(({
  poem,
  onClose,
}: {
  poem: (Poem & { sectionTitle: string }) | null;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (!poem) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [poem, onClose]);

  return (
    <AnimatePresence>
      {poem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-8"
          style={{ backgroundColor: "#050505" }}
        >
          <button
            onClick={onClose}
            className="fixed top-8 left-8 flex items-center gap-2 text-[9px] tracking-[0.35em] uppercase text-muted-foreground/28 hover:text-primary/55 transition-colors duration-400 font-light"
            aria-label="Return to archive"
          >
            <ArrowUpLeft size={13} strokeWidth={1.2} />
            archive
          </button>

          <div className="max-w-lg mx-auto w-full">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.15 }}
              className="text-[9px] font-mono tracking-[0.38em] text-primary/35 uppercase mb-8"
            >
              {poem.sectionTitle}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="font-serif italic text-foreground/42 text-base tracking-[0.12em] mb-12"
            >
              {poem.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-foreground/80 font-light text-xl md:text-2xl leading-[2.1] whitespace-pre-line"
            >
              {poem.text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.0 }}
              className="mt-16 flex items-center gap-5"
            >
              <div className="h-px w-8 bg-primary/14" />
              <span className="text-primary/20 text-[9px]">✦</span>
              <div className="h-px w-8 bg-primary/14" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

// ─── Navigation ────────────────────────────────────────────────
const Nav = memo(({ onSearchOpen }: { onSearchOpen: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(s.id); },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-1000 ${
        scrolled ? "bg-background/82 backdrop-blur-xl border-b border-white/[0.04]" : "bg-transparent"
      }`}
    >
      <div className="px-8 md:px-10 h-[72px] flex items-center justify-between">
        <a href="#hero"
          className="font-serif text-base text-foreground/70 tracking-wider hover:text-foreground/90 transition-colors duration-700 flex-shrink-0"
          data-testid="nav-brand">
          <span className="font-extralight">2:17 </span>
          <span className="italic text-primary/55 font-thin">AM</span>
        </a>

        <div className="hidden md:flex items-start gap-0 absolute left-1/2 -translate-x-1/2">
          {sections.map((s, idx) => {
            const isActive = activeSection === s.id;
            const num = String(idx + 1).padStart(2, "0");
            return (
              <div key={s.id} className="flex items-start">
                {idx > 0 && (
                  <span className="text-primary/22 text-[11px] mt-[18px] mx-4 select-none">+</span>
                )}
                <a href={`#${s.id}`}
                  className="group flex flex-col items-center gap-[5px] relative pt-1 pb-2 px-1"
                  data-testid={`nav-${s.id}`}>
                  <span className="text-[11px] font-mono tracking-[0.22em] text-primary/52 group-hover:text-primary/75 transition-colors duration-400 font-medium">
                    {num}
                  </span>
                  <span className={`font-serif text-[12px] leading-[1.45] tracking-wide text-center max-w-[120px] transition-colors duration-400 ${
                    isActive ? "text-foreground/80" : "text-foreground/45 group-hover:text-foreground/75"
                  }`}>
                    {s.title}
                  </span>
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-primary/50 transition-all duration-500 ${
                    isActive ? "w-4/5" : "w-0 group-hover:w-4/5"
                  }`} />
                </a>
              </div>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-5 flex-shrink-0">
          <button
            onClick={onSearchOpen}
            className="text-foreground/28 hover:text-foreground/65 transition-colors duration-400"
            aria-label="Search archive"
          >
            <Search size={13} strokeWidth={1.2} />
          </button>
          <Link
            href="/about"
            className="flex items-center gap-1.5 text-[11px] tracking-[0.22em] text-foreground/32 hover:text-foreground/65 transition-colors duration-500 font-light"
          >
            about <span className="text-primary/40 text-[9px]">✦</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
});

// ─── Section title block ───────────────────────────────────────
const SectionTitle = memo(({ section, index }: { section: Section; index: number }) => (
  <FadeIn>
    <div className="flex items-start gap-6 mb-20 md:mb-28">
      <div className="w-px h-14 bg-primary/18 mt-2 flex-shrink-0" />
      <div className="flex flex-col gap-[7px]">
        <span className="text-[9px] font-mono tracking-[0.38em] text-primary/38 uppercase">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2
          className="font-serif italic text-2xl md:text-3xl text-foreground/46 font-light tracking-wide leading-snug"
          data-testid={`section-title-${section.id}`}
        >
          {section.title}
        </h2>
      </div>
    </div>
  </FadeIn>
));

// ─── Divider between poems ─────────────────────────────────────
const PoemDivider = memo(() => (
  <div className="flex justify-center py-14 md:py-18" aria-hidden="true">
    <div className="w-px h-10 bg-gradient-to-b from-transparent via-foreground/[0.08] to-transparent" />
  </div>
));

// ─── Divider between sections ──────────────────────────────────
const SectionDivider = memo(() => (
  <div className="w-full flex justify-center py-40 md:py-52">
    <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
  </div>
));

// ─── Single poem block ─────────────────────────────────────────
const PoemBlock = ({
  poem, sectionTitle, onRead,
}: {
  poem: Poem; sectionTitle: string;
  onRead: (p: Poem & { sectionTitle: string }) => void;
}) => {
  const readPayload = useMemo(() => ({ ...poem, sectionTitle }), [poem, sectionTitle]);
  const handleClick = useCallback(() => onRead(readPayload), [onRead, readPayload]);

  return (
    <FadeIn>
      <article
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter") handleClick(); }}
        className="group cursor-pointer"
        data-testid={poem.id}
        title="Read in full"
      >
        <h3 className="font-serif italic text-foreground/36 text-[17px] tracking-[0.12em] mb-10 group-hover:text-foreground/55 transition-colors duration-500">
          {poem.title}
        </h3>
        <p className="font-serif text-foreground/70 font-light text-[17px] md:text-[18px] leading-[2.1] whitespace-pre-line group-hover:text-foreground/84 transition-colors duration-500">
          {poem.text}
        </p>
      </article>
    </FadeIn>
  );
};

// ─── Featured piece ────────────────────────────────────────────
const FeaturedBlock = memo(({ onRead }: { onRead: () => void }) => {
  if (!featuredPiece.enabled) return null;
  return (
    <FadeIn>
      <div className="px-8 md:px-16 py-24 md:py-36">
        <div className="container mx-auto max-w-2xl">
          <div className="max-w-xl flex flex-col gap-10">
              <p className="text-[18px] md:text-[22px] font-serif italic tracking-[0.15em] text-primary/75 uppercase text-center">
              featured poem
            </p>
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="h-px w-24 bg-primary/30" />
              <span className="text-primary/70 text-[18px]">✦</span>
              <div className="h-px w-24 bg-primary/30" />
            </div>
            <button
              onClick={onRead}
              className="group text-center w-full"
              aria-label={`Read ${featuredPiece.poemTitle}`}
            >
                <p className="font-serif italic text-foreground/50 text-[34px] md:text-[42px] tracking-[0.04em] mb-12 text-center group-hover:text-foreground/70 transition-colors duration-500">
                {featuredPiece.poemTitle}
              </p>
                  <p className="font-serif text-foreground/75 font-light text-[24px] md:text-[32px] leading-[1.8] whitespace-pre-line text-center max-w-4xl mx-auto group-hover:text-foreground/90 transition-colors duration-500">
                {featuredPiece.text}
              </p>
            </button>
            <p className="text-[8px] font-mono tracking-[0.3em] text-muted-foreground/20 uppercase">
              {featuredPiece.chapterTitle}
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
});

// ─── Literary section ──────────────────────────────────────────
const LiterarySection = memo(({
  section, index, isFirst, onRead,
}: {
  section: Section; index: number; isFirst: boolean;
  onRead: (p: Poem & { sectionTitle: string }) => void;
}) => (
  <>
    {!isFirst && <SectionDivider />}
    <section id={section.id} className="px-8 md:px-16 py-32 md:py-48">
      <div className="container mx-auto max-w-2xl">
        <SectionTitle section={section} index={index} />
        <div className="max-w-xl">
          {section.poems.map((poem, pIdx) => (
            <div key={poem.id}>
              <PoemBlock poem={poem} sectionTitle={section.title} onRead={onRead} />
              {pIdx < section.poems.length - 1 && <PoemDivider />}
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
));

// ─── Page ──────────────────────────────────────────────────────
export default function Home() {
  const [progress, setProgress] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [readingPoem, setReadingPoem] = useState<(Poem & { sectionTitle: string }) | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openReading = useCallback((p: Poem & { sectionTitle: string }) => setReadingPoem(p), []);
  const closeReading = useCallback(() => setReadingPoem(null), []);

  const featuredReadPayload = useMemo<Poem & { sectionTitle: string }>(() => ({
    id: featuredPiece.poemId,
    title: featuredPiece.poemTitle,
    text: featuredPiece.text,
    sectionTitle: featuredPiece.chapterTitle,
  }), []);

  return (
    <div className="min-h-screen bg-grain overflow-x-hidden">
      <GlobalStars />
      <ScrollIndicator progress={progress} />
      <SocialLinks />
      <Nav onSearchOpen={openSearch} />

      <AnimatePresence>
        {searchOpen && <SearchOverlay onClose={closeSearch} onRead={openReading} />}
      </AnimatePresence>
      <ReadingOverlay poem={readingPoem} onClose={closeReading} />

      {/* ── Hero ── */}
      <section id="hero" className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-black pointer-events-none z-0" />
        <div className="absolute inset-0 z-[2] pointer-events-none"><Moon /></div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 3.2 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-7xl md:text-9xl lg:text-[11rem] tracking-tight font-extralight text-foreground/90"
              data-testid="hero-title"
            >
              {hero.title}{" "}
              <span className="italic text-primary/58 font-thin">{hero.titleAccent}</span>
            </motion.h1>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5, delay: 2 }}
            className="mt-8 mb-16 flex flex-col items-center gap-4">
            <div className="flex items-center gap-5">
              <div className="h-px w-16 bg-primary/20" />
              <span className="text-primary/35 text-[10px]">✦</span>
              <div className="h-px w-16 bg-primary/20" />
            </div>
            <p className="text-[10px] tracking-[0.6em] uppercase text-foreground/38 font-light" data-testid="hero-author">
              {hero.author}
            </p>
          </motion.div>

          <FadeIn delay={2.2}>
            <p className="font-serif text-xl md:text-2xl text-foreground/48 leading-[2] font-light italic text-balance max-w-sm mx-auto"
              data-testid="hero-intro">
              {hero.intro}
            </p>
          </FadeIn>

          <FadeIn delay={3}>
            <div className="mt-16 flex flex-col items-center gap-3">
              <span className="text-[9px] tracking-[0.5em] uppercase text-muted-foreground/30 font-light">enter the archive</span>
              <div className="w-px h-8 bg-gradient-to-b from-primary/25 to-transparent" />
              <span className="text-muted-foreground/25 text-xs">↓</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Featured piece ── */}
      <FeaturedBlock onRead={() => openReading(featuredReadPayload)} />

      {/* ── Literary sections ── */}
      {sections.map((section, i) => (
        <LiterarySection key={section.id} section={section} index={i} isFirst={i === 0} onRead={openReading} />
      ))}

      {/* ── Footer ── */}
      <footer className="py-56 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-background to-background pointer-events-none" />
        <div className="container mx-auto max-w-xl relative z-10 text-center">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 italic font-thin text-foreground/60" data-testid="footer-title">
              {footer.title}
            </h2>
            <p className="font-serif text-sm text-muted-foreground/65 leading-relaxed font-light italic mb-12">{footer.tagline}</p>
            <p className="font-serif italic text-sm text-muted-foreground/70 mb-20">{footer.colophon}</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
              {footer.links.map((link) => (
                <a key={link.id} href={link.href}
                  className="text-[9px] uppercase tracking-[0.38em] text-muted-foreground/70 hover:text-primary/55 transition-all duration-700 font-light"
                  data-testid={link.id}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-28 text-[9px] font-mono text-muted-foreground/60 tracking-[0.3em]" data-testid="footer-copyright">
              &copy; {new Date().getFullYear()} {hero.author}
            </div>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}
