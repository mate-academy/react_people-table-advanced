import { Person } from '../types';

export const getFilteredPeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[],
) => {
  let filteredPeople = [...people];

  const preparedQuery = query?.toLowerCase();

  if (preparedQuery) {
    filteredPeople = filteredPeople.filter(person => {
      return person.name.toLowerCase()
        .includes(preparedQuery)
          || person.motherName?.toLowerCase()
            .includes(preparedQuery)
          || person.fatherName?.toLowerCase()
            .includes(preparedQuery);
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => {
      switch (sex) {
        case 'm':
          return person.sex === 'm';
        case 'f':
          return person.sex === 'f';
        default:
          return true;
      }
    });
  }

  if (centuries.length) {
    const parsedCenturies = centuries.map(Number);

    filteredPeople = filteredPeople.filter(({ born, died }) => {
      const bornCentury = Math.ceil(born / 100);
      const diedCentury = Math.ceil(died / 100);

      return parsedCenturies.includes(bornCentury)
        || parsedCenturies.includes(diedCentury);
    });
  }

  return filteredPeople;
};
