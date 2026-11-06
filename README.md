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

The public catalog contains **only active/playable titles**. The studio's historical lifetime milestone **includes retired titles and earlier uploads**, but only after records have been reconciled. The public homepage displays **100M+ lifetime visits**, a studio-provided estimate. The separately retained public Roblox API audit collected on November 5, 2026 ET establishes an **88M+** identifiable-record subtotal, not independent verification of the 100M+ estimate. This includes 13 active games with seven identifiable reuploads plus nine historically associated titles under Chesapeake Studios and Chesapeake Archive. The recorded subtotal is 88,503,037 visits, counting each Roblox universe only once. Other historical titles may remain unlocated. Nothing in the interface should imply that lifetime visits equal unique players.

Individual game `lifetimeVisits` values are now populated from known, nonoverlapping universe IDs found in the source audit. These are point-in-time snapshots and should be refreshed periodically. Original release years are the earliest known Roblox universe creation years in the audit, rather than independently documented public launch dates. Exact Roblox links were supplied by the studio or checked. All 13 active game pages have user-supplied or previously matched Roblox play URLs. The corrected canonical pages for Kiseki, Isekai Trading Simulator, Naval Academy, Army Bootcamp: Fort Liberty, and Command Authority: Second Strike come directly from the studio; any additional migrations should be updated here.

The `retiredTitlesLedger` in `src/data/studio.ts` holds verified retired and regional Chesapeake experiences for historical statistics only. They do not appear in the playable catalog.

Moosewood has a confirmed earlier upload, **Moosewood: Camping Roleplay** (Place ID `76324638514569`, universe `8889359126`, HanamiSoft), created in October 2025, with **58,372** public visits at the November 6, 2026 audit. The current playable version remains Place ID `84326252804702` (universe `10363633306`, Red Parasol Games), with **550,918** visits in that snapshot. Its combined known lifetime total is **609,290**; each distinct universe is counted once in the game total and the updated studio historical lower bound of **88,503,037**. The oldest known upload sets Moosewood's displayed release month to October 2025. Both historical-audit scripts and `historicalPlaceIds` track the older release.

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


## Automatic CCU-based display order

Both the homepage's four featured experiences and the full 13-game catalog are silently ordered using a recent Roblox current-concurrent-player snapshot. The public site never shows CCU or a popularity label.

- `scripts/sync_ccu_order.py` resolves each verified Place ID to a Universe ID through `https://apis.roblox.com/universes/v1/places/{placeId}/universe`, then reads each game's `playing` value using a single batch request to `https://games.roblox.com/v1/games?universeIds=...`.
- `.github/workflows/sync-ccu-order.yml` runs at 17 minutes past every third hour, on manual dispatch, and after updates to its source. This is a periodic snapshot, **not real-time data**.
- The script writes only the ordered slugs to `src/data/ccu-order.json`. CCU numbers are not published. Ties preserve the catalog's configured order.
- Invalid, incomplete, or unavailable Roblox API responses fail the job and preserve the last valid ordering. Before the first successful synchronization, the original curated order is used.
- Any change to the order is committed to `main`, allowing static hosts with GitHub integration to rebuild automatically.
- Current CCU is **not** all-time peak CCU. Historical peak CCU, reconciled lifetime visits, and original release year are manually supplied per game in `src/data/games.ts`.

## Historical statistics sources (November 2026)

- `research/public-roblox-history.json` records Roblox API visits, creators, release timestamps, and universe mappings for every active game plus identifiable legacy versions. The summed visits are **known-release subtotals**, not necessarily full lifetime coverage for every game.
- `research/peak-ccu-sources.json` records the public tracker evidence for manually maintained CCU peaks. Those are recorded third-party peaks, not Roblox-owned all-time guarantees. Seishun's approximately 4,000 figure is a studio-reported estimate.
- **Historical visits and CCU are separate from live CCU ranking.** The ranking still comes from the periodic Roblox `playing` field, with no popularity indicator shown publicly.
- `src/data/studio.ts` holds nine additional Chesapeake Studios / Chesapeake Archive games (including archived regional releases) contributing to the independently counted 88M+ historical subtotal, all excluded from the active catalog.

## Historical public metrics audit (November 5, 2026)

- Sources: public Roblox games metadata, verified historical redirect pages, Chesapeake Studios / Chesapeake Archive / Reef Points / HanamiSoft group catalogs, and independent peak-CCU tracker pages.
- `research/public-roblox-history.json`: raw current and legacy public metadata.
- `research/game-metrics-audit.json`: additional follow-up snapshot with both Kiseki universes explicitly reconciled.
- `research/peak-ccu-sources.json`: provenance for public tracked peaks and a studio-reported ~4,000 Seishun peak.
- Per-game and studio-wide visit figures reflect known uploads, not unique players or an exhaustive guarantee of every historical release.
- Studio total includes identified active game histories plus Port of Entry, White House Roleplay, The Foundation, His Majesty's Government, and Red Storm. Other candidates under Chesapeake Archive are not automatically included until their association is confirmed.
- Publicly tracked peaks are not necessarily a true historical maximum if tracker monitoring began late; missing values remain unset.

## Game statistics design

- The detail statistics grid uses the number of available facts as its desktop column count, with mobile breakpoints to prevent an orphaned fourth card.
- The label **Release** displays month and year from the earliest identified Roblox universe creation timestamp. The timestamp is a documented proxy, not proof of the public launch day.
- Peak CCU values remain exact in the source data but display rounded **upward** as approximate values (e.g., `~3.3K`, `~700`). Seishun's studio-reported approximate high is intentionally displayed as `4K+`.
- Historical CCU research includes the identified original uploads: Chesapeake Studios for Oath of Office and Command Authority, Reef Points for Marine Academy, and HanamiSoft for Seishun.
