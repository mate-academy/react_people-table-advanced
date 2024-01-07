import { Person } from '../types';
import { SortType } from '../types/sort-enum';
import { getCentury } from './getCentury';

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

export const getFilteredPeople = (
  searchParams: URLSearchParams,
  peopleFS: Person [] | null,
) => {
  if (!peopleFS) {
    return null;
  }

  const currentSex = searchParams.get('sex');
  const currentSearch = searchParams.get('search');
  const currentCenturies = searchParams.getAll('century');
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  let peopleCopy = [...peopleFS];

  if (currentSex) {
    peopleCopy = peopleCopy.filter(({ sex }) => {
      return sex === currentSex;
    });
  }

  if (currentSearch) {
    const query = currentSearch?.trim().toLowerCase() || '';

    peopleCopy = peopleCopy.filter(({ name, fatherName, motherName }) => {
      return name.toLowerCase().includes(query)
          || fatherName?.toLowerCase().includes(query)
          || motherName?.toLowerCase().includes(query);
    });
  }

  if (currentCenturies.length > 0) {
    peopleCopy = peopleCopy.filter(({ born }) => {
      const bornCentury = getCentury(born);

      return currentCenturies.includes(bornCentury);
    });
  }

  if (currentSort && !currentOrder) {
    switch (currentSort) {
      case SortType.NAME:
        return peopleCopy.sort((
          { name: name1 },
          { name: name2 },
        ) => name1.localeCompare(name2));
      case SortType.SEX:
        return peopleCopy.sort((
          { sex: sex1 },
          { sex: sex2 },
        ) => sex1.localeCompare(sex2));
      case SortType.BORN:
        return peopleCopy.sort((
          { born: born1 },
          { born: born2 },
        ) => born1 - born2);
      case SortType.DIED:
        return peopleCopy.sort((
          { died: died1 },
          { died: died2 },
        ) => died1 - died2);
      default:
        return [];
    }
  }

  if (currentSort && currentOrder) {
    switch (currentSort) {
      case SortType.NAME:
        return peopleCopy.sort((
          { name: name1 },
          { name: name2 },
        ) => name2.localeCompare(name1));
      case SortType.SEX:
        return peopleCopy.sort((
          { sex: sex1 },
          { sex: sex2 },
        ) => sex2.localeCompare(sex1));
      case SortType.BORN:
        return peopleCopy.sort((
          { born: born1 },
          { born: born2 },
        ) => born2 - born1);
      case SortType.DIED:
        return peopleCopy.sort((
          { died: died1 },
          { died: died2 },
        ) => died2 - died1);
      default:
        return [];
    }
  }

  return peopleCopy;
};
