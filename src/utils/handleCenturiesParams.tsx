export const handleCenturiesParams = (centuries: string[], CENTURY: string) => {
  return centuries.includes(CENTURY)
    ? centuries.filter(century => century !== CENTURY)
    : [...centuries, CENTURY];
};
