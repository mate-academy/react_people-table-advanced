import { Person } from '../types/Person';

const getCentury = (number: number) => {
  return Math.ceil(number / 100);
};

export const getVisiblePeople = (
  people: Person[],
  query: string,
  sex: string,
  sort: string,
  centuries: string[],
  order: string,
) => {
  let newPeople = [...people];

  if (query) {
    const cleanQuery = query.toLowerCase().trim();

    newPeople = newPeople.filter(
      person =>
        person.name.toLowerCase().includes(cleanQuery) ||
        person.fatherName?.toLowerCase().includes(cleanQuery) ||
        person.motherName?.toLowerCase().includes(cleanQuery),
    );
  }

  if (sex) {
    newPeople = newPeople.filter(person => person.sex === sex);
  }

  if (sort) {
    switch (sort) {
      case 'name':
      case 'sex':
        newPeople = newPeople.sort((a, b) => a[sort].localeCompare(b[sort]));
        break;
      case 'born':
      case 'died':
        newPeople = newPeople.sort((a, b) => a[sort] - b[sort]);
        break;
      default:
        break;
    }
  }

  if (centuries.length) {
    newPeople = newPeople.filter(person =>
      centuries.includes(`${getCentury(person.born)}`),
    );
  }

  if (order) {
    newPeople = newPeople.reverse();
  }

  return newPeople;
};
