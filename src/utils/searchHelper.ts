export type SearchParams = {
  [key: string]: string | string[] | null;
};

export function getSearchWith(
  currentParams: URLSearchParams | string,
  paramsToUpdate: SearchParams,
): string {
  const newParams = new URLSearchParams(currentParams.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
      return;
    }

    if (Array.isArray(value)) {
      newParams.delete(key);

      value.forEach(part => {
        newParams.append(key, part);
      });
      return;
    }

    newParams.set(key, value);
  });

  return newParams.toString();
}
