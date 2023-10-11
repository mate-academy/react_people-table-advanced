export const partOfSort = (one: number | string, two: number | string) => {
  if (typeof one === 'string' && typeof two === 'string') {
    return one.localeCompare(two);
  }

  if (typeof one === 'number' && typeof two === 'number') {
    return one - two;
  }

  return 0;
};
