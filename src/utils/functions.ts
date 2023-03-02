import { Person } from '../types/Person';

export const getFilteredPeople = (
  people: Person[],
  query: string,
  sexValue: string,
  centuries: string[],
  sortValue: string,
  isReversed: boolean,
) : Person[] => {
  let filteredPeople = [...people];

  if (sexValue) {
    filteredPeople = filteredPeople.filter(person => (
      person.sex === sexValue
    ));
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const isCentury = centuries.some(century => (
        century === Math.ceil(person.born / 100).toString()
      ));

      return isCentury;
    });
  }

  if (query) {
    const normalizedQuery = query.toLowerCase();

    filteredPeople = filteredPeople.filter(person => {
      const normalizedName = person.name.toLowerCase();
      const normalizedMotherName = person.motherName?.toLowerCase();
      const normalizedFatherName = person.fatherName?.toLowerCase();

      return normalizedName.includes(normalizedQuery)
        || normalizedMotherName?.includes(normalizedQuery)
        || normalizedFatherName?.includes(normalizedQuery);
    });
  }

  if (sortValue) {
    filteredPeople.sort((p1, p2) => {
      switch (sortValue) {
        case 'name':
        case 'sex':
          return p1[sortValue].localeCompare(p2[sortValue]);
        case 'born':
        case 'died':
          return p1[sortValue] - p2[sortValue];
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    filteredPeople.reverse();
  }

  return filteredPeople;
};
