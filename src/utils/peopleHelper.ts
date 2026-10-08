import { Person } from '../types';

export const getVisiblePeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  let visiblePeople = people;

  if (sex) {
    visiblePeople = visiblePeople.filter(person => sex === person.sex);
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const centuryOfBorn = Math.ceil(person.born / 100);

      return centuries.includes(String(centuryOfBorn));
    });
  }

  return visiblePeople;
};
