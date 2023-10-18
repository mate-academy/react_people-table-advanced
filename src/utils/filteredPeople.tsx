import { Person } from '../types';

type Filters = {
  query: string,
  centuries: string[],
  sex: string,
  order: string,
  sort: string,
};

export const filterPeople = (people: Person[], {
  query = '',
  centuries = [],
  sex = '',
  order = 'asc',
  sort = '',
}: Filters): Person[] => {
  let visiblePeople = [...people];

  if (query.trim() !== '') {
    const normalizedQuery = query.toLowerCase();

    visiblePeople = visiblePeople.filter(
      person => person.name.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (centuries.length !== 0) {
    visiblePeople = visiblePeople.filter(
      person => centuries.includes(
        Math.ceil(person.born / 100).toString(),
      ),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(
      person => person.sex === sex,
    );
  }

  if (sort) {
    visiblePeople.sort((person1, person2) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return person1[sort].localeCompare(person2[sort]);

        case 'born':
        case 'died':
          return person1[sort] - person2[sort];

        default:
          return 0;
      }
    });
  }

  if (order === 'desc') {
    visiblePeople.reverse();
  }

  return visiblePeople;
};
