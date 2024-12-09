import { Person, SortParams } from '../types';

export const filterPeople = (
  people: Person[],
  params: SortParams,
): Person[] => {
  const { sortBy, sortOrder, query, sex, centuries } = params;

  const getPersonCentury = (person: Person): string => {
    return String(Math.ceil(person.born / 100));
  };

  const filteredPeople = people
    .filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
    .filter(person => {
      if (sex === 'all') {
        return true;
      }

      return person.sex === sex;
    })
    .filter(person => {
      if (centuries.length === 0) {
        return true;
      }

      return centuries.includes(getPersonCentury(person));
    })
    .toSorted((person1, person2) => {
      switch (sortBy) {
        case 'Born': {
          if (sortOrder === 'asc') {
            return person1.born - person2.born;
          }

          if (sortOrder === 'desc') {
            return person2.born - person1.born;
          }

          break;
        }

        case 'Died': {
          if (sortOrder === 'asc') {
            return person1.died - person2.died;
          }

          if (sortOrder === 'desc') {
            return person2.died - person1.died;
          }

          break;
        }

        case 'Name': {
          if (sortOrder === 'asc') {
            return person1.name.localeCompare(person2.name);
          }

          if (sortOrder === 'desc') {
            return person2.name.localeCompare(person1.name);
          }

          break;
        }

        case 'Sex': {
          if (sortOrder === 'asc') {
            return person1.sex.localeCompare(person2.sex);
          }

          if (sortOrder === 'desc') {
            return person2.sex.localeCompare(person1.sex);
          }

          break;
        }

        default:
          return 0;
      }

      return 0;
    });

  return filteredPeople;
};
