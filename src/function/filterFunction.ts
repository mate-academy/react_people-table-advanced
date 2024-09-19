import { Person } from '../types';
import { FilterSexType } from '../types/Sex';

export function filterPeople(
  people: Person[],
  query: string,
  centuriesSelected: string[],
  sexSelected: string | null,
) {
  return people
    .filter(person => {
      if (!sexSelected || sexSelected === FilterSexType.All) {
        return true;
      }

      return person.sex === sexSelected;
    })
    .filter(person => {
      if (!centuriesSelected.length) {
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
