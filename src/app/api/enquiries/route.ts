import { z } from "zod";
import { getDb } from "@/lib/db";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  contact: z.string().trim().min(5, "Please enter an email or phone number").max(150),
  company: z.string().trim().max(150).optional().default(""),
  service: z.string().trim().min(2).max(100),
  budget: z.string().trim().max(50).optional().default(""),
  message: z.string().trim().min(10, "Tell me a little more (10+ characters)").max(4000),
  website: z.string().optional(), // honeypot
});

// Simple in-memory rate limit: 5 enquiries per IP per 10 minutes.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

async function notify(e: z.infer<typeof schema>) {
  const url = process.env.NOTIFY_WEBHOOK_URL; // optional: Discord/Slack-style webhook
  if (!url) return;
  const text = `New ChicaTechHub enquiry from ${e.name} (${e.contact})\nService: ${e.service} · Budget: ${e.budget || "n/a"}\n${e.message}`;
  await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ content: text, text }),
  }).catch(() => {});
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return Response.json({ ok: false, error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }
  const e = parsed.data;
  if (e.website) return Response.json({ ok: true }); // bot filled the honeypot

  try {
    const db = await getDb();
    await db.query(
      `INSERT INTO enquiries (name, contact, company, service, budget, message) VALUES ($1,$2,$3,$4,$5,$6)`,
      [e.name, e.contact, e.company || null, e.service, e.budget || null, e.message],
    );
  } catch (err) {
    console.error("Failed to save enquiry", err);
    return Response.json({ ok: false, error: "Could not send right now. Please email or WhatsApp me instead." }, { status: 500 });
  }
  await notify(e);
  return Response.json({ ok: true });
}
