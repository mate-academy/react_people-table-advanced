import { Person } from '../types';

export type Sort = 'name' | 'sex' | 'born' | 'died';

function sortPeople(people: Person[], sortBy: Sort, order: string | null) {
  switch (sortBy) {
    case 'name':
      return [...people].sort((person1: Person, person2: Person) => {
        return !order
          ? person1.name.localeCompare(person2.name)
          : person2.name.localeCompare(person1.name);
      });
    case 'sex':
      return [...people].sort((person1: Person, person2: Person) => {
        return !order
          ? person1.sex.localeCompare(person2.sex)
          : person2.sex.localeCompare(person1.sex);
      });
    case 'born':
      return [...people].sort((person1: Person, person2: Person) =>
        !order ? person1.born - person2.born : person2.born - person1.born,
      );
    case 'died':
      return [...people].sort((person1: Person, person2: Person) =>
        !order ? person1.died - person2.died : person2.died - person1.died,
      );
    default:
      return people;
  }
}

export function getFilteredPeople(
  people: Person[],
  sort: Sort,
  order: string | null,
  sex: string | null,
  query: string,
  centuries: string[],
) {
  let copiedPeople = [...people];

  if (sort) {
    copiedPeople = sortPeople(copiedPeople, sort, order);
  }

  if (sex && sex !== 'all') {
    copiedPeople = copiedPeople.filter(person => person.sex === sex);
  }

  if (query) {
    copiedPeople = copiedPeople.filter(person => {
      return (
        person.name.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query)
      );
    });
  }

  if (centuries.length > 0) {
    copiedPeople = copiedPeople.filter(person => {
      return centuries.includes(String(Math.ceil(person.born / 100)));
    });
  }

  return copiedPeople;
}
