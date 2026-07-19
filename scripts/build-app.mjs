import { cpSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "public", "aprender");
const dest = join(root, "www");
const bridgeEntry = join(root, "src", "native", "bridge.ts");
const bridgeOut = join(source, "native-bridge.js");

if (!existsSync(source)) {
  console.error("Fonte não encontrada:", source);
  process.exit(1);
}

await esbuild.build({
  entryPoints: [bridgeEntry],
  bundle: true,
  outfile: bridgeOut,
  format: "iife",
  platform: "browser",
  target: ["es2019"],
  minify: true,
  logLevel: "info",
});

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(source, dest, { recursive: true });

console.log("build:app → native-bridge.js + www/ (cópia de public/aprender)");
