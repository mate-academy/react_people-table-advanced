import { Person } from '../types';

export const getFilteredPeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[],
) => {
  let filteredPeople = [...people];

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

    filteredPeople = filteredPeople.filter(({ born }) => {
      const bornCentury = Math.ceil(born / 100);

      return numberCenturies.includes(bornCentury);
    });
  }

  if (query) {
    const regex = new RegExp(query, 'i');

    filteredPeople = filteredPeople
      .filter(({ name, fatherName, motherName }) => {
        const testString = `
          ${name}
          ${fatherName || ''}
          ${motherName || ''}
        `;

        return regex.test(testString);
      });
  }

  return filteredPeople;
};
