export const toggleCentury = (
  centuries: string[],
  newCentury: string,
): string[] => (
  centuries.includes(newCentury)
    ? centuries.filter(age => age !== newCentury)
    : [...centuries, newCentury]
);
