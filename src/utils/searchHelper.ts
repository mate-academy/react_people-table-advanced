import {SortType} from "../types/SortType";

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
        // we delete the key to remove old values
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

export const getSortingSearch = (
  filterType: SortType,
  sort: string,
  order: string,
) => {
  const params: { [key: string] : string | null } = {
    sort,
    order,
  };

  switch (sort) {
    case '':
      params.sort = filterType;
      params.order = null;
      break;

    default:
      params.order = 'desc';
  }

  switch (order) {
    case 'desc':
      params.sort = null;
      params.order = null;
      break;

    default:
  }

  return params;
};
