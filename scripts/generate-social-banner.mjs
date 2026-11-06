import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const brand = join(root, 'public/images/brand');
const [mascotFull, mascotCloseup] = await Promise.all([
  readFile(join(brand, 'mascot-full.webp')),
  readFile(join(brand, 'mascot-closeup.webp'))
]);

const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <clipPath id="frame"><rect width="1200" height="630"/></clipPath>
    <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff8ea"/><stop offset="1" stop-color="#f1dfca"/></linearGradient>
  </defs>
  <g clip-path="url(#frame)">
    <rect width="1200" height="630" fill="url(#paper)"/>
    <circle cx="995" cy="284" r="235" fill="#f5d8b4"/>
    <path d="M-30 552C157 468 295 589 471 558C663 526 812 460 1005 521C1092 549 1177 527 1230 485V650H-30Z" fill="#b4cba9"/>
    <path d="M-30 590C185 540 305 639 507 600C720 559 876 574 1030 546C1127 528 1172 548 1230 570V650H-30Z" fill="#80b69f"/>
    <path d="M154 455q-15-15-31 0q-20-19-37 4h94q-8-14-26-4" fill="#fff9ed" opacity=".85"/>
    <path d="M758 91q-15-16-34 1q-21-20-41 4h111q-14-19-36-5" fill="#fff9ed" opacity=".78"/>
    <g fill="#e86455">
      <path d="M605 149l5 12 12 5-12 5-5 12-5-12-12-5 12-5z"/>
      <path d="M548 547l4 10 10 4-10 4-4 10-4-10-10-4 10-4z"/>
    </g>
    <g font-family="DejaVu Sans, Arial, sans-serif">
      <text x="157" y="104" font-size="40" font-weight="800" letter-spacing="-2" fill="#1e2430">RED</text>
      <text x="255" y="104" font-size="40" font-weight="800" letter-spacing="-2" fill="#e86455">PARASOL</text>
      <text x="70" y="183" font-size="14" font-weight="700" letter-spacing="2.4" fill="#995c4e">AN INDEPENDENT ROBLOX GAME STUDIO</text>
      <text x="65" y="283" font-size="70" font-weight="800" letter-spacing="-4" fill="#1e2430">We Build</text>
      <text x="65" y="357" font-size="70" font-weight="800" letter-spacing="-4" fill="#1e2430">Worlds.</text>
      <text x="65" y="452" font-size="70" font-weight="800" letter-spacing="-4" fill="#1e2430">You Write</text>
      <text x="65" y="527" font-size="70" font-weight="800" letter-spacing="-4" fill="#d65d50">the Story.</text>
      <text x="71" y="595" font-size="15" font-weight="700" letter-spacing=".2" fill="#48534a">Immersive worlds. Endless stories.</text>
    </g>
  </g>
</svg>
`);

const [mascot, icon] = await Promise.all([
  sharp(mascotFull).resize(620, 620).png().toBuffer(),
  sharp(mascotCloseup).resize(78, 78).png().toBuffer()
]);
const outPath = join(root, 'public/social-preview.png');
await mkdir(join(root, 'public'), { recursive: true });
await sharp(background)
  .composite([
    { input: mascot, left: 580, top: 5 },
    { input: icon, left: 66, top: 45 }
  ])
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(outPath);
console.log(`Generated ${outPath}`);
