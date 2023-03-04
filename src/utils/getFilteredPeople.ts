import { Person } from '../types';

export const getFilteredPeople = (
  sex: string,
  query: string,
  sortParam: string,
  isReversed: boolean,
  arrOfPeople: Person[],
  centuries: string[],
) => {
  let filteredPeople = JSON.parse(JSON.stringify(arrOfPeople));

  if (sex) {
    filteredPeople = filteredPeople.filter(
      (person: Person) => person.sex === sex,
    );
  }

  if (query) {
    filteredPeople = filteredPeople.filter((person: Person) => {
      const normalizedQuery = query.trim().toLowerCase();
      const personName = person.name.toLowerCase();
      const fatherName = person.fatherName?.toLowerCase();
      const motherName = person.motherName?.toLowerCase();

      return (
        personName.includes(normalizedQuery)
        || fatherName?.includes(query)
        || motherName?.includes(query)
      );
    });
  }

  filteredPeople.sort((prev: Person, next: Person) => {
    switch (sortParam) {
      case 'name':
      case 'sex':
        return prev[sortParam].localeCompare(next[sortParam]);

      case 'born':
      case 'died':
        return prev[sortParam] - next[sortParam];
      default:
        return 0;
    }
  });

  if (isReversed) {
    filteredPeople.reverse();
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter((person: Person) => {
      const inCentury = centuries.some(
        (century) => century === Math.ceil(person.born / 100).toString(),
      );

      return inCentury;
    });
  }

  return filteredPeople;
};
