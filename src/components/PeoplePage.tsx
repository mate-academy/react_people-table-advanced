import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = useMemo(() => {
    let result = [...people];

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (query) {
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.motherName?.toLowerCase().includes(query) ||
          p.fatherName?.toLowerCase().includes(query),
      );
    }

    if (centuries.length > 0) {
      result = result.filter(p =>
        centuries.includes(Math.ceil(p.born / 100).toString()),
      );
    }

    if (sort) {
      result.sort((a, b) => {
        const valA = a[sort as keyof Person] ?? '';
        const valB = b[sort as keyof Person] ?? '';

        if (valA < valB) {
          return order === 'desc' ? 1 : -1;
        }

        if (valA > valB) {
          return order === 'desc' ? -1 : 1;
        }

        return 0;
      });
    }

    return result;
  }, [people, sex, query, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && people.length > 0 && (
                <>
                  {filteredPeople.length === 0 ? (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable people={filteredPeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
