import { Person } from '../types';

export function filterPeople(
  toFilter: Person[],
  query: string | null,
  sexQuery: string | null,
  centuries: string[],
) {
  const lowerInclude = (string: string | null) => {
    if (query && string) {
      return string.toLowerCase().includes(query?.toLowerCase());
    }

    return !!string;
  };

  return toFilter.filter(person => {
    const {
      name,
      fatherName,
      motherName,
      sex,
      born,
    } = person;

    const queryCondition = [
      lowerInclude(name),
      lowerInclude(motherName),
      lowerInclude(fatherName),
    ].some(Boolean);
    const sexCondition = sexQuery ? sex === sexQuery : true;
    const centurieCondition = centuries.length
      ? centuries.includes(String(Math.ceil(born / 100)))
      : true;

    return queryCondition && sexCondition && centurieCondition;
  });
}
