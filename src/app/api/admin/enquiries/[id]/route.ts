import { z } from "zod";
import { isAuthed } from "@/lib/auth";
import { getDb } from "@/lib/db";

const patch = z.object({
  status: z.enum(["new", "contacted", "won", "lost"]).optional(),
  notes: z.string().max(4000).optional(),
});

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!isAuthed(req)) return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const id = Number((await ctx.params).id);
  const parsed = patch.safeParse(await req.json().catch(() => ({})));
  if (!Number.isInteger(id) || !parsed.success) return Response.json({ ok: false, error: "Invalid input" }, { status: 400 });

  const db = await getDb();
  const { status, notes } = parsed.data;
  await db.query(
    `UPDATE enquiries SET status = COALESCE($2, status), notes = COALESCE($3, notes) WHERE id = $1`,
    [id, status ?? null, notes ?? null],
  );
  return Response.json({ ok: true });
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!isAuthed(req)) return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const id = Number((await ctx.params).id);
  if (!Number.isInteger(id)) return Response.json({ ok: false, error: "Invalid id" }, { status: 400 });
  const db = await getDb();
  await db.query(`DELETE FROM enquiries WHERE id = $1`, [id]);
  return Response.json({ ok: true });
}
