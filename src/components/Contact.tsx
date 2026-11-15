"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Mail, MessageCircle, Phone } from "lucide-react";
import { budgetOptions, profile, serviceOptions } from "@/lib/content";
import { Logo } from "./Navbar";
import { Github, Linkedin, SectionHeading } from "./ui";

type Form = { service: string; budget: string; name: string; contact: string; company: string; message: string; website: string };
const empty: Form = { service: "", budget: "", name: "", contact: "", company: "", message: "", website: "" };

export function Contact() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiries", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const input = "w-full rounded-xl border-[1.5px] border-line bg-bg-soft px-4 py-3 text-ink outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-card";
  const choice = (active: boolean) => `rounded-xl border-[1.5px] px-4 py-3 text-left text-sm font-medium transition ${active ? "border-gold-400 bg-gold-400/10 text-ink" : "border-line text-body hover:border-teal-500"}`;

  const contacts = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: profile.phone, href: `tel:+${profile.phoneRaw}` },
    { icon: MessageCircle, label: "Chat on WhatsApp", href: `https://wa.me/${profile.phoneRaw}` },
    { icon: Linkedin, label: "LinkedIn", href: profile.linkedin },
    { icon: Github, label: "GitHub", href: profile.github },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-navy-900 py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-[#1d3560] opacity-60 blur-3xl" />
      <div className="relative mx-auto grid w-[min(1180px,100%-32px)] items-start gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading light kicker="Let's build together" title="Have a project in mind?" sub="Tell me what you need. I'll reply within 24 hours with next steps and a free quote." />
          <div className="space-y-3">
            {contacts.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="group flex w-fit items-center gap-4 font-medium text-slate-200 transition hover:text-gold-400">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-gold-400 transition group-hover:border-gold-400/50"><Icon size={18} /></span>
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] bg-card p-6 shadow-2xl shadow-black/40 sm:p-9">
          {status === "done" ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
              <CheckCircle2 size={56} className="mx-auto text-teal-500" />
              <h3 className="mt-4 text-2xl font-bold">Thank you, {form.name.split(" ")[0]}!</h3>
              <p className="mt-2">Your enquiry has been received. I&apos;ll get back to you within 24 hours.</p>
              <button onClick={() => { setForm(empty); setStep(0); setStatus("idle"); }} className="mt-6 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-teal-500">Send another enquiry</button>
            </motion.div>
          ) : (
            <form onSubmit={submit}>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">Request a free quote</h3>
                <span className="text-sm font-medium text-slate-500">Step {step + 1} of 3</span>
              </div>
              <div className="mb-7 h-1.5 overflow-hidden rounded-full bg-bg-soft">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-gold-400 to-teal-400" animate={{ width: `${((step + 1) / 3) * 100}%` }} />
              </div>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} className="hidden" aria-hidden="true" />

              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                  {step === 0 && (
                    <fieldset>
                      <legend className="mb-3 font-semibold text-ink">What do you need?</legend>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {serviceOptions.map((s) => <button type="button" key={s} onClick={() => { set("service", s); setStep(1); }} className={choice(form.service === s)}>{s}</button>)}
                      </div>
                    </fieldset>
                  )}
                  {step === 1 && (
                    <fieldset>
                      <legend className="mb-3 font-semibold text-ink">Approximate budget</legend>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {budgetOptions.map((b) => <button type="button" key={b} onClick={() => { set("budget", b); setStep(2); }} className={choice(form.budget === b)}>{b}</button>)}
                      </div>
                    </fieldset>
                  )}
                  {step === 2 && (
                    <div className="grid gap-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="grid gap-1.5 text-sm font-semibold text-ink">Your name<input required minLength={2} autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} className={input} placeholder="Your full name" /></label>
                        <label className="grid gap-1.5 text-sm font-semibold text-ink">Email or phone<input required minLength={5} value={form.contact} onChange={(e) => set("contact", e.target.value)} className={input} placeholder="you@company.com" /></label>
                      </div>
                      <label className="grid gap-1.5 text-sm font-semibold text-ink">Business name <span className="font-normal text-slate-500">(optional)</span><input value={form.company} onChange={(e) => set("company", e.target.value)} className={input} placeholder="Your company" /></label>
                      <label className="grid gap-1.5 text-sm font-semibold text-ink">About your project<textarea required minLength={10} rows={4} value={form.message} onChange={(e) => set("message", e.target.value)} className={input} placeholder="What should the software do? Any deadline?" /></label>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {status === "error" && <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}

              <div className="mt-7 flex items-center justify-between gap-3">
                {step > 0 ? (
                  <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-ink"><ArrowLeft size={16} /> Back</button>
                ) : <span className="text-sm text-slate-500">Pick one to continue</span>}
                {step === 2 && (
                  <button disabled={status === "sending"} className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-7 py-3 font-semibold text-navy-900 shadow-lg shadow-gold-400/25 transition hover:bg-gold-300 disabled:opacity-60">
                    {status === "sending" ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : <>Send Enquiry <ArrowRight size={18} /></>}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-950 py-10 text-sm text-slate-500">
      <div className="mx-auto flex w-[min(1180px,100%-32px)] flex-wrap items-center justify-between gap-6">
        <Logo />
        <p>© 2026 ChicaTechHub · Founded by {profile.name} · {profile.location}</p>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    // count one visit per browser session
    try {
      if (!sessionStorage.getItem("cth_v")) { sessionStorage.setItem("cth_v", "1"); fetch("/api/views", { method: "POST" }).catch(() => {}); }
    } catch {}
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={`https://wa.me/${profile.phoneRaw}?text=${encodeURIComponent("Hi! I found ChicaTechHub and would like to discuss a project.")}`}
          target="_blank" rel="noopener" aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.6, y: 20 }}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 font-semibold text-white shadow-2xl shadow-black/30 transition hover:scale-105"
        >
          <MessageCircle size={20} /> <span className="hidden sm:inline">Let&apos;s talk</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
