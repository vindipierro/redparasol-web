import snapshot from './ccu-order.json';

/**
 * The site uses an invisible, periodically refreshed ordering snapshot.
 * Current CCU itself is intentionally neither shown to visitors nor embedded in the JSON.
 */
export function sortGamesByCCU<T extends { slug: string }>(items: readonly T[]): T[] {
  const slugs = snapshot.order as string[];
  const positions = new Map<string, number>(slugs.map((slug, index) => [slug, index]));

  return items
    .map((game, originalIndex) => ({ game, originalIndex }))
    .sort((a, b) => {
      const posA = positions.get(a.game.slug) ?? Number.MAX_SAFE_INTEGER;
      const posB = positions.get(b.game.slug) ?? Number.MAX_SAFE_INTEGER;
      return posA - posB || a.originalIndex - b.originalIndex;
    })
    .map(({ game }) => game);
}
