export type SearchParams = {
  [key: string]: string | string[] | null;
};

/**
 * This function prepares a correct search string
 * from a given currentParams and paramsToUpdate.
 */
export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams | string, // it's our custom type
): string {
  // copy currentParams by creating new object from a string
  const newParams = new URLSearchParams(currentParams.toString());

  // Here is the example of paramsToUpdate
  // {
  //   sex: 'm',                ['sex', 'm']
  //   order: null,             ['order', null]
  //   centuries: ['16', '19'], ['centuries', ['16', '19']]
  // }
  //
  // - params with the `null` value are deleted;
  // - string value is set to given param key;
  // - array of strings adds several params with the same key;
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
        // we delete the key to remove old values
        newParams.delete(key);
        value.forEach(part => {
          newParams.append(key, part);
        });
      } else {
        newParams.set(key, value);
      }
    });
  }

  // we return a string to use it inside links
  return newParams.toString();
}

export const toggleCentury = (centuriesArr: string[], value: string) => {
  return centuriesArr.includes(value)
    ? centuriesArr.filter((item: string) => item !== value)
    : [...centuriesArr, value];
};
