import { Person } from '../types';

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

export function filterPeopleList(
  people: Person[],
  searchParams: URLSearchParams,
): Person[] {
  let preparedPeopleList = [...people];

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  if (sex) {
    preparedPeopleList = preparedPeopleList
      .filter(person => person.sex === sex);
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    preparedPeopleList = preparedPeopleList.filter(person => {
      return person.name.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery);
    });
  }

  if (centuries.length) {
    preparedPeopleList = preparedPeopleList.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  if (sort) {
    switch (sort) {
      case 'name':
      case 'sex':
        preparedPeopleList = order
          ? preparedPeopleList
            .sort((a, b) => b[sort].localeCompare(a[sort]))
          : preparedPeopleList
            .sort((a, b) => a[sort].localeCompare(b[sort]));
        break;

      case 'born':
      case 'died':
        preparedPeopleList = order
          ? preparedPeopleList
            .sort((a, b) => b[sort] - a[sort])
          : preparedPeopleList
            .sort((a, b) => a[sort] - b[sort]);
        break;

      default:
        break;
    }
  }

  return preparedPeopleList;
}
