import { Person } from '../types/Person';
import { FilterOptions } from '../types/variables';

const isNameMatch = (query: string, person: Person) => {
  const personNameMatch = person.name
    .toLowerCase()
    .includes(query.toLowerCase());

  const motherNameMatch = person.motherName
    ?.toLowerCase()
    .includes(query.toLowerCase());

  const fatherNameMatch = person.fatherName
    ?.toLowerCase()
    .includes(query.toLowerCase());

  return personNameMatch || motherNameMatch || fatherNameMatch;
};

export const getPreparedPeople = (people: Person[], options: FilterOptions) => {
  const { sex, searchTerm, selectedCenturies, sortBy, sortOrder } = options;

  const preparedPeople = people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (searchTerm && !isNameMatch(searchTerm, person)) {
      return false;
    }

    if (selectedCenturies.length) {
      const personBornCentury: string = Math.ceil(person.born / 100).toString();

      return selectedCenturies.includes(personBornCentury);
    }

    return true;
  });

  if (sortBy) {
    preparedPeople.sort((a, b) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return a[sortBy].localeCompare(b[sortBy]);

        case 'born':
        case 'died':
          return a[sortBy] - b[sortBy];

        default:
          return 0;
      }
    });
  }

  if (sortOrder) {
    preparedPeople.reverse();
  }

  return preparedPeople;
};
