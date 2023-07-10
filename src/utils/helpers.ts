import { Person } from '../types';
import { OrderByType, SortBy } from '../types/OrderAndSortTypes';

export const getFullDetailsOfPeople = (people: Person[]): Person[] => {
  const peopleMap = new Map<string, Person>();

  people.forEach(person => {
    peopleMap.set(person.name, person);
  });

  return people.map(person => {
    if (person.motherName && person.fatherName) {
      const mother = peopleMap.get(person.motherName);
      const father = peopleMap.get(person.fatherName);

      return {
        ...person,
        mother,
        father,
      };
    }

    return person;
  });
};

export const sortedPeoples = (
  arr: Person[],
  sortBy: SortBy,
  orderBy: OrderByType,
) => {
  return arr.sort((a, b) => {
    switch (sortBy) {
      case SortBy.SEX:
      case SortBy.NAME:
        return orderBy === 'asc'
          ? a[sortBy].localeCompare(b[sortBy])
          : b[sortBy].localeCompare(a[sortBy]);

      case SortBy.BORN:
      case SortBy.DIED:
        return orderBy === 'asc'
          ? a[sortBy] - b[sortBy]
          : b[sortBy] - a[sortBy];

      default:
        return 0;
    }
  });
};
