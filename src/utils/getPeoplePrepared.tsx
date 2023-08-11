import { Person } from '../types';
import { FilterOptions } from '../types/FilterOptions';
import { Order, Sort } from '../types/SortOptions';

export function getPeoplePrepared(people: Person[], {
  sex, query, centuries, sort, order,
}: FilterOptions): Person[] {
  let preparedPeople = [...people];

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    preparedPeople = preparedPeople.filter(
      person => person.name.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (centuries.length > 0) {
    preparedPeople = preparedPeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  if (sort) {
    preparedPeople.sort((personA, personB) => {
      switch (sort) {
        case Sort.Name:
          return personA.name.localeCompare(personB.name);

        case Sort.Sex:
          return personA.sex.localeCompare(personB.sex);

        case Sort.Born:
          return personA.born - personB.born;

        case Sort.Died:
          return personA.died - personB.died;

        default:
          return 0;
      }
    });
  }

  if (order === Order.Desc) {
    preparedPeople.reverse();
  }

  return preparedPeople;
}
