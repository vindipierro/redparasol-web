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
  lifetimeVisits: number | null;
  peakCCU: number | null;
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
    description: 'Attend classes, join clubs, make friends, and explore beyond the school gates in a Japanese-inspired school life roleplay.',
    featured: true,
    releaseYear: 2025,
    lifetimeVisits: 24483085,
    peakCCU: 4000,
    peakCCUApproximate: true,
    robloxUrl: 'https://www.roblox.com/games/126631821717419/Seishun-School-Life-Roleplay'
  },
  {
    slug: 'oath-of-office',
    title: 'Oath of Office: Political Simulator',
    shortTitle: 'Oath of Office',
    genre: 'government',
    description: 'Step into the U.S. government as a member of Congress, the Executive Branch, or the judiciary. Debate laws, lead departments, and shape the nation\'s future.',
    featured: true,
    releaseYear: 2024,
    lifetimeVisits: 21785124,
    peakCCU: 3225,
    robloxUrl: 'https://www.roblox.com/games/83895704311875/Oath-of-Office-Political-Roleplay'
  },
  {
    slug: 'silk-road',
    title: 'Silk Road: Trading Simulator',
    shortTitle: 'Silk Road',
    genre: 'trading',
    description: 'Travel the seventh-century Silk Road, trade goods between ancient civilizations, and lead caravans across deserts, mountains, and bustling cities.',
    featured: true,
    releaseYear: 2026,
    lifetimeVisits: 4441710,
    peakCCU: 1592,
    robloxUrl: 'https://www.roblox.com/games/103073154610301/Silk-Road-Trading-Simulator'
  },
  {
    slug: 'command-authority',
    title: 'Command Authority: Military Roleplay',
    shortTitle: 'Command Authority',
    genre: 'military',
    description: 'Join the U.S. Armed Forces, deploy on operations in Africa, and rise through the ranks in a military roleplay world where leadership changes hands.',
    featured: true,
    releaseYear: 2024,
    lifetimeVisits: 12213408,
    peakCCU: 666,
    robloxUrl: 'https://www.roblox.com/games/121909225020263/Command-Authority-Military-Roleplay'
  },
  {
    slug: 'kiseki',
    title: 'Kiseki: Rival Academies',
    shortTitle: 'Kiseki',
    genre: 'school',
    description: 'Choose between two rival universities in an anime-inspired town. Attend classes, make friends, customize your character, and settle campus rivalries.',
    releaseYear: 2026,
    lifetimeVisits: 169741,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/72156617432799/Kiseki'
  },
  {
    slug: 'line-of-fire',
    title: 'Line of Fire: Secret Service Roleplay',
    shortTitle: 'Line of Fire',
    genre: 'government',
    tags: ['military'],
    description: 'Protect the President, patrol the White House, and respond to threats as Secret Service, or take on civilian roles in Washington, D.C.',
    releaseYear: 2025,
    lifetimeVisits: 4000265,
    peakCCU: 675,
    robloxUrl: 'https://www.roblox.com/games/127499782145032/Line-of-Fire-Secret-Service-Roleplay'
  },
  {
    slug: 'isekai-trading-simulator',
    title: 'Isekai Trading Simulator',
    genre: 'trading',
    description: 'Build a fortune across a fantasy world. Choose your race, discover trading routes, gather mounts, and travel with friends in your own merchant caravan.',
    releaseYear: 2026,
    lifetimeVisits: 51926,
    peakCCU: 117,
    robloxUrl: 'https://www.roblox.com/games/93596733187914/Isekai-Trading-Simulator'
  },
  {
    slug: 'moosewood',
    title: 'Moosewood: Camp Roleplay',
    shortTitle: 'Moosewood',
    genre: 'school',
    description: 'Summer never ends at Moosewood. Become a camper or cabin counselor, make new friends, and create your own adventures at summer camp.',
    releaseYear: 2026,
    lifetimeVisits: 550833,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/84326252804702/Moosewood-Camp-Roleplay'
  },
  {
    slug: 'command-authority-second-strike',
    title: 'Command Authority: Second Strike',
    shortTitle: 'Command Authority: Second Strike',
    genre: 'military',
    description: 'Deploy to Eastern Europe in a roleplay-first military simulation featuring evolving leadership, permanent role loss, and coordinated operations.',
    releaseYear: 2026,
    lifetimeVisits: 15123,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/122013016126886/Command-Authority-Second-Strike'
  },
  {
    slug: 'marine-academy',
    title: 'Marine Academy: Military Roleplay',
    shortTitle: 'Marine Academy',
    genre: 'military',
    description: 'Enlist as a Marine recruit, complete training, attend tryouts, and rise through the ranks toward commanding the Corps.',
    releaseYear: 2025,
    lifetimeVisits: 12194077,
    peakCCU: 1964,
    robloxUrl: 'https://www.roblox.com/games/136611085381274/Marine-Academy-Military-Roleplay'
  },
  {
    slug: 'naval-academy',
    title: 'Naval Academy',
    genre: 'military',
    description: 'Train to become a Sailor, attend recruit training and tryouts, and work toward the Navy\'s highest ranks through leadership and service.',
    releaseYear: 2026,
    lifetimeVisits: 32694,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/132063414676820/Naval-Academy'
  },
  {
    slug: 'army-bootcamp',
    title: 'Army Bootcamp: Fort Liberty',
    shortTitle: 'Army Bootcamp',
    genre: 'military',
    description: 'Begin your Army career at Fort Liberty. Complete basic training, practice drills, earn qualifications, and advance through the ranks.',
    releaseYear: 2025,
    lifetimeVisits: 1282903,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/88270740762567/Army-Bootcamp-Fort-Liberty'
  },
  {
    slug: 'clean-a-bloxbuster',
    title: 'Clean a Bloxbuster',
    genre: 'simulation',
    description: 'Restore a chaotic video store by sorting tapes, restocking shelves, unlocking upgrades, and racing the clock solo or with friends.',
    releaseYear: 2026,
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
