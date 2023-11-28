import { Person } from '../types';

export const getVisiblePeople = (
  people: Person[], {
    sex, centuries, query, sort, order,
  }: {
    sex: string,
    centuries: string[],
    query: string,
    sort: string | null,
    order: string | null,
  },
) => {
  let copiePeople = [...people];

  if (sex) {
    copiePeople = copiePeople.filter(person => {
      switch (sex) {
        case 'm':
          return person.sex === 'm';
        case 'f':
          return person.sex === 'f';
        case '':
        default:
          return copiePeople;
      }
    });
  }

  if (centuries.length > 0) {
    copiePeople = copiePeople.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    copiePeople = copiePeople.filter(person => {
      return person.name.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery);
    });
  }

  if (sort) {
    copiePeople = copiePeople.sort((person1, person2): number => {
      switch (sort) {
        case 'name':
          return order
            ? person2.name.localeCompare(person1.name)
            : person1.name.localeCompare(person2.name);
        case 'sex':
          return order
            ? person2.sex.localeCompare(person1.sex)
            : person1.sex.localeCompare(person2.sex);
        case 'born':
          return order
            ? person2.born - person1.born
            : person1.born - person2.born;
        case 'died':
          return order
            ? person2.died - person1.died
            : person1.died - person2.died;
        default:
          return 0;
      }
    });
  }

  return copiePeople;
};
