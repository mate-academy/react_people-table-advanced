import { Person, SortParams, FilterParams } from '../types';

export function getPreparedPeople(
  people: Person[],
  filterParams: FilterParams,
  sortParams: SortParams | '',
  isReversed: string,
) {
  let preparedPeople = people;

  if (filterParams.query) {
    preparedPeople = preparedPeople.filter(person => {
      const normalizedQuery = filterParams.query?.toLowerCase().trim() || '';
      const normalizedName = person.name.toLowerCase();
      const normalizedMotherName = person.motherName?.toLowerCase();
      const normalizedFatherName = person.fatherName?.toLowerCase();

      return normalizedName.includes(normalizedQuery)
        || normalizedFatherName?.includes(normalizedQuery)
        || normalizedMotherName?.includes(normalizedQuery);
    });
  }

  if (filterParams.sex) {
    preparedPeople = preparedPeople.filter(person => (
      person.sex === filterParams.sex
    ));
  }

  if (filterParams.centuries) {
    preparedPeople = preparedPeople.filter(person => {
      const personBornCentury = Math.ceil(person.born / 100).toString();

      if (filterParams.centuries?.length === 0) {
        return true;
      }

      return filterParams.centuries?.includes(personBornCentury);
    });
  }

  if (sortParams) {
    preparedPeople.sort((person1, person2) => {
      switch (sortParams) {
        case SortParams.name:
          return person1.name.localeCompare(person2.name);
        case SortParams.sex:
          return person1.sex.localeCompare(person2.sex);
        case SortParams.born:
          return person1.born - person2.born;
        case SortParams.died:
          return person1.died - person2.died;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedPeople.reverse();
  }

  return preparedPeople;
}
