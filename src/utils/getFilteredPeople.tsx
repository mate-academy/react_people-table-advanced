import { Person } from '../types';
import { FilterParams } from '../types/FilterParams';
import { Order } from '../types/Order';
import { SortType } from '../types/SortType';

export const getFilteredPeople = (people: Person[], {
  query,
  centuries,
  sex,
  sort,
  order,
}: FilterParams): Person[] => {
  let filteredPeople = [...people];

  if (query.trim() !== '') {
    const normalizedQuery = query.toLowerCase().trim();

    filteredPeople = filteredPeople.filter(
      person => person.name.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter((person) => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (sort) {
    filteredPeople.sort((p1: Person, p2: Person) => {
      switch (sort) {
        case SortType.Name:
        case SortType.Sex:
          return p1[sort].localeCompare(p2[sort]);

        case SortType.Born:
        case SortType.Died:
          return p1[sort] - p2[sort];

        default:
          return 0;
      }
    });
  }

  if (order === Order.Desc) {
    filteredPeople.reverse();
  }

  return filteredPeople;
};
