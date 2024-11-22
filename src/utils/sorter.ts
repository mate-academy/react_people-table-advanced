import { SorterOrder } from './enums/sortedEnums';

type SortByKeyAndOrder = <T, K extends keyof T>(
  key: K,
  order: null | SorterOrder,
) => (a: T, b: T) => number;

export const sortByNumberAndOrder: SortByKeyAndOrder =
  (key, order) => (a, b) => {
    const first = a[key] as number;
    const second = b[key] as number;

    return order === SorterOrder.DESC ? second - first : first - second;
  };

export const sortByAlpabethalyAndOrder: SortByKeyAndOrder =
  (key, order) => (a, b) => {
    const first = a[key] as string;
    const second = b[key] as string;

    return order === SorterOrder.DESC
      ? second.toLowerCase().localeCompare(first.toLowerCase())
      : first.toLowerCase().localeCompare(second.toLowerCase());
  };
