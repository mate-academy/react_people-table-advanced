import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(true);
  const getSex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  useEffect(() => {
    getPeople()
      .then(newPeoples => {
        if (!newPeoples.length) {
          setError('server');
        }

        setPeoples(newPeoples);
      })
      .catch(() => setError('Something'))
      .finally(() => setLoader(false));
  }, []);

  const getCenturyRange = (century: number): [number, number] => {
    const start = (century - 1) * 100 + 1;
    const end = century * 100;

    return [start, end];
  };

  const filterPeople = useCallback(() => {
    let filtered = peoples;

    if (getSex) {
      filtered = peoples.filter(person => person.sex === getSex);
    }

    if (query) {
      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person =>
        centuries.some(century => {
          const [start, end] = getCenturyRange(parseInt(century, 10));

          return person.born >= start && person.born <= end;
        }),
      );
    }

    return filtered;
  }, [peoples, getSex, query, centuries]);

  const filteredPeople = filterPeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loader && (
              <PeopleFilters
                getSex={getSex}
                query={query}
                centuries={centuries}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}

              {error === 'Something' && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!filteredPeople.length && !loader && (
                <p>There are no people matching the current search criteria</p>
              )}

              {error === 'server' && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loader && !error && filteredPeople.length > 0 && (
                <PeopleTable
                  peoples={peoples}
                  filteredPeople={filteredPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
