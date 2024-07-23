export const getCentury = (year: number) => {
  if (year < 0) {
    return null;
  }

  return Math.ceil(year / 100);
};
