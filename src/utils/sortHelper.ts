import { Person } from '../types';
import { SortTable, Params } from '../types/Filter';

export const filterPeople = (people: Person[], params: Params): Person[] => {
  const { sortBy, sortOrder, query, sex, centuries } = params;

  const getPersonCentury = (person: Person): number => {
    return Math.ceil(person.born / 100);
  };

  const filteredPeople = people
    .filter(person => {
      const filterByQuery = person.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const filterBySex = !sex || person.sex === sex;
      const filterByCentury =
        !centuries.length || centuries.includes(getPersonCentury(person));

      return filterByQuery && filterBySex && filterByCentury;
    })
    .toSorted((person1, person2) => {
      switch (sortBy) {
        case SortTable.Born: {
          return sortOrder === 'asc'
            ? person1.born - person2.born
            : person2.born - person1.born;
        }

        case SortTable.Died: {
          return sortOrder === 'asc'
            ? person1.died - person2.died
            : person2.died - person1.died;
        }

        case SortTable.Name: {
          return sortOrder === 'asc'
            ? person1.name.localeCompare(person2.name)
            : person2.name.localeCompare(person1.name);
        }

        case SortTable.Sex: {
          return sortOrder === 'asc'
            ? person1.sex.localeCompare(person2.sex)
            : person2.sex.localeCompare(person1.sex);
        }

        default:
          return 0;
      }
    });

  return filteredPeople;
};
