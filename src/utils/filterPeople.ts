import { Person } from '../types';

export function filterPeople(
  people: Person[],
  query?: string | null,
  centuries?: number[],
  sex?: string | null,
) {
  const result = people.filter(person => {
    const preparedQuery = query?.toLowerCase() || '';

    const isValidCentury =
      !centuries?.length ||
      centuries.some(century => Math.ceil(person.born / 100) === century);
    const isValidName =
      !query ||
      person.name.toLowerCase().includes(preparedQuery) ||
      person.motherName?.toLowerCase().includes(preparedQuery) ||
      person.fatherName?.toLowerCase().includes(preparedQuery);
    const isValidSex = !sex || person.sex === sex;

    return isValidCentury && isValidName && isValidSex;
  });

  return result;
}
