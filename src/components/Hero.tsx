"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Zap, Rocket } from "lucide-react";
import { profile, stats } from "@/lib/content";
import { Counter } from "./ui";

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative flex h-[1.3em] overflow-hidden align-bottom sm:inline-flex">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient whitespace-nowrap"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  // subtle 3D tilt on the photo
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  return (
    <section id="top" className="relative overflow-hidden bg-navy-900 pb-20 pt-32 text-slate-300 lg:pb-28 lg:pt-40">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#1d3560] opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-60 -left-40 h-[520px] w-[520px] rounded-full bg-teal-500/20 blur-3xl" />

      <div className="relative mx-auto grid w-[min(1180px,100%-32px)] items-center gap-14 lg:grid-cols-[1.15fr_.85fr]">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
          <motion.p variants={fade} className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-sm font-semibold text-teal-300">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
            Available for new projects
          </motion.p>
          <motion.h1 variants={fade} className="text-4xl font-extrabold leading-[1.1] tracking-tight !text-white sm:text-5xl lg:text-[3.5rem]">
            Software that runs <br className="hidden sm:block" />your business.
            <span className="mt-3 block text-2xl font-bold sm:text-3xl lg:text-4xl">
              <span className="text-slate-400">I build </span><RotatingRole />
            </span>
          </motion.h1>
          <motion.p variants={fade} className="mt-6 max-w-xl text-lg leading-relaxed">
            Hi, I&apos;m <strong className="text-white">{profile.name}</strong>, founder of <strong className="text-white">ChicaTechHub</strong>.
            I design and ship reliable business software, backed by my work as a <strong className="text-white">Senior Data Scientist at Aleta Software Solutions</strong>.
          </motion.p>
          <motion.div variants={fade} className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 font-semibold text-navy-900 shadow-xl shadow-gold-400/25 transition hover:-translate-y-0.5 hover:bg-gold-300">
              Get a Free Quote <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </a>
            <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:border-gold-400 hover:text-gold-400">
              See Client Work
            </a>
          </motion.div>
          <motion.dl variants={fade} className="mt-12 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-white"><Counter to={s.value} decimals={s.decimals} suffix={s.suffix} /></dd>
                <dd className="mt-1 text-xs leading-snug text-slate-400">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[400px] [perspective:1000px] max-lg:order-first max-lg:max-w-[300px]"
          onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }}
          onMouseLeave={() => { mx.set(0); my.set(0); }}
        >
          <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative">
            <div className="absolute -inset-[2px] rounded-[30px] bg-gradient-to-br from-gold-400 via-transparent to-teal-400" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-2xl shadow-black/50">
              <Image src={profile.photo} alt={`${profile.name}, founder of ChicaTechHub`} fill priority sizes="(max-width: 1024px) 300px, 400px" className="object-cover object-[50%_18%]" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-900/70 to-transparent" />
            </div>
          </motion.div>
          <FloatCard className="-left-10 top-[12%] max-sm:-left-3 max-sm:top-[3%]" icon={<Zap size={18} />} title="Senior Data Scientist" sub="Aleta Software Solutions" delay={0} />
          <FloatCard className="-right-8 bottom-[18%] max-sm:-right-3 max-sm:bottom-[12%]" icon={<Rocket size={18} />} title="Co-founder & CTO" sub="Corpus365" delay={1.5} />
        </motion.div>
      </div>
    </section>
  );
}

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } };

function FloatCard({ className, icon, title, sub, delay }: { className: string; icon: React.ReactNode; title: string; sub: string; delay: number }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      className={`absolute flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur ${className}`}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-gold-300/40 to-teal-300/40 text-navy-900">{icon}</span>
      <div className="leading-tight">
        <b className="block font-display text-[13px] text-navy-900">{title}</b>
        <small className="text-xs text-slate-500">{sub}</small>
      </div>
    </motion.div>
  );
}
