import { Params } from '../types/SearchParams';

export type SearchParams = {
  [key: string]: string | string[] | null;
};

export function getSearchWith(
  params: Params,
  search?: string | URLSearchParams,
): string {
  const newParams = new URLSearchParams(search);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);

      value.forEach(part => {
        newParams.append(key, part.toString());
      });
    } else {
      newParams.set(key, value.toString());
    }
  });

  return newParams.toString();
}
