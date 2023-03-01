/* eslint-disable no-console */
import { Person } from '../types';

export const preparedPeople = (people: Person []) => {
  return people.map(person => {
    return {
      ...person,
      mother: people.find(parent => parent.name === person.motherName) || null,
      father: people.find(parent => parent.name === person.fatherName) || null,
    };
  });
};

export const getFilteredPeople = (
  searchParams: URLSearchParams,
  people: Person[],
) => {
  let filteredPeople = [...people];
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const hasOrder = order === 'desc';

  if (sex) {
    filteredPeople = filteredPeople.filter(person => (
      person.sex === sex));
  }

  if (centuries?.length) {
    filteredPeople = filteredPeople.filter(person => {
      const century = String(Math.floor(person.born / 100) + 1);

      return centuries.includes(century);
    });
  }

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      const trimedQuery = query.trimEnd();

      return person.name.toLowerCase().includes(trimedQuery)
      || person.motherName?.toLowerCase().includes(trimedQuery)
      || person.fatherName?.toLowerCase().includes(trimedQuery);
    });
  }

  if (sort) {
    filteredPeople.sort((person1, person2) => {
      switch (sort) {
        case 'name':
          return (!hasOrder)
            ? person1.name.localeCompare(person2.name)
            : person2.name.localeCompare(person1.name);
        case 'sex':
          return (!hasOrder)
            ? person1.sex.localeCompare(person2.sex)
            : person2.sex.localeCompare(person1.sex);
        case 'born':
          return (!hasOrder)
            ? person1.born - person2.born
            : person2.born - person1.born;
        case 'died':
          return (!hasOrder)
            ? person1.died - person2.died
            : person2.died - person1.died;
        default:
          return 0;
      }
    });
  }

  return filteredPeople;
};
