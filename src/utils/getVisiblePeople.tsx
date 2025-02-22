import { Person } from '../types';

export const getVisiblePeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  let visiblePeople = [...people];

  const normalizedQuery = searchParams.get('query')?.trim().toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.get('centuries');
  const sort = (searchParams.get('sort') as keyof Person) || null;
  const order = searchParams.get('order') || null;

  if (sex !== null) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (normalizedQuery) {
    visiblePeople = visiblePeople.filter(person => {
      const motherName = person.motherName
        ? person.motherName.toLowerCase()
        : '';
      const fatherName = person.fatherName
        ? person.fatherName.toLowerCase()
        : '';

      return (
        person.name.toLowerCase().includes(normalizedQuery) ||
        motherName.includes(normalizedQuery) ||
        fatherName.includes(normalizedQuery)
      );
    });
  }

  if (centuries) {
    visiblePeople = visiblePeople.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sort) {
    visiblePeople = visiblePeople.sort(
      (currentPerson: Person, nextPerson: Person) => {
        const currentValue = currentPerson[sort];
        const nextValue = nextPerson[sort];

        let comparison = 0;

        if (typeof currentValue === 'string' && typeof nextValue === 'string') {
          comparison = currentValue.localeCompare(nextValue);
        }

        if (typeof currentValue === 'number' && typeof nextValue === 'number') {
          comparison = currentValue - nextValue;
        }

        return order === 'desc' ? comparison * -1 : comparison;
      },
    );
  }

  return visiblePeople;
};
