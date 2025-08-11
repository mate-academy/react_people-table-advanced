export const toggleCenturiesArray = (centuries: string[], century: string) => {
  const newCenturies = centuries.includes(century)
    ? centuries.filter(num => num !== century)
    : [...centuries, century];

  return newCenturies;
};
