import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Person } from '../types';

export const useFilteredPeople = (people: Person[]) => {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const sex = searchParams.get('sex');
    const query = searchParams.get('query')?.toLowerCase();
    const centuries = searchParams.getAll('centuries');

    return people.filter(person => {
      const matchesSex = !sex || person.sex === sex;

      const matchesQuery =
        !query ||
        [person.name, person.motherName, person.fatherName].some(field =>
          field?.toLowerCase().includes(query),
        );

      const birthCentury = String(Math.ceil(person.born / 100));
      const matchesCentury =
        centuries.length === 0 || centuries.includes(birthCentury);

      return matchesSex && matchesQuery && matchesCentury;
    });
  }, [people, searchParams]);
};
