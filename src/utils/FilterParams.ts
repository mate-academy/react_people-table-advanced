import { Person } from '../types';

export const getFiterPerson = (
  people: Person[],
  query: string,
  selectedCentury: string[],
  filterBy: string | null,
) => {
  let visiblePeople = [...people];

  if (selectedCentury.length > 0) {
    visiblePeople = visiblePeople.filter(person =>
      selectedCentury.includes(String(Math.ceil(person.born / 100))),
    );
  }

  if (query) {
    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.trim().toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

  if (filterBy) {
    switch (filterBy) {
      case 'm':
        visiblePeople = visiblePeople.filter(person => person.sex === 'm');
        break;
      case 'f':
        visiblePeople = visiblePeople.filter(person => person.sex === 'f');
        break;
      default:
        visiblePeople = visiblePeople;
    }
  }

  return visiblePeople;
};
