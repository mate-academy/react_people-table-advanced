import { Person } from './Person';

export function getFilteredPeople(
  people: Person[],
  queryFilter: string | null,
  sexFilter: string | null,
  centuriesFilter: string[],
): Person[] {
  let visiblePeople = people;

  if (queryFilter) {
    const normalizedQuery = queryFilter.toLowerCase();

    visiblePeople = visiblePeople.filter(person => {
      const matchName = person.name.toLowerCase().includes(normalizedQuery);
      const matchMother = person.motherName
        ?.toLowerCase()
        .includes(normalizedQuery);
      const matchFather = person.fatherName
        ?.toLowerCase()
        .includes(normalizedQuery);

      return matchName || matchMother || matchFather;
    });
  }

  if (sexFilter) {
    visiblePeople = visiblePeople.filter(person => person.sex === sexFilter);
  }

  if (centuriesFilter && centuriesFilter.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const currentCentury = Math.ceil(person.born / 100).toString();

      return centuriesFilter.includes(currentCentury);
    });
  }

  return visiblePeople;
}