export type SearchParams = {
  [key: string]: string | string[] | null
};

export function getSearchWith(
  currentParams: URLSearchParams,
  parmsToUpdate: SearchParams,
): string {
  const newParams = new URLSearchParams(
    currentParams.toString(),
  );

  Object.entries(parmsToUpdate)
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
