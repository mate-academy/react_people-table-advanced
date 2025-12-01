export type SearchParams = {
  [key: string]: string | string[] | null;
};

export function getSearchWith(
  updateParams: SearchParams,
  currentParams: string | URLSearchParams,
) {
  const newParams = new URLSearchParams(currentParams);

  for (const [key, value] of Object.entries(updateParams)) {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);

      value.forEach(char => newParams.append(key, char));
    } else {
      newParams.set(key, value);
    }
  }

  return newParams.toString();
}
