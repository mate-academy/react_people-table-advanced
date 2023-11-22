export function fetchPeople(url: string) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('People can not be loaded');
      }

      return response.json();
    });
}

export type SearchParams = {
  [key: string]: string | string[] | null,
};

export function getSearchWith(
  paramsToUpdate: SearchParams,
  currentParams: URLSearchParams,
): string {
  const newParams = new URLSearchParams(
    currentParams.toString(),
  );

  Object.entries(paramsToUpdate)
    .forEach(([key, value]) => {
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
