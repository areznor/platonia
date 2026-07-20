import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

declare global {
  // eslint-disable-next-line no-var
  var _platoniaMongo: Promise<MongoClient> | undefined;
}

export function mongoConfigured() {
  return Boolean(uri && !uri.includes("seu_"));
}

export async function getDb() {
  if (!mongoConfigured()) {
    throw new Error("MONGODB_URI não configurada");
  }
  if (!global._platoniaMongo) {
    const client = new MongoClient(uri!);
    global._platoniaMongo = client.connect();
  }
  const client = await global._platoniaMongo;
  return client.db(process.env.MONGODB_DB || "platonia");
}

export async function getUsers() {
  const db = await getDb();
  return db.collection("users");
}

export async function getProgress() {
  const db = await getDb();
  return db.collection("progress");
}
