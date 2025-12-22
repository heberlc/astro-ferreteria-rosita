/**
 * Script para generar iconos PNG desde favicon.svg
 * Ejecutar con: node scripts/generate-icons.js
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const svgPath = join(__dirname, '../public/favicon.svg');
const publicDir = join(__dirname, '../public/icons');

// Ensure icons directory exists
import { mkdirSync, existsSync } from 'fs';
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

const sizes = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 16, name: 'favicon-16x16.png' },
];

async function generateIcons() {
  const svgBuffer = readFileSync(svgPath);

  for (const { size, name } of sizes) {
    const outputPath = join(publicDir, name);
    
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    
    console.log(`✓ Generated ${name} (${size}x${size})`);
  }

  console.log('\n✅ All icons generated in public/icons/');
}

generateIcons().catch(console.error);
