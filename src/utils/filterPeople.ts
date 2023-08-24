import { Person } from '../types';
import { SortType } from '../types/SortType';

export const getFilteredPeople = (
  people: Person[],
  sex: string,
  query: string,
  sortBy: string,
  order: string,
  centuries: string[],
) => {
  let visiblePeople = [...people];

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      const lowerCaseQuery = query.toLowerCase();
      const needSymbolsToCheck = (
        person.name + person.fatherName + person.motherName).toLowerCase();

      return needSymbolsToCheck.includes(lowerCaseQuery);
    });
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => (
      centuries.includes(String(Math.ceil(person.born / 100)))
    ));
  }

  if (sortBy) {
    visiblePeople.sort((person1, person2) => {
      switch (sortBy) {
        case SortType.NAME:
        case SortType.SEX:
          return person1[sortBy].localeCompare(person2[sortBy]);

        case SortType.BORN:
        case SortType.DIED:
          return person1[sortBy] - person2[sortBy];

        default:
          return 0;
      }
    });
  }

  if (order) {
    visiblePeople.reverse();
  }

  return visiblePeople;
};
