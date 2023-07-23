import { Person, PersonSex, SortField } from '../types';

type FilterOptions = {
  sex: PersonSex | null;
  centuries: string[];
  query: string;
};

type SortOptions = {
  field: SortField | null;
  isReversed: boolean | null;
};

type Options = {
  filterOptions: FilterOptions;
  sortOptions: SortOptions;
};

const hasQuery = (initial: string | null, query: string) => {
  const lowerInitial = initial?.toLowerCase() || '';
  const lowerQuery = query.toLowerCase();

  return lowerInitial.includes(lowerQuery);
};

export const getVisiblePeople = (people: Person[], options: Options) => {
  const { filterOptions, sortOptions } = options;

  const { sex, query, centuries } = filterOptions;
  const { field, isReversed } = sortOptions;

  let preparedPeople = [...people];

  preparedPeople = preparedPeople.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (query) {
      const { name: personName, motherName, fatherName } = person;

      const personHasQuery = hasQuery(personName, query)
        || hasQuery(motherName, query)
        || hasQuery(fatherName, query);

      if (!personHasQuery) {
        return false;
      }
    }

    if (centuries.length > 0) {
      const { born } = person;

      const personCentury = Math.ceil(born / 100).toString();
      const centuryIsExist = centuries.includes(personCentury);

      if (!centuryIsExist) {
        return false;
      }
    }

    return true;
  });

  preparedPeople.sort((currPerson, nextPerson) => {
    switch (field) {
      case SortField.Name:
      case SortField.Sex:
        return currPerson[field].localeCompare(nextPerson[field]);

      case SortField.Born:
      case SortField.Died:
        return currPerson[field] - nextPerson[field];

      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedPeople.reverse();
  }

  return preparedPeople;
};
