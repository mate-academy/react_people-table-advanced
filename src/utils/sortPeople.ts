import { Person } from '../types';

export function sortPeople(
  sort: string | null,
  order: string | null,
  people: Person[],
) {
  const sortedPeople = people;

  switch (sort) {
    case 'sex':
      sortedPeople.sort((person1, person2) =>
        person1.sex.localeCompare(person2.sex),
      );
      break;
    case 'name':
      sortedPeople.sort((person1, person2) =>
        person1.name.localeCompare(person2.name),
      );
      break;
    case 'born':
      sortedPeople.sort((person1, person2) => person1.born - person2.born);
      break;
    case 'died':
      sortedPeople.sort((person1, person2) => person1.died - person2.died);
      break;
  }

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  return sortedPeople;
}
