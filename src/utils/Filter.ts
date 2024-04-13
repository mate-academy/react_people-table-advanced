import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const searchSex = searchParams.get('sex') || '';
  const searchCenturies = searchParams.getAll('century') || [];
  const searchQuery = searchParams.get('query') || '';

  if (!searchSex && searchCenturies.length === 0 && !searchQuery) {
    return people;
  }

  return people.filter(person => {
    const { name, motherName, fatherName, sex, born } = person;

    if (searchSex && sex !== searchSex) {
      return false;
    }

    const century = Math.floor(born / 100 + 1);

    if (
      searchCenturies.length !== 0 &&
      !searchCenturies.includes(century.toString())
    ) {
      return false;
    }

    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      motherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fatherName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
};
