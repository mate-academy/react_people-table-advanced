import { PersonSex, SortField } from '../enums';
import { Person } from '../types';
import { FilterParams } from '../types/FilterParams';

export function filterPeople(people: Person[], {
  sex, query, centuries, sort, order,
}: FilterParams) {
  let preparedPeople = people;

  if (sex === PersonSex.Male) {
    preparedPeople = preparedPeople.filter(person => person.sex === 'm');
  }

  if (sex === PersonSex.Female) {
    preparedPeople = preparedPeople.filter(person => person.sex === 'f');
  }

  if (query) {
    preparedPeople = preparedPeople.filter(person => {
      const normalizedQuery = query.trim().toLowerCase();

      if (normalizedQuery === '') {
        return false;
      }

      const name = person.name.toLowerCase().includes(normalizedQuery);
      const motherName = person.motherName
        ?.toLowerCase()
        .includes(normalizedQuery);
      const fatherName = person.fatherName
        ?.toLowerCase()
        .includes(normalizedQuery);

      return name || motherName || fatherName;
    });
  }

  if (centuries.length > 0) {
    preparedPeople = preparedPeople.filter(person => {
      const century = `${Math.ceil(person.born / 100)}`;

      if (centuries.includes(century)) {
        return true;
      }

      return false;
    });
  }

  preparedPeople = [...preparedPeople].sort((personA, personB) => {
    switch (sort) {
      case SortField.NAME:
      case SortField.SEX:
        return personA[sort].localeCompare(personB[sort]);

      case SortField.BORN:
      case SortField.DIED:
        return personA[sort] - personB[sort];

      default:
        return 0;
    }
  });

  if (order) {
    preparedPeople.reverse();
  }

  return preparedPeople;
}
