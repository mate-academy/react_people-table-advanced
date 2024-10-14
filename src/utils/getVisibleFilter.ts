import { Person } from '../types';
import { SortTypes } from '../types/SortTypes';

export const getVisiblePeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  century: string[],
  sort: string | null,
  order: string | null,
) => {
  const filteredPeople = people.filter(person => {
    const normalizedQuery = query?.toLowerCase() || '';
    const centuryBorn = String(Math.floor(person.born / 100));

    const filterByQuery = [
      person.name,
      person.fatherName,
      person.motherName,
    ].some(name => name?.toLowerCase().includes(normalizedQuery));

    const filterBySex = !sex || person.sex === sex;

    const filterByCentury = !century.length || century.includes(centuryBorn);

    return filterByQuery && filterBySex && filterByCentury;
  });

  const sortCallbacks: {
    [key: string]: (firstPerson: Person, secondPerson: Person) => number;
  } = {
    [SortTypes.NAME]: (firstPerson, secondPerson) => {
      return firstPerson.name.localeCompare(secondPerson.name);
    },
    [SortTypes.SEX]: (firstPerson, secondPerson) => {
      return firstPerson.sex.localeCompare(secondPerson.sex);
    },
    [SortTypes.BORN]: (firstPerson, secondPerson) => {
      return firstPerson.born - secondPerson.born;
    },
    [SortTypes.DIED]: (firstPerson, secondPerson) => {
      return firstPerson.died - secondPerson.died;
    },
  };

  const sortedPeople = sort
    ? filteredPeople.sort(sortCallbacks[sort])
    : filteredPeople;

  return order ? sortedPeople.reverse() : sortedPeople;
};
