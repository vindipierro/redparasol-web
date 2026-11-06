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
 * - 83,188,876 is a documented lower bound from 13 active titles (including six legacy releases)
 *   plus His Majesty's Government and Red Storm. It is not a claim that all
 *   historical games have been discovered. Snapshot 2026-11-05 ET.
 * - Only update this lower bound upward from newly verified nonoverlapping releases.
 */
export const historicStudioMilestone: number | null = 83188876;
export const retiredTitlesLedger: { title: string; reconciledLifetimeVisits: number | null; notes: string }[] = [
  { title: "His Majesty's Government", reconciledLifetimeVisits: 1688318, notes: "Chesapeake Studios, public group game listing; snapshot 2026-11-05 ET" },
  { title: "Red Storm: Military Roleplay", reconciledLifetimeVisits: 259952, notes: "Chesapeake Studios, public group game listing; snapshot 2026-11-05 ET" }
];

export const catalogGameCount = games.length;
