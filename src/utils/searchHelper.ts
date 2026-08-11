export type SearchParams = Record<string, string | string[] | null>;

export function getSearchWith(
  params: SearchParams,
  search: URLSearchParams,
): URLSearchParams {
  const newParams = new URLSearchParams(search);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(part => newParams.append(key, part));
    } else {
      newParams.set(key, value);
    }
  });

  return newParams;
}
