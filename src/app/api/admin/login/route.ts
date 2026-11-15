import { checkPassword, createToken, COOKIE } from "@/lib/auth";

const attempts = new Map<string, number[]>();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < 15 * 60_000);
  if (recent.length >= 8) {
    return Response.json({ ok: false, error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  if (!password || !checkPassword(password)) {
    recent.push(now);
    attempts.set(ip, recent);
    return Response.json({ ok: false, error: "Incorrect password" }, { status: 401 });
  }

  const { token, maxAge } = createToken();
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return Response.json(
    { ok: true },
    { headers: { "Set-Cookie": `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}` } },
  );
}
