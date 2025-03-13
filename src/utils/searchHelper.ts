export type SearchParams = {
  [key: string]: string | string[] | null;
};

export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams
): string {
  // copy currentParams by creating new object from a string

  console.log('paramsToUpdate', paramsToUpdate); // ['20']

  const newParams = new URLSearchParams(currentParams.toString());

  console.log('newParams', newParams.toString()); // 

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
