import { Person } from '../types';

export type SearchParams = {
  [key: string]: string | string[] | null;
};

/**
 * This function prepares a correct search string
 * from a given currentParams and paramsToUpdate.
 */
export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams, // it's our custom type
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

  // we return a string to use it inside links
  return newParams.toString();
}

export function filterPeople(
  people: Person[],
  options: URLSearchParams,
): Person[] {
  const query = (options.get('query') || '').toLowerCase();
  const centuries = options.getAll('centuries');
  const sex = options.get('sex');
  const sort = options.get('sort');
  const order = options.get('order');

  const filtredArr = people
    .filter(
      el =>
        el.name.toLowerCase().includes(query) ||
        el.fatherName?.toLowerCase().includes(query) ||
        el.motherName?.toLowerCase().includes(query),
    )
    .filter(el => {
      let century = Math.floor(el.died / 100) + 1;

      if (el.died % 100 === 0) {
        century = Math.floor(el.died / 100);
      }

      return centuries.length === 0 || centuries.includes(`${century}`);
    })
    .filter(el => !sex || el.sex === sex);

  if (!sort) {
    return filtredArr;
  }

  filtredArr.sort((a, b) => {
    const normalizedA = a[sort as keyof Person] || '';
    const normalizedB = b[sort as keyof Person] || '';

    if (isNaN(+normalizedA)) {
      return `${normalizedA}`.localeCompare(`${normalizedB}`);
    } else {
      return +normalizedA - Number(normalizedB);
    }
  });

  if (order === 'desc') {
    return filtredArr.reverse();
  }

  return filtredArr;
}
