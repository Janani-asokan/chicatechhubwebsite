"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown, X, Sparkles, Briefcase, Target, Lightbulb } from "lucide-react";
import { awards, clients, experience, faqs, processSteps, profile, projects, services, skills, type ClientProject } from "@/lib/content";
import { Chip, Github, icons, Reveal, SectionHeading } from "./ui";

const wrap = "mx-auto w-[min(1180px,100%-32px)]";

/* ---------- Trust marquee ---------- */
export function Marquee() {
  const items = ["Signify (Philips)", "Corpus360", "Sri Sakthi Thirumurugan Finance", "VIT Vellore", "ISRO Hackathon", "PitchWar Hackathon", "ISTQB Certified"];
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-navy-800 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-800 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-800 to-transparent" />
      <div className="flex w-max animate-marquee gap-14 hover:[animation-play-state:paused]">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-14 whitespace-nowrap font-display font-semibold text-slate-400">
            {t}<span className="h-1.5 w-1.5 rounded-full bg-gold-400/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- About ---------- */
export function About() {
  const facts = [
    ["Day job", "Cloud API Automation Engineer, Signify"],
    ["Education", "MTech CSE, VIT Vellore"],
    ["Based in", profile.location],
    ["Works with", "Clients across India"],
  ];
  return (
    <section id="about" className="bg-bg py-24 lg:py-28">
      <div className={`${wrap} grid gap-12 lg:grid-cols-[.85fr_1.15fr]`}>
        <SectionHeading kicker="About me" title="Engineer by training, builder by choice." />
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed">{profile.summary}</p>
          <p className="mt-4 text-lg leading-relaxed">
            I started <strong className="text-ink">ChicaTechHub</strong> to bring enterprise-grade discipline to small and growing businesses:
            software that is <strong className="text-ink">tested, secure and reliable from day one</strong>, delivered with clear communication and honest timelines.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {facts.map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-line bg-bg-soft p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{k}</span>
                <p className="font-display font-semibold text-ink">{v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
export function Services() {
  return (
    <section id="services" className="bg-bg-soft py-24 lg:py-28">
      <div className={wrap}>
        <SectionHeading kicker="What ChicaTechHub does" title="Services built for real business outcomes" sub="From a simple invoicing tool to a full lending platform: designed, built, tested and deployed end to end." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal key={s.title} delay={i * 0.06}>
                <motion.article whileHover={{ y: -6 }} className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card p-7 transition-shadow hover:shadow-2xl hover:shadow-navy-900/10">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-gold-400/0 to-teal-400/0 blur-2xl transition duration-500 group-hover:from-gold-400/30 group-hover:to-teal-400/30" />
                  <div className="mb-5 grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br from-gold-400/20 to-teal-400/20 p-3 text-teal-600 dark:text-teal-300">
                    <Icon size={26} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
                  <p className="text-[15px] leading-relaxed">{s.text}</p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Client work ---------- */
function LendingMock() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white text-[12px] text-slate-700 shadow-2xl shadow-black/50">
      <BrowserBar label="Lending Operations · Dashboard" />
      <div className="p-4">
        <div className="mb-4 grid grid-cols-3 gap-2">
          {[["Active loans", "412"], ["Collected", "₹18.6L"], ["On-time", "96%"]].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-slate-50 p-2.5"><small className="block text-[10px] text-slate-500">{k}</small><b className="font-display text-base text-slate-900">{v}</b></div>
          ))}
        </div>
        <div className="flex h-28 items-end gap-2 px-1">
          {[45, 62, 54, 78, 70, 88, 94].map((h, i) => (
            <motion.span key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`flex-1 rounded-t-md ${i > 3 ? "bg-gradient-to-t from-teal-300 to-teal-500" : "bg-gradient-to-t from-gold-300 to-gold-400"}`} />
          ))}
        </div>
        <p className="mt-2 text-right text-[10px] text-slate-400">Illustrative preview</p>
      </div>
    </div>
  );
}
function BillingMock() {
  const rows = [["PO-1042", "Sri Traders", "Received", "₹48,200"], ["PO-1043", "KV Agencies", "Pending", "₹12,750"], ["PO-1044", "Ganesh Dist.", "Received", "₹31,900"], ["PO-1045", "Arun & Co", "Draft", "₹6,480"]];
  const pill: Record<string, string> = { Received: "bg-green-100 text-green-800", Pending: "bg-amber-100 text-amber-800", Draft: "bg-slate-200 text-slate-600" };
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white text-[12px] text-slate-700 shadow-2xl shadow-black/50">
      <BrowserBar label="Corpus360 · Purchase Orders" />
      <div className="p-3">
        <div className="grid grid-cols-[.9fr_1.3fr_1fr_.9fr] gap-2 px-2 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500"><span>PO #</span><span>Supplier</span><span>Status</span><span className="text-right">Amount</span></div>
        {rows.map((r, i) => (
          <motion.div key={r[0]} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="grid grid-cols-[.9fr_1.3fr_1fr_.9fr] items-center gap-2 border-t border-slate-100 px-2 py-2.5 text-slate-900">
            <span>{r[0]}</span><span className="truncate">{r[1]}</span><span><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${pill[r[2]]}`}>{r[2]}</span></span><span className="text-right font-semibold">{r[3]}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
function BrowserBar({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3.5 py-2.5">
      <i className="h-2.5 w-2.5 rounded-full bg-red-400" /><i className="h-2.5 w-2.5 rounded-full bg-amber-400" /><i className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      <span className="ml-2 truncate text-[11px] font-medium text-slate-500">{label}</span>
    </div>
  );
}

export function ClientWork() {
  const [open, setOpen] = useState<ClientProject | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="work" className="bg-bg py-24 lg:py-28">
      <div className={wrap}>
        <SectionHeading kicker="Client work" title="Live products, running real businesses" sub="Both platforms are in production and used daily by their owners. Open the case study or try them live." />
        <div className="space-y-8">
          {clients.map((c, i) => (
            <Reveal key={c.id}>
              <article className="grid overflow-hidden rounded-[28px] border border-line bg-card shadow-xl shadow-navy-900/5 lg:grid-cols-2">
                <div className={`relative grid place-items-center overflow-hidden px-6 py-12 ${i % 2 ? "lg:order-2" : ""} ${c.id === "lending" ? "bg-gradient-to-br from-[#1a1446] via-[#2a1f4a] to-[#3b2a12]" : "bg-gradient-to-br from-[#0f2a4a] to-[#134e5e]"}`}>
                  <div className="grid-bg absolute inset-0 opacity-60" />
                  <div className="relative w-full max-w-md">{c.id === "lending" ? <LendingMock /> : <BillingMock />}</div>
                </div>
                <div className="flex flex-col p-7 sm:p-10">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {c.flagship && <span className="inline-flex items-center gap-1 rounded-full bg-gold-400/15 px-3 py-1 text-xs font-bold text-gold-500"><Sparkles size={12} /> Flagship project</span>}
                    <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-bold text-teal-600 dark:text-teal-300">{c.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold sm:text-[1.7rem]">{c.name}</h3>
                  <p className="mt-1 font-medium text-gold-500">{c.tagline}</p>
                  <p className="mt-4">{c.summary}</p>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {c.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[15px]"><Check size={18} className="mt-0.5 flex-none rounded-full bg-teal-500/15 p-0.5 text-teal-600 dark:text-teal-300" />{f}</li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-line pt-6 mt-8">
                    <button onClick={() => setOpen(c)} className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-300">Read Case Study</button>
                    <a href={c.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:-translate-y-0.5 hover:bg-gold-300">View Live <ArrowUpRight size={16} /></a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-navy-950/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div role="dialog" aria-modal="true" aria-label={`${open.name} case study`}
              initial={{ y: 40, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ type: "spring", damping: 26, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-card p-7 shadow-2xl sm:p-10">
              <button onClick={() => setOpen(null)} aria-label="Close" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full hover:bg-bg-soft"><X size={20} /></button>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-600 dark:text-teal-400">Case study · {open.category}</p>
              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">{open.name}</h3>
              <p className="mt-1 font-medium text-gold-500">{open.tagline}</p>
              {[[Target, "The challenge", open.challenge], [Lightbulb, "The solution", open.solution]].map(([Icon, t, body]) => {
                const I = Icon as typeof Target;
                return (
                  <div key={t as string} className="mt-6 flex gap-4">
                    <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-bg-soft text-teal-600 dark:text-teal-300"><I size={20} /></span>
                    <div><h4 className="font-semibold">{t as string}</h4><p className="mt-1">{body as string}</p></div>
                  </div>
                );
              })}
              <div className="mt-6 flex gap-4">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-bg-soft text-teal-600 dark:text-teal-300"><Briefcase size={20} /></span>
                <div>
                  <h4 className="font-semibold">What was delivered</h4>
                  <ul className="mt-2 space-y-1.5">{open.features.map((f) => <li key={f} className="flex gap-2"><Check size={16} className="mt-1 text-teal-500" />{f}</li>)}</ul>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">{open.stack.map((s) => <Chip key={s}>{s}</Chip>)}</div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={open.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-6 py-3 font-semibold text-navy-900 hover:bg-gold-300">View Live <ArrowUpRight size={18} /></a>
                <a href="#contact" onClick={() => setOpen(null)} className="rounded-full border border-line px-6 py-3 font-semibold text-ink hover:border-teal-500">Build something similar</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Experience timeline ---------- */
export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden bg-navy-900 py-24 text-slate-300 lg:py-28">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className={`${wrap} relative grid gap-12 lg:grid-cols-[.8fr_1.2fr]`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading light kicker="Experience" title="Enterprise-grade engineering, brought to your project." sub="The same testing and reliability practices used on connected-lighting products worldwide go into every ChicaTechHub delivery." />
        </div>
        <ol className="relative space-y-6 border-l border-white/10 pl-8">
          {experience.map((e, i) => (
            <Reveal key={e.role} delay={i * 0.08}>
              <li className="relative">
                <span className="absolute -left-[41px] top-7 h-4 w-4 rounded-full border-4 border-navy-900 bg-gradient-to-br from-gold-400 to-teal-400" />
                <div className="rounded-3xl border border-white/10 bg-navy-800/80 p-7 transition hover:border-gold-400/40">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold !text-white">{e.role}</h3>
                      <p className="text-sm font-medium text-gold-400">{e.company} · {e.location}</p>
                    </div>
                    <span className="rounded-full bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-300">{e.period}</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {e.points.map((p) => <li key={p} className="flex gap-2.5 text-[15px]"><Check size={16} className="mt-1 flex-none text-gold-400" />{p}</li>)}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Projects with filter ---------- */
export function Projects() {
  const cats = ["All", "AI / ML", "IoT", "NLP"] as const;
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const list = projects.filter((p) => cat === "All" || p.category === cat);
  return (
    <section id="projects" className="bg-bg py-24 lg:py-28">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading kicker="Selected projects" title="AI and IoT systems with measurable impact" />
          <Reveal className="mb-12 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${cat === c ? "text-navy-900" : "text-body hover:text-ink"}`}>
                {cat === c && <motion.span layoutId="proj-filter" className="absolute inset-0 -z-0 rounded-full bg-gold-400" />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </Reveal>
        </div>
        <motion.div layout className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.article layout key={p.title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}
                className="group flex flex-col rounded-3xl border border-line bg-card p-7 transition-shadow hover:shadow-2xl hover:shadow-navy-900/10">
                <div className="mb-4 flex items-baseline gap-2.5">
                  <b className="text-gradient font-display text-3xl font-extrabold">{p.metric}</b>
                  <span className="text-sm text-slate-500">{p.metricLabel}</span>
                </div>
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1">{p.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">{p.tags.map((t) => <Chip key={t}>{t}</Chip>)}</div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-gold-500 dark:text-teal-300">
                    <Github size={16} /> View on GitHub <ArrowUpRight size={14} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Awards ---------- */
export function Awards() {
  return (
    <section id="achievements" className="bg-bg-soft py-24 lg:py-28">
      <div className={wrap}>
        <SectionHeading kicker="Achievements & credentials" title="Recognised for innovation" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((a, i) => {
            const Icon = icons[a.icon];
            return (
              <Reveal key={a.title} delay={i * 0.05}>
                <div className="flex h-full gap-4 rounded-2xl border border-line bg-card p-5 transition hover:-translate-y-1 hover:border-gold-400/50">
                  <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-gradient-to-br from-gold-400/20 to-teal-400/20 text-gold-500"><Icon size={22} /></span>
                  <div><h4 className="font-semibold">{a.title}</h4><p className="mt-1 text-sm">{a.text}</p></div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills tabs ---------- */
export function Skills() {
  const groups = Object.keys(skills);
  const [tab, setTab] = useState(groups[0]);
  return (
    <section id="skills" className="bg-bg py-24 lg:py-28">
      <div className={wrap}>
        <SectionHeading kicker="Tech stack" title="Tools I use to deliver" />
        <Reveal>
          <div className="rounded-[28px] border border-line bg-card p-3 sm:p-4">
            <div className="flex gap-1 overflow-x-auto rounded-2xl bg-bg-soft p-1.5 [scrollbar-width:none]">
              {groups.map((g) => (
                <button key={g} onClick={() => setTab(g)} className={`relative flex-none rounded-xl px-4 py-2.5 text-sm font-semibold transition ${tab === g ? "text-ink" : "text-slate-500 hover:text-ink"}`}>
                  {tab === g && <motion.span layoutId="skill-tab" className="absolute inset-0 rounded-xl bg-card shadow-md" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  <span className="relative">{g}</span>
                </button>
              ))}
            </div>
            <div className="min-h-[140px] p-5 sm:p-7">
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="flex flex-wrap gap-3">
                  {skills[tab].map((s, i) => (
                    <motion.span key={s} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
                      className="rounded-xl border border-line bg-bg-soft px-4 py-2.5 font-medium text-ink transition hover:-translate-y-0.5 hover:border-teal-500">
                      {s}
                    </motion.span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
export function Process() {
  return (
    <section id="process" className="bg-bg-soft py-24 lg:py-28">
      <div className={wrap}>
        <SectionHeading kicker="How we work together" title="A clear process, no surprises" />
        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-gold-400/0 via-gold-400/50 to-teal-400/0 lg:block" />
          {processSteps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="relative h-full rounded-3xl border border-line bg-card p-7">
                <span className="relative z-10 mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 font-display text-lg font-bold text-gold-400 ring-4 ring-bg-soft">0{i + 1}</span>
                <h4 className="text-lg font-semibold">{s.title}</h4>
                <p className="mt-2 text-[15px]">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-bg py-24 lg:py-28">
      <div className={`${wrap} grid gap-10 lg:grid-cols-[.8fr_1.2fr]`}>
        <SectionHeading kicker="FAQ" title="Questions clients usually ask" sub="Can't find your answer? Send a message and I'll reply within 24 hours." />
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className={`rounded-2xl border bg-card transition ${open === i ? "border-teal-500/50 shadow-lg shadow-navy-900/5" : "border-line"}`}>
                <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 p-5 text-left font-display font-semibold text-ink">
                  {f.q}
                  <ChevronDown size={20} className={`flex-none transition-transform duration-300 ${open === i ? "rotate-180 text-teal-500" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="px-5 pb-5">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
