import { PersonType } from '../types';

type Options = {
  sex: string | null;
  query: string | null;
  centuries: string[];
  sort: string | null;
  order: string | null;
};

const isNameMatch = (query: string, person: PersonType) => {
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

export const getPreparedPeople = (people: PersonType[], options: Options) => {
  const { sex, query, centuries, sort, order } = options;

  const preparedPeople = people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (query && !isNameMatch(query, person)) {
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
