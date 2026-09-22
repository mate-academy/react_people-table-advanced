export type SearchParams = {
  [key: string]: string | string[] | null | undefined;
};

export function getSearchWith(
  currentParams: URLSearchParams,
  params: SearchParams,
): string {
  const newParams = new URLSearchParams(currentParams);

  Object.entries(params).forEach(([key, value]) => {
    newParams.delete(key);

    if (value === null || value === undefined) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(item => {
        newParams.append(key, item);
      });

      return;
    }

    newParams.set(key, value);
  });

  const search = newParams.toString();

  return search ? `?${search}` : '';
}
