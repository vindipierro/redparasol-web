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

Individual game `lifetimeVisits` values are also `null` until reconciled. Dates and direct Roblox links should be verified before publication. The only prefilled play URL is the Seishun game link supplied in the project discussion.

The optional `retiredTitlesLedger` in `src/data/studio.ts` is for historical records, not public catalog listings.

## Artwork

- `public/images/brand/mascot-full.webp` is a web-optimized copy of the supplied full-body mascot artwork (768 × 768), used in the homepage hero and About page.
- `public/images/brand/mascot-closeup.webp` is a web-optimized copy of the supplied close-up artwork (512 × 512), used in the header and footer. Both preserve transparency and the original illustrated design.
- Game cards deliberately use graphic placeholder compositions until original, approved images are provided.
- Add images to `public/images/games/` and link the paths in `src/data/games.ts`.

## Deployment

The Astro build outputs static files in `dist/`. Deploy to a static hosting provider or configure GitHub Pages Actions. Point `redparasolgames.com` to the selected host only after hosting and DNS are configured. The repository alone does **not** publish the site or set DNS.

## Before launch

- [x] Replace provisional mascot with the supplied original mascot artwork (optimized WebP derivatives).
- [ ] Review whether official vector originals or higher-resolution exports should be added for future reuse.
- [ ] Add approved artwork for all 13 active games, especially the four homepage features.
- [ ] Verify direct Roblox links, including migrated experiences.
- [ ] Confirm original release years and historical lifetime visits.
- [ ] Reconcile historical and retired-game totals; set the studio milestone.
- [ ] Add business email, Roblox group, and approved social URLs.
- [ ] Configure hosting, domain DNS, social preview image, and analytics if desired.
