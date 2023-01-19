import { Person } from './types';

export const getVisiblePeople = (
  people: Person[],
  sex: string | null,
  query: string,
  centuries: string[],
  sort: string | null,
  order: string | null,
) => {
  const normalizedQuery = query.toLowerCase();

  const filteredPeople = people.filter(person => {
    const stringToCheck = `${person.name} ${person.motherName} ${person.fatherName}`.toLowerCase();
    const isQueryMatch = stringToCheck.includes(normalizedQuery);

    const personCentury = Math.ceil(person.born / 100).toString();
    const isCenturyMatch = centuries.length
      ? centuries.includes(personCentury)
      : true;

    const isSexMatch = sex
      ? person.sex === sex
      : true;

    return isSexMatch && isQueryMatch && isCenturyMatch;
  });

  const visiblePeople = filteredPeople.sort((first, second) => {
    switch (sort) {
      case 'name':
        return first.name.localeCompare(second.name);

      case 'sex':
        return first.sex.localeCompare(second.sex);

      case 'born':
        return first.born - second.born;

      case 'died':
        return first.died - second.died;

      default:
        return 0;
    }
  });

  if (order) {
    visiblePeople.reverse();
  }

  return visiblePeople;
};
