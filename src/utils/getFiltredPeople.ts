import { Person, ISearchParams, SortType } from '../types';

const getSortedPeople = (people: Person[], sortOption: string): Person[] => {
  switch (sortOption) {
    case SortType.NAME:
      return [...people].sort((first, second) =>
        first.name.localeCompare(second.name),
      );
    case SortType.SEX:
      return [...people].sort((first, second) =>
        first.sex.localeCompare(second.sex),
      );
    case SortType.BORN:
      return [...people].sort((first, second) => first.born - second.born);
    case SortType.DIED:
      return [...people].sort((first, second) => first.died - second.died);
    default:
      return people;
  }
};

export const getFiltredPeople = (
  people: Person[],
  { query, sex, centuries, sort, order }: ISearchParams,
) => {
  const filteredPeople = people.filter(person => {
    const normalizedQuery = query?.toLowerCase() || '';
    const personsCentury = String(Math.floor(person.born / 100));

    const filterByQuery = [
      person.name,
      person.fatherName,
      person.motherName,
    ].some(name => name?.toLowerCase().includes(normalizedQuery));

    const filterBySex = !sex || person.sex === sex;

    const filterByCentury =
      !centuries.length || centuries.includes(personsCentury);

    return filterByQuery && filterBySex && filterByCentury;
  });

  const sortedPeople = sort
    ? getSortedPeople(filteredPeople, sort)
    : filteredPeople;

  return order ? sortedPeople.reverse() : sortedPeople;
};
