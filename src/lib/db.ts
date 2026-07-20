import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;

export function dbConfigured() {
  return Boolean(url && url.startsWith("postgres") && !url.includes("USER:SENHA"));
}

let sql: NeonQueryFunction<false, false> | null = null;

export function getSql() {
  if (!dbConfigured()) {
    throw new Error("DATABASE_URL (Neon) não configurada");
  }
  if (!sql) {
    sql = neon(url!);
  }
  return sql;
}

export type DbUser = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  avatar: string | null;
};

/** Cria tabelas se ainda não existirem (idempotente). */
export async function ensureSchema() {
  const db = getSql();
  await db`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      avatar TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await db`
    CREATE TABLE IF NOT EXISTS progress (
      email TEXT PRIMARY KEY REFERENCES users(email) ON DELETE CASCADE,
      data JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

export async function findUserByEmail(email: string) {
  const db = getSql();
  const rows = await db`
    SELECT id::text, name, email, password_hash, avatar
    FROM users
    WHERE email = ${email.toLowerCase().trim()}
    LIMIT 1
  `;
  return (rows[0] as DbUser | undefined) ?? null;
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
  avatar: string;
}) {
  const db = getSql();
  const rows = await db`
    INSERT INTO users (name, email, password_hash, avatar)
    VALUES (
      ${input.name},
      ${input.email.toLowerCase().trim()},
      ${input.passwordHash},
      ${input.avatar}
    )
    RETURNING id::text, name, email, avatar
  `;
  return rows[0] as { id: string; name: string; email: string; avatar: string };
}

export async function updateUserAvatar(userId: string, avatar: string) {
  const db = getSql();
  await db`
    UPDATE users
    SET avatar = ${avatar}, updated_at = now()
    WHERE id = ${userId}::uuid
  `;
}

export async function getProgressByEmail(email: string) {
  const db = getSql();
  const rows = await db`
    SELECT data FROM progress WHERE email = ${email.toLowerCase().trim()} LIMIT 1
  `;
  return (rows[0]?.data as Record<string, unknown> | undefined) ?? null;
}

export async function upsertProgress(email: string, data: unknown) {
  const db = getSql();
  const normalized = email.toLowerCase().trim();
  const payload = typeof data === "string" ? data : JSON.stringify(data ?? {});
  await db`
    INSERT INTO progress (email, data, updated_at)
    VALUES (${normalized}, ${payload}::jsonb, now())
    ON CONFLICT (email)
    DO UPDATE SET data = EXCLUDED.data, updated_at = now()
  `;
}
