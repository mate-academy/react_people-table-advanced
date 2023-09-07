import { Person } from '../types';
import { Sort } from '../types/Sort';

export const getPreparedPeople = (
  people: Person[],
  sortBy: string,
  query: string,
  sex: string,
  centuries: string[],
  // order: string,
) => {
  let visiblePeople = [...people];

  if (sortBy) {
    visiblePeople.sort((person1, person2) => {
      switch (sortBy) {
        case Sort.name:
        case Sort.sex:
          return person1[sortBy].localeCompare(person2[sortBy]);

        case Sort.born:
        case Sort.died:
          return person1[sortBy] - person2[sortBy];

        default:
          return 0;
      }
    });
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      const normalizedQuery = query.toLowerCase().trim();
      const filteredFields = (
        person.name + person.motherName + person.fatherName
      ).toLowerCase();

      return filteredFields.includes(normalizedQuery);
    });
  }

  if (centuries) {
    visiblePeople = visiblePeople.filter(person => centuries.includes(
      String(Math.ceil(person.born / 100)),
    ));
  }

  // if (order) {
  //   visiblePeople.reverse();
  // }

  return visiblePeople;
};
