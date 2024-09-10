export type SearchParams = {
  [key: string]: string | string[] | null;
};

export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams | string,
): string {
  const newParams = new URLSearchParams(currentParams.toString());

  if (typeof paramsToUpdate === 'string') {
    const sort = newParams.get('sort');
    const order = newParams.get('order');

    if (!sort || sort !== paramsToUpdate) {
      newParams.delete('order');
      newParams.set('sort', paramsToUpdate);
    } else if (sort === paramsToUpdate && !order) {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }
  } else {
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
  }

  return newParams.toString();
}

export const toggleCentury = (centuriesArr: string[], value: string) => {
  return centuriesArr.includes(value)
    ? centuriesArr.filter((item: string) => item !== value)
    : [...centuriesArr, value];
};
