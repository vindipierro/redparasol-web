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
 * - Do not publish a sum while historical coverage is incomplete.
 */
export const historicStudioMilestone: number | null = null;
export const retiredTitlesLedger: { title: string; reconciledLifetimeVisits: number | null; notes: string }[] = [];

export const catalogGameCount = games.length;
