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
    visiblePeople = visiblePeople.filter(person => person.sex === filterBy);
  }

  return visiblePeople;
};
