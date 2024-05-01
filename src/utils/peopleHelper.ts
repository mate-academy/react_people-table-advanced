import { Person } from '../types';
import { getCentury } from './functionHelpers';

const sortPeopleWithSearch = (people: Person[], search: URLSearchParams) => {
  const sort = search.get('sort') as keyof Person | null;
  const order = search.get('order');

  switch (sort) {
    case 'name':
    case 'sex':
      return people.sort((a, b) =>
        order ? b.sex.localeCompare(a.sex) : a.sex.localeCompare(b.sex),
      );
    case 'born':
    case 'died':
      return people.sort((a, b) =>
        order ? b[sort] - a[sort] : a[sort] - b[sort],
      );
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
