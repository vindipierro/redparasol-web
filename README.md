# Red Parasol Website

The official website project for **Red Parasol**, an independent Roblox game studio.

**Motto:** We Build Worlds. You Write the Story.

**Planned domain:** https://redparasolgames.com

## Stack

Astro 6, TypeScript, and custom CSS. Static generated pages, no database or runtime API required.

## Local setup

Requirements: Node.js 22+.

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Pages

- `/` — Illustrated homepage, four featured games, studio introduction.
- `/games/` — Active catalog with genre filters.
- `/games/[slug]/` — Static individual experience pages.
- `/about/` — Concise studio overview.

## Editable content

- `src/data/games.ts`: 13 active/playable games, genre tags, descriptions, release years, visits, artwork, and Roblox links.
- `src/data/studio.ts`: studio information, optional contact email/socials, and historical milestone.
- `src/styles/global.css`: colors, typography, responsive and motion settings.

### Data verification rules

The public catalog contains **only active/playable titles**. The studio's historical lifetime milestone **includes retired titles and earlier uploads**, but only after records have been reconciled. The `historicStudioMilestone` value intentionally remains `null` until the total is verified. Nothing in the interface should imply that lifetime visits equal unique players.

Individual game `lifetimeVisits` values are also `null` until reconciled. Dates and direct Roblox links should be verified before publication. All 13 active game pages have user-supplied or previously matched Roblox play URLs. The corrected canonical pages for Kiseki, Isekai Trading Simulator, Naval Academy, Army Bootcamp: Fort Liberty, and Command Authority: Second Strike come directly from the studio; any additional migrations should be updated here.

The optional `retiredTitlesLedger` in `src/data/studio.ts` is for historical records, not public catalog listings.

## Artwork

- `public/images/brand/mascot-full.webp` is a web-optimized copy of the supplied full-body mascot artwork (768 × 768), used in the homepage hero and About page.
- `public/images/brand/mascot-closeup.webp` is a web-optimized copy of the supplied close-up artwork (512 × 512), used in the header and footer. Both preserve transparency and the original illustrated design.
- All **13 official Roblox thumbnails** have been downloaded into `public/images/games/`, with their paths registered in `src/data/game-thumbnails.json`. The website uses these on cards and game detail pages.
- `scripts/verified-games.json` contains checked Roblox place IDs. Do not add unknown or similarly named games without matching their ownership and description.
- `.github/workflows/sync-roblox-artwork.yml` periodically refreshes these sources on workflow dispatch, or when its source files change. It uses the official Roblox thumbnail endpoint, with game icons as a fallback.
- If the Roblox thumbnail API is unavailable after a future upload, a decorative placeholder is shown until its official image is successfully synchronized.
- To use studio-approved artwork instead, set a local `artwork` or `banner` path on the relevant entry in `src/data/games.ts`; custom assets take priority.

## Deployment

The Astro build outputs static files in `dist/`. Deploy to a static hosting provider or configure GitHub Pages Actions. Point `redparasolgames.com` to the selected host only after hosting and DNS are configured. The repository alone does **not** publish the site or set DNS.

## Before launch

- [x] Replace provisional mascot with the supplied original mascot artwork (optimized WebP derivatives).
- [ ] Review whether official vector originals or higher-resolution exports should be added for future reuse.
- [x] Import official Roblox thumbnail assets for all 13 active games, including the four homepage features.
- [x] Register the corrected Roblox URLs supplied by the studio for Isekai Trading Simulator, Naval Academy, Army Bootcamp: Fort Liberty, Kiseki, and Command Authority: Second Strike.
- [x] Confirm all 13 current-game thumbnails have been synchronized successfully.
- [ ] Confirm original release years and historical lifetime visits.
- [ ] Reconcile historical and retired-game totals; set the studio milestone.
- [ ] Add business email, Roblox group, and approved social URLs.
- [ ] Configure hosting, domain DNS, social preview image, and analytics if desired.
