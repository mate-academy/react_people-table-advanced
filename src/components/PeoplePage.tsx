import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Filter and sort logic
  const filteredPeople = useMemo(() => {
    let result = [...people];

    // Name filter (case-insensitive match with name, motherName, fatherName)
    const query = searchParams.get('query')?.toLowerCase() || '';

    if (query) {
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.motherName?.toLowerCase().includes(query) ||
          p.fatherName?.toLowerCase().includes(query),
      );
    }

    // Sex filter
    const sex = searchParams.get('sex');

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    // Century filter (born year)
    const centuries = searchParams.getAll('centuries').map(Number);

    if (centuries.length) {
      result = result.filter(p => {
        const century = Math.floor(p.born / 100) + 1;

        return centuries.includes(century);
      });
    }

    // Sorting
    const sortField = searchParams.get('sort') as keyof Person | null;
    const order = searchParams.get('order');

    if (sortField) {
      result.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];

        let comparison = 0;

        if (typeof valA === 'string' && typeof valB === 'string') {
          comparison = valA.localeCompare(valB);
        } else if (typeof valA === 'number' && typeof valB === 'number') {
          comparison = valA - valB;
        }

        return order === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!loading && people.length > 0 && filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
