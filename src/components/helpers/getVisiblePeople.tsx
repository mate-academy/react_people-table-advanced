import { Person } from '../../types/Person';
import { SortType } from '../../types/SortType';

export const getVisiblePeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  sort: string | null,
  order: string | null,
) => {
  let filteredPeople = [...people];

  if (query) {
    filteredPeople = filteredPeople.filter(person => (
      person.name.toLowerCase().includes(query.toLowerCase())
      || person.motherName?.toLowerCase().includes(query.toLowerCase())
      || person.fatherName?.toLowerCase().includes(query.toLowerCase())
    ));
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => (
      centuries.includes(Math.ceil(person.born / 100).toString())
    ));
  }

  if (sort) {
    filteredPeople.sort((person1, person2) => {
      switch (sort) {
        case SortType.NAME:
        case SortType.SEX:
          return person1[sort].localeCompare(person2[sort]);
        case SortType.BORN:
        case SortType.DIED:
          return person1[sort] - person2[sort];

        default:
          throw new Error('Unable to sort');
      }
    });
  }

  if (order) {
    filteredPeople.reverse();
  }

  return filteredPeople;
};
