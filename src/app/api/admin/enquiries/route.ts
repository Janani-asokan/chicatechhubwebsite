import { isAuthed } from "@/lib/auth";
import { getDb, type Enquiry } from "@/lib/db";

export async function GET(req: Request) {
  if (!isAuthed(req)) return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const db = await getDb();
  const { rows } = await db.query<Enquiry>(`SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 500`);
  const views = await db.query<{ total: number; today: number }>(
    `SELECT COALESCE(SUM(count),0)::int AS total,
            COALESCE(SUM(count) FILTER (WHERE day = CURRENT_DATE),0)::int AS today
       FROM page_views`,
  );
  return Response.json({ ok: true, enquiries: rows, views: views.rows[0] });
}
