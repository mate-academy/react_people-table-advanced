import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  searchParams: URLSearchParams,
): Person[] => {
  const searchSex = searchParams.get('sex');
  const searchCenturies = searchParams.getAll('centuries');
  const searchQuery = searchParams.get('query')?.toLowerCase().trim();

  return people.filter(({
    sex, born, motherName, fatherName, name,
  }) => {
    const birthCentury = String(Math.ceil(born / 100));

    if (searchSex && sex !== searchSex) {
      return false;
    }

    if (searchCenturies.length && !searchCenturies.includes(birthCentury)) {
      return false;
    }

    if (searchQuery
      && !(name.toLowerCase().includes(searchQuery)
        || motherName?.toLowerCase().includes(searchQuery)
        || fatherName?.toLowerCase().includes(searchQuery))
    ) {
      return false;
    }

    return true;
  });
};
