/* eslint-disable max-len */
import { Person } from '../types';

export function getPreparedPeople(
  peopleArray: Person[],
  { query, sex, centuries }: { query: string; sex: string; centuries: string[] },
) {
  let preparedPeople = [...peopleArray];

  if (query) {
    preparedPeople = preparedPeople.filter((person) => {
      return (
        person.name.toLowerCase().includes(query.toLowerCase().trim())
        || person.motherName?.toLowerCase().includes(query.toLowerCase().trim())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase().trim())
      );
    });
  }

  if (sex) {
    preparedPeople = preparedPeople.filter((person) => person.sex === sex);
  }

  if (centuries.length > 0) {
    preparedPeople = preparedPeople.filter((person) => {
      const century = Math.ceil(person.died / 100);

      return centuries.includes(century.toString());
    });
  }

  return preparedPeople;
}
