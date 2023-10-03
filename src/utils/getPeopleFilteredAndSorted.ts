import { Person, SortValues } from '../types';

export function getPeopleFilteredAndSorted(
  category: string,
  query: string,
  centuries: string[],
  sort: string,
  order: string,
  people: Person[],
) {
  const preparedPeople = people.filter(person => {
    let filterCondition = true;

    if (category) {
      filterCondition = person.sex === category;
    }

    if (query) {
      const preparedQuery = query.toLowerCase();

      filterCondition = filterCondition
        && (person.name.toLowerCase().includes(preparedQuery)
          || (person.motherName?.toLowerCase().includes(preparedQuery) || false)
          || person.fatherName?.toLowerCase().includes(preparedQuery) || false);
    }

    if (centuries.length) {
      filterCondition = filterCondition
        && centuries.includes(`${Math.ceil(person.born / 100)}`);
    }

    return filterCondition;
  });

  if (sort) {
    preparedPeople.sort((personA, personB) => {
      switch (sort) {
        case SortValues.Name:
          return personA.name.localeCompare(personB.name);
        case SortValues.Sex:
          return personA.sex.localeCompare(personB.sex);
        case SortValues.Born:
          return personA.born - personB.born;
        case SortValues.Died:
          return personA.died - personB.died;
        default:
          return 0;
      }
    });
  }

  if (order) {
    preparedPeople.reverse();
  }

  return preparedPeople;
}
