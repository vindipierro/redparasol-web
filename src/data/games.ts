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
    description: 'Explore everyday school life, make friends, and create your own stories in a lively social roleplay world.',
    featured: true,
    releaseYear: null,
    lifetimeVisits: null,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/126631821717419/Seishun-School-Life-Roleplay'
  },
  {
    slug: 'oath-of-office',
    title: 'Oath of Office: Political Simulator',
    shortTitle: 'Oath of Office',
    genre: 'government',
    description: 'Step into the world of government and politics, take on public-service roles, and shape the story with other players.',
    featured: true,
    releaseYear: null,
    lifetimeVisits: null,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/83895704311875/Oath-of-Office-Political-Roleplay'
  },
  {
    slug: 'silk-road',
    title: 'Silk Road: Trading Simulator',
    shortTitle: 'Silk Road',
    genre: 'trading',
    description: 'Trade, find new opportunities, and build your own path in a player-driven trading simulator.',
    featured: true,
    releaseYear: null,
    lifetimeVisits: null,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/103073154610301/Silk-Road-Trading-Simulator'
  },
  {
    slug: 'command-authority',
    title: 'Command Authority: Military Roleplay',
    shortTitle: 'Command Authority',
    genre: 'military',
    description: 'Take part in military roleplay built around teamwork, leadership, and structured operations.',
    featured: true,
    releaseYear: null,
    lifetimeVisits: null,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/121909225020263/Command-Authority-Military-Roleplay'
  },
  {
    slug: 'kiseki',
    title: 'Kiseki: Rival Academies',
    shortTitle: 'Kiseki',
    genre: 'school',
    description: 'Enter a world of rival academies, build friendships, and create your own school-life story.',
    releaseYear: null,
    lifetimeVisits: null,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/72156617432799/Kiseki'
  },
  {
    slug: 'line-of-fire',
    title: 'Line of Fire: Secret Service Roleplay',
    shortTitle: 'Line of Fire',
    genre: 'government',
    tags: ['military'],
    description: 'Experience Secret Service roleplay through protective duties, security operations, and teamwork.',
    releaseYear: null,
    lifetimeVisits: null,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/127499782145032/Line-of-Fire-Secret-Service-Roleplay'
  },
  {
    slug: 'isekai-trading-simulator',
    title: 'Isekai Trading Simulator',
    genre: 'trading',
    description: 'Discover a fantasy-inspired trading simulator where each decision opens new opportunities.',
    releaseYear: null,
    lifetimeVisits: null,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/93596733187914/Isekai-Trading-Simulator'
  },
  {
    slug: 'moosewood',
    title: 'Moosewood: Camp Roleplay',
    shortTitle: 'Moosewood',
    genre: 'school',
    description: 'Make memories through camp activities, friendships, and open-ended roleplay at Moosewood.',
    releaseYear: null,
    lifetimeVisits: null,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/84326252804702/Moosewood-Camp-Roleplay'
  },
  {
    slug: 'command-authority-second-strike',
    title: 'Command Authority: Second Strike',
    shortTitle: 'Command Authority: Second Strike',
    genre: 'military',
    description: 'Return to the Command Authority universe for a military roleplay experience built around teamwork and action.',
    releaseYear: null,
    lifetimeVisits: null,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/122013016126886/Command-Authority-Second-Strike'
  },
  {
    slug: 'marine-academy',
    title: 'Marine Academy: Military Roleplay',
    shortTitle: 'Marine Academy',
    genre: 'military',
    description: 'Train, advance, and take on military roles in an immersive academy setting.',
    releaseYear: null,
    lifetimeVisits: null,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/136611085381274/Marine-Academy-Military-Roleplay'
  },
  {
    slug: 'naval-academy',
    title: 'Naval Academy',
    genre: 'military',
    description: 'Experience naval academy life through training, service, and roleplay with other players.',
    releaseYear: null,
    lifetimeVisits: null,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/132063414676820/Naval-Academy'
  },
  {
    slug: 'army-bootcamp',
    title: 'Army Bootcamp: Fort Liberty',
    shortTitle: 'Army Bootcamp',
    genre: 'military',
    description: 'Begin military training at Fort Liberty in a structured bootcamp roleplay experience.',
    releaseYear: null,
    lifetimeVisits: null,
    peakCCU: null,
    robloxUrl: 'https://www.roblox.com/games/88270740762567/Army-Bootcamp-Fort-Liberty'
  },
  {
    slug: 'clean-a-bloxbuster',
    title: 'Clean a Bloxbuster',
    genre: 'simulation',
    description: 'Bring a movie store back to life by cleaning, organizing tapes, and keeping the shelves stocked.',
    releaseYear: null,
    lifetimeVisits: null,
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
