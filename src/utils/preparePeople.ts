import { Persons } from '../types/Persons';
import { SortBy } from '../types/FilterType';

interface Params {
  query: string,
  sexFilter: string,
  centuries: string[],
  sort: string,
  order: string,
}

export const preparePeople = (people: Persons[], {
  query,
  sexFilter,
  centuries,
  sort,
  order,
}: Params) => {
  let preparedPeople = [...people];

  if (query) {
    preparedPeople = preparedPeople.filter(person => {
      const includesName = person.name.toLowerCase()
        .includes(query.toLowerCase());
      const includesMomName = person.motherName?.toLowerCase()
        .includes(query.toLowerCase());
      const includesDadName = person.fatherName?.toLowerCase()
        .includes(query.toLowerCase());

      return includesDadName || includesMomName || includesName;
    });
  }

  if (sexFilter) {
    preparedPeople = preparedPeople.filter(person => person.sex === sexFilter);
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(
      person => centuries.includes(
        Math.ceil(person.born / 100).toString(),
      ),
    );
  }

  if (sort) {
    preparedPeople.sort((a, b) => {
      switch (sort) {
        case SortBy.name:
        case SortBy.sex:
          return a[sort].localeCompare(b[sort]);

        case SortBy.born:
        case SortBy.died:
          return a[sort] - b[sort];
        default:
          return 0;
      }
    });

    if (order) {
      preparedPeople = preparedPeople.reverse();
    }
  }

  return preparedPeople;
};
