import { Person, SortFieldPeople } from '../types';

export const getSortedPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
): Person[] => {
  if (!sort) {
    return people;
  }

  const sortedPeople = [...people];

  return sortedPeople.sort((personA, personB) => {
    const byBorn = personB.born - personA.born;
    const byDied = personB.died - personA.died;
    const byName = personA.name.localeCompare(personB.name);
    const bySex = personA.sex.localeCompare(personB.sex);

    if (sort === SortFieldPeople.Born) {
      return order === 'desc' ? byBorn : -byBorn;
    }

    if (sort === SortFieldPeople.Died) {
      return order === 'desc' ? byDied : -byDied;
    }

    if (sort === SortFieldPeople.Name) {
      return order === 'desc' ? byName : -byName;
    }

    if (sort === SortFieldPeople.Sex) {
      return order === 'desc' ? bySex : -bySex;
    }

    return 0;
  });
};
