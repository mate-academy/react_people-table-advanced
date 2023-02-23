import { Person } from '../types';

export const getFilteredPeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[],
) => {
  let filteredPeople = [...people];

  if (query) {
    const regex = new RegExp(query, 'i');

    filteredPeople = filteredPeople
      .filter(({ name, fatherName, motherName }) => (
        regex.test(
          `${name} ${fatherName || ''} ${motherName || ''}`,
        )
      ));
  }

  if (sex) {
    filteredPeople = filteredPeople.filter((person) => {
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
    const numberCenturies = centuries.map(Number);

    filteredPeople = filteredPeople.filter(({ born, died }) => {
      const bornCentury = Math.ceil(born / 100);
      const diedCentury = Math.ceil(died / 100);

      return numberCenturies.includes(bornCentury)
        || numberCenturies.includes(diedCentury);
    });
  }

  return filteredPeople;
};
