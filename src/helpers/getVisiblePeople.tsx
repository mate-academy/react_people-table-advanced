import { Person } from '../types';

export function getVisiblePeople(
  people: Person[],
  query: string | null,
  sex: string | null,
  century: string[],
  sort: string | null,
  order: string | null,
) {
  const filteredPeople = people.filter(person => {
    const normalizedQuery = query?.toLowerCase() || '';
    const normilizedName = person.name.toLowerCase();
    const normilizedFatherName = person.fatherName?.toLowerCase();
    const normilizedMotherName = person.motherName?.toLowerCase();
    const centuryBorn = String(Math.floor((person.born - 1) / 100) + 1);

    const filterByQuery
      = normilizedName.includes(normalizedQuery)
        || normilizedFatherName?.includes(normalizedQuery)
        || normilizedMotherName?.includes(normalizedQuery);

    const filterBySex = sex !== null
      ? person.sex === sex
      : true;

    const filterByCentury = century.length !== 0
      ? century.includes(centuryBorn)
      : true;

    return filterByQuery && filterBySex && filterByCentury;
  });

  const sortedPeople = sort === null
    ? filteredPeople
    : filteredPeople.sort((firstPerson, secondPerson) => {
      switch (sort) {
        case 'name':
          return firstPerson.name.localeCompare(secondPerson.name);

        case 'sex':
          return firstPerson.sex.localeCompare(secondPerson.sex);

        case 'born':
          return firstPerson.born - secondPerson.born;

        case 'died':
          return firstPerson.died - secondPerson.died;

        default:
          return 0;
      }
    });

  if (order) {
    sortedPeople.reverse();
  }

  return sortedPeople;
}
