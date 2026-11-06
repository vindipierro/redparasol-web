import { games } from './games';

export const studio = {
  name: 'Red Parasol',
  tagline: 'We Build Worlds. You Write the Story.',
  description: 'Immersive roleplay worlds, creative simulators, and experiences shaped by the people who play them.',
  foundedYear: 2024,
  siteUrl: 'https://redparasolgames.com',
  contactEmail: null as string | null,
  robloxGroupUrl: null as string | null,
  socials: [] as { label: string; url: string }[]
};

/**
 * Data policy:
 * - Lifetime totals are reconciled manually across original and reuploaded experiences.
 * - The catalog lists only active/playable games.
 * - Retired titles contribute to the historical studio-wide total when verified.
 * - 88,444,580 is the documented lower-bound subtotal from 13 active
 *   titles including six older versions, plus nine additional Chesapeake Studios / Archive
 *   titles. Each universe is counted once (snapshot 2026-11-05 ET).
 * - Older unlisted/removed Roblox experiences may still be undiscovered.
 * - Only update this lower bound upward with independently verified nonoverlapping releases.
 */
export const historicStudioMilestone: number | null = 88444580;
export const retiredTitlesLedger: { title: string; reconciledLifetimeVisits: number | null; notes: string }[] = [
  { title: "His Majesty's Government", reconciledLifetimeVisits: 1688318, notes: "Chesapeake Studios public Roblox group games list" },
  { title: "Red Storm: Military Roleplay", reconciledLifetimeVisits: 259952, notes: "Chesapeake Studios public Roblox group games list" },
  { title: "Port of Entry: Border Roleplay", reconciledLifetimeVisits: 3156946, notes: "Chesapeake Archive public Roblox universe 7324714301 (origin: Chesapeake Entertainment imprint)" },
  { title: "The Foundation: SCP Roleplay", reconciledLifetimeVisits: 111602, notes: "Chesapeake Archive public Roblox universe 8967792558 (origin: Chesapeake Entertainment imprint)" },
  { title: "White House Roleplay", reconciledLifetimeVisits: 1026996, notes: "Chesapeake Archive public Roblox universe 6490357754 (origin: Chesapeake Entertainment imprint)" },
  { title: "Oath of Office: The Philippines", reconciledLifetimeVisits: 805901, notes: "Chesapeake Archive public Roblox universe 6409716542 (origin: Chesapeake Entertainment imprint)" },
  { title: "Oath of Office: Brazil", reconciledLifetimeVisits: 14811, notes: "Chesapeake Archive public Roblox universe 6548822577 (origin: Chesapeake Entertainment imprint)" },
  { title: "Election Simulator [🤝GTV Partnership🤝]", reconciledLifetimeVisits: 126977, notes: "Chesapeake Archive public Roblox universe 7034683697 (origin: Chesapeake Entertainment imprint)" },
  { title: "Executive Orders: Legacy", reconciledLifetimeVisits: 12008, notes: "Chesapeake Archive public Roblox universe 7287841117 (origin: Chesapeake Entertainment imprint)" }
];

export const catalogGameCount = games.length;
