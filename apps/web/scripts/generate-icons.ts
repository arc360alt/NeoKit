/**
 * Generates favicons, app icons and the Open Graph image from the logo.
 * Run with: bun run generate:icons (from the repo root)
 */
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PUBLIC = join(import.meta.dir, "..", "public");
const SYMBOL = `<path fill-rule="evenodd" clip-rule="evenodd" d="M9.37305 0H22.627L32 9.37305V22.627L22.627 32H9.37305L0 22.627V9.37305L9.37305 0ZM8 8V24H24V8H8Z" fill="white"/><rect x="10" y="10" width="5" height="5" rx="0.5" fill="white"/><rect x="17" y="10" width="5" height="5" rx="0.5" fill="white"/><rect x="10" y="17" width="5" height="5" rx="0.5" fill="white"/><rect x="17" y="17" width="5" height="5" rx="0.5" fill="white"/>`;

/** App icon: white symbol on a dark rounded tile. */
function iconSvg(size: number) {
	const pad = size * 0.2;
	const scale = (size - pad * 2) / 32;
	return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
<rect width="${size}" height="${size}" rx="${size * 0.22}" fill="#0d0d0d"/>
<g transform="translate(${pad} ${pad}) scale(${scale})">${SYMBOL}</g>
</svg>`);
}

const sizes: Record<string, number[]> = {
	"android-icon": [36, 48, 72, 96, 144, 192],
	"apple-icon": [57, 60, 72, 76, 114, 120, 144, 152, 180],
	favicon: [16, 32, 96],
	"ms-icon": [70, 144, 150, 310],
};

mkdirSync(join(PUBLIC, "icons"), { recursive: true });
for (const [prefix, list] of Object.entries(sizes)) {
	for (const size of list) {
		await sharp(iconSvg(size))
			.png()
			.toFile(join(PUBLIC, "icons", `${prefix}-${size}x${size}.png`));
	}
}

// favicon.ico (PNG-in-ICO, 32×32)
const png32 = await sharp(iconSvg(32)).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt8(0, 8);
header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
writeFileSync(join(PUBLIC, "favicon.ico"), Buffer.concat([header, png32]));

// Open Graph image (1200×630)
const og = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
<radialGradient id="a" cx="25%" cy="30%" r="45%"><stop offset="0" stop-color="#0ea5e9" stop-opacity="0.35"/><stop offset="1" stop-color="#0ea5e9" stop-opacity="0"/></radialGradient>
<radialGradient id="b" cx="80%" cy="75%" r="45%"><stop offset="0" stop-color="#d946ef" stop-opacity="0.28"/><stop offset="1" stop-color="#d946ef" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1200" height="630" fill="#0d0d0d"/>
<rect width="1200" height="630" fill="url(#a)"/>
<rect width="1200" height="630" fill="url(#b)"/>
<g transform="translate(330 235) scale(5)">${SYMBOL}</g>
<text x="520" y="350" fill="white" font-family="Inter, Helvetica, Arial, sans-serif" font-size="110" font-weight="700" letter-spacing="-4">NeoKit</text>
<text x="715" y="470" text-anchor="middle" fill="#a3a3a3" font-family="Inter, Helvetica, Arial, sans-serif" font-size="34">Open source video &amp; photo editing</text>
</svg>`);
mkdirSync(join(PUBLIC, "open-graph"), { recursive: true });
await sharp(og).png().toFile(join(PUBLIC, "open-graph", "default.png"));

console.log("Icons generated in", PUBLIC);
