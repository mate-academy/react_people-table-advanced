import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { useSearchParams } from 'react-router-dom';

const SORT_FIELDS = ['name', 'sex', 'born', 'died'] as const;

type SortField = (typeof SORT_FIELDS)[number];

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const sexFilter = searchParams.get('sex');
  const sortField = searchParams.get('sort') as SortField | null;
  const isDesc = searchParams.get('order') === 'desc';

  let visiblePeople = people;

  // 🔍 Name filter
  if (query) {
    visiblePeople = visiblePeople.filter(p =>
      [p.name, p.fatherName, p.motherName].some(name =>
        name?.toLowerCase().includes(query),
      ),
    );
  }

  // 📅 Century filter
  if (selectedCenturies.length > 0) {
    visiblePeople = visiblePeople.filter(p => {
      const century = Math.ceil(p.born / 100);

      return selectedCenturies.includes(String(century));
    });
  }

  // 👤 Sex filter
  if (sexFilter === 'm' || sexFilter === 'f') {
    visiblePeople = visiblePeople.filter(p => p.sex === sexFilter);
  }

  // 🔃 Sort
  if (sortField && SORT_FIELDS.includes(sortField)) {
    visiblePeople = [...visiblePeople].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal === bVal) {
        return 0;
      }

      const result = aVal > bVal ? 1 : -1;

      return isDesc ? -result : result;
    });
  }

  return { people: visiblePeople, isLoading, isError };
};
