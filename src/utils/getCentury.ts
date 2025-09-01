export const getCentury = (born: number | null | undefined): number | undefined => {
  if (!born || born < 1) {
    return undefined;
  }

  // Anos 1-100 são século 1, 101-200 são século 2, etc.
  return Math.ceil(born / 100);
};
