import { Person } from '../types';
import { Sex } from '../types/Sex';

interface FilterPeople {
  peopleFromServer: Person[] | null;
  query: string | null;
  sex: string | null,
  centuries: string[],
  sort: string | null,
  order: string | null,
}

export const filterPeople = ({
  peopleFromServer, query, sex, centuries, sort, order,
} : FilterPeople) => {
  if (!peopleFromServer) {
    return null;
  }

  let peopleToFilter = [...peopleFromServer];

  if (query) {
    const normalizedQuery = query.toLowerCase();

    peopleToFilter = peopleToFilter.filter(person => {
      const { name, motherName, fatherName } = person;

      return name.includes(normalizedQuery)
        || motherName?.includes(normalizedQuery)
        || fatherName?.includes(normalizedQuery);
    });
  }

  if (sex) {
    if (sex === 'm') {
      peopleToFilter
        = peopleToFilter.filter(person => person.sex === Sex.Male);
    } else {
      peopleToFilter
        = peopleToFilter.filter(person => person.sex === Sex.Female);
    }
  }

  if (centuries.length > 0) {
    peopleToFilter = peopleToFilter.filter(
      (person) => centuries.includes(`${Math.ceil(person.born / 100)}`),
    );
  }

  if (sort) {
    peopleToFilter = peopleToFilter.sort((a, b) => {
      if (sort === 'name' || sort === 'sex') {
        return order === 'asc' ? a[sort].localeCompare(b[sort])
          : b[sort].localeCompare(a[sort]);
      }

      if (sort === 'born' || sort === 'died') {
        return order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort];
      }

      return 0;
    });
  }

  return peopleToFilter;
};
