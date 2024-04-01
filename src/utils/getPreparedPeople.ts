import { Person } from '../types';

const getCentury = (year: number) => Math.ceil(year / 100);

export const getVisiblePeople = (
  people: Person[],
  query: string,
  sex: string,
  sort: string,
  centuries: string[],
  order: string,
) => {
  let peopleList = [...people];

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    peopleList = peopleList.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (sex) {
    peopleList = peopleList.filter(person => person.sex === sex);
  }

  if (sort) {
    switch (sort) {
      case 'name':
      case 'sex':
        peopleList = peopleList.sort((a, b) => a[sort].localeCompare(b[sort]));
        break;
      case 'born':
      case 'died':
        peopleList = peopleList.sort((a, b) => a[sort] - b[sort]);
        break;
      default:
        break;
    }
  }

  if (centuries.length) {
    peopleList = peopleList.filter(person =>
      centuries.includes(`${getCentury(person.born)}`),
    );
  }

  if (order) {
    peopleList = peopleList.reverse();
  }

  return peopleList;
};
