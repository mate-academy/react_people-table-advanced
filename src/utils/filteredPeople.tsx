import { Person } from '../types';
import { Filter } from '../types/Filter';
import { Order } from '../types/OrderFilter';
import { SortType } from '../types/SortType';

export const filteredPeople = (people: Person[], {
  query = '',
  centuries = [],
  sex = '',
  order = Order.Asc,
  sort = '',
}: Filter): Person[] => {
  let preparedPeople = [...people];

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    preparedPeople = preparedPeople.filter(
      (person) => person.name.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter((person) => centuries
      .includes(Math.ceil(person.born / 100).toString()));
  }

  if (sex) {
    preparedPeople = preparedPeople.filter((person) => person.sex === sex);
  }

  if (sort) {
    preparedPeople = preparedPeople.sort((person1, person2) => {
      switch (sort) {
        case SortType.Name:
        case SortType.Sex:
          return person1[sort].localeCompare(person2[sort]);

        case SortType.Born:
        case SortType.Died:
          return person1[sort] - person2[sort];

        default:
          return 0;
      }
    });
  }

  if (order === Order.Desc) {
    preparedPeople.reverse();
  }

  return preparedPeople;
};
