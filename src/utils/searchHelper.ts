export type SearchParams = {
  [key: string]: string | string[] | null;
};

export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
): string {
  const searchParams = new URLSearchParams(currentParams);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    searchParams.delete(key);

    if (value === null) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(item => searchParams.append(key, item));

      return;
    }

    searchParams.set(key, value);
  });

  const search = searchParams.toString();

  return search ? `?${search}` : '';
}
