export const getCentury = (year: number) => {
  if (year === 1) {
    return 0;
  }

  return Math.ceil(year / 100);
};
