export const calculateCentury = (year: number): string => {
  return String(Math.ceil(year / 100));
};
