import "server-only";

// Production: real PostgreSQL via DATABASE_URL (Render Postgres).
// Local development: embedded PGlite (Postgres compiled to WASM), stored in .data/.

type Row = Record<string, unknown>;
type Db = { query: <T extends Row = Row>(sql: string, params?: unknown[]) => Promise<{ rows: T[] }> };

const SCHEMA = `
CREATE TABLE IF NOT EXISTS enquiries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  company TEXT,
  service TEXT NOT NULL,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS page_views (
  day DATE PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0
);
`;

const g = globalThis as unknown as { __db?: Promise<Db> };

async function create(): Promise<Db> {
  let db: Db;
  if (process.env.DATABASE_URL) {
    const { Pool } = await import("pg");
    // Render's internal URL needs no TLS; for an external URL add ?sslmode=require to it.
    const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
    db = { query: (sql, params) => pool.query(sql, params as unknown[]) as never };
  } else {
    const { PGlite } = await import("@electric-sql/pglite");
    const { mkdirSync } = await import("node:fs");
    mkdirSync(".data", { recursive: true });
    const lite = new PGlite(".data/pglite");
    db = { query: (sql, params) => lite.query(sql, params as unknown[]) as never };
  }
  for (const stmt of SCHEMA.split(";").map((s) => s.trim()).filter(Boolean)) {
    await db.query(stmt);
  }
  return db;
}

export function getDb(): Promise<Db> {
  if (!g.__db) g.__db = create().catch((e) => { g.__db = undefined; throw e; });
  return g.__db;
}

export type Enquiry = {
  id: number;
  name: string;
  contact: string;
  company: string | null;
  service: string;
  budget: string | null;
  message: string;
  status: "new" | "contacted" | "won" | "lost";
  notes: string | null;
  created_at: string;
};
