import { SearchParams } from './searchHelper';

export enum SortType {
  NAME = 'Name',
  SEX = 'Sex',
  BORN = 'Born',
  DIED = 'Died',
}

const order = 'desc';

export function getSortParams(
  sortValue: SortType,
  currentSort: string,
  currentOrder: string,
): SearchParams {
  switch (true) {
    case currentSort !== sortValue && !currentOrder:
      return { sort: sortValue, order: null };
    case currentSort !== sortValue && !!currentOrder:
      return { sort: sortValue, order: null };
    case currentSort === sortValue && !currentOrder:
      return { sort: sortValue, order };
    default:
      return { sort: null, order: null };
  }
}

type Arg = string | null;

export const checkQuery = (param: string, ...args: Arg[]) => {
  if (!param) {
    return true;
  }

  const normalArgs = args.filter(arg => arg !== null) as string[];

  return normalArgs.some(value => {
    return value.toLowerCase().includes(param.toLowerCase());
  });
};
