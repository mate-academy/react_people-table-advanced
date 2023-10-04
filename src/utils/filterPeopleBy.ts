import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  searchParams: URLSearchParams,
): Person[] => {
  const searchSex = searchParams.get('sex');
  const searchCenturies = searchParams.getAll('centuries');
  const searchQuery = searchParams.get('query')?.toLowerCase();

  return people.filter(({
    sex,
    born,
    name,
    motherName,
    fatherName,
  }) => {
    const birthCentury = String(Math.ceil(born / 100));

    const sexMatch = !searchSex || sex === searchSex;
    const centuryMatch = searchCenturies.length === 0
      || searchCenturies.includes(birthCentury);
    const queryMatch = !searchQuery
      || [name, motherName, fatherName]
        .some((n) => n?.toLowerCase().includes(searchQuery));

    return sexMatch && centuryMatch && queryMatch;
  });
};
