import { Person } from '../types';

interface Params {
  query: string | null;
  sex: string | null;
  centuries: string[];
  sort: string;
  order: string;
}

export const peopleFilter = (people: Person[], {
  query,
  sex,
  centuries,
  sort,
  order,
}: Params): Person[] => {
  let filteredPeople = [...people];

  if (query) {
    const normQuery = query.trim().toLowerCase();

    filteredPeople = filteredPeople.filter(person => {
      return (
        person.name.toLowerCase().includes(normQuery)
        || (person.motherName || '').toLowerCase().includes(normQuery)
        || (person.fatherName || '').toLowerCase().includes(normQuery)
      );
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  if (sort) {
    filteredPeople.sort((a: Person, b: Person) => {
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
    filteredPeople.reverse();
  }

  return filteredPeople;
};
