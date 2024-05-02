import { Person } from '../types';

export const getSortedPeople = (
  people: Person[],
  sortBy: string | null,
  order: string | null,
) => {
  const sortedPeople = people;

  if (sortBy) {
    if (sortBy) {
      switch (sortBy) {
        case 'name':
          sortedPeople.sort((personA: Person, personB: Person) =>
            personA.name.localeCompare(personB.name),
          );
          break;
        case 'sex':
          sortedPeople.sort((personA: Person, personB: Person) =>
            personA.sex.localeCompare(personB.sex),
          );
          break;
        case 'born':
          sortedPeople.sort(
            (personA: Person, personB: Person) => personA.born - personB.born,
          );
          break;
        case 'died':
          sortedPeople.sort(
            (personA: Person, personB: Person) => personA.died - personB.died,
          );
          break;
      }
    }
  }

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  return sortedPeople;
};
