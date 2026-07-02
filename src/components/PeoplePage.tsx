/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setLoading(true);
    setError(false);
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

  const visiblePeople = useMemo(() => {
    let filtered = [...people];

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (query) {
      filtered = filtered.filter(person => {
        const matchesName = person.name.toLowerCase().includes(query);

        const matchesMother = person.motherName?.toLowerCase().includes(query);

        const matchesFather = person.fatherName?.toLowerCase().includes(query);

        return matchesName || matchesMother || matchesFather;
      });
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person => {
        const century = Math.ceil(person.born / 100);

        return centuries.includes(century.toString());
      });
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        const valA = a[sortBy as keyof Person];
        const valB = b[sortBy as keyof Person];

        let result = 0;

        if (typeof valA === 'number' && typeof valB === 'number') {
          result = valA - valB;
        } else {
          result = String(valA).localeCompare(String(valB));
        }

        return order === 'desc' ? -result : result;
      });
    }

    return filtered;
  }, [people, sex, query, centuries, sortBy, order]);

  const getSortParams = (field: string) => {
    if (sortBy !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">There are no people on the server</p>
              )}

              {!loading &&
                !error &&
                people.length > 0 &&
                visiblePeople.length === 0 && (
                <p>
                    There are no people matching the current search criteria{' '}
                </p>
              )}

              {!loading && !error && visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  sortBy={sortBy}
                  order={order}
                  getSortParams={getSortParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
