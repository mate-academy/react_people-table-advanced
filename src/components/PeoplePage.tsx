import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const { search } = useLocation();

  // Переміщаємо створення params всередину useMemo
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    const query = params.get('query')?.toLowerCase() || '';
    const sex = params.get('sex');
    const centuries = params.getAll('centuries').map(Number);
    const sort = params.get('sort') as keyof Person | null;
    const order = params.get('order');

    let filtered = [...people];

    if (query) {
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.motherName?.toLowerCase().includes(query) ||
          p.fatherName?.toLowerCase().includes(query),
      );
    }

    if (sex) {
      filtered = filtered.filter(p => p.sex === sex);
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(p =>
        centuries.includes(Math.ceil(p.born / 100)),
      );
    }

    if (sort) {
      filtered.sort((a, b) => {
        const valA = a[sort] ?? '';
        const valB = b[sort] ?? '';
        const res =
          typeof valA === 'string'
            ? valA.localeCompare(valB as string)
            : (valA as number) - (valB as number);

        return order === 'desc' ? -res : res;
      });
    }

    return filtered;
  }, [people, params]);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          {people.length > 0 && <PeopleFilters />}
        </div>
        <div className="column">
          <div className="box table-container">
            {isLoading && <Loader />}
            {hasError && (
              <p data-cy="peopleLoadingError">Something went wrong</p>
            )}
            {!isLoading && !hasError && people.length > 0 && (
              <PeopleTable people={visiblePeople} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
