"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Inbox, Loader2, LogOut, Mail, MessageCircle, RefreshCw, Search, Trash2, Trophy, Lock } from "lucide-react";
import type { Enquiry } from "@/lib/db";

const STATUSES = ["new", "contacted", "won", "lost"] as const;
type Status = (typeof STATUSES)[number];
const badge: Record<Status, string> = {
  new: "bg-sky-500/15 text-sky-600 dark:text-sky-300",
  contacted: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  won: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  lost: "bg-slate-500/15 text-slate-600 dark:text-slate-300",
};

export default function AdminDashboard() {
  const [state, setState] = useState<"loading" | "login" | "ready">("loading");
  const [items, setItems] = useState<Enquiry[]>([]);
  const [views, setViews] = useState({ total: 0, today: 0 });
  const [filter, setFilter] = useState<Status | "all">("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Enquiry | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/enquiries", { cache: "no-store" });
    if (res.status === 401) return setState("login");
    const data = await res.json();
    setItems(data.enquiries);
    setViews(data.views);
    setState("ready");
  }, []);

  // load() is async: its setState calls happen after the fetch resolves
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const update = async (id: number, patch: Partial<Pick<Enquiry, "status" | "notes">>) => {
    setItems((list) => list.map((e) => (e.id === id ? { ...e, ...patch } : e)));
    setSelected((s) => (s && s.id === id ? { ...s, ...patch } : s));
    await fetch(`/api/admin/enquiries/${id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify(patch) });
  };
  const remove = async (id: number) => {
    if (!confirm("Delete this enquiry permanently?")) return;
    await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
    setItems((list) => list.filter((e) => e.id !== id));
    setSelected(null);
  };
  const logout = async () => { await fetch("/api/admin/logout", { method: "POST" }); setState("login"); };

  const shown = useMemo(() => {
    const term = q.toLowerCase();
    return items.filter((e) => (filter === "all" || e.status === filter) &&
      (!term || [e.name, e.contact, e.company, e.service, e.message].some((v) => v?.toLowerCase().includes(term))));
  }, [items, filter, q]);

  if (state === "loading") return <div className="grid min-h-screen place-items-center bg-bg-soft"><Loader2 className="animate-spin text-teal-500" /></div>;
  if (state === "login") return <Login onDone={load} />;

  const count = (s: Status) => items.filter((e) => e.status === s).length;
  const cards = [
    { label: "Total enquiries", value: items.length, icon: Inbox },
    { label: "New / unread", value: count("new"), icon: Mail },
    { label: "Projects won", value: count("won"), icon: Trophy },
    { label: "Visits (today / all)", value: `${views.today} / ${views.total}`, icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-bg-soft">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-navy-900">
        <div className="mx-auto flex h-16 w-[min(1180px,100%-32px)] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-display font-bold text-white">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-gold-400 to-teal-500 text-navy-900">C</span>
            ChicaTechHub <span className="font-normal text-slate-400">Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={load} className="grid h-9 w-9 place-items-center rounded-full text-slate-300 hover:bg-white/10" aria-label="Refresh"><RefreshCw size={17} /></button>
            <button onClick={logout} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-slate-300 hover:bg-white/10"><LogOut size={16} /> Log out</button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[min(1180px,100%-32px)] py-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {cards.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-line bg-card p-5">
              <Icon size={20} className="text-teal-500" />
              <p className="mt-3 font-display text-2xl font-bold text-ink">{value}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {(["all", ...STATUSES] as const).map((s) => (
              <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${filter === s ? "bg-navy-900 text-white dark:bg-gold-400 dark:text-navy-900" : "text-body hover:bg-card"}`}>
                {s} {s !== "all" && <span className="opacity-60">({count(s)})</span>}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2">
            <Search size={16} className="text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search enquiries" className="w-48 bg-transparent text-sm text-ink outline-none" />
          </label>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-card">
          {shown.length === 0 ? (
            <div className="py-16 text-center text-slate-500"><Inbox className="mx-auto mb-3" />No enquiries yet. They appear here as soon as someone fills in the contact form.</div>
          ) : (
            <ul className="divide-y divide-line">
              {shown.map((e) => (
                <li key={e.id}>
                  <button onClick={() => setSelected(e)} className="grid w-full gap-1 px-5 py-4 text-left transition hover:bg-bg-soft sm:grid-cols-[1.2fr_1fr_.8fr_.6fr] sm:items-center sm:gap-4">
                    <div><p className="font-semibold text-ink">{e.name}</p><p className="text-sm text-slate-500">{e.contact}</p></div>
                    <p className="text-sm">{e.service}<span className="block text-xs text-slate-500">{e.budget || "Budget not given"}</span></p>
                    <p className="text-sm text-slate-500">{new Date(e.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p>
                    <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${badge[e.status]}`}>{e.status}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-30 flex justify-end bg-navy-950/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(ev) => ev.stopPropagation()} className="h-full w-full max-w-lg overflow-y-auto bg-card p-7 shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">Enquiry #{selected.id}</p>
              <h2 className="mt-1 text-2xl font-bold">{selected.name}</h2>
              <p className="text-slate-500">{selected.company || "No business name"}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div><dt className="text-slate-500">Contact</dt><dd className="font-medium text-ink break-all">{selected.contact}</dd></div>
                <div><dt className="text-slate-500">Received</dt><dd className="font-medium text-ink">{new Date(selected.created_at).toLocaleString("en-IN")}</dd></div>
                <div><dt className="text-slate-500">Service</dt><dd className="font-medium text-ink">{selected.service}</dd></div>
                <div><dt className="text-slate-500">Budget</dt><dd className="font-medium text-ink">{selected.budget || "Not given"}</dd></div>
              </dl>
              <h3 className="mt-6 text-sm font-semibold text-slate-500">Message</h3>
              <p className="mt-1 whitespace-pre-wrap rounded-xl bg-bg-soft p-4 text-ink">{selected.message}</p>

              <h3 className="mt-6 text-sm font-semibold text-slate-500">Status</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button key={s} onClick={() => update(selected.id, { status: s })} className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ring-1 transition ${selected.status === s ? `${badge[s]} ring-current` : "ring-line text-body hover:ring-teal-500"}`}>{s}</button>
                ))}
              </div>

              <h3 className="mt-6 text-sm font-semibold text-slate-500">Private notes</h3>
              <textarea defaultValue={selected.notes ?? ""} key={selected.id} rows={4} onBlur={(ev) => ev.target.value !== (selected.notes ?? "") && update(selected.id, { notes: ev.target.value })}
                placeholder="Quote sent, follow-up date, etc. Saves automatically." className="mt-2 w-full rounded-xl border border-line bg-bg-soft p-3 text-ink outline-none focus:border-teal-500" />

              <div className="mt-6 flex flex-wrap gap-2">
                {selected.contact.includes("@") ? (
                  <a href={`mailto:${selected.contact}?subject=${encodeURIComponent("Your ChicaTechHub enquiry")}`} className="inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-navy-900"><Mail size={16} /> Reply by email</a>
                ) : (
                  <a href={`https://wa.me/${selected.contact.replace(/\D/g, "").replace(/^(\d{10})$/, "91$1")}`} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"><MessageCircle size={16} /> WhatsApp</a>
                )}
                <button onClick={() => remove(selected.id)} className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-red-600 ring-1 ring-red-500/30 hover:bg-red-500/10"><Trash2 size={16} /> Delete</button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Login({ onDone }: { onDone: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr("");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password: pw }) });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) onDone(); else setErr(data.error || "Login failed");
  };
  return (
    <div className="grid min-h-screen place-items-center bg-navy-900 p-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl bg-card p-8 shadow-2xl">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-400 to-teal-500 text-navy-900"><Lock size={22} /></span>
        <h1 className="mt-5 text-2xl font-bold">ChicaTechHub Admin</h1>
        <p className="mt-1 text-sm text-slate-500">Sign in to manage client enquiries.</p>
        <input type="password" autoFocus required value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Admin password" autoComplete="current-password"
          className="mt-6 w-full rounded-xl border-[1.5px] border-line bg-bg-soft px-4 py-3 text-ink outline-none focus:border-teal-500" />
        {err && <p className="mt-3 text-sm font-medium text-red-600">{err}</p>}
        <button disabled={busy} className="mt-5 w-full rounded-full bg-gold-400 py-3 font-semibold text-navy-900 hover:bg-gold-300 disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </div>
  );
}
