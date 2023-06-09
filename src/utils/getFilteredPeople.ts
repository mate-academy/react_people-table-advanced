import { Person } from '../types/Person';

export const getFilteredPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.toLowerCase();
  const centuries = searchParams.getAll('centuries');
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople.filter(person => (
      person.name.toLowerCase().includes(query)
      || person.fatherName?.toLowerCase().includes(query)
      || person.motherName?.toLowerCase().includes(query)
    ));
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      const personCentury = `${Math.ceil(person.born / 100)}`;

      return centuries.includes(personCentury);
    });
  }

  return filteredPeople;
};
