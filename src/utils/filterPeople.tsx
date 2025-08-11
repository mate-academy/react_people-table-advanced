import { Person } from '../types';
import { Options } from '../types/Options';

const isNameMathc = (query: string, person: Person) => {
  const personNameMatch = person.name
    .toLocaleLowerCase()
    .includes(query.toLocaleLowerCase());
  const motherNameMatch = person.motherName
    ?.toLocaleLowerCase()
    .includes(query.toLocaleLowerCase());
  const fatherNameMatch = person.fatherName
    ?.toLocaleLowerCase()
    .includes(query.toLocaleLowerCase());

  return personNameMatch || motherNameMatch || fatherNameMatch;
};

export const getPreparedPeople = (people: Person[], options: Options) => {
  const { sex, query, centuries, sort, order } = options;

  const preparedPeople = people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (query && !isNameMathc(query, person)) {
      return false;
    }

    if (centuries.length) {
      const personBornCentury: string = Math.ceil(person.born / 100).toString();

      return centuries.includes(personBornCentury);
    }

    return true;
  });

  if (sort) {
    preparedPeople.sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);

        case 'born':
        case 'died':
          return a[sort] - b[sort];

        default:
          return 0;
      }
    });
  }

  if (order) {
    preparedPeople.reverse();
  }

  return preparedPeople;
};
