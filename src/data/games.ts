export type GenreId = 'school' | 'government' | 'military' | 'trading' | 'simulation';

export interface Game {
  slug: string;
  title: string;
  shortTitle?: string;
  genre: GenreId;
  tags?: GenreId[];
  description: string;
  featured?: boolean;
  artwork?: string;
  banner?: string;
  releaseYear: number | null;
  releaseMonth?: number | null;
  lifetimeVisits: number | null;
  peakCCU: number | null;
  peakCCUSource?: 'studio-approximate' | 'public-tracker';
  peakCCUApproximate?: boolean;
  robloxUrl: string | null;
}

export const genres: { id: GenreId; label: string }[] = [
  { id: 'school', label: 'School & Social' },
  { id: 'government', label: 'Government & Security' },
  { id: 'military', label: 'Military' },
  { id: 'trading', label: 'Trading & Collecting' },
  { id: 'simulation', label: 'Casual Simulation' }
];

export const games: Game[] = [
  {
    slug: 'seishun',
    title: 'Seishun: School Life Roleplay',
    shortTitle: 'Seishun',
    genre: 'school',
    description: 'Attend classes, join clubs, customize your character, and make lifelong friendships in an anime-inspired school town.',
    featured: true,
    releaseYear: 2025,
    releaseMonth: 8,
    lifetimeVisits: 24483194,
    peakCCU: 4000,
    peakCCUSource: 'studio-approximate',
    peakCCUApproximate: true,
    robloxUrl: 'https://www.roblox.com/games/126631821717419/Seishun-School-Life-Roleplay'
  },
  {
    slug: 'oath-of-office',
    title: 'Oath of Office: Political Roleplay',
    shortTitle: 'Oath of Office',
    genre: 'government',
    description: 'Shape American politics from Congress, the executive branch, or the courtroom as you debate laws and make decisions that change the nation.',
    featured: true,
    releaseYear: 2024,
    releaseMonth: 9,
    lifetimeVisits: 21785205,
    peakCCU: 3225,
    peakCCUSource: 'public-tracker',
    robloxUrl: 'https://www.roblox.com/games/83895704311875/Oath-of-Office-Political-Roleplay'
  },
  {
    slug: 'silk-road',
    title: 'Silk Road: Trading Simulator',
    shortTitle: 'Silk Road',
    genre: 'trading',
    description: 'Travel the ancient Silk Road around 650 CE, trade between empires, and cross deserts and mountain passes to build a merchant fortune.',
    featured: true,
    releaseYear: 2026,
    releaseMonth: 2,
    lifetimeVisits: 4441742,
    peakCCU: 1592,
    peakCCUSource: 'public-tracker',
    robloxUrl: 'https://www.roblox.com/games/103073154610301/Silk-Road-Trading-Simulator'
  },
  {
    slug: 'command-authority',
    title: 'Command Authority: Military Roleplay',
    shortTitle: 'Command Authority',
    genre: 'military',
    description: 'Serve in the U.S. Armed Forces, deploy on operations in Africa, and rise through the ranks in a tactical, roleplay-first military simulation.',
    featured: true,
    releaseYear: 2025,
    releaseMonth: 2,
    lifetimeVisits: 12213462,
    peakCCU: 666,
    peakCCUSource: 'public-tracker',
    robloxUrl: 'https://www.roblox.com/games/121909225020263/Command-Authority-Military-Roleplay'
  },
  {
    slug: 'kiseki',
    title: 'Kiseki: Rival Academies',
    shortTitle: 'Kiseki',
    genre: 'school',
    description: 'Join one of two rival universities in an anime-inspired town, build friendships, customize your look, and stand up for your academy.',
    releaseYear: 2026,
    releaseMonth: 6,
    lifetimeVisits: 169744,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/72156617432799/Kiseki'
  },
  {
    slug: 'line-of-fire',
    title: 'Line of Fire: Secret Service Roleplay',
    shortTitle: 'Line of Fire',
    genre: 'government',
    tags: ['military'],
    description: 'Protect the President and the White House as a Secret Service agent, or find your own path as a civilian in Washington, D.C.',
    releaseYear: 2025,
    releaseMonth: 7,
    lifetimeVisits: 4000267,
    peakCCU: 675,
    peakCCUSource: 'public-tracker',
    robloxUrl: 'https://www.roblox.com/games/127499782145032/Line-of-Fire-Secret-Service-Roleplay'
  },
  {
    slug: 'isekai-trading-simulator',
    title: 'Isekai Trading Simulator',
    genre: 'trading',
    description: 'Travel a fantasy world as a merchant, buy low and sell high, and form caravans with friends across faraway settlements.',
    releaseYear: 2026,
    releaseMonth: 7,
    lifetimeVisits: 51926,
    peakCCU: 117,
    peakCCUSource: 'public-tracker',
    robloxUrl: 'https://www.roblox.com/games/93596733187914/Isekai-Trading-Simulator'
  },
  {
    slug: 'moosewood',
    title: 'Moosewood: Camp Roleplay',
    shortTitle: 'Moosewood',
    genre: 'school',
    description: 'Spend an endless summer at Moosewood Camp, making friends as a camper or leading your cabin as a counselor.',
    releaseYear: 2026,
    releaseMonth: 6,
    lifetimeVisits: 550833,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/84326252804702/Moosewood-Camp-Roleplay'
  },
  {
    slug: 'command-authority-second-strike',
    title: 'Command Authority: Second Strike',
    shortTitle: 'Command Authority: Second Strike',
    genre: 'military',
    description: 'Deploy to Eastern Europe in a roleplay-first military simulation featuring leadership, teamwork, and high-stakes permadeath.',
    releaseYear: 2026,
    releaseMonth: 10,
    lifetimeVisits: 15130,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/122013016126886/Command-Authority-Second-Strike'
  },
  {
    slug: 'marine-academy',
    title: 'Marine Academy: Military Roleplay',
    shortTitle: 'Marine Academy',
    genre: 'military',
    description: 'Enter Marine recruit training, qualify for specialized roles, and work your way through the ranks toward the Commandant.',
    releaseYear: 2025,
    releaseMonth: 9,
    lifetimeVisits: 12194251,
    peakCCU: 1964,
    peakCCUSource: 'public-tracker',
    robloxUrl: 'https://www.roblox.com/games/136611085381274/Marine-Academy-Military-Roleplay'
  },
  {
    slug: 'naval-academy',
    title: 'Naval Academy',
    genre: 'military',
    description: 'Begin your naval career with recruit training, take part in tryouts, and advance through the ranks as a sailor.',
    releaseYear: 2026,
    releaseMonth: 7,
    lifetimeVisits: 32694,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/132063414676820/Naval-Academy'
  },
  {
    slug: 'army-bootcamp',
    title: 'Army Bootcamp: Fort Liberty',
    shortTitle: 'Army Bootcamp',
    genre: 'military',
    description: 'Enlist at Fort Liberty, complete basic training, and advance as a soldier through drills, tryouts, and base operations.',
    releaseYear: 2025,
    releaseMonth: 10,
    lifetimeVisits: 1282904,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/88270740762567/Army-Bootcamp-Fort-Liberty'
  },
  {
    slug: 'clean-a-bloxbuster',
    title: 'Clean a Bloxbuster',
    genre: 'simulation',
    description: 'Restore a messy movie store by sorting tapes, restocking shelves, unlocking upgrades, and competing on the leaderboards.',
    releaseYear: 2026,
    releaseMonth: 9,
    lifetimeVisits: 19717,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/108909066053989/Clean-a-Bloxbuster'
  }
];

export const featuredGames = games.filter((game) => game.featured);
export const getGenreLabel = (id: GenreId) => genres.find((genre) => genre.id === id)?.label ?? id;

export function formatMilestone(visits: number | null): string | null {
  if (visits === null || !Number.isFinite(visits) || visits < 0) return null;
  if (visits >= 1_000_000_000) return String(Math.floor(visits / 100_000_000) / 10).replace(/\.0$/, '') + 'B+';
  if (visits >= 1_000_000) return String(Math.floor(visits / 1_000_000)) + 'M+';
  if (visits >= 1_000) return String(Math.floor(visits / 1_000)) + 'K+';
  return visits.toLocaleString('en-US');
}

/** Display historical peak CCU as an upward-rounded, approximate figure. */
export function formatPeakCCU(value: number | null, plus = false): string | null {
  if (value === null || !Number.isFinite(value) || value < 0) return null;
  const increment = value >= 500 ? 100 : value >= 100 ? 10 : value >= 20 ? 5 : 1;
  const rounded = Math.ceil(value / increment) * increment;
  const label = rounded >= 1000 ? `${parseFloat((rounded / 1000).toFixed(1))}K` : rounded.toLocaleString('en-US');
  return plus ? label + '+' : '~' + label;
}

/** Earliest recorded universe creation month is used as a release-date proxy. */
export function formatReleaseMonth(month: number | null | undefined, year: number | null): string | null {
  if (year === null) return null;
  if (!month || !Number.isInteger(month) || month < 1 || month > 12) return String(year);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });
}
