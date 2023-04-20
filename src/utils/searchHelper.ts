import { Person } from '../types';

export type SearchParams = {
  [key: string]: string | string[] | null,
};

export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
): string {
  const newParams = new URLSearchParams(
    currentParams.toString(),
  );

  Object.entries(paramsToUpdate)
    .forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);

        value.forEach(part => {
          newParams.append(key, part);
        });
      } else {
        newParams.set(key, value);
      }
    });

  return newParams.toString();
}

export function updateSearchParams(
  searchParams: URLSearchParams,
  sortField: keyof Person,
  isCurrentSortField: boolean,
  isReversed: boolean,
) {
  if (!isCurrentSortField) {
    return getSearchWith(
      searchParams,
      {
        sort: sortField,
        order: null,
      },
    );
  }

  if (!isReversed) {
    return getSearchWith(
      searchParams,
      {
        order: 'desc',
      },
    );
  }

  return getSearchWith(
    searchParams,
    {
      sort: null,
      order: null,
    },
  );
}
