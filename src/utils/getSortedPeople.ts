import { Person } from '../types/Person';
import { Sort } from '../types/Sort';

export const getSortedPeople = (
  people: Person[],
  sortBy: string | null,
  order: string | null,
) => {
  const sortedPeople = people;

  if (sortBy) {
    switch (sortBy) {
      case Sort.Name:
        sortedPeople.sort((personA: Person, personB: Person) =>
          personA.name.localeCompare(personB.name),
        );
        break;
      case Sort.Sex:
        sortedPeople.sort((personA: Person, personB: Person) =>
          personA.sex.localeCompare(personB.sex),
        );
        break;
      case Sort.Born:
        sortedPeople.sort(
          (personA: Person, personB: Person) => personA.born - personB.born,
        );
        break;
      case Sort.Died:
        sortedPeople.sort(
          (personA: Person, personB: Person) => personA.died - personB.died,
        );
        break;
    }
  }

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  return sortedPeople;
};
