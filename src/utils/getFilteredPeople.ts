import { Person } from '../types';
import { Gender } from '../types/Genger';

interface Params {
  sex: string;
  centeries: string[];
  query: string;
  sort: string | null;
  order: string | null;
}

export const getFilteredPeople = (people: Person[], params: Params) => {
  const { sex, centeries, query, sort, order } = params;

  const normalizeQuery = query.toLowerCase();
  const containsQuery = (name: string | null) => {
    return name && name.toLowerCase().includes(normalizeQuery);
  };

  const filteredPeople = people
    .filter(person => {
      return (
        containsQuery(person.name) ||
        containsQuery(person.fatherName) ||
        containsQuery(person.motherName)
      );
    })
    .filter(person => {
      const personBornCent = Math.ceil(person.born / 100);

      if (centeries.length) {
        return centeries.some(century => +century === personBornCent);
      }

      return true;
    })
    .filter(person => {
      switch (sex) {
        case Gender.Male:
          return person.sex === Gender.Male;
        case Gender.Female:
          return person.sex === Gender.Female;
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
