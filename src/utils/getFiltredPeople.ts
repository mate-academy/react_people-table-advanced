import { Person } from '../types';

export function getFiltredPeople(
  people: Person[],
  centuries: string[],
  sex: string | null,
  query: string | null,
): Person[] {
  let filtredPeople: Person[] = people;

  if (centuries.length > 0) {
    filtredPeople = people.filter(person => {
      const personBornCentury = Math.ceil(person.born / 100).toString();

      return centuries.includes(personBornCentury);
    });
  }

  if (sex) {
    filtredPeople = people.filter(person => person.sex === sex);
  }

  if (query) {
    const preparedQuery = query.trim().toLowerCase();

    filtredPeople = people.filter(person => {
      const preparedName = person.name.toLowerCase();
      const preparedMotherName = person.motherName?.toLowerCase();
      const preparedFatherName = person.fatherName?.toLowerCase();

      return preparedName.includes(preparedQuery)
        || preparedMotherName?.includes(preparedQuery)
        || preparedFatherName?.includes(preparedQuery);
    });
  }

  return filtredPeople;
}
