import { Person } from '../types/Person';

type Filters = {
  sex: string | null;
  query: string;
  centuries: string[];
};

export function filterPeople(
  people: Person[],
  { sex, query, centuries }: Filters,
): Person[] {
  const normalizedQuery = query.trim().toLowerCase();

  return people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (normalizedQuery) {
      const fields = [person.name, person.motherName, person.fatherName];

      const matches = fields.some(field =>
        field?.toLowerCase().includes(normalizedQuery),
      );

      if (!matches) {
        return false;
      }
    }

    if (centuries.length > 0) {
      const century = Math.ceil(person.born / 100).toString();

      if (!centuries.includes(century)) {
        return false;
      }
    }

    return true;
  });
}
