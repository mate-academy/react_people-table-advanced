export function sortBy<T extends object>(
  items: T[],
  key: keyof T,
  order: string,
): T[] {
  const orderedAction = order === 'desc' ? -1 : 1;

  return [...items].sort((item1, item2) => {
    const value1 = item1[key];
    const value2 = item2[key];

    if (typeof value1 === 'number' && typeof value2 === 'number') {
      return (value1 - value2) * orderedAction;
    }

    if (typeof value1 === 'string' && typeof value2 === 'string') {
      return value1.localeCompare(value2) * orderedAction;
    }

    return 0;
  });
}
