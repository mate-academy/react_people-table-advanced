import { Person } from '../types/Person';

export function applyFilters(
  people: Person[],
  query: string,
  centuries: string[],
  sex: string,
): Person[] {
  let filteredPeople = people;

  if (query) {
    const lowerQuery = query.toLowerCase();

    filteredPeople = filteredPeople.filter(person => {
      const { name, motherName, fatherName } = person;

      return (
        name.toLowerCase().includes(lowerQuery) ||
        (motherName && motherName.toLowerCase().includes(lowerQuery)) ||
        (fatherName && fatherName.toLowerCase().includes(lowerQuery))
      );
    });
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(String(century));
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  return filteredPeople;
}
