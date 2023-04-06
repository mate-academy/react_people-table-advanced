import { Person } from '../types';

export type SearchParams = {
  [key: string]: string | string[] | null,
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
  const newParams = new URLSearchParams(
    currentParams.toString(),
  );

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

  Object.entries(paramsToUpdate)
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

  // we return a string to use it inside links
  return newParams.toString();
}

export const filterPeopleByParams = (
  people: Person[],
  sexFilter: string,
  queryFilter: string,
  centuriesFilter: string[],
) => {
  let filteredPeople = [...people];

  if (sexFilter) {
    filteredPeople = filteredPeople.filter(({ sex }) => sex === sexFilter);
  }

  if (queryFilter) {
    const normalizedFilter = queryFilter.trim().toLowerCase();

    filteredPeople = filteredPeople.filter(({
      name,
      fatherName,
      motherName,
    }) => {
      const father = fatherName || '';
      const mother = motherName || '';

      return (
        name.toLowerCase().includes(normalizedFilter)
        || father.toLowerCase().includes(normalizedFilter)
        || mother.toLowerCase().includes(normalizedFilter)
      );
    });
  }

  if (centuriesFilter.length) {
    filteredPeople = filteredPeople.filter(({ born }) => {
      const century = Math.floor(born / 100) + 1;

      return centuriesFilter.includes(century.toString());
    });
  }

  return filteredPeople;
};

export const sortPeople = (
  people: Person[],
  peopleSort: string,
  order: string,
) => {
  const sortedPeople = [...people].sort((a, b) => {
    switch (peopleSort) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'sex':
        return a.sex.localeCompare(b.sex);
      case 'born':
        return a.born - b.born;
      case 'died':
        return a.died - b.died;
      default:
        return 0;
    }
  });

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  return sortedPeople;
};
