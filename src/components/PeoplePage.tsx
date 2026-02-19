import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../utils/api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader/';

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('century').map(Number);
  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    let result = [...people];

    // FILTER BY NAME
    if (query) {
      const q = query.toLowerCase();

      result = result.filter(
        person =>
          person.name.toLowerCase().includes(q) ||
          person.motherName?.toLowerCase().includes(q) ||
          person.fatherName?.toLowerCase().includes(q),
      );
    }

    // FILTER BY CENTURY
    if (centuries.length > 0) {
      result = result.filter(person => {
        const century = Math.ceil(person.born / 100);
        return centuries.includes(century);
      });
    }

    // SORT
    if (sort) {
      result.sort((a, b) => {
        const dir = order === 'desc' ? -1 : 1;

        const aVal = a[sort];
        const bVal = b[sort];

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return (aVal - bVal) * dir;
        }

        return String(aVal).localeCompare(String(bVal)) * dir;
      });
    }

    return result;
  }, [people, query, centuries, sort, order]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="columns">
      <div className="column is-one-quarter">
        <PeopleFilters people={people} />
      </div>

      <div className="column">
        <PeopleTable people={visiblePeople} />
      </div>
    </div>
  );
};
