export type SearchParams = {
  [key: string]: string | string[] | null;
};

export function getSearchWith(
  currentSearchParams: URLSearchParams,
  paramsToUpdate: SearchParams,
): string {
  const newParams = new URLSearchParams(currentSearchParams.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
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
