import { Person, Params, SortColumns } from '../types';

export const filterPeople = (people: Person[], params: Params): Person[] => {
  const { sortBy, sortOrder, query, sex, centuries } = params;

  const getPersonCentury = (person: Person): number => {
    return Math.ceil(person.born / 100);
  };

  const filteredPeople = people
    .filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
    .filter(person => !sex || person.sex === sex)
    .filter(
      person =>
        !centuries.length || centuries.includes(getPersonCentury(person)),
    )
    .toSorted((person1, person2) => {
      switch (sortBy) {
        case SortColumns.Born: {
          return sortOrder === 'asc'
            ? person1.born - person2.born
            : person2.born - person1.born;
        }

        case SortColumns.Died: {
          return sortOrder === 'asc'
            ? person1.died - person2.died
            : person2.died - person1.died;
        }

        case SortColumns.Name: {
          return sortOrder === 'asc'
            ? person1.name.localeCompare(person2.name)
            : person2.name.localeCompare(person1.name);
        }

        case SortColumns.Sex: {
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
