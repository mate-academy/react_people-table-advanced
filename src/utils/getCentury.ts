export const getCentury = (year: number): string => {
  if (year % 100 === 0) {
    return String(year / 100);
  }

  return String(Math.ceil(year / 100));
};
