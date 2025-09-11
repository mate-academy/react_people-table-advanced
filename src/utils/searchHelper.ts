import { SearchParams } from '../types/SearchParams';

export function getSearchWith(
  paramsToUpdate: SearchParams,
  currentParams?: URLSearchParams | string,
): string {
  const newParams = new URLSearchParams(currentParams?.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(v => newParams.append(key, v.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  });

  return newParams.toString();
}
