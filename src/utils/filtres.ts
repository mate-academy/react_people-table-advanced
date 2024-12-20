type Condition<T> = (...args: [T, number, T[]]) => boolean;

export const combineFilter = <T>(...conditions: Condition<T>[]) => {
  return (...args: [T, number, T[]]) =>
    conditions.every(condition => condition(...args));
};

export const filterByString = <T>(query: string, keys: (keyof T)[]) => {
  return (item: T) =>
    keys.some(key =>
      String(item[key])?.toLowerCase().includes(query.toLowerCase()),
    );
};
