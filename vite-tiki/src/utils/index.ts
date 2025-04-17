export const formatCurrency = (number: number): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

interface Badge {
  icon: string | null;
  text: string;
}

export const FilterInfoBadge = (badges?: Badge[]): Badge | null => {
  if (!badges) return null;
  return badges.find(badge => badge.icon === null) || null;
}
