import { Person } from '../types';
import { FilterBy } from '../types/FilterBy';
import { SortBy } from '../types/SortBy';

export function preparedPeople(
  people: Person[],
  filterBy: FilterBy,
  sortBy: SortBy | '',
  isReversed: string,
) {
  let prepPeople = people;

  if (filterBy.query) {
    prepPeople = prepPeople.filter(person => {
      const normalizedQuery = filterBy.query?.toLowerCase().trim() || '';
      const normalizedName = person.name.toLowerCase();
      const normalizedMotherName = person.motherName?.toLowerCase();
      const normalizedFatherName = person.fatherName?.toLowerCase();

      return normalizedName.includes(normalizedQuery)
        || normalizedMotherName?.includes(normalizedQuery)
        || normalizedFatherName?.includes(normalizedQuery);
    });
  }

  if (filterBy.sex) {
    prepPeople = prepPeople.filter(person => (
      person.sex === filterBy.sex
    ));
  }

  if (filterBy.centuries) {
    prepPeople = prepPeople.filter(person => {
      const bornCentury = Math.ceil(person.born / 100).toString();

      if (filterBy.centuries?.length === 0) {
        return true;
      }

      return filterBy.centuries?.includes(bornCentury);
    });
  }

  if (sortBy) {
    prepPeople.sort((a, b) => {
      switch (sortBy) {
        case SortBy.name:
          return a.name.localeCompare(b.name);
        case SortBy.sex:
          return a.sex.localeCompare(b.sex);
        case SortBy.born:
          return a.born - b.born;
        case SortBy.died:
          return a.died - b.died;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepPeople.reverse();
  }

  return prepPeople;
}
