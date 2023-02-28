export const toggleCenturies = (
  centuries: string[],
  century: string,
): string[] => {
  if (centuries.includes(century)) {
    return centuries
      .filter((selectedCentury) => selectedCentury !== century);
  }

  return [...centuries, century];
};
