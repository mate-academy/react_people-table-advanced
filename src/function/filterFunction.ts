import { Person } from '../types';

export function filterPeople(
  people: Person[],
  query: string,
  centuriesSelected: string[],
  sexSelected: string | null,
) {
  return people
    .filter(person => {
      if (!sexSelected || sexSelected === 'all') {
        return true;
      }

      return person.sex === sexSelected;
    })
    .filter(person => {
      if (centuriesSelected.length === 0) {
        return true;
      }

      const personCentury = Math.floor(person.born / 100) + 1;

      return centuriesSelected.includes(String(personCentury));
    })
    .filter(person => {
      if (!query) {
        return true;
      }

      return (
        person.name.toLowerCase().includes(query.toLowerCase().trim()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase().trim()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase().trim())
      );
    });
}
