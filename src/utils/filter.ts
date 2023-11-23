import { Person } from '../types';
import { Filters } from '../types/FilterOptions';

export function getFilteredPeople(
  people: Person[],
  filters: Filters,
) {
  let visiblePeople = [...people];

  const {
    query,
    centuries,
    sex,
    sort,
    order,
  } = filters;

  if (query) {
    const lowerQuery = query.toLowerCase().trim();

    visiblePeople = people.filter(person => {
      const lowerName = person.name.toLowerCase();
      const lowerMotherName = person.motherName?.toLowerCase();
      const lowerFatherName = person.fatherName?.toLowerCase();

      const hasNameMatch = lowerName.includes(lowerQuery)
        || lowerMotherName?.includes(lowerQuery)
        || lowerFatherName?.includes(lowerQuery);

      return hasNameMatch;
    });
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  if (sort) {
    switch (sort) {
      case 'name':
        visiblePeople.sort((person1, person2) => {
          return person1.name.localeCompare(person2.name);
        });
        break;

      case 'sex':
        visiblePeople.sort((person1, person2) => {
          return person1.sex.localeCompare(person2.sex);
        });
        break;

      case 'born':
        visiblePeople.sort((person1, person2) => {
          return person1.born - person2.born;
        });
        break;

      case 'died':
        visiblePeople.sort((person1, person2) => {
          return person1.died - person2.died;
        });
        break;

      default:
        throw new Error(
          'There are no people matching the current search criteria',
        );
    }
  }

  if (order) {
    visiblePeople.reverse();
  }

  return visiblePeople;
}
