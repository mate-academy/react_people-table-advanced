import { Person } from '../types';

export const sortPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
): Person[] => {
  const result = [...people];

  switch (sort) {
    case 'name':
    case 'sex':
      result.sort((a, b) => a[sort].localeCompare(b[sort]));
      break;
    case 'born':
    case 'died':
      result.sort((a, b) => a[sort] - b[sort]);
      break;
    default:
      break;
  }

  return order === 'desc' ? result.reverse() : result;
};

export const filterPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
): Person[] => {
  let result = people;

  if (sex) {
    result = result.filter(person => person.sex === sex);
  }

  if (query) {
    const lowerQuery = query.toLowerCase();

    result = result.filter(person =>
      [person.name, person.motherName, person.fatherName].some(name =>
        name?.toLowerCase().includes(lowerQuery),
      ),
    );
  }

  if (centuries.length > 0) {
    result = result.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  return result;
};
