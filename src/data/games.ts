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
    description: 'Make your own story in a lively school-life roleplay world.',
    featured: true,
    releaseYear: null,
    lifetimeVisits: null,
    robloxUrl: 'https://www.roblox.com/games/126631821717419/Seishun-School-Life-Roleplay'
  },
  {
    slug: 'oath-of-office',
    title: 'Oath of Office: Political Simulator',
    shortTitle: 'Oath of Office',
    genre: 'government',
    description: 'Explore government and public-service roleplay in a player-driven world.',
    featured: true,
    releaseYear: null,
    lifetimeVisits: null,
    robloxUrl: 'https://www.roblox.com/games/83895704311875/Oath-of-Office-Political-Roleplay'
  },
  {
    slug: 'silk-road',
    title: 'Silk Road: Trading Simulator',
    shortTitle: 'Silk Road',
    genre: 'trading',
    description: 'Find your path in a world centered on trading and simulation.',
    featured: true,
    releaseYear: null,
    lifetimeVisits: null,
    robloxUrl: 'https://www.roblox.com/games/103073154610301/Silk-Road-Trading-Simulator'
  },
  {
    slug: 'command-authority',
    title: 'Command Authority: Military Roleplay',
    shortTitle: 'Command Authority',
    genre: 'military',
    description: 'Step into a military roleplay experience built around structure and teamwork.',
    featured: true,
    releaseYear: null,
    lifetimeVisits: null,
    robloxUrl: 'https://www.roblox.com/games/121909225020263/Command-Authority-Military-Roleplay'
  },
  {
    slug: 'kiseki',
    title: 'Kiseki: Rival Academies',
    shortTitle: 'Kiseki',
    genre: 'school',
    description: 'A social roleplay experience where players make everyday moments their own.',
    releaseYear: null,
    lifetimeVisits: null,
    robloxUrl: 'https://www.roblox.com/games/72156617432799/Kiseki'
  },
  {
    slug: 'line-of-fire',
    title: 'Line of Fire: Secret Service Roleplay',
    shortTitle: 'Line of Fire',
    genre: 'government',
    tags: ['military'],
    description: 'A security-focused roleplay experience with immersive responsibilities and roles.',
    releaseYear: null,
    lifetimeVisits: null,
    robloxUrl: 'https://www.roblox.com/games/127499782145032/Line-of-Fire-Secret-Service-Roleplay'
  },
  {
    slug: 'isekai-trading-simulator',
    title: 'Isekai Trading Simulator',
    genre: 'trading',
    description: 'Trade your way across a fantasy world, discover new routes, and build a thriving merchant journey.',
    releaseYear: null,
    lifetimeVisits: null,
    robloxUrl: 'https://www.roblox.com/games/93596733187914/Isekai-Trading-Simulator'
  },
  {
    slug: 'moosewood',
    title: 'Moosewood: Camp Roleplay',
    shortTitle: 'Moosewood',
    genre: 'school',
    description: 'Discover social adventures in a camp-inspired roleplay setting.',
    releaseYear: null,
    lifetimeVisits: null,
    robloxUrl: 'https://www.roblox.com/games/84326252804702/Moosewood-Camp-Roleplay'
  },
  {
    slug: 'command-authority-second-strike',
    title: 'Command Authority: Second Strike',
    shortTitle: 'Command Authority: Second Strike',
    genre: 'military',
    description: 'A further chapter in the Command Authority world.',
    releaseYear: null,
    lifetimeVisits: null,
    robloxUrl: 'https://www.roblox.com/games/122013016126886/Command-Authority-Second-Strike'
  },
  {
    slug: 'marine-academy',
    title: 'Marine Academy: Military Roleplay',
    shortTitle: 'Marine Academy',
    genre: 'military',
    description: 'Learn, train, and roleplay in a military academy setting.',
    releaseYear: null,
    lifetimeVisits: null,
    robloxUrl: 'https://www.roblox.com/games/136611085381274/Marine-Academy-Military-Roleplay'
  },
  {
    slug: 'naval-academy',
    title: 'Naval Academy',
    genre: 'military',
    description: 'A naval academy roleplay experience centered on training and service.',
    releaseYear: null,
    lifetimeVisits: null,
    robloxUrl: 'https://www.roblox.com/games/132063414676820/Naval-Academy'
  },
  {
    slug: 'army-bootcamp',
    title: 'Army Bootcamp: Fort Liberty',
    shortTitle: 'Army Bootcamp',
    genre: 'military',
    description: 'Enlist, complete basic training, and experience military life at Fort Liberty.',
    releaseYear: null,
    lifetimeVisits: null,
    robloxUrl: 'https://www.roblox.com/games/88270740762567/Army-Bootcamp-Fort-Liberty'
  },
  {
    slug: 'clean-a-bloxbuster',
    title: 'Clean a Bloxbuster',
    genre: 'simulation',
    description: 'Clean up, organize, and keep a movie store running in a playful simulator.',
    releaseYear: null,
    lifetimeVisits: null,
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
