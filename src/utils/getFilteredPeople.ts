import { Person, PersonSex, SortField } from '../types';

type Options = {
  query: string;
  sex: PersonSex,
  centuries: string[],
  sort: string | null,
  order: string | null,
};

export const getFilteredPeople = (
  people: Person[],
  {
    query,
    sex,
    centuries,
    sort,
    order,
  }: Options,
) => {
  let preparedPeople = [...people];

  preparedPeople = preparedPeople.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (query) {
      const normalizedQuery = query.toLowerCase();

      const personSearch = person.name.toLowerCase().includes(normalizedQuery)
        || person
          .motherName?.toLowerCase().includes(normalizedQuery)
        || person
          .fatherName?.toLowerCase().includes(normalizedQuery);

      if (!personSearch) {
        return false;
      }
    }

    if (centuries.length > 0) {
      const century = Math.ceil(person.born / 100).toString();

      if (!centuries.includes(century)) {
        return false;
      }
    }

    return true;
  });

  preparedPeople.sort((currentPerson, nextPerson) => {
    switch (sort) {
      case SortField.NAME:
      case SortField.SEX:
        return currentPerson[sort].localeCompare(nextPerson[sort]);

      case SortField.BORN:
      case SortField.DIED:
        return currentPerson[sort] - nextPerson[sort];

      default:
        return 0;
    }
  });

  if (order) {
    preparedPeople.reverse();
  }

  return preparedPeople;
};
