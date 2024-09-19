import { Person } from '../types';

interface Filters {
  sex: string | null;
  query: string | null;
  centuries?: string[];
}

export const filterPeople = (
  people: Person[],
  { centuries, query, sex }: Filters,
) =>
  people.filter(person => {
    if (sex) {
      return person.sex === sex;
    }

    if (query) {
      return person.name.toLowerCase().includes(query);
    }

    if (centuries?.length) {
      const personCentury = Math.ceil(person.born / 100);

      return centuries.some(century => +century === personCentury);
    }

    return person;
  });
