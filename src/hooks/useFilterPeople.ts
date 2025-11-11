import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../types';

type SortType = 'name' | 'sex' | 'born' | 'died' | null;
type SortOrder = 'asc' | 'desc' | null;

export const useFilterPeople = (people: Person[]) => {
  const location = useLocation();
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const sex = searchParams.get('sex');
    const query = searchParams.get('query')?.toLowerCase().trim() || '';
    const centuries = searchParams.getAll('centuries');

    const sortType = (searchParams.get('sort') as SortType) || null;
    const sortOrder = (searchParams.get('order') as SortOrder) || null;

    let result = people;

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (query) {
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p?.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          p?.fatherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries && centuries.length > 0) {
      result = result.filter(p =>
        centuries.includes(String(Math.floor(p.born / 100))),
      );
    }

    if (sortType) {
      result = [...result].sort((a, b) => {
        switch (sortType) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'sex':
            return a.sex.localeCompare(b.sex);
          case 'born':
            return a.born - b.born;
          case 'died':
            return a.died - b.died;
          default:
            return 0;
        }
      });

      if (sortOrder === 'desc') {
        result.reverse();
      }
    }

    setFilteredPeople(result);
  }, [people, location.search]);

  return { filteredPeople };
};
