import { Person } from '../types';

type Filters = {
  query: string,
  centuries: string[],
  sex: string,
  sort: string,
  order: string,
};

export const preparePeople = (
  people: Person[], {
    query = '',
    centuries = [],
    sex = '',
    sort = '',
    order = 'asc',
  }: Filters,
): Person[] => {
  let visiblePeople = [...people];

  if (query.trim() !== '') {
    const normalizedQuery = query.toLowerCase();
    const isIncludes = (word: string | null) => {
      return word?.toLowerCase().includes(normalizedQuery);
    };

    visiblePeople = visiblePeople.filter(
      person => isIncludes(person.name)
        || isIncludes(person.fatherName)
        || isIncludes(person.motherName),
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
