import { Person } from '../types';
import { Sort } from '../types/Sort';

type FilterParams = {
  query: string,
  sex: string,
  sort: string,
  order: string,
  centuries: string[],
};

export const getPreparedPeople = (peopleAll: Person[],
  {
    query, sex, sort, order, centuries,
  }: FilterParams) => {
  let visiblePeople = [...peopleAll];

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

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person => centuries.includes(
      String(Math.ceil(person.born / 100)),
    ));
  }

  if (sort) {
    visiblePeople.sort((person1, person2) => {
      switch (sort) {
        case Sort.Name:
        case Sort.Sex:
          return person1[sort].localeCompare(person2[sort]);

        case Sort.Born:
        case Sort.Died:
          return person1[sort] - person2[sort];

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
