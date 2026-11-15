import { getDb } from "@/lib/db";

// Lightweight visit counter (one row per day, no personal data stored).
export async function POST() {
  try {
    const db = await getDb();
    await db.query(
      `INSERT INTO page_views (day, count) VALUES (CURRENT_DATE, 1)
       ON CONFLICT (day) DO UPDATE SET count = page_views.count + 1`,
    );
  } catch {
    // never break the page for analytics
  }
  return new Response(null, { status: 204 });
}
