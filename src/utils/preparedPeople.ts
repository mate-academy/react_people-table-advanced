import { Person, SortParameters, FilterParameters } from '../types';

export function getPreparedPeople(
  people: Person[],
  filterParameters: FilterParameters,
  sortParameters: SortParameters | '',
  isReversed: string,
) {
  let preparedPeople = people;

  if (filterParameters.query) {
    preparedPeople = preparedPeople.filter(person => {
      const normalizedQuery = filterParameters
        .query?.toLowerCase().trim() || '';
      const normalizedName = person.name.toLowerCase();
      const normalizedMotherName = person.motherName?.toLowerCase();
      const normalizedFatherName = person.fatherName?.toLowerCase();

      return normalizedName.includes(normalizedQuery)
        || normalizedMotherName?.includes(normalizedQuery)
        || normalizedFatherName?.includes(normalizedQuery);
    });
  }

  if (filterParameters.centuries) {
    preparedPeople = preparedPeople.filter(person => {
      const personBornCentury = Math.ceil(person.born / 100).toString();

      if (filterParameters.centuries?.length === 0) {
        return true;
      }

      return filterParameters.centuries?.includes(personBornCentury);
    });
  }

  if (filterParameters.sex) {
    preparedPeople = preparedPeople.filter(person => (
      person.sex === filterParameters.sex
    ));
  }

  if (sortParameters) {
    preparedPeople.sort((person1, person2) => {
      switch (sortParameters) {
        case SortParameters.name:
          return person1.name.localeCompare(person2.name);
        case SortParameters.sex:
          return person1.sex.localeCompare(person2.sex);
        case SortParameters.born:
          return person1.born - person2.born;
        case SortParameters.died:
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
