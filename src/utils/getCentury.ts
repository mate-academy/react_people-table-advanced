export const getCenturyFromYear = (year: number) => {
  return Math.ceil((year + 1) / 100).toString();
};
