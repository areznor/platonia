/**
 * Gera assets de loja a partir da marca Platonia:
 * - assets/icon.png (1024) a partir do favicon
 * - assets/splash.png (2732) logo em fundo #0b1624
 * Depois rode: npx capacitor-assets generate --android
 */
import { mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "assets");
const favicon = join(root, "public", "images", "favicon.jpg");
const logo = join(root, "public", "images", "Logo_Oficial1.jpg");

const BG = { r: 11, g: 22, b: 36, alpha: 1 }; // #0b1624
const ICON_BG = { r: 11, g: 22, b: 36, alpha: 1 };

mkdirSync(outDir, { recursive: true });

if (!existsSync(favicon) || !existsSync(logo)) {
  console.error("Imagens de marca não encontradas em public/images/");
  process.exit(1);
}

// Ícone 1024×1024 — templo do favicon em fundo da caverna
await sharp({
  create: { width: 1024, height: 1024, channels: 4, background: ICON_BG },
})
  .composite([
    {
      input: await sharp(favicon)
        .resize(780, 780, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer(),
      gravity: "centre",
    },
  ])
  .png()
  .toFile(join(outDir, "icon.png"));

await sharp(join(outDir, "icon.png")).png().toFile(join(outDir, "icon-only.png"));

// Splash 2732×2732 — logo centralizado
const logoBuf = await sharp(logo)
  .resize(1600, 1600, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp({
  create: { width: 2732, height: 2732, channels: 4, background: BG },
})
  .composite([{ input: logoBuf, gravity: "centre" }])
  .png()
  .toFile(join(outDir, "splash.png"));

await sharp(join(outDir, "splash.png")).png().toFile(join(outDir, "splash-dark.png"));

console.log("assets/icon.png + splash.png gerados.");
