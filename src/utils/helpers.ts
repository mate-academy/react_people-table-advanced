export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getCentury = (born: number) => {
  return `${Math.trunc(born / 100 + 1)}`;
};

export type SearchParams = {
  [key: string]: string | string[] | null;
};

export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
): string {
  const newParams = new URLSearchParams(currentParams.toString());

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

export const createCenturiesParams = (centuries: string[], century: string) => {
  return {
    centuries: centuries.includes(century)
      ? [...centuries.filter(c => c !== century)]
      : [...centuries, century],
  };
};

import { Person } from '../types';

const sortPeopleWithSearch = (people: Person[], search: URLSearchParams) => {
  const sort = search.get('sort') as keyof Person | null;
  const order = search.get('order');

  switch (sort) {
    case 'name':
      return people.sort((a, b) =>
        order ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name),
      );
    case 'sex':
      return people.sort((a, b) =>
        order ? b.sex.localeCompare(a.sex) : a.sex.localeCompare(b.sex),
      );
    case 'born':
      return people.sort((a, b) => (order ? b.born - a.born : a.born - b.born));
    case 'died':
      return people.sort((a, b) => (order ? b.died - a.died : a.died - b.died));
    default:
      return people;
  }
};

const filterPeopleWithSearch = (people: Person[], search: URLSearchParams) => {
  const sex = search.get('sex');
  const centuries = search.getAll('centuries');
  const query = search.get('query')?.trim().toLocaleLowerCase();

  return people.filter(person => {
    const fatherName = person.fatherName;
    const motherName = person.motherName;

    if (
      !(sex ? person.sex === sex : true) ||
      !(centuries.length
        ? centuries.includes(getCentury(person.born))
        : true) ||
      !(query
        ? person.name.toLocaleLowerCase().includes(query) ||
          fatherName?.toLocaleLowerCase().includes(query) ||
          motherName?.toLocaleLowerCase().includes(query)
        : true)
    ) {
      return false;
    }

    return true;
  });
};

export const preparePeople = (people: Person[], search: URLSearchParams) => {
  const sortedPeople = sortPeopleWithSearch(people, search);

  return filterPeopleWithSearch(sortedPeople, search);
};

export const findParents = (people: Person[]) => {
  return people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));
};
