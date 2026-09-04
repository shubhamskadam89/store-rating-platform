export function getStoreImage(name: string, id: string): string {
  const lower = (name || '').toLowerCase();
  if (
    lower.includes('market') ||
    lower.includes('grocery') ||
    lower.includes('super') ||
    lower.includes('mart') ||
    lower.includes('fresh')
  ) {
    return '/stores/store-supermarket.jpg';
  }
  if (
    lower.includes('cafe') ||
    lower.includes('bakery') ||
    lower.includes('coffee') ||
    lower.includes('tea') ||
    lower.includes('bistro')
  ) {
    return '/stores/store-cafe.jpg';
  }
  if (
    lower.includes('tech') ||
    lower.includes('electr') ||
    lower.includes('digital') ||
    lower.includes('mobile') ||
    lower.includes('gadget')
  ) {
    return '/stores/store-tech.jpg';
  }
  if (
    lower.includes('boutique') ||
    lower.includes('fashion') ||
    lower.includes('cloth') ||
    lower.includes('wear') ||
    lower.includes('apparel')
  ) {
    return '/stores/store-boutique.jpg';
  }

  const stockImages = [
    '/stores/store-supermarket.jpg',
    '/stores/store-cafe.jpg',
    '/stores/store-boutique.jpg',
    '/stores/store-tech.jpg',
  ];
  let hash = 0;
  const key = id || name || 'store';
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  return stockImages[Math.abs(hash) % stockImages.length];
}
