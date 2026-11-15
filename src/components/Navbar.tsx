"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";

const links = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Client Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "faq", label: "FAQ" },
];

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-white" aria-label="ChicaTechHub home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-gold-400 to-teal-500 font-extrabold text-navy-900">C</span>
      <span>Chica<span className="text-gold-400">Tech</span>Hub</span>
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [dark, setDark] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    // sync with the theme applied by the pre-paint script in layout.tsx
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(document.documentElement.classList.contains("dark"));
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => { const el = document.getElementById(l.id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled ? "border-white/10 bg-navy-900/90 backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-gold-400 to-teal-400" />
      <div className="mx-auto flex h-[72px] w-[min(1180px,100%-32px)] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${active === l.id ? "text-white" : "text-slate-400 hover:text-white"}`}>
              {active === l.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} aria-label="Toggle dark mode" className="grid h-10 w-10 place-items-center rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="#contact" className="hidden rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-navy-900 shadow-lg shadow-gold-400/25 transition hover:-translate-y-0.5 hover:bg-gold-300 sm:inline-flex">
            Hire Me
          </a>
          <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-navy-900 lg:hidden"
          >
            <div className="mx-auto flex w-[min(1180px,100%-32px)] flex-col py-3">
              {links.map((l) => (
                <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="border-b border-white/5 py-3.5 font-medium text-slate-300 hover:text-white">{l.label}</a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="mt-4 rounded-full bg-gold-400 py-3 text-center font-semibold text-navy-900">Hire Me</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
