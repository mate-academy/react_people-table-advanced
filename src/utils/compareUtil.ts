const compareStrings = (value1: string, value2: string) =>
  value1.localeCompare(value2);

const compareNumbers = (value1: number, value2: number) => value1 - value2;

export const compareValues = (value1: unknown, value2: unknown) => {
  if (typeof value1 === 'string' && typeof value2 === 'string') {
    return compareStrings(value1, value2);
  }

  if (typeof value1 === 'number' && typeof value2 === 'number') {
    return compareNumbers(value1, value2);
  }

  return 0;
};
