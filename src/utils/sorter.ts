import { SorterOrder } from './enums/sortedEnums';

type SortByKeyAndOrder = <T, K extends keyof T>(
  key: K,
  order: null | SorterOrder,
) => (a: T, b: T) => number;

export const sortByNumberAndOrder: SortByKeyAndOrder =
  (key, order) => (a, b) => {
    const first = <number>a[key];
    const second = <number>b[key];

    return order === SorterOrder.DESC ? second - first : first - second;
  };

export const sortByAlpabethalyAndOrder: SortByKeyAndOrder =
  (key, order) => (a, b) => {
    const first = <string>a[key];
    const second = <string>b[key];

    return order === SorterOrder.DESC
      ? second.toLowerCase().localeCompare(first.toLowerCase())
      : first.toLowerCase().localeCompare(second.toLowerCase());
  };
