import { getSortPreparedPeople } from './getSortedPeople';
import { Person } from '../types';

export const getPreparedPeople = (
  people: Person[],
  query: string,
  sex: string,
  centuries: string[],
  sort: string,
  order: string,
) => {
  let preparedPeople = [...people];

  if (query) {
    preparedPeople = preparedPeople.filter(person => {
      const preparedQuery = query.toLowerCase();

      const filterByName = person.name.toLowerCase()
        .includes(query.toLowerCase());

      const filterByMother = person.mother
        ? person.mother.name.toLowerCase().includes(preparedQuery)
        : person.motherName?.toLowerCase().includes(preparedQuery);

      const filterByFather = person.father
        ? person.father.name.toLowerCase().includes(preparedQuery)
        : person.fatherName?.toLowerCase().includes(preparedQuery);

      return filterByName || filterByMother || filterByFather;
    });
  }

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(({ born }) => {
      const personCentury = Math.floor((born / 100) + 1);

      return centuries.includes(personCentury.toString());
    });
  }

  const sortPreparedPeople = getSortPreparedPeople(preparedPeople, sort, order);

  return sortPreparedPeople;
};
