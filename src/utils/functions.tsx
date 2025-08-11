import { Person } from '../types';

export const getPreparedPeople = (
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
  sort: string | null,
  order: string | null,
) => {
  let resulsPeopleList = [...people];

  if (!!sex) {
    resulsPeopleList = resulsPeopleList.filter(person => person.sex === sex);
  }

  if (!!query) {
    const normalizedQuery = query.trim().toLowerCase();

    resulsPeopleList = resulsPeopleList.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (!!centuries.length) {
    resulsPeopleList = resulsPeopleList.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sort) {
    resulsPeopleList = resulsPeopleList.sort((person1, person2) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return person1[sort].localeCompare(person2[sort]);

        case 'born':
        case 'died':
          return person1[sort] - person2[sort];
        default:
          return 0;
      }
    });
  }

  if (order === 'desc') {
    return resulsPeopleList.reverse();
  }

  return resulsPeopleList;
};
