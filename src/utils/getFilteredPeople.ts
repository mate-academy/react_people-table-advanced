import { Person } from '../types';

interface Params {
  sex: string;
  centeries: string[];
  query: string;
  sort: string | null;
  order: string | null;
}

export const getFilteredPeople = (people: Person[], params: Params) => {
  const { sex, centeries, query, sort, order } = params;

  const filteredPeople = people
    .filter(person => {
      const personBornCent = Math.ceil(person.born / 100);

      if (centeries.length) {
        return centeries.some(century => +century === personBornCent);
      }

      return true;
    })
    .filter(person => {
      const normalizeQuery = query.toLowerCase();

      return (
        person.name.toLowerCase().includes(normalizeQuery) ||
        person.fatherName?.toLowerCase().includes(normalizeQuery) ||
        person.motherName?.toLowerCase().includes(normalizeQuery)
      );
    })
    .filter(person => {
      switch (sex) {
        case 'm':
          return person.sex === 'm';
        case 'f':
          return person.sex === 'f';
        default:
          return true;
      }
    })
    .toSorted((person1, person2) => {
      switch (sort) {
        case 'name':
          return person1.name.localeCompare(person2.name);
        case 'sex':
          return person1.sex.localeCompare(person2.sex);
        case 'born':
          return person1.born - person2.born;
        case 'died':
          return person1.died - person2.died;
        default:
          return 0;
      }
    });

  return order ? filteredPeople.reverse() : filteredPeople;
};
